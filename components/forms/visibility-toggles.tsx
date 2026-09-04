"use client";

import { useRouter } from "next/navigation";
import type { Credential, Education, Experience, Skill, SocialLink } from "@/lib/types";

type Item = { id: string; label: string; kind: "experience" | "education" | "skill" | "link" | "credential"; isPublic: boolean };

export function VisibilityToggles(props: {
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  links: SocialLink[];
  credentials: Credential[];
  integrityLinkEnabled: boolean;
}) {
  const router = useRouter();
  const items: Item[] = [
    ...props.experience.map((x) => ({
      id: x.id,
      kind: "experience" as const,
      isPublic: x.isPublic,
      label: `${x.title} · ${x.company}`,
    })),
    ...props.education.map((x) => ({
      id: x.id,
      kind: "education" as const,
      isPublic: x.isPublic,
      label: `${x.school} · ${x.degree}`,
    })),
    ...props.skills.map((x) => ({
      id: x.id,
      kind: "skill" as const,
      isPublic: x.isPublic,
      label: x.name,
    })),
    ...props.links.map((x) => ({
      id: x.id,
      kind: "link" as const,
      isPublic: x.isPublic,
      label: x.label,
    })),
    ...props.credentials.map((x) => ({
      id: x.id,
      kind: "credential" as const,
      isPublic: x.isPublic,
      label: x.title,
    })),
  ];

  async function toggle(item: Item, isPublic: boolean) {
    await fetch("/api/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ visibility: { kind: item.kind, id: item.id, isPublic } }),
    });
    router.refresh();
  }

  async function toggleIntegrity(enabled: boolean) {
    await fetch("/api/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ integrityLinkEnabled: enabled }),
    });
    router.refresh();
  }

  return (
    <div className="space-y-6">
      <label className="paper-card flex items-center justify-between p-4">
        <span>
          Mostrar enlace “Verificación de integridad” en el CV (redirige; no muestra el
          expediente)
        </span>
        <input
          type="checkbox"
          defaultChecked={props.integrityLinkEnabled}
          onChange={(e) => void toggleIntegrity(e.target.checked)}
        />
      </label>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={`${item.kind}-${item.id}`} className="paper-card flex items-center justify-between p-4">
            <span className="text-sm">
              <span className="text-[#7a7366]">{item.kind}</span> · {item.label}
            </span>
            <input
              type="checkbox"
              defaultChecked={item.isPublic}
              onChange={(e) => void toggle(item, e.target.checked)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
