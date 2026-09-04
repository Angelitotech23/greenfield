import { redirect } from "next/navigation";
import { AppNav } from "@/components/app-nav";
import { IssuerForm } from "@/components/forms/issuer-form";
import { getSession } from "@/lib/auth/session";
import { hasRole } from "@/lib/auth/roles";
import { db, issuersFor } from "@/lib/store/memory";

export default async function IssuerPage() {
  const session = await getSession();
  if (!session) redirect("/auth");
  if (!hasRole(session, "issuer")) {
    return (
      <p className="page-wrap">Esta cuenta no es emisora. Entra como UMSA o Pablo (Team Saipit).</p>
    );
  }
  const issuers = issuersFor(session.profileId);
  const people = db().profiles.filter((p) => p.kycStatus !== "none" || true);

  return (
    <div className="page-wrap space-y-8">
      <div>
        <h1 className="font-display text-4xl">Panel de emisores</h1>
        <p className="mt-2 max-w-2xl text-ink-600">
          Firmas títulos, empleo o representación de marca. Eso sí va a EAS. Aquí
          no existe un botón de antecedentes.
        </p>
      </div>
      <AppNav roles={session.roles} current="/issuer" />
      <IssuerForm
        issuers={issuers}
        people={people.map((p) => ({ id: p.id, handle: p.handle, name: p.legalName }))}
        credentials={db()
          .credentials.filter((c) => issuers.some((i) => i.id === c.issuerId))
          .map((c) => ({
            id: c.id,
            title: c.title,
            handle: db().profiles.find((p) => p.id === c.profileId)?.handle ?? "",
            revoked: Boolean(c.revokedAt),
          }))}
      />
    </div>
  );
}
