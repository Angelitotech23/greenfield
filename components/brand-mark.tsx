export function BrandMark({
  className = "h-9 w-9",
}: {
  className?: string;
  light?: boolean;
}) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden>
      <rect x="1" y="1" width="38" height="38" rx="12" fill="#0a0a0a" stroke="#d4af37" strokeWidth="1.2" />
      <path
        d="M13 28 V12 h6.4 c3.8 0 6.2 2 6.2 5.1 0 2.3-1.4 4-3.7 4.6 L26.6 28 h-3.2 l-3.4-5.6 H16 V28 Z M16 19.8 h3.4 c1.9 0 3-1 3-2.5s-1.1-2.5-3-2.5 H16 Z"
        fill="#d4af37"
      />
    </svg>
  );
}
