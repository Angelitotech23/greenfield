import { redirect } from "next/navigation";
import { AppNav } from "@/components/app-nav";
import { ValidatorForm } from "@/components/forms/validator-form";
import { hasRole } from "@/lib/auth/roles";
import { getSession } from "@/lib/auth/session";
import { db } from "@/lib/store/memory";

export default async function ValidadorPage() {
  const session = await getSession();
  if (!session) redirect("/auth");
  if (!hasRole(session, "validator")) {
    return <p>Solo el rol validador carga o borra el vault. Entra como validador-oficial.</p>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-4xl">Vault de integridad</h1>
        <p className="mt-2 max-w-2xl text-[#3d382f]">
          Off-chain, cifrado lógicamente, con plazo y borrado duro. Cero EAS. Una
          requisitoria solo si la fuente es oficial.
        </p>
      </div>
      <AppNav roles={session.roles} current="/validador" />
      <ValidatorForm
        people={db().profiles.map((p) => ({
          id: p.id,
          handle: p.handle,
          name: p.legalName,
        }))}
        vaults={db().vault.map((v) => ({
          profileId: v.profileId,
          handle: db().profiles.find((p) => p.id === v.profileId)?.handle ?? "",
          status: v.status,
          expiresAt: v.expiresAt,
        }))}
        logs={db().logs}
      />
    </div>
  );
}
