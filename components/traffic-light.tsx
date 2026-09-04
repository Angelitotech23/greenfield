import type { TrustLevel } from "@/lib/types";
import { cn } from "@/lib/utils";

const copy: Record<TrustLevel, { label: string; hint: string }> = {
  declared: { label: "Declarado", hint: "Lo escribió el titular" },
  web2: { label: "Web2", hint: "Validado por API del emisor" },
  onchain: { label: "On-chain", hint: "Firmado en Polygon" },
};

export function TrafficLight({
  level,
  compact = false,
}: {
  level: TrustLevel;
  compact?: boolean;
}) {
  return (
    <span
      className={cn(
        "visa-stamp",
        level === "declared" && "text-seal-void",
        level === "web2" && "text-foil",
        level === "onchain" && "text-seal-green",
      )}
      title={copy[level].hint}
    >
      {compact ? copy[level].label : `${copy[level].label} · ${copy[level].hint}`}
    </span>
  );
}
