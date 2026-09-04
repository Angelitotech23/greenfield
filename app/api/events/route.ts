import { NextResponse } from "next/server";
import { hasRole } from "@/lib/auth/roles";
import { getSession } from "@/lib/auth/session";
import { createEvent, eventsByOrganizer } from "@/lib/store/memory";

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  return NextResponse.json(eventsByOrganizer(session.profileId));
}

export async function POST(req: Request) {
  const session = await getSession();
  if (!session || !hasRole(session, "organizer")) {
    return NextResponse.json({ error: "Solo organizador" }, { status: 403 });
  }
  const body = (await req.json()) as {
    name: string;
    slug: string;
    date: string;
    location: string;
  };
  const event = createEvent({
    organizerProfileId: session.profileId,
    name: body.name,
    slug: body.slug,
    date: body.date,
    location: body.location,
  });
  return NextResponse.json(event);
}
