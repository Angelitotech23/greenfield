import { NextResponse } from "next/server";
import { readAttestation } from "@/lib/eas/client";

export async function GET(req: Request) {
  const uid = new URL(req.url).searchParams.get("uid");
  if (!uid) return NextResponse.json({ error: "uid requerido" }, { status: 400 });
  const preview = await readAttestation(uid);
  return NextResponse.json(preview);
}
