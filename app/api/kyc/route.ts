import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { startKyc, uniquenessHash } from "@/lib/kyc/sumsub";
import { applyKyc } from "@/lib/store/memory";
import { sha256Hex } from "@/lib/utils";

const DEMO_ALIASES: Record<string, string> = {
  pablo_mendoza_demo: "uniq_pablo_mendoza_demo",
  maria_vargas_demo: "uniq_maria_vargas_demo",
};

export async function POST(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  const body = (await req.json()) as {
    legalName: string;
    subjectId: string;
    liveness?: boolean;
  };
  if (!body.liveness) {
    return NextResponse.json({ error: "Completa el liveness check." }, { status: 400 });
  }
  await startKyc(session.profileId);
  const hash =
    DEMO_ALIASES[body.subjectId.trim()] ??
    (await uniquenessHash({
      subjectId: body.subjectId,
      legalName: body.legalName,
    }));
  const result = applyKyc({
    profileId: session.profileId,
    legalName: body.legalName,
    uniquenessHash: hash,
  });
  if (!result.ok) {
    return NextResponse.json(
      {
        error:
          "Ya existe un pasaporte con la misma prueba de unicidad. Segunda cuenta rechazada.",
      },
      { status: 409 },
    );
  }
  const commitment = await sha256Hex(hash);
  return NextResponse.json({
    message: `Identidad aprobada. SBT #${result.sbtTokenId}. Compromiso on-chain (hash): ${commitment.slice(0, 16)}…`,
    sbtTokenId: result.sbtTokenId,
    uniquenessCommitment: commitment,
  });
}
