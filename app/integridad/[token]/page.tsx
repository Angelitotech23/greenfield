import type { Metadata } from "next";
import { IntegrityGate } from "@/components/forms/integrity-gate";
import { readGrant } from "@/lib/store/memory";

export const metadata: Metadata = {
  title: "Verificación de integridad",
  robots: { index: false, follow: false, nocache: true },
};

export default async function IntegridadPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const data = readGrant(token);

  if (!data) {
    return (
      <div className="page-wrap">
        <div className="paper-card max-w-lg p-6">
          <h1 className="font-display text-3xl">Acceso no válido</h1>
          <p className="mt-3 text-sm">
            El enlace expiró, ya se usó o no existe. No hay expediente en la
            blockchain que consultar.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrap mx-auto max-w-xl space-y-4">
      <p className="kicker">
        Sección aparte · no indexable · off-chain
      </p>
      <h1 className="font-display text-4xl">Verificación de integridad</h1>
      <p className="text-sm text-ink-600">
        Esto no es el CV. El currículum de /{data.profile.handle} no incluye este
        contenido. Tampoco Polygon.
      </p>
      <IntegrityGate
        token={token}
        handle={data.profile.handle}
        hasVault={Boolean(data.vault)}
      />
    </div>
  );
}
