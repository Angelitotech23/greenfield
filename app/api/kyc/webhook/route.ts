import { NextResponse } from "next/server";
import { uniquenessHash, verifySumsubWebhook } from "@/lib/kyc/sumsub";
import { applyKyc, getProfileById } from "@/lib/store/memory";

export async function POST(req: Request) {
  const raw = await req.text();
  const sig = req.headers.get("x-payload-digest");
  if (!verifySumsubWebhook(sig, raw)) {
    return NextResponse.json({ error: "firma inválida" }, { status: 401 });
  }
  const payload = JSON.parse(raw || "{}") as {
    profileId?: string;
    applicantId?: string;
    legalName?: string;
    reviewAnswer?: string;
  };
  if (payload.reviewAnswer !== "GREEN" || !payload.profileId || !payload.legalName) {
    return NextResponse.json({ ignored: true });
  }
  const profile = getProfileById(payload.profileId);
  if (!profile) return NextResponse.json({ error: "perfil" }, { status: 404 });
  const hash = await uniquenessHash({
    subjectId: payload.applicantId ?? payload.profileId,
    legalName: payload.legalName,
  });
  const result = applyKyc({
    profileId: payload.profileId,
    legalName: payload.legalName,
    uniquenessHash: hash,
  });
  if (!result.ok) {
    return NextResponse.json({ duplicate: true }, { status: 409 });
  }
  return NextResponse.json({ ok: true, sbtTokenId: result.sbtTokenId });
}
