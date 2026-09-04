"use client";

import { QRCodeSVG } from "qrcode.react";
import { useState } from "react";

export function ShareCard({
  url,
  handle,
  name,
}: {
  url: string;
  handle: string;
  name: string;
}) {
  const [copied, setCopied] = useState(false);
  const [nfcMsg, setNfcMsg] = useState("");

  async function copy() {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  async function writeNfc() {
    const ctor = (
      window as unknown as {
        NDEFReader?: new () => { write: (x: unknown) => Promise<void> };
      }
    ).NDEFReader;
    if (!ctor) {
      setNfcMsg(
        "Este navegador no tiene Web NFC (suele estar en Chrome Android). Graba la misma URL como registro NDEF de tipo URL.",
      );
      return;
    }
    try {
      const reader = new ctor();
      await reader.write({ records: [{ recordType: "url", data: url }] });
      setNfcMsg("Tarjeta NFC escrita.");
    } catch {
      setNfcMsg("No se pudo escribir. Acerca una etiqueta vacía.");
    }
  }

  return (
    <div className="grid gap-6 md:grid-cols-[280px_1fr]">
      <div className="rounded-3xl border border-white/10 bg-[#111] p-6 text-center">
        <div className="mx-auto inline-block rounded-2xl bg-white p-3">
          <QRCodeSVG value={url} size={200} bgColor="#ffffff" fgColor="#0a0a0a" />
        </div>
        <p className="font-display mt-4 text-2xl">{name}</p>
        <p className="font-mono text-xs text-foil">/{handle}</p>
      </div>
      <div className="space-y-4">
        <div className="paper-card rounded-2xl p-5">
          <p className="kicker">Enlace</p>
          <p className="mt-3 break-all font-mono text-sm text-ink-600">{url}</p>
          <button onClick={copy} className="btn btn-foil mt-4">
            {copied ? "Copiado" : "Copiar"}
          </button>
        </div>
        <div className="paper-card rounded-2xl p-5">
          <p className="kicker">NFC</p>
          <p className="mt-3 text-sm text-ink-600">
            La misma URL en una tarjeta NDEF. Quien la acerque abre tu CV.
          </p>
          <button onClick={writeNfc} className="btn btn-ghost mt-4">
            Escribir etiqueta
          </button>
          {nfcMsg && <p className="mt-3 text-sm text-ink-600">{nfcMsg}</p>}
        </div>
      </div>
    </div>
  );
}
