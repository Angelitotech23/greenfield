import { NextResponse } from "next/server";
import { loginDemo } from "@/lib/auth/session";

export async function POST(req: Request) {
  const body = (await req.json()) as {
    email?: string;
    walletAddress?: string;
    name?: string;
  };
  if (!body.email && !body.walletAddress) {
    return NextResponse.json({ error: "Correo o wallet requeridos" }, { status: 400 });
  }
  const user = await loginDemo(body);
  return NextResponse.json({ ok: true, user });
}
