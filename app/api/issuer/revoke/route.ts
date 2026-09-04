import { NextResponse } from "next/server";
import { hasRole } from "@/lib/auth/roles";
import { getSession } from "@/lib/auth/session";
import { issuersFor, revokeCredential } from "@/lib/store/memory";

export async function POST(req: Request) {
  const session = await getSession();
  if (!session || !hasRole(session, "issuer")) {
    return NextResponse.json({ error: "No eres emisor" }, { status: 403 });
  }
  const body = (await req.json()) as { credentialId: string; issuerId: string };
  const mine = issuersFor(session.profileId).find((i) => i.id === body.issuerId);
  if (!mine) return NextResponse.json({ error: "Emisor no autorizado" }, { status: 403 });
  try {
    revokeCredential(mine.id, body.credentialId);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Error" },
      { status: 400 },
    );
  }
}
