"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Profile } from "@/lib/types";

export function ProfileEditor({ profile }: { profile: Profile }) {
  const router = useRouter();
  const [form, setForm] = useState({
    handle: profile.handle,
    legalName: profile.legalName,
    displayHeadline: profile.displayHeadline,
    bio: profile.bio,
    avatarUrl: profile.avatarUrl,
    skill: "",
    company: "",
    title: "",
    school: "",
    degree: "",
    field: "",
    year: "",
    linkLabel: "",
    linkUrl: "",
  });
  const [message, setMessage] = useState("");

  async function patch(body: Record<string, unknown>) {
    const res = await fetch("/api/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const json = await res.json();
    if (!res.ok) {
      setMessage(json.error ?? "Error");
      return;
    }
    setMessage("Guardado.");
    router.refresh();
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <form
        className="paper-card space-y-3 p-5"
        onSubmit={(e) => {
          e.preventDefault();
          void patch({
            handle: form.handle,
            legalName: form.legalName,
            displayHeadline: form.displayHeadline,
            bio: form.bio,
            avatarUrl: form.avatarUrl,
          });
        }}
      >
        <h2 className="font-display text-xl">Datos del perfil</h2>
        <Field label="Handle" value={form.handle} onChange={(v) => setForm({ ...form, handle: v })} />
        <Field
          label="Nombre legal"
          value={form.legalName}
          disabled={profile.legalNameLocked}
          onChange={(v) => setForm({ ...form, legalName: v })}
        />
        <Field
          label="Titular / slogan"
          value={form.displayHeadline}
          onChange={(v) => setForm({ ...form, displayHeadline: v })}
        />
        <label className="block text-sm">
          Bio
          <textarea
            className="mt-1 w-full border border-[#d7cbb3] px-3 py-2"
            rows={4}
            value={form.bio}
            onChange={(e) => setForm({ ...form, bio: e.target.value })}
          />
        </label>
        <Field
          label="URL de foto"
          value={form.avatarUrl}
          onChange={(v) => setForm({ ...form, avatarUrl: v })}
        />
        <button className="bg-[#12100c] px-4 py-2 text-[#f4efe3]">Guardar perfil</button>
      </form>

      <div className="space-y-6">
        <form
          className="paper-card space-y-3 p-5"
          onSubmit={(e) => {
            e.preventDefault();
            void patch({ addSkill: form.skill });
            setForm({ ...form, skill: "" });
          }}
        >
          <h2 className="font-display text-xl">Añadir skill (declarada)</h2>
          <Field label="Skill" value={form.skill} onChange={(v) => setForm({ ...form, skill: v })} />
          <button className="border border-[#12100c] px-4 py-2">Añadir</button>
        </form>
        <form
          className="paper-card space-y-3 p-5"
          onSubmit={(e) => {
            e.preventDefault();
            void patch({
              addExperience: { title: form.title, company: form.company },
            });
          }}
        >
          <h2 className="font-display text-xl">Experiencia declarada</h2>
          <Field label="Cargo" value={form.title} onChange={(v) => setForm({ ...form, title: v })} />
          <Field label="Empresa" value={form.company} onChange={(v) => setForm({ ...form, company: v })} />
          <button className="border border-[#12100c] px-4 py-2">Añadir (blanco)</button>
        </form>
        <form
          className="paper-card space-y-3 p-5"
          onSubmit={(e) => {
            e.preventDefault();
            void patch({
              addEducation: {
                school: form.school,
                degree: form.degree,
                field: form.field,
                year: form.year,
              },
            });
          }}
        >
          <h2 className="font-display text-xl">Estudios declarados</h2>
          <Field label="Institución" value={form.school} onChange={(v) => setForm({ ...form, school: v })} />
          <Field label="Título" value={form.degree} onChange={(v) => setForm({ ...form, degree: v })} />
          <Field label="Campo" value={form.field} onChange={(v) => setForm({ ...form, field: v })} />
          <Field label="Año" value={form.year} onChange={(v) => setForm({ ...form, year: v })} />
          <button className="border border-[#12100c] px-4 py-2">Añadir (blanco)</button>
        </form>
        <form
          className="paper-card space-y-3 p-5"
          onSubmit={(e) => {
            e.preventDefault();
            void patch({ addLink: { label: form.linkLabel, url: form.linkUrl } });
          }}
        >
          <h2 className="font-display text-xl">Enlace</h2>
          <Field label="Etiqueta" value={form.linkLabel} onChange={(v) => setForm({ ...form, linkLabel: v })} />
          <Field label="URL" value={form.linkUrl} onChange={(v) => setForm({ ...form, linkUrl: v })} />
          <button className="border border-[#12100c] px-4 py-2">Añadir</button>
        </form>
      </div>
      {message && <p className="text-sm md:col-span-2">{message}</p>}
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  disabled,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  disabled?: boolean;
}) {
  return (
    <label className="block text-sm">
      {label}
      <input
        disabled={disabled}
        className="mt-1 w-full border border-[#d7cbb3] px-3 py-2 disabled:bg-[#efe7d6]"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}
