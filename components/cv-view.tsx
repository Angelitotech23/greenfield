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
    <article className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#111]">
      <div className="relative min-h-[280px] md:min-h-[340px]">
        {profile.avatarUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={profile.avatarUrl} alt="" className="absolute inset-0 h-full w-full object-cover opacity-40" />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-foil/20 to-transparent" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-[#111]/70 to-transparent" />
        <div className="relative flex h-full flex-col justify-end gap-4 p-6 md:flex-row md:items-end md:justify-between md:p-10">
          <div>
            <p className="font-mono text-[11px] text-foil">/{profile.handle}</p>
            <h1 className="font-display mt-2 text-4xl md:text-6xl">{profile.legalName}</h1>
            <p className="mt-2 text-lg text-ink-50/75">{profile.displayHeadline}</p>
            <p className="mrz mt-3">
              {shortAddress(profile.walletAddress)}
              {profile.sbtTokenId ? ` · SBT #${profile.sbtTokenId}` : ""}
            </p>
          </div>
          {profile.kycStatus === "approved" && (
            <span className="visa-stamp text-seal-green">Identidad verificada</span>
          )}
        </div>
      </div>

      <div className="grid gap-10 p-6 md:grid-cols-[220px_1fr] md:p-10">
        <aside className="space-y-6">
          <div className="photo-frame max-w-[180px]">
            {profile.avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={profile.avatarUrl} alt="" className="aspect-square w-full object-cover" />
            ) : (
              <div className="flex aspect-square items-center justify-center bg-[#1a1a1a] font-display text-5xl text-foil">
                {profile.legalName.slice(0, 1)}
              </div>
            )}
          </div>
          <div>
            <h2 className="kicker">Skills</h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {cv.skills.map((s) => (
                <li key={s.id} className="rounded-full border border-white/10 px-3 py-1 text-xs text-ink-600">
                  {s.name}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="kicker">Enlaces</h2>
            <ul className="mt-3 space-y-1 text-sm">
              {cv.links.map((l) => (
                <li key={l.id}>
                  <a href={l.url} className="text-foil hover:underline" target="_blank" rel="noreferrer">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <div className="space-y-12">
          <section>
            <h2 className="font-display text-2xl">Sobre mí</h2>
            <p className="mt-3 max-w-prose leading-relaxed text-ink-600">
              {profile.bio || "Sin biografía pública."}
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl">Experiencia</h2>
            <ul className="mt-5 space-y-6">
              {cv.experience.map((item) => (
                <li key={item.id} className="border-l border-foil/30 pl-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-medium">
                      {item.title} · {item.company}
                    </p>
                    <TrafficLight level={item.trustLevel} compact />
                  </div>
                  <p className="font-mono text-[11px] text-ink-600">
                    {formatDate(item.startDate)} — {formatDate(item.endDate)}
                  </p>
                  <p className="mt-1 text-sm text-ink-600">{item.description}</p>
                  {item.easUid && <SealButton easUid={item.easUid} title={item.title} />}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl">Educación</h2>
            <ul className="mt-5 space-y-4">
              {cv.education.map((item) => (
                <li key={item.id}>
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-medium">
                      {item.degree} en {item.field}
                    </p>
                    <TrafficLight level={item.trustLevel} compact />
                  </div>
                  <p className="text-sm text-ink-600">
                    {item.school} · {item.year}
                  </p>
                  {item.easUid && <SealButton easUid={item.easUid} title={item.school} />}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl">Certificaciones</h2>
            <ul className="mt-5 space-y-4">
              {cv.credentials.map((item) => (
                <li key={item.id} className="flex flex-col gap-1 border-b border-white/5 pb-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-medium">{item.title}</p>
                    <TrafficLight level={item.trustLevel} compact />
                  </div>
                  <p className="text-sm text-ink-600">{item.issuerName}</p>
                  {item.easUid && <SealButton easUid={item.easUid} title={item.title} />}
                </li>
              ))}
            </ul>
          </section>

          {integrityHref && (
            <aside className="rounded-2xl border border-white/10 p-5 text-sm">
              <p className="kicker">Integridad</p>
              <p className="mt-2 max-w-prose text-ink-600">
                El casillero penal no está en este CV ni en la blockchain. Acceso
                autorizado, sección aparte.
              </p>
              <Link href={integrityHref} className="mt-3 inline-block text-foil hover:underline">
                Ir a verificación de integridad
              </Link>
            </aside>
          )}
        </div>
      </div>
    </article>
  );
}
