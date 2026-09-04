import { NextResponse } from "next/server";
import { hasRole } from "@/lib/auth/roles";
import { getSession } from "@/lib/auth/session";
import { addCheckin, getProfileByHandle } from "@/lib/store/memory";

export async function POST(req: Request) {
  const session = await getSession();
  if (!session || !hasRole(session, "organizer")) {
    return NextResponse.json({ error: "Solo organizador" }, { status: 403 });
  }
  const body = (await req.json()) as { eventId: string; handle: string };
  const profile = getProfileByHandle(body.handle);
  if (!profile) return NextResponse.json({ error: "Handle no existe" }, { status: 404 });
  const row = addCheckin(body.eventId, profile);
  return NextResponse.json(row);
}
