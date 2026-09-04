import Link from "next/link";
import { PageIntro } from "@/components/page-intro";
import { searchProfiles } from "@/lib/store/memory";

export default async function ExplorarPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  const results = searchProfiles(q);

  return (
    <div className="page-wrap space-y-10">
      <PageIntro kicker="Directorio" title="Personas verificables">
        Busca por nombre, handle, oficio o emisor.
      </PageIntro>
      <form className="flex gap-2">
        <input name="q" defaultValue={q} placeholder="pablo, SQL, UMSA…" className="field flex-1 !mt-0" />
        <button className="btn btn-foil">Buscar</button>
      </form>
      <ul className="grid gap-4 sm:grid-cols-2">
        {results.map((p) => (
          <li key={p.id}>
            <Link href={`/${p.handle}`} className="group flex overflow-hidden rounded-2xl border border-white/10">
              {p.avatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={p.avatarUrl} alt="" className="h-32 w-28 object-cover transition duration-500 group-hover:scale-105" />
              ) : (
                <div className="flex h-32 w-28 items-center justify-center bg-[#141414] font-display text-3xl text-foil">
                  {p.legalName.slice(0, 1)}
                </div>
              )}
              <div className="min-w-0 p-4">
                <p className="font-mono text-[10px] text-foil">/{p.handle}</p>
                <h2 className="font-display text-2xl leading-tight">{p.legalName}</h2>
                <p className="mt-1 line-clamp-2 text-sm text-ink-600">{p.displayHeadline}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
