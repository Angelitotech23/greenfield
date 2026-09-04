import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { addWeb2Credential } from "@/lib/store/memory";
import { verifyWeb2, type Web2ProviderId } from "@/lib/web2-credentials";
import { nowIso, uid } from "@/lib/utils";

export async function POST(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  const body = (await req.json()) as { provider: Web2ProviderId; externalId: string };
  const result = await verifyWeb2(body.provider, body.externalId);
  if (!result.ok) {
    return NextResponse.json({ error: result.reason }, { status: 400 });
  }
  addWeb2Credential({
    id: uid("w"),
    profileId: session.profileId,
    provider: result.provider,
    externalId: result.externalId,
    title: result.title,
    verifiedAt: nowIso(),
    sandbox: result.sandbox,
  });
  return NextResponse.json({
    message: result.sandbox
      ? "Verificado en sandbox (formato válido). Semáforo amarillo."
      : "Verificado con API del emisor. Semáforo amarillo.",
  });
}
