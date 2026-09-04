"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Checkin, EventRecord } from "@/lib/types";

export function OrganizerPanel({
  events,
}: {
  events: (EventRecord & { checkins: Checkin[] })[];
}) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [date, setDate] = useState("2026-10-01");
  const [location, setLocation] = useState("La Paz");
  const [eventId, setEventId] = useState(events[0]?.id ?? "");
  const [handle, setHandle] = useState("pablo");

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <form
        className="paper-card space-y-3 p-5"
        onSubmit={async (e) => {
          e.preventDefault();
          await fetch("/api/events", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, slug, date, location }),
          });
          router.refresh();
        }}
      >
        <h2 className="font-display text-xl">Crear evento</h2>
        <input className="w-full border border-[#d7cbb3] px-3 py-2" placeholder="Nombre" value={name} onChange={(e) => setName(e.target.value)} required />
        <input className="w-full border border-[#d7cbb3] px-3 py-2" placeholder="slug" value={slug} onChange={(e) => setSlug(e.target.value)} required />
        <input type="date" className="w-full border border-[#d7cbb3] px-3 py-2" value={date} onChange={(e) => setDate(e.target.value)} />
        <input className="w-full border border-[#d7cbb3] px-3 py-2" value={location} onChange={(e) => setLocation(e.target.value)} />
        <button className="bg-[#12100c] px-4 py-2 text-[#f4efe3]">Crear</button>
      </form>
      <form
        className="paper-card space-y-3 p-5"
        onSubmit={async (e) => {
          e.preventDefault();
          await fetch("/api/events/checkin", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ eventId, handle }),
          });
          router.refresh();
        }}
      >
        <h2 className="font-display text-xl">Check-in por handle</h2>
        <select className="w-full border border-[#d7cbb3] px-3 py-2" value={eventId} onChange={(e) => setEventId(e.target.value)}>
          {events.map((ev) => (
            <option key={ev.id} value={ev.id}>
              {ev.name}
            </option>
          ))}
        </select>
        <input className="w-full border border-[#d7cbb3] px-3 py-2" value={handle} onChange={(e) => setHandle(e.target.value)} placeholder="pablo" />
        <button className="border border-[#12100c] px-4 py-2">Registrar asistencia</button>
        <p className="text-xs text-[#7a7366]">
          Integridad: pide al titular el grant, no busques un sello en la cadena.
        </p>
      </form>
      <div className="paper-card p-5 md:col-span-2">
        <h2 className="font-display text-xl">Asistencia</h2>
        {events.map((ev) => (
          <div key={ev.id} className="mt-4">
            <p className="font-medium">
              {ev.name} · {ev.location}
            </p>
            <ul className="mt-1 text-sm">
              {ev.checkins.map((c) => (
                <li key={c.id}>
                  /{c.handle} · {c.checkedInAt}
                </li>
              ))}
              {ev.checkins.length === 0 && <li>Nadie todavía.</li>}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
