import Link from "next/link";
import { searchProfiles } from "@/lib/store/memory";

export default function HomePage() {
  const sample = searchProfiles("").slice(0, 3);

  return (
    <div className="space-y-16">
      <section className="grid items-end gap-10 md:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-[#9a7420]">
            LatAm · identidad profesional
          </p>
          <h1 className="font-display mt-3 text-5xl leading-[1.05] md:text-7xl">
            Tu CV, con sellos que no puedes editar tú.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#3d382f]">
            Te conocen en la calle o en una charla, te muestran un QR, y abres su
            currículum. Lo verde lo firmó una universidad o una empresa en Polygon.
            Lo penal no está aquí ni en la cadena.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/auth" className="bg-[#12100c] px-5 py-3 text-[#f4efe3]">
              Crear mi pasaporte
            </Link>
            <Link href="/explorar" className="border border-[#12100c] px-5 py-3">
              Buscar profesionales
            </Link>
            <Link href="/pablo" className="px-5 py-3 underline">
              Ver el CV de Pablo
            </Link>
          </div>
        </div>
        <aside className="paper-card p-6">
          <p className="text-xs uppercase tracking-[0.18em] text-[#7a7366]">Semáforo</p>
          <ul className="mt-4 space-y-4 text-sm">
            <li>
              <strong>Blanco</strong> — lo declaró el titular. Editable.
            </li>
            <li>
              <strong>Amarillo</strong> — DataCamp, Microsoft, Coursera u otra API Web2.
            </li>
            <li>
              <strong>Verde</strong> — atestación EAS on-chain. Inmutable.
            </li>
          </ul>
          <p className="mt-6 text-xs text-[#7a7366]">
            Antecedentes: otra sección, off-chain, borrable. Nunca un token penal.
          </p>
        </aside>
      </section>

      <section>
        <div className="flex items-end justify-between">
          <h2 className="font-display text-3xl">Algunos pasaportes</h2>
          <Link href="/explorar" className="text-sm underline">
            Directorio completo
          </Link>
        </div>
        <ul className="mt-6 grid gap-4 md:grid-cols-3">
          {sample.map((p) => (
            <li key={p.id} className="paper-card p-5">
              <p className="text-xs text-[#7a7366]">/{p.handle}</p>
              <h3 className="font-display mt-1 text-2xl">{p.legalName}</h3>
              <p className="mt-2 text-sm text-[#3d382f]">{p.displayHeadline}</p>
              <Link href={`/${p.handle}`} className="mt-4 inline-block text-sm underline">
                Abrir CV
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
