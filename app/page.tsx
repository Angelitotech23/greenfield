import Link from "next/link";
import { searchProfiles } from "@/lib/store/memory";

export default function HomePage() {
  const sample = searchProfiles("").slice(0, 3);
  const featured = sample[0];

  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -right-24 top-0 h-[520px] w-[520px] rounded-full bg-foil/10 blur-3xl" />
        <div className="page-wrap grid items-center gap-12 !pt-10 md:grid-cols-[1.2fr_0.8fr] md:!pt-16">
          <div className="rise">
            <p className="kicker">Identidad profesional · LatAm</p>
            <h1 className="font-display mt-5 text-[3rem] font-semibold leading-[0.95] tracking-tight md:text-[5.5rem]">
              Tu CV.
              <br />
              Firmado.
              <br />
              <span className="text-foil">Inalterable.</span>
            </h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-600">
              Alguien te conoce. Escanea. Ve tu currículum. Lo verde lo firmó una
              universidad o una empresa en la cadena. Lo penal no está aquí.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/auth" className="btn btn-foil">
                Crear perfil
              </Link>
              <Link href="/explorar" className="btn btn-ghost">
                Explorar
              </Link>
              <Link href="/pablo" className="btn text-ink-600 hover:text-foil">
                Ver ejemplo
              </Link>
            </div>
          </div>

          {featured && (
            <Link href={`/${featured.handle}`} className="group relative rise block">
              <div className="absolute -inset-1 rounded-[1.75rem] bg-gradient-to-br from-foil/40 to-transparent opacity-40 blur-md transition group-hover:opacity-70" />
              <article className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#111]">
                {featured.avatarUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={featured.avatarUrl}
                    alt=""
                    className="h-[420px] w-full object-cover"
                  />
                ) : null}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                <div className="absolute bottom-0 p-6">
                  <p className="font-mono text-[11px] text-foil">/{featured.handle}</p>
                  <h2 className="font-display mt-1 text-3xl">{featured.legalName}</h2>
                  <p className="mt-1 text-sm text-ink-50/70">{featured.displayHeadline}</p>
                </div>
              </article>
            </Link>
          )}
        </div>
      </section>

      <section className="page-wrap space-y-14 !pt-4">
        <div className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/5 md:grid-cols-3">
          {[
            { t: "Declarado", d: "Lo escribiste tú. Se puede editar." },
            { t: "Web2", d: "Validado por el emisor original." },
            { t: "On-chain", d: "Firmado en Polygon. No se toca." },
          ].map((item, i) => (
            <article key={item.t} className="bg-[#0a0a0a] p-7">
              <span className="visa-stamp text-foil">{String(i + 1).padStart(2, "0")} {item.t}</span>
              <p className="mt-4 text-sm leading-relaxed text-ink-600">{item.d}</p>
            </article>
          ))}
        </div>

        <div>
          <div className="flex items-end justify-between">
            <h2 className="font-display text-3xl md:text-4xl">En el directorio</h2>
            <Link href="/explorar" className="text-sm text-foil hover:underline">
              Ver todos
            </Link>
          </div>
          <ul className="mt-8 grid gap-4 sm:grid-cols-3">
            {sample.map((p) => (
              <li key={p.id}>
                <Link href={`/${p.handle}`} className="group block overflow-hidden rounded-2xl border border-white/10">
                  {p.avatarUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={p.avatarUrl} alt="" className="h-48 w-full object-cover transition duration-500 group-hover:scale-105" />
                  ) : (
                    <div className="flex h-48 items-center justify-center bg-[#141414] font-display text-4xl text-foil">
                      {p.legalName.slice(0, 1)}
                    </div>
                  )}
                  <div className="p-4">
                    <p className="font-mono text-[10px] text-foil">/{p.handle}</p>
                    <h3 className="font-display mt-1 text-xl">{p.legalName}</h3>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
