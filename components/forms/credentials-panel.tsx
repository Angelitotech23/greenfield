"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function CredentialsPanel() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [issuerName, setIssuerName] = useState("");
  const [provider, setProvider] = useState("datacamp");
  const [externalId, setExternalId] = useState("");
  const [msg, setMsg] = useState("");

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <form
        className="paper-card space-y-3 p-5"
        onSubmit={async (e) => {
          e.preventDefault();
          const res = await fetch("/api/profile", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              addCredential: { title, issuerName, credentialType: "other" },
            }),
          });
          setMsg(res.ok ? "Declarada (blanco)." : "Error");
          router.refresh();
        }}
      >
        <h2 className="font-display text-xl">Declarar certificado</h2>
        <input
          className="w-full border border-[#d7cbb3] px-3 py-2"
          placeholder="Nombre"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          className="w-full border border-[#d7cbb3] px-3 py-2"
          placeholder="Emisor (aún no firma)"
          value={issuerName}
          onChange={(e) => setIssuerName(e.target.value)}
          required
        />
        <button className="bg-[#12100c] px-4 py-2 text-[#f4efe3]">Añadir en blanco</button>
      </form>

      <form
        className="paper-card space-y-3 p-5"
        onSubmit={async (e) => {
          e.preventDefault();
          const res = await fetch("/api/web2/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ provider, externalId }),
          });
          const json = await res.json();
          setMsg(json.message ?? json.error ?? "");
          router.refresh();
        }}
      >
        <h2 className="font-display text-xl">Vincular ID Web2</h2>
        <select
          className="w-full border border-[#d7cbb3] px-3 py-2"
          value={provider}
          onChange={(e) => setProvider(e.target.value)}
        >
          <option value="datacamp">DataCamp (DC-12345)</option>
          <option value="microsoft">Microsoft Learn (MS-AZ900-…)</option>
          <option value="coursera">Coursera</option>
        </select>
        <input
          className="w-full border border-[#d7cbb3] px-3 py-2"
          placeholder="ID de credencial"
          value={externalId}
          onChange={(e) => setExternalId(e.target.value)}
          required
        />
        <button className="border border-[#12100c] px-4 py-2">Verificar (amarillo)</button>
      </form>
      {msg && <p className="text-sm md:col-span-2">{msg}</p>}
    </div>
  );
}
