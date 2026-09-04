import { redirect } from "next/navigation";
import { AppNav } from "@/components/app-nav";
import { GrantForm } from "@/components/forms/grant-form";
import { getSession } from "@/lib/auth/session";
import { db, getProfileById } from "@/lib/store/memory";
import { appUrl } from "@/lib/utils";

export default async function OwnerIntegrityPage() {
  const session = await getSession();
  if (!session) redirect("/auth");
  const profile = getProfileById(session.profileId);
  if (!profile) redirect("/auth");
  const grants = db().grants.filter((g) => g.profileId === profile.id);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-4xl">Accesos de integridad</h1>
        <p className="mt-2 max-w-2xl text-[#3d382f]">
          Creas un enlace de un solo uso o temporal. No publicamos
          /{profile.handle}/antecedentes. El CV solo redirige si activaste el puente.
        </p>
      </div>
      <AppNav roles={session.roles} current="/app/integridad" />
      <GrantForm />
      <ul className="space-y-2 text-sm">
        {grants.map((g) => (
          <li key={g.id} className="paper-card p-4">
            <p>{g.label}</p>
            <p className="break-all font-mono text-xs">
              {appUrl()}/integridad/{g.token}
            </p>
            <p className="text-[#7a7366]">
              caduca {g.expiresAt}
              {g.usedAt ? ` · usado ${g.usedAt}` : ""}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
