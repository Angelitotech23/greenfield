import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function uid(prefix = "id"): string {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}${Date.now().toString(36).slice(-4)}`;
}

export function nowIso(): string {
  return new Date().toISOString();
}

export function formatDate(value: string | null): string {
  if (!value) return "Actualidad";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString("es-BO", { year: "numeric", month: "short" });
}

export function shortAddress(address: string): string {
  if (!address || address.length < 10) return address;
  return `${address.slice(0, 6)}…${address.slice(-4)}`;
}

export function reservedHandles(): string[] {
  return [
    "app",
    "auth",
    "explorar",
    "onboarding",
    "issuer",
    "validador",
    "organizador",
    "integridad",
    "privacidad",
    "api",
    "login",
    "docs",
    "_next",
    "favicon.ico",
  ];
}

export function isReservedHandle(handle: string): boolean {
  return reservedHandles().includes(handle.toLowerCase());
}

export function normalizeHandle(raw: string): string {
  return raw
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]/g, "")
    .slice(0, 24);
}

export function appUrl(): string {
  return process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
}

export function isDemoMode(): boolean {
  return process.env.NEXT_PUBLIC_DEMO_MODE !== "false";
}

export function hasPrivy(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_PRIVY_APP_ID);
}

export function hasSupabase(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}

export async function sha256Hex(input: string): Promise<string> {
  const data = new TextEncoder().encode(input);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export function easExplorer(uid: string): string {
  const chain = process.env.NEXT_PUBLIC_CHAIN_NAME ?? "polygon-amoy";
  if (chain.includes("amoy")) {
    return `https://polygon-amoy.easscan.org/attestation/view/${uid}`;
  }
  return `https://polygon.easscan.org/attestation/view/${uid}`;
}
