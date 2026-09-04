"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const demos = [
  { label: "Pablo (usuario + emisor)", email: "pablo@saipit.example" },
  { label: "María (Web2 amarillo)", email: "maria@example.com" },
  { label: "Luis (solo declarado)", email: "luis@example.com" },
  { label: "UMSA (emisor)", email: "registro@umsa.example" },
  { label: "Validador de integridad", email: "integridad@example.com" },
  { label: "Organizador", email: "eventos@andes.example" },
];

export default function AuthPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [wallet, setWallet] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function login(body: { email?: string; walletAddress?: string; name?: string }) {
    setBusy(true);
    setError("");
    const res = await fetch("/api/auth/demo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      setError("No se pudo entrar.");
      setBusy(false);
      return;
    }
    router.push("/app");
    router.refresh();
  }

  return (
    <div className="mx-auto max-w-xl space-y-8">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-[#9a7420]">Login híbrido</p>
        <h1 className="font-display mt-2 text-4xl">Entra con correo o wallet</h1>
        <p className="mt-3 text-[#3d382f]">
          En producción esto lo cubre Privy (Google, email y MetaMask) y crea una
          embedded wallet para quien viene de Web2. Aquí el modo demo simula ambas
          puertas y deja una sesión.
        </p>
      </div>

      <form
        className="paper-card space-y-3 p-6"
        onSubmit={(e) => {
          e.preventDefault();
          void login({ email, name: email.split("@")[0] });
        }}
      >
        <label className="block text-sm">
          Correo
          <input
            className="mt-1 w-full border border-[#d7cbb3] bg-white px-3 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@correo.com"
            type="email"
            required
          />
        </label>
        <button disabled={busy} className="bg-[#12100c] px-4 py-2 text-[#f4efe3]">
          Entrar con correo
        </button>
      </form>

      <form
        className="paper-card space-y-3 p-6"
        onSubmit={(e) => {
          e.preventDefault();
          void login({ walletAddress: wallet, name: "Wallet" });
        }}
      >
        <label className="block text-sm">
          Dirección de billetera (demo / WalletConnect)
          <input
            className="mt-1 w-full border border-[#d7cbb3] bg-white px-3 py-2 font-mono text-sm"
            value={wallet}
            onChange={(e) => setWallet(e.target.value)}
            placeholder="0x…"
            required
          />
        </label>
        <button disabled={busy} className="border border-[#12100c] px-4 py-2">
          Firmar y entrar
        </button>
      </form>

      <div>
        <p className="text-sm text-[#7a7366]">Cuentas de demostración</p>
        <ul className="mt-2 grid gap-2">
          {demos.map((d) => (
            <li key={d.email}>
              <button
                type="button"
                className="w-full border border-[#d7cbb3] px-3 py-2 text-left text-sm hover:bg-[#fffaf0]"
                onClick={() => void login({ email: d.email })}
              >
                {d.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
      {error && <p className="text-sm text-red-700">{error}</p>}
    </div>
  );
}
