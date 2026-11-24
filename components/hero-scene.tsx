import type { ReactNode } from "react";

export function HeroScene({ children, after }: { children: ReactNode; after?: ReactNode }) {
  return (
    <section className="hero-story" id="top">
      <div className="hero">{children}</div>
      {after}
    </section>
  );
}
