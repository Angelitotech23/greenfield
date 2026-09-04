import { NextResponse } from "next/server";
import { logGrantView, readGrant } from "@/lib/store/memory";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ token: string }> },
) {
  const { token } = await params;
  const data = readGrant(token);
  if (!data) {
    return NextResponse.json({ error: "Grant inválido o expirado" }, { status: 404 });
  }
  const body = (await req.json()) as { viewerLabel?: string };
  logGrantView(data.grant.id, body.viewerLabel || "visitante");
  if (!data.vault) {
    return NextResponse.json({ deleted: true, status: "pending" });
  }
  return NextResponse.json({
    status: data.vault.status,
    officialSource: data.vault.officialSource,
    summary: data.vault.summary,
    expiresAt: data.vault.expiresAt,
  });
}
