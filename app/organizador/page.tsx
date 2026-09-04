import { redirect } from "next/navigation";
import { AppNav } from "@/components/app-nav";
import { OrganizerPanel } from "@/components/forms/organizer-panel";
import { hasRole } from "@/lib/auth/roles";
import { getSession } from "@/lib/auth/session";
import { checkinsFor, eventsByOrganizer } from "@/lib/store/memory";

export default async function OrganizadorPage() {
  const session = await getSession();
  if (!session) redirect("/auth");
  if (!hasRole(session, "organizer")) {
    return <p className="page-wrap">Entra como organizador-lab para el check-in.</p>;
  }
  const events = eventsByOrganizer(session.profileId).map((e) => ({
    ...e,
    checkins: checkinsFor(e.id),
  }));

  return (
    <div className="page-wrap space-y-8">
      <div>
        <h1 className="font-display text-4xl">Eventos</h1>
        <p className="mt-2 max-w-2xl text-ink-600">
          El check-in reutiliza el mismo handle/QR del CV. Si necesitas integridad,
          usa un grant: no hay sello penal on-chain.
        </p>
      </div>
      <AppNav roles={session.roles} current="/organizador" />
      <OrganizerPanel events={events} />
    </div>
  );
}
