import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CvView } from "@/components/cv-view";
import { db, publicCv } from "@/lib/store/memory";
import { isReservedHandle } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ handle: string }>;
}): Promise<Metadata> {
  const { handle } = await params;
  const cv = publicCv(handle);
  if (!cv) return { title: "Perfil no encontrado" };
  return {
    title: `${cv.profile.legalName} · Pasaporte Profesional`,
    description: cv.profile.displayHeadline,
    robots: { index: true, follow: true },
  };
}

export default async function PublicCvPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  if (isReservedHandle(handle)) notFound();
  const cv = publicCv(handle);
  if (!cv) notFound();

  const grant = db().grants.find(
    (g) => g.profileId === cv.profile.id && !g.usedAt,
  );
  const integrityHref =
    cv.profile.integrityLinkEnabled && grant
      ? `/integridad/${grant.token}`
      : null;

  return <CvView cv={cv} integrityHref={integrityHref} />;
}
