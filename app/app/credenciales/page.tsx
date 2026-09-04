import { redirect } from "next/navigation";
import { AppNav } from "@/components/app-nav";
import { TrafficLight } from "@/components/traffic-light";
import { getSession } from "@/lib/auth/session";
import { ownerCv } from "@/lib/store/memory";
import { CredentialsPanel } from "@/components/forms/credentials-panel";

export default async function CredencialesPage() {
  const session = await getSession();
  if (!session) redirect("/auth");
  const cv = ownerCv(session.profileId);
  if (!cv) redirect("/auth");

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-4xl">Credenciales</h1>
        <p className="mt-2 max-w-2xl text-[#3d382f]">
          Declara un certificado (blanco), vincula un ID Web2 (amarillo) o espera la
          firma de un emisor (verde). Tú no puedes pintar de verde lo tuyo.
        </p>
      </div>
      <AppNav roles={session.roles} current="/app/credenciales" />
      <ul className="space-y-3">
        {cv.credentials.map((c) => (
          <li key={c.id} className="paper-card flex flex-wrap items-center justify-between gap-3 p-4">
            <div>
              <p className="font-medium">{c.title}</p>
              <p className="text-sm text-[#7a7366]">{c.issuerName}</p>
            </div>
            <TrafficLight level={c.trustLevel} compact />
          </li>
        ))}
      </ul>
      <CredentialsPanel />
    </div>
  );
}
