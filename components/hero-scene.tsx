"use client";

import { useEffect, useRef, type ReactNode } from "react";

export function HeroScene({ children, after }: { children: ReactNode; after?: ReactNode }) {
  const trackRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    const update = () => {
      if (reduced.matches) {
        track.style.setProperty("--story", "0");
        return;
      }
      const total = track.offsetHeight - window.innerHeight;
      const passed = Math.min(Math.max(-track.getBoundingClientRect().top, 0), Math.max(total, 0));
      const progress = total > 0 ? passed / total : 0;
      track.style.setProperty("--story", progress.toFixed(4));
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    reduced.addEventListener("change", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      reduced.removeEventListener("change", update);
    };
  }, []);

  return (
    <section className="hero-story" id="top" ref={trackRef}>
      <div className="hero">{children}</div>
      {after}
    </section>
  );
}
