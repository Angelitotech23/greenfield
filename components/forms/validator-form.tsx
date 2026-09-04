"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { IntegrityLog, IntegrityStatus } from "@/lib/types";

export function ValidatorForm({
  people,
  vaults,
  logs,
}: {
  people: { id: string; handle: string; name: string }[];
  vaults: { profileId: string; handle: string; status: IntegrityStatus; expiresAt: string }[];
  logs: IntegrityLog[];
}) {
  const router = useRouter();
  const [profileId, setProfileId] = useState(people[0]?.id ?? "");
  const [status, setStatus] = useState<IntegrityStatus>("clear");
  const [source, setSource] = useState("Entidad habilitada (sandbox)");
  const [summary, setSummary] = useState("");
  const [expiresAt, setExpiresAt] = useState("2027-12-31");
  const [msg, setMsg] = useState("");

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <form
        className="paper-card space-y-3 p-5"
        onSubmit={async (e) => {
          e.preventDefault();
          const res = await fetch("/api/validador/vault", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ profileId, status, officialSource: source, summary, expiresAt }),
          });
          const json = await res.json();
          setMsg(json.message ?? json.error);
          router.refresh();
        }}
      >
        <h2 className="font-display text-xl">Cargar resultado</h2>
        <select className="w-full border border-[#d7cbb3] px-3 py-2" value={profileId} onChange={(e) => setProfileId(e.target.value)}>
          {people.map((p) => (
            <option key={p.id} value={p.id}>
              /{p.handle}
            </option>
          ))}
        </select>
        <select className="w-full border border-[#d7cbb3] px-3 py-2" value={status} onChange={(e) => setStatus(e.target.value as IntegrityStatus)}>
          <option value="clear">Sin registros vigentes</option>
          <option value="record">Registro según fuente oficial</option>
          <option value="warrant">Requisitoria (solo fuente oficial)</option>
          <option value="pending">Pendiente</option>
        </select>
        <input className="w-full border border-[#d7cbb3] px-3 py-2" value={source} onChange={(e) => setSource(e.target.value)} />
        <textarea className="w-full border border-[#d7cbb3] px-3 py-2" rows={3} placeholder="Resumen (nunca va a Polygon)" value={summary} onChange={(e) => setSummary(e.target.value)} />
        <input type="date" className="w-full border border-[#d7cbb3] px-3 py-2" value={expiresAt} onChange={(e) => setExpiresAt(e.target.value)} />
        <button className="bg-[#12100c] px-4 py-2 text-[#f4efe3]">Guardar en vault</button>
      </form>
      <div className="space-y-4">
        <div className="paper-card p-5">
          <h2 className="font-display text-xl">Registros vivos</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {vaults.map((v) => (
              <li key={v.profileId} className="flex justify-between gap-2">
                <span>
                  /{v.handle} · {v.status}
                </span>
                <button
                  className="underline"
                  onClick={async () => {
                    await fetch("/api/validador/vault", {
                      method: "DELETE",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ profileId: v.profileId }),
                    });
                    router.refresh();
                  }}
                >
                  Borrar
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="paper-card p-5">
          <h2 className="font-display text-xl">Auditoría de lecturas</h2>
          <ul className="mt-3 space-y-1 text-xs">
            {logs.map((l) => (
              <li key={l.id}>
                {l.viewedAt} · {l.viewerLabel}
              </li>
            ))}
            {logs.length === 0 && <li>Nadie ha abierto un grant todavía.</li>}
          </ul>
        </div>
        {msg && <p className="text-sm">{msg}</p>}
      </div>
    </div>
  );
}
