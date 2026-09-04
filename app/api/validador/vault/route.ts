import { NextResponse } from "next/server";
import { hasRole } from "@/lib/auth/roles";
import { getSession } from "@/lib/auth/session";
import { deleteVault, upsertVault } from "@/lib/store/memory";
import type { IntegrityStatus } from "@/lib/types";

export async function POST(req: Request) {
  const session = await getSession();
  if (!session || !hasRole(session, "validator")) {
    return NextResponse.json({ error: "Solo el validador" }, { status: 403 });
  }
  const body = (await req.json()) as {
    profileId: string;
    status: IntegrityStatus;
    officialSource: string;
    summary: string;
    expiresAt: string;
  };
  upsertVault({
    profileId: body.profileId,
    status: body.status,
    officialSource: body.officialSource,
    summary: body.summary,
    expiresAt: new Date(body.expiresAt).toISOString(),
  });
  return NextResponse.json({
    message: "Guardado off-chain. No se emitió ninguna atestación EAS.",
  });
}

export async function DELETE(req: Request) {
  const session = await getSession();
  if (!session || !hasRole(session, "validator")) {
    return NextResponse.json({ error: "Solo el validador" }, { status: 403 });
  }
  const body = (await req.json()) as { profileId: string };
  deleteVault(body.profileId);
  return NextResponse.json({ message: "Borrado duro del vault." });
}
