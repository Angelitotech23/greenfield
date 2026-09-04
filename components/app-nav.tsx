import Link from "next/link";
import type { UserRole } from "@/lib/types";
import { cn } from "@/lib/utils";

const items: { href: string; label: string; roles?: UserRole[] }[] = [
  { href: "/app", label: "Editar CV" },
  { href: "/app/credenciales", label: "Credenciales" },
  { href: "/app/compartir", label: "Compartir" },
  { href: "/app/visibilidad", label: "Visibilidad" },
  { href: "/app/integridad", label: "Integridad" },
  { href: "/onboarding", label: "Identidad / KYC" },
  { href: "/issuer", label: "Emisor", roles: ["issuer", "admin"] },
  { href: "/validador", label: "Validador", roles: ["validator", "admin"] },
  { href: "/organizador", label: "Organizador", roles: ["organizer", "admin"] },
];

export function AppNav({
  roles,
  current,
}: {
  roles: UserRole[];
  current: string;
}) {
  return (
    <nav className="flex flex-wrap gap-1">
      {items
        .filter((item) => !item.roles || item.roles.some((r) => roles.includes(r)))
        .map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "rounded-full px-3 py-1.5 text-sm transition",
              current === item.href
                ? "bg-foil text-black"
                : "text-ink-600 hover:text-ink-50",
            )}
          >
            {item.label}
          </Link>
        ))}
    </nav>
  );
}
