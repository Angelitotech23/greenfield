import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-[#d7cbb3] py-10 text-sm text-[#5c5346]">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 md:flex-row md:justify-between">
        <p>Pasaporte Profesional · CV verificable · LatAm</p>
        <div className="flex gap-4">
          <Link href="/privacidad">Política de privacidad</Link>
          <Link href="/explorar">Directorio</Link>
          <span>Polygon Amoy · EAS</span>
        </div>
      </div>
    </footer>
  );
}
