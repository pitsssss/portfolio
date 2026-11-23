"use client";

import { useEffect, useRef, useState } from "react";
import { useScrollLock } from "@/components/smooth-scroll";

type Phase = "count" | "fade" | "wipe" | "done";

export function Preloader() {
  const { lock, unlock } = useScrollLock();
  const countRef = useRef<HTMLSpanElement>(null);
  const [phase, setPhase] = useState<Phase>("count");

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      unlock("preloader");
      document.documentElement.classList.add("is-revealed");
      return;
    }

    lock("preloader");
    window.scrollTo(0, 0);

    const started = performance.now();
    let frame = 0;
    const timeouts: number[] = [];
    let finished = false;

    const finish = () => {
      if (finished) return;
      finished = true;
      setPhase("done");
      unlock("preloader");
    };

    const tick = (now: number) => {
      const progress = Math.min(1, (now - started) / 2000);
      const value = Math.round(progress * 100);
      if (countRef.current) countRef.current.textContent = String(value);
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
        return;
      }

      setPhase("fade");
      timeouts.push(
        window.setTimeout(() => {
          setPhase("wipe");
          document.documentElement.classList.add("is-revealed");
        }, 500),
      );
      timeouts.push(window.setTimeout(finish, 1300));
    };

    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      timeouts.forEach((id) => window.clearTimeout(id));
    };
  }, [lock, unlock]);

  const finish = () => {
    setPhase("done");
    unlock("preloader");
  };

  return (
    <div
      className={`preloader${phase === "fade" ? " is-fade" : ""}${phase === "wipe" ? " is-wipe" : ""}${phase === "done" ? " is-done" : ""}`}
      aria-hidden={phase === "done"}
      onTransitionEnd={(event) => {
        if (event.propertyName !== "transform" || phase !== "wipe") return;
        finish();
      }}
    >
      <div className="preloader-bg" />
      <div className="preloader-inner">
        <p className="preloader-brand preloader-copy">Peter Toss</p>
        <p className="preloader-count preloader-copy" aria-label="Loading">
          <span ref={countRef}>0</span>
          <span className="preloader-pct">%</span>
        </p>
      </div>
    </div>
  );
}
