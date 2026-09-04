import Link from "next/link";
import { LogoutButton } from "@/components/logout-button";
import { getSession } from "@/lib/auth/session";
import { getProfileById } from "@/lib/store/memory";

export async function SiteHeader() {
  const session = await getSession();
  const profile = session ? getProfileById(session.profileId) : null;

  return (
    <header className="border-b border-[#d7cbb3] bg-[#12100c] text-[#f4efe3]">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link href="/" className="flex items-baseline gap-2">
          <span className="font-display text-xl tracking-tight">Pasaporte</span>
          <span className="text-[11px] uppercase tracking-[0.22em] text-[#e8b84a]">
            Profesional
          </span>
        </Link>
        <nav className="flex items-center gap-5 text-sm">
          <Link href="/explorar" className="opacity-80 hover:opacity-100">
            Explorar
          </Link>
          <Link href="/privacidad" className="opacity-80 hover:opacity-100">
            Privacidad
          </Link>
          {profile ? (
            <>
              <Link href="/app" className="opacity-80 hover:opacity-100">
                Mi CV
              </Link>
              <Link
                href={`/${profile.handle}`}
                className="rounded-full border border-[#e8b84a]/50 px-3 py-1 text-[#e8b84a]"
              >
                /{profile.handle}
              </Link>
              <LogoutButton />
            </>
          ) : (
            <Link
              href="/auth"
              className="rounded-full bg-[#e8b84a] px-4 py-1.5 text-[#12100c]"
            >
              Entrar
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
