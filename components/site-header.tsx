import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";
import { LogoutButton } from "@/components/logout-button";
import { getSession } from "@/lib/auth/session";
import { getProfileById } from "@/lib/store/memory";

export async function SiteHeader() {
  const session = await getSession();
  const profile = session ? getProfileById(session.profileId) : null;

  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-black/55 text-ink-50 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3">
        <Link href="/" className="flex items-center gap-2.5">
          <BrandMark className="h-8 w-8" />
          <span className="font-display text-lg tracking-tight">Pasaporte</span>
        </Link>
        <nav className="flex items-center gap-1 text-sm text-ink-600">
          <Link href="/explorar" className="rounded-full px-3 py-1.5 hover:text-ink-50">
            Explorar
          </Link>
          <Link href="/privacidad" className="hidden rounded-full px-3 py-1.5 hover:text-ink-50 sm:inline">
            Privacidad
          </Link>
          {profile ? (
            <>
              <Link href="/app" className="rounded-full px-3 py-1.5 hover:text-ink-50">
                Mi CV
              </Link>
              <Link
                href={`/${profile.handle}`}
                className="hidden rounded-full border border-white/10 px-3 py-1 font-mono text-[11px] text-foil sm:inline"
              >
                /{profile.handle}
              </Link>
              <LogoutButton />
            </>
          ) : (
            <Link href="/auth" className="btn btn-foil ml-1 py-1.5 text-[13px]">
              Entrar
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
