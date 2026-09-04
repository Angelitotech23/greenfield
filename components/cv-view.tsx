import Link from "next/link";
import { SealButton } from "@/components/seal-modal";
import { TrafficLight } from "@/components/traffic-light";
import type { PublicCv } from "@/lib/types";
import { formatDate, shortAddress } from "@/lib/utils";

export function CvView({
  cv,
  integrityHref,
}: {
  cv: PublicCv;
  integrityHref?: string | null;
}) {
  const { profile } = cv;

  return (
    <article className="paper-card overflow-hidden">
      <div className="bg-[#12100c] px-6 py-8 text-[#f4efe3] md:px-10">
        <p className="text-[11px] uppercase tracking-[0.28em] text-[#e8b84a]">
          Currículum verificable
        </p>
        <h1 className="font-display mt-2 text-4xl md:text-5xl">{profile.legalName}</h1>
        <p className="mt-2 text-lg text-[#e8e0d0]">{profile.displayHeadline}</p>
        <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-[#cfc4ae]">
          <span>/{profile.handle}</span>
          <span>{shortAddress(profile.walletAddress)}</span>
          {profile.sbtTokenId && <span>SBT #{profile.sbtTokenId}</span>}
          {profile.kycStatus === "approved" && (
            <span className="stamp border-[#2f9e6b] px-2 py-0.5 text-[#2f9e6b]">
              Identidad verificada
            </span>
          )}
        </div>
      </div>

      <div className="grid gap-10 px-6 py-8 md:grid-cols-[200px_1fr] md:px-10">
        <aside className="space-y-6">
          {profile.avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={profile.avatarUrl}
              alt=""
              className="aspect-square w-full object-cover"
            />
          ) : (
            <div className="flex aspect-square items-center justify-center bg-[#efe7d6] font-display text-5xl">
              {profile.legalName.slice(0, 1)}
            </div>
          )}
          <div>
            <h2 className="text-xs uppercase tracking-[0.18em] text-[#7a7366]">Skills</h2>
            <ul className="mt-2 flex flex-wrap gap-2">
              {cv.skills.map((s) => (
                <li key={s.id} className="border border-[#d7cbb3] px-2 py-1 text-sm">
                  {s.name}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-xs uppercase tracking-[0.18em] text-[#7a7366]">Enlaces</h2>
            <ul className="mt-2 space-y-1 text-sm">
              {cv.links.map((l) => (
                <li key={l.id}>
                  <a href={l.url} className="underline" target="_blank" rel="noreferrer">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <div className="space-y-10">
          <section>
            <h2 className="font-display text-2xl">Sobre mí</h2>
            <p className="mt-3 max-w-prose leading-relaxed text-[#3d382f]">
              {profile.bio || "Sin biografía pública."}
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl">Experiencia</h2>
            <ul className="mt-4 space-y-5">
              {cv.experience.map((item) => (
                <li key={item.id} className="border-l-2 border-[#d7cbb3] pl-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-medium">
                      {item.title} · {item.company}
                    </p>
                    <TrafficLight level={item.trustLevel} compact />
                  </div>
                  <p className="text-sm text-[#7a7366]">
                    {formatDate(item.startDate)} — {formatDate(item.endDate)}
                  </p>
                  <p className="mt-1 text-sm">{item.description}</p>
                  {item.easUid && <SealButton easUid={item.easUid} title={item.title} />}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl">Educación</h2>
            <ul className="mt-4 space-y-4">
              {cv.education.map((item) => (
                <li key={item.id}>
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-medium">
                      {item.degree} en {item.field}
                    </p>
                    <TrafficLight level={item.trustLevel} compact />
                  </div>
                  <p className="text-sm text-[#7a7366]">
                    {item.school} · {item.year}
                  </p>
                  {item.easUid && <SealButton easUid={item.easUid} title={item.school} />}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl">Certificaciones</h2>
            <ul className="mt-4 space-y-4">
              {cv.credentials.map((item) => (
                <li key={item.id} className="flex flex-col gap-1 border-b border-[#efe7d6] pb-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-medium">{item.title}</p>
                    <TrafficLight level={item.trustLevel} compact />
                  </div>
                  <p className="text-sm text-[#7a7366]">{item.issuerName}</p>
                  {item.easUid && <SealButton easUid={item.easUid} title={item.title} />}
                </li>
              ))}
            </ul>
          </section>

          {integrityHref && (
            <aside className="border border-dashed border-[#7a7366] p-4 text-sm">
              <p className="text-xs uppercase tracking-[0.16em] text-[#7a7366]">
                Verificación de integridad
              </p>
              <p className="mt-2 max-w-prose">
                El casillero penal no está en este CV ni en la blockchain. Si tienes un
                acceso autorizado, continúa a una sección aparte, no indexable.
              </p>
              <Link href={integrityHref} className="mt-3 inline-block underline">
                Ir a la sección de integridad
              </Link>
            </aside>
          )}
        </div>
      </div>
    </article>
  );
}
