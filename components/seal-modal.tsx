"use client";

import { useState } from "react";
import type { AttestationPreview } from "@/lib/eas/client";
import { TrafficLight } from "@/components/traffic-light";

export function SealButton({
  easUid,
  title,
}: {
  easUid: string;
  title: string;
}) {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<AttestationPreview | null>(null);
  const [loading, setLoading] = useState(false);

  async function verify() {
    setOpen(true);
    setLoading(true);
    const res = await fetch(`/api/eas/read?uid=${encodeURIComponent(easUid)}`);
    const json = (await res.json()) as AttestationPreview;
    setData(json);
    setLoading(false);
  }

  return (
    <>
      <button
        type="button"
        onClick={verify}
        className="text-left text-sm underline decoration-[#2f9e6b] underline-offset-4"
      >
        Verificar sello
      </button>
      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-[#12100c]/50 p-4 md:items-center">
          <div className="paper-card w-full max-w-lg p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-[#7a7366]">
                  Consulta en vivo
                </p>
                <h3 className="font-display mt-1 text-2xl">{title}</h3>
              </div>
              <button type="button" onClick={() => setOpen(false)} className="text-sm">
                Cerrar
              </button>
            </div>
            <div className="mt-4">
              <TrafficLight level="onchain" />
            </div>
            {loading && <p className="mt-4 text-sm">Consultando EAS…</p>}
            {data && (
              <dl className="mt-5 space-y-2 text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="text-[#7a7366]">Estado</dt>
                  <dd>
                    {data.revoked ? "Revocado" : data.expired ? "Expirado" : "Válido"}
                    {data.demo ? " (relayer demo)" : ""}
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-[#7a7366]">UID</dt>
                  <dd className="break-all text-right font-mono text-xs">{data.uid}</dd>
                </div>
                <a
                  href={data.explorerUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-block text-[#2f9e6b] underline"
                >
                  Abrir en EAS Scan
                </a>
                <p className="pt-3 text-xs text-[#7a7366]">
                  Este sello es aditivo (título, empleo o certificado). No contiene
                  antecedentes penales.
                </p>
              </dl>
            )}
          </div>
        </div>
      )}
    </>
  );
}
