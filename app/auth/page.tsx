"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const demos = [
  { label: "Pablo — titular y emisor", email: "pablo@saipit.example" },
  { label: "María — sellos Web2", email: "maria@example.com" },
  { label: "Luis — solo declarado", email: "luis@example.com" },
  { label: "UMSA — emisor académico", email: "registro@umsa.example" },
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
    <div className="page-wrap">
      <div className="mx-auto grid max-w-4xl gap-12 md:grid-cols-2">
        <div>
          <p className="kicker">Acceso</p>
          <h1 className="font-display mt-3 text-4xl font-semibold md:text-5xl">
            Correo o wallet.
            <br />
            Mismo perfil.
          </h1>
          <p className="mt-4 leading-relaxed text-ink-600">
            En producción entra Privy. Aquí el modo demo deja sesión al instante.
          </p>
        </div>
        <div className="space-y-4">
          <form
            className="paper-card space-y-3 rounded-2xl p-6"
            onSubmit={(e) => {
              e.preventDefault();
              void login({ email, name: email.split("@")[0] });
            }}
          >
            <label className="block text-sm text-ink-600">
              Correo
              <input className="field" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tu@correo.com" type="email" required />
            </label>
            <button disabled={busy} className="btn btn-foil">
              Continuar
            </button>
          </form>
          <form
            className="paper-card space-y-3 rounded-2xl p-6"
            onSubmit={(e) => {
              e.preventDefault();
              void login({ walletAddress: wallet, name: "Wallet" });
            }}
          >
            <label className="block text-sm text-ink-600">
              Wallet
              <input className="field font-mono" value={wallet} onChange={(e) => setWallet(e.target.value)} placeholder="0x…" required />
            </label>
            <button disabled={busy} className="btn btn-ghost">
              Firmar
            </button>
          </form>
          <ul className="grid gap-2">
            {demos.map((d) => (
              <li key={d.email}>
                <button
                  type="button"
                  className="w-full rounded-xl border border-white/10 px-3 py-2.5 text-left text-sm hover:border-foil/50"
                  onClick={() => void login({ email: d.email })}
                >
                  {d.label}
                </button>
              </li>
            ))}
          </ul>
          {error && <p className="text-sm text-foil">{error}</p>}
        </div>
      </div>
    </div>
  );
}
