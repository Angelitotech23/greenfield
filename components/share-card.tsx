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
    const nfc = (navigator as Navigator & { nfc?: unknown }).nfc;
    const nav = navigator as Navigator & {
      nfc?: unknown;
    };
    // Web NFC is on NDEFReader
    const ctor = (window as unknown as { NDEFReader?: new () => { write: (x: unknown) => Promise<void> } })
      .NDEFReader;
    if (!ctor) {
      setNfcMsg(
        "Este navegador no tiene Web NFC (suele estar en Chrome Android). Graba la misma URL como registro NDEF de tipo URL con cualquier app de etiquetas.",
      );
      return;
    }
    try {
      const reader = new ctor();
      await reader.write({ records: [{ recordType: "url", data: url }] });
      setNfcMsg("Tarjeta NFC escrita. Al acercarla se abre el CV.");
    } catch {
      setNfcMsg("No se pudo escribir. Acerca una etiqueta vacía e inténtalo de nuevo.");
    }
    void nfc;
    void nav;
  }

  return (
    <div className="grid gap-8 md:grid-cols-[280px_1fr]">
      <div className="paper-card flex flex-col items-center p-6">
        <QRCodeSVG value={url} size={220} bgColor="#fffaf0" fgColor="#12100c" />
        <p className="mt-4 font-display text-xl">{name}</p>
        <p className="text-sm text-[#7a7366]">/{handle}</p>
      </div>
      <div className="space-y-4">
        <div className="paper-card p-5">
          <p className="text-xs uppercase tracking-[0.16em] text-[#7a7366]">Enlace</p>
          <p className="mt-2 break-all font-mono text-sm">{url}</p>
          <button onClick={copy} className="mt-3 bg-[#12100c] px-4 py-2 text-[#f4efe3]">
            {copied ? "Copiado" : "Copiar enlace"}
          </button>
        </div>
        <div className="paper-card p-5">
          <p className="text-xs uppercase tracking-[0.16em] text-[#7a7366]">NFC</p>
          <p className="mt-2 text-sm text-[#3d382f]">
            Escribe la misma URL en una tarjeta NDEF. Quien la acerque abre tu
            currículum.
          </p>
          <button onClick={writeNfc} className="mt-3 border border-[#12100c] px-4 py-2">
            Escribir etiqueta (Web NFC)
          </button>
          {nfcMsg && <p className="mt-3 text-sm">{nfcMsg}</p>}
        </div>
      </div>
    </div>
  );
}
