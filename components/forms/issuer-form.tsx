"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Issuer } from "@/lib/types";

export function IssuerForm({
  issuers,
  people,
  credentials,
}: {
  issuers: Issuer[];
  people: { id: string; handle: string; name: string }[];
  credentials: { id: string; title: string; handle: string; revoked: boolean }[];
}) {
  const router = useRouter();
  const [issuerId, setIssuerId] = useState(issuers[0]?.id ?? "");
  const [profileId, setProfileId] = useState(people[0]?.id ?? "");
  const [title, setTitle] = useState("");
  const [type, setType] = useState("academic");
  const [msg, setMsg] = useState("");

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <form
        className="paper-card space-y-3 p-5"
        onSubmit={async (e) => {
          e.preventDefault();
          const res = await fetch("/api/issuer/attest", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ issuerId, profileId, title, credentialType: type }),
          });
          const json = await res.json();
          setMsg(json.message ?? json.error);
          router.refresh();
        }}
      >
        <h2 className="font-display text-xl">Emitir sello verde</h2>
        <select className="w-full border border-[#d7cbb3] px-3 py-2" value={issuerId} onChange={(e) => setIssuerId(e.target.value)}>
          {issuers.map((i) => (
            <option key={i.id} value={i.id}>
              {i.name}
            </option>
          ))}
        </select>
        <select className="w-full border border-[#d7cbb3] px-3 py-2" value={profileId} onChange={(e) => setProfileId(e.target.value)}>
          {people.map((p) => (
            <option key={p.id} value={p.id}>
              /{p.handle} · {p.name}
            </option>
          ))}
        </select>
        <select className="w-full border border-[#d7cbb3] px-3 py-2" value={type} onChange={(e) => setType(e.target.value)}>
          <option value="academic">Título académico</option>
          <option value="employment">Constancia laboral</option>
          <option value="brand">Representación de marca</option>
        </select>
        <input className="w-full border border-[#d7cbb3] px-3 py-2" placeholder="Título de la credencial" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <button className="bg-[#12100c] px-4 py-2 text-[#f4efe3]">Firmar atestación</button>
      </form>
      <div className="paper-card p-5">
        <h2 className="font-display text-xl">Revocar</h2>
        <ul className="mt-3 space-y-2 text-sm">
          {credentials.map((c) => (
            <li key={c.id} className="flex items-center justify-between gap-2">
              <span>
                {c.title} · /{c.handle} {c.revoked && "(revocada)"}
              </span>
              {!c.revoked && (
                <button
                  className="underline"
                  onClick={async () => {
                    await fetch("/api/issuer/revoke", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ credentialId: c.id, issuerId }),
                    });
                    router.refresh();
                  }}
                >
                  Revocar
                </button>
              )}
            </li>
          ))}
        </ul>
        {msg && <p className="mt-4 text-sm">{msg}</p>}
      </div>
    </div>
  );
}
