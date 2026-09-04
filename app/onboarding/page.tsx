import { redirect } from "next/navigation";
import { AppNav } from "@/components/app-nav";
import { KycForm } from "@/components/forms/kyc-form";
import { getSession } from "@/lib/auth/session";
import { getProfileById } from "@/lib/store/memory";

export default async function OnboardingPage() {
  const session = await getSession();
  if (!session) redirect("/auth");
  const profile = getProfileById(session.profileId);
  if (!profile) redirect("/auth");

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-4xl">Identidad y anti-clonación</h1>
        <p className="mt-2 max-w-2xl text-[#3d382f]">
          El sistema no guarda tu cara ni el documento. Solo un hash de unicidad. Si
          el mismo sujeto ya tiene otro perfil, se rechaza la segunda cuenta.
        </p>
      </div>
      <AppNav roles={session.roles} current="/onboarding" />
      <KycForm
        legalName={profile.legalName}
        locked={profile.legalNameLocked}
        status={profile.kycStatus}
        sbtTokenId={profile.sbtTokenId}
      />
    </div>
  );
}
