import type { ReactNode } from "react";

export function PageIntro({
  kicker,
  title,
  children,
}: {
  kicker: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <header className="max-w-2xl">
      <p className="kicker">{kicker}</p>
      <h1 className="font-display mt-3 text-4xl font-semibold tracking-tight md:text-5xl">{title}</h1>
      {children ? <div className="mt-4 text-base leading-relaxed text-ink-600">{children}</div> : null}
    </header>
  );
}
