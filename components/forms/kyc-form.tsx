"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { KycStatus } from "@/lib/types";

export function KycForm({
  legalName,
  locked,
  status,
  sbtTokenId,
}: {
  legalName: string;
  locked: boolean;
  status: KycStatus;
  sbtTokenId: string | null;
}) {
  const router = useRouter();
  const [name, setName] = useState(legalName);
  const [subjectId, setSubjectId] = useState("");
  const [liveness, setLiveness] = useState(false);
  const [msg, setMsg] = useState("");

  return (
    <form
      className="paper-card max-w-xl space-y-4 p-6"
      onSubmit={async (e) => {
        e.preventDefault();
        const res = await fetch("/api/kyc", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ legalName: name, subjectId, liveness }),
        });
        const json = await res.json();
        setMsg(json.message ?? json.error ?? "");
        router.refresh();
      }}
    >
      <p className="text-sm">
        Estado: <strong>{status}</strong>
        {sbtTokenId ? ` · SBT #${sbtTokenId}` : ""}
      </p>
      <label className="block text-sm">
        Nombre legal
        <input
          disabled={locked}
          className="mt-1 w-full border border-[#d7cbb3] px-3 py-2 disabled:bg-[#efe7d6]"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      <label className="block text-sm">
        ID de sujeto (Sumsub applicant o demo: usa el mismo valor para simular un clon)
        <input
          className="mt-1 w-full border border-[#d7cbb3] px-3 py-2"
          value={subjectId}
          onChange={(e) => setSubjectId(e.target.value)}
          placeholder="pablo_mendoza_demo"
          required
        />
      </label>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" checked={liveness} onChange={(e) => setLiveness(e.target.checked)} />
        Liveness check completado (demo / widget Sumsub)
      </label>
      <p className="text-xs text-[#7a7366]">
        Para probar el rechazo: entra como Luis e intenta el subject{" "}
        <code>pablo_mendoza_demo</code>.
      </p>
      <button disabled={locked && status === "approved"} className="bg-[#12100c] px-4 py-2 text-[#f4efe3]">
        Enviar verificación
      </button>
      {msg && <p className="text-sm">{msg}</p>}
    </form>
  );
}
