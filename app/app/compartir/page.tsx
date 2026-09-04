import { redirect } from "next/navigation";
import { AppNav } from "@/components/app-nav";
import { ShareCard } from "@/components/share-card";
import { getSession } from "@/lib/auth/session";
import { getProfileById } from "@/lib/store/memory";
import { appUrl } from "@/lib/utils";

export default async function CompartirPage() {
  const session = await getSession();
  if (!session) redirect("/auth");
  const profile = getProfileById(session.profileId);
  if (!profile) redirect("/auth");
  const url = `${appUrl()}/${profile.handle}`;

  return (
    <div className="page-wrap space-y-8">
      <div>
        <h1 className="font-display text-4xl">Tarjeta de presentación</h1>
        <p className="mt-2 max-w-2xl text-ink-600">
          En la calle, en una reunión o en un evento: acercas el QR, el enlace o la
          tarjeta NFC. El otro abre tu CV en el navegador, sin app ni wallet.
        </p>
      </div>
      <AppNav roles={session.roles} current="/app/compartir" />
      <ShareCard url={url} handle={profile.handle} name={profile.legalName} />
    </div>
  );
}
