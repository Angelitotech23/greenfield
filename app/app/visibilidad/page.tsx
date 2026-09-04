import { redirect } from "next/navigation";
import { AppNav } from "@/components/app-nav";
import { VisibilityToggles } from "@/components/forms/visibility-toggles";
import { getSession } from "@/lib/auth/session";
import { ownerCv } from "@/lib/store/memory";

export default async function VisibilidadPage() {
  const session = await getSession();
  if (!session) redirect("/auth");
  const cv = ownerCv(session.profileId);
  if (!cv) redirect("/auth");

  return (
    <div className="page-wrap space-y-8">
      <div>
        <h1 className="font-display text-4xl">Visibilidad</h1>
        <p className="mt-2 max-w-2xl text-ink-600">
          Elige qué partes del CV se ven en público. El puente a integridad es un
          interruptor aparte: no incrusta el expediente en el currículum.
        </p>
      </div>
      <AppNav roles={session.roles} current="/app/visibilidad" />
      <VisibilityToggles
        experience={cv.experience}
        education={cv.education}
        skills={cv.skills}
        links={cv.links}
        credentials={cv.credentials}
        integrityLinkEnabled={cv.profile.integrityLinkEnabled}
      />
    </div>
  );
}
