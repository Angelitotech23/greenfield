import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { createGrant } from "@/lib/store/memory";
import { uid } from "@/lib/utils";

export async function POST(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  const body = (await req.json()) as { label: string; days: number; singleUse: boolean };
  const expires = new Date();
  expires.setDate(expires.getDate() + Number(body.days || 7));
  const grant = createGrant({
    profileId: session.profileId,
    token: uid("g"),
    label: body.label || "Grant",
    expiresAt: expires.toISOString(),
    singleUse: Boolean(body.singleUse),
    createdBy: session.profileId,
  });
  return NextResponse.json({
    message: "Grant creado. Compártelo fuera del CV indexable.",
    token: grant.token,
  });
}
