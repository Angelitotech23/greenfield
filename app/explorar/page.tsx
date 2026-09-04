import Link from "next/link";
import { searchProfiles } from "@/lib/store/memory";

export default async function ExplorarPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  const results = searchProfiles(q);

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-[#9a7420]">Directorio</p>
        <h1 className="font-display mt-2 text-4xl">Buscar profesionales</h1>
        <p className="mt-2 max-w-xl text-[#3d382f]">
          Nombre, handle, skill o emisor. Un directorio de profesionales,
          sin feed ni solicitudes de conexión.
        </p>
      </div>
      <form className="flex gap-2">
        <input
          name="q"
          defaultValue={q}
          placeholder="pablo, SQL, UMSA…"
          className="flex-1 border border-[#d7cbb3] bg-white px-3 py-2"
        />
        <button className="bg-[#12100c] px-4 py-2 text-[#f4efe3]">Buscar</button>
      </form>
      <ul className="grid gap-4 md:grid-cols-2">
        {results.map((p) => (
          <li key={p.id} className="paper-card p-5">
            <p className="text-xs text-[#7a7366]">/{p.handle}</p>
            <h2 className="font-display text-2xl">{p.legalName}</h2>
            <p className="mt-1 text-sm">{p.displayHeadline}</p>
            <p className="mt-3 line-clamp-2 text-sm text-[#5c5346]">{p.bio}</p>
            <Link href={`/${p.handle}`} className="mt-4 inline-block text-sm underline">
              Ver currículum
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
