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
        "inline-flex items-center gap-2 stamp px-2 py-0.5 text-[10px]",
        level === "declared" && "text-[#7a7366] border-[#7a7366]",
        level === "web2" && "text-[#9a7420] border-[#c49a2a] bg-[#f8e7b0]",
        level === "onchain" && "text-[#1d6b47] border-[#2f9e6b] bg-[#dff3e8]",
      )}
      title={copy[level].hint}
    >
      <span
        className={cn(
          "h-2 w-2 rounded-full",
          level === "declared" && "bg-[#d9d3c7]",
          level === "web2" && "bg-[#e8b84a]",
          level === "onchain" && "bg-[#2f9e6b]",
        )}
      />
      {compact ? copy[level].label : `${copy[level].label} · ${copy[level].hint}`}
    </span>
  );
}
