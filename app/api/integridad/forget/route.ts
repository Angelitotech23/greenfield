import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { deleteVault } from "@/lib/store/memory";

export async function POST() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  deleteVault(session.profileId);
  return NextResponse.json({
    message: "Vault, grants y logs borrados. La blockchain no tenía dato penal que borrar.",
  });
}
