"use client";

import { useState } from "react";
import type { IntegrityStatus } from "@/lib/types";

const labels: Record<IntegrityStatus, string> = {
  clear: "Sin registros penales vigentes según la fuente oficial",
  record: "Hay un registro según la fuente oficial (detalle no se publica en el CV)",
  warrant: "Requisitoria cargada por autoridad habilitada",
  pending: "Verificación pendiente",
};

export function IntegrityGate({
  token,
  handle,
  hasVault,
}: {
  token: string;
  handle: string;
  hasVault: boolean;
}) {
  const [viewer, setViewer] = useState("");
  const [opened, setOpened] = useState<{
    status: IntegrityStatus;
    officialSource: string;
    summary: string;
    expiresAt: string;
    deleted?: boolean;
  } | null>(null);
  const [error, setError] = useState("");

  async function openVault() {
    const res = await fetch(`/api/integridad/${token}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ viewerLabel: viewer || "visitante" }),
    });
    const json = await res.json();
    if (!res.ok) {
      setError(json.error ?? "Acceso denegado");
      return;
    }
    setOpened(json);
  }

  return (
    <div className="paper-card space-y-4 p-6">
      {!opened ? (
        <>
          <p className="text-sm">
            Identifícate. Quedará un registro de auditoría. El titular puede borrar
            el vault después.
          </p>
          <input
            className="w-full border border-[#d7cbb3] px-3 py-2"
            placeholder="Tu nombre u organización"
            value={viewer}
            onChange={(e) => setViewer(e.target.value)}
          />
          <button onClick={openVault} className="bg-[#12100c] px-4 py-2 text-[#f4efe3]">
            Abrir vault de /{handle}
          </button>
          {!hasVault && (
            <p className="text-sm text-[#7a7366]">
              El grant es válido, pero el validador aún no cargó un resultado (o ya
              se borró).
            </p>
          )}
        </>
      ) : opened.deleted ? (
        <p>El expediente fue borrado. Derecho al olvido cumplido off-chain.</p>
      ) : (
        <div className="space-y-3 text-sm">
          <p className="stamp inline-block border-[#12100c] px-2 py-1">{labels[opened.status]}</p>
          <p>
            <strong>Fuente:</strong> {opened.officialSource}
          </p>
          <p>{opened.summary}</p>
          <p className="text-[#7a7366]">Caduca: {opened.expiresAt}</p>
        </div>
      )}
      {error && <p className="text-sm text-red-700">{error}</p>}
    </div>
  );
}
