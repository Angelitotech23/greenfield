import { redirect } from "next/navigation";
import { AppNav } from "@/components/app-nav";
import { TrafficLight } from "@/components/traffic-light";
import { getSession } from "@/lib/auth/session";
import { ownerCv } from "@/lib/store/memory";
import { ProfileEditor } from "@/components/forms/profile-editor";

export default async function AppHome() {
  const session = await getSession();
  if (!session) redirect("/auth");
  const cv = ownerCv(session.profileId);
  if (!cv) redirect("/auth");

  return (
    <div className="page-wrap space-y-8">
      <div>
        <p className="kicker">Panel del titular</p>
        <h1 className="font-display mt-2 text-4xl">Editar tu CV</h1>
        <p className="mt-2 max-w-2xl text-ink-600">
          Foto, titular, bio, skills y lo declarado se pueden cambiar. El nombre
          legal y lo firmado on-chain están bloqueados.
        </p>
      </div>
      <AppNav roles={session.roles} current="/app" />
      <div className="flex flex-wrap gap-3 text-sm">
        <span>KYC: {cv.profile.kycStatus}</span>
        {cv.profile.sbtTokenId && <span>SBT #{cv.profile.sbtTokenId}</span>}
        {cv.profile.legalNameLocked && (
          <span className="stamp border-[#2f9e6b] px-2 text-[#2f9e6b]">Nombre legal bloqueado</span>
        )}
      </div>
      <ProfileEditor profile={cv.profile} />
      <section className="space-y-3">
        <h2 className="font-display text-2xl">Lo que ya está en el CV</h2>
        <ul className="space-y-2 text-sm">
          {cv.experience.map((e) => (
            <li key={e.id} className="flex flex-wrap items-center gap-2">
              {e.title} · {e.company} {e.locked && "(bloqueado)"}
              <TrafficLight level={e.trustLevel} compact />
            </li>
          ))}
          {cv.education.map((e) => (
            <li key={e.id} className="flex flex-wrap items-center gap-2">
              {e.school} {e.locked && "(bloqueado)"}
              <TrafficLight level={e.trustLevel} compact />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
