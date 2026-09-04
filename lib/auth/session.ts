import { cookies } from "next/headers";
import { upsertSessionUser } from "@/lib/store/memory";
import type { SessionUser } from "@/lib/types";

const COOKIE = "pasaporte_session";

export async function getSession(): Promise<SessionUser | null> {
  const jar = await cookies();
  const raw = jar.get(COOKIE)?.value;
  if (!raw) return null;
  try {
    return JSON.parse(raw) as SessionUser;
  } catch {
    return null;
  }
}

export async function setSession(user: SessionUser) {
  const jar = await cookies();
  jar.set(COOKIE, JSON.stringify(user), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
}

export async function clearSession() {
  const jar = await cookies();
  jar.delete(COOKIE);
}

export async function loginDemo(input: {
  email?: string;
  walletAddress?: string;
  name?: string;
}): Promise<SessionUser> {
  const user = upsertSessionUser(input);
  await setSession(user);
  return user;
}
