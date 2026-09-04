import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/5">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 md:flex-row md:items-center md:justify-between">
        <p className="font-display text-lg">Pasaporte</p>
        <div className="flex flex-wrap gap-5 text-sm text-ink-600">
          <Link href="/privacidad" className="hover:text-foil">
            Privacidad
          </Link>
          <Link href="/explorar" className="hover:text-foil">
            Directorio
          </Link>
          <span>Polygon · EAS</span>
        </div>
      </div>
    </footer>
  );
}
