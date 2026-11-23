"use client";

import { useEffect, useRef } from "react";

type Project = {
  index: string;
  name: string;
  category: string;
  stack: string;
  focus: string;
  blurb: string;
};

export function ProjectCard({ project, offset }: { project: Project; offset: boolean }) {
  const cardRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    const place = () => {
      if (reduced.matches) {
        card.style.setProperty("--depth", "0");
        return;
      }
      const rect = card.getBoundingClientRect();
      const middle = rect.top + rect.height / 2;
      const delta = (middle - window.innerHeight / 2) / window.innerHeight;
      const clamped = Math.max(-1, Math.min(1, delta));
      const eased = Math.sign(clamped) * Math.pow(Math.abs(clamped), 1.35);
      card.style.setProperty("--depth", eased.toFixed(3));
    };

    const tilt = (event: PointerEvent) => {
      if (reduced.matches || event.pointerType !== "mouse") return;
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      card.style.setProperty("--tilt-y", `${(x * 14).toFixed(2)}deg`);
      card.style.setProperty("--tilt-x", `${(-y * 10).toFixed(2)}deg`);
    };

    const rest = () => {
      card.style.setProperty("--tilt-x", "0deg");
      card.style.setProperty("--tilt-y", "0deg");
    };

    place();
    window.addEventListener("scroll", place, { passive: true });
    window.addEventListener("resize", place);
    card.addEventListener("pointermove", tilt);
    card.addEventListener("pointerleave", rest);
    reduced.addEventListener("change", place);
    return () => {
      window.removeEventListener("scroll", place);
      window.removeEventListener("resize", place);
      card.removeEventListener("pointermove", tilt);
      card.removeEventListener("pointerleave", rest);
      reduced.removeEventListener("change", place);
    };
  }, []);

  return (
    <li className={offset ? "venture-offset" : undefined}>
      <article className="venture" ref={cardRef}>
        <div className="venture-tilt">
          <div className="project-panel" aria-hidden="true">
            <span>{project.index}</span>
          </div>
          <div className="venture-meta">
            <div>
              <h3 className="venture-name">{project.name}</h3>
              <p className="venture-blurb">{project.blurb}</p>
            </div>
            <div className="venture-aside">
              <p className="venture-year">{project.stack}</p>
              <p className="venture-outcome">{project.focus}</p>
            </div>
          </div>
          <p className="venture-category">{project.category}</p>
        </div>
      </article>
    </li>
  );
}
