"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function GrantForm() {
  const router = useRouter();
  const [label, setLabel] = useState("Revisión puntual");
  const [days, setDays] = useState(7);
  const [singleUse, setSingleUse] = useState(true);
  const [msg, setMsg] = useState("");

  return (
    <form
      className="paper-card max-w-lg space-y-3 p-5"
      onSubmit={async (e) => {
        e.preventDefault();
        const res = await fetch("/api/integridad/grant", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ label, days, singleUse }),
        });
        const json = await res.json();
        setMsg(json.message ?? json.error);
        router.refresh();
      }}
    >
      <input
        className="w-full border border-[#d7cbb3] px-3 py-2"
        value={label}
        onChange={(e) => setLabel(e.target.value)}
      />
      <label className="block text-sm">
        Días de validez
        <input
          type="number"
          className="mt-1 w-full border border-[#d7cbb3] px-3 py-2"
          value={days}
          onChange={(e) => setDays(Number(e.target.value))}
        />
      </label>
      <label className="flex gap-2 text-sm">
        <input type="checkbox" checked={singleUse} onChange={(e) => setSingleUse(e.target.checked)} />
        Un solo uso
      </label>
      <button className="bg-[#12100c] px-4 py-2 text-[#f4efe3]">Crear grant</button>
      <button
        type="button"
        className="ml-2 underline"
        onClick={async () => {
          const res = await fetch("/api/integridad/forget", { method: "POST" });
          const json = await res.json();
          setMsg(json.message ?? json.error);
          router.refresh();
        }}
      >
        Pedir olvido (borrar vault)
      </button>
      {msg && <p className="text-sm">{msg}</p>}
    </form>
  );
}
