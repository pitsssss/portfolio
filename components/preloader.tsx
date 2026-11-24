"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useScrollLock } from "@/components/smooth-scroll";

type Phase = "count" | "fade" | "wipe" | "done";

const FLIGHT_MS = 2000;

type LineFlight = {
  tx: number;
  ty: number;
  scale: number;
};

type FlightVars = {
  compactBottom?: string;
  flightLeft?: string;
  flightTop?: string;
  flightWidth?: string;
  flightFont?: string;
  intro?: string;
  lines?: LineFlight[];
};

const FLIGHT_SHEET_ID = "name-flight";

function renderFlightSheet(vars: FlightVars) {
  let sheet = document.getElementById(FLIGHT_SHEET_ID);
  if (!sheet) {
    sheet = document.createElement("style");
    sheet.id = FLIGHT_SHEET_ID;
    document.head.appendChild(sheet);
  }
  const declarations = [
    vars.compactBottom ? `--compact-bottom:${vars.compactBottom}` : "",
    vars.flightLeft ? `--flight-left:${vars.flightLeft}` : "",
    vars.flightTop ? `--flight-top:${vars.flightTop}` : "",
    vars.flightWidth ? `--flight-width:${vars.flightWidth}` : "",
    vars.flightFont ? `--flight-font:${vars.flightFont}` : "",
    vars.intro != null ? `--intro:${vars.intro}` : "",
  ].filter(Boolean);
  const lines = (vars.lines ?? [])
    .map(
      (line, index) =>
        `html.is-name-flight .name-line:nth-child(${index + 1}){transform:translate(${line.tx}px,${line.ty}px) scale(${line.scale})}`,
    )
    .join("");
  sheet.textContent = `html{${declarations.join(";")}}${lines}`;
}

function removeFlightSheet() {
  document.getElementById(FLIGHT_SHEET_ID)?.remove();
}

function stripInjectedMotion(name: HTMLElement) {
  name.style.removeProperty("bottom");
  name.style.removeProperty("font-size");
  if (!name.getAttribute("style")) name.removeAttribute("style");
  name.querySelectorAll<HTMLElement>(".name-line").forEach((line) => {
    line.style.removeProperty("transform");
    line.style.removeProperty("transform-origin");
    if (!line.getAttribute("style")) line.removeAttribute("style");
  });
}

function easeInOutCubic(amount: number) {
  return amount < 0.5 ? 4 * amount * amount * amount : 1 - (-2 * amount + 2) ** 3 / 2;
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function heroName() {
  return document.querySelector<HTMLElement>(".hero-name");
}

function compactBottom(name: HTMLElement) {
  const count = document.querySelector(".preloader-count");
  if (!count) return undefined;
  const wide = window.matchMedia("(min-width: 640px)").matches;
  const rootSize = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
  const countBox = count.getBoundingClientRect();
  const nameBox = name.getBoundingClientRect();
  const targetBottom = wide ? countBox.bottom : countBox.top - 0.75 * rootSize;
  const delta = nameBox.bottom - targetBottom;
  if (Math.abs(delta) < 0.5) return undefined;
  const current = parseFloat(getComputedStyle(name).bottom) || 0;
  return `${current + delta}px`;
}

export function Preloader() {
  const { lock, unlock } = useScrollLock();
  const shown = useRef(0);
  const finishRef = useRef<() => void>(() => {});
  const [count, setCount] = useState(0);
  const [phase, setPhase] = useState<Phase>("count");

  useLayoutEffect(() => {
    if (!prefersReducedMotion()) return;
    document.documentElement.classList.add("is-name-settled");
    document.documentElement.classList.remove("is-name-flight");
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    shown.current = 0;

    if (prefersReducedMotion()) {
      root.classList.add("is-revealed", "is-name-settled");
      root.classList.remove("is-name-flight");
      unlock("preloader");
      return;
    }

    lock("preloader");
    window.scrollTo(0, 0);

    let frame = 0;
    let timer = 0;
    let finished = false;
    let cancelled = false;
    const timeouts: number[] = [];

    const release = () => {
      const name = heroName();
      if (name) stripInjectedMotion(name);
      removeFlightSheet();
      root.classList.remove("is-name-flight", "is-intro");
      root.classList.add("is-name-settled");
    };

    const resetToCompact = () => {
      const name = heroName();
      if (name) stripInjectedMotion(name);
      removeFlightSheet();
      root.classList.remove("is-name-flight", "is-name-settled");
    };

    const finish = () => {
      if (finished || cancelled) return;
      finished = true;
      release();
      setPhase("done");
      unlock("preloader");
    };
    finishRef.current = finish;

    const schedule = (callback: (now: number) => void) => {
      if (document.hidden) timer = window.setTimeout(() => callback(performance.now()), 32);
      else frame = requestAnimationFrame(callback);
    };

    const setupFlight = () => {
      const name = heroName();
      const lines = name ? [...name.querySelectorAll<HTMLElement>(".name-line")] : [];
      if (!name || lines.length === 0) return null;

      root.classList.remove("is-name-flight", "is-name-settled");
      stripInjectedMotion(name);
      removeFlightSheet();

      const vars: FlightVars = {};
      const bottom = compactBottom(name);
      if (bottom) {
        vars.compactBottom = bottom;
        renderFlightSheet(vars);
      }

      const starts = lines.map((line) => line.getBoundingClientRect());
      if (starts.some((rect) => rect.width < 2 || rect.height < 2)) return null;

      root.classList.add("is-name-settled");
      const endBox = name.getBoundingClientRect();
      const fontSize = getComputedStyle(name).fontSize;
      if (endBox.width < 2 || endBox.height < 2) {
        root.classList.remove("is-name-settled");
        return null;
      }

      vars.flightLeft = `${endBox.left}px`;
      vars.flightTop = `${endBox.top}px`;
      vars.flightWidth = `${endBox.width}px`;
      vars.flightFont = fontSize;
      vars.intro = "0";
      renderFlightSheet(vars);
      root.classList.add("is-name-flight");

      const placed = name.getBoundingClientRect();
      const shiftX = endBox.left - placed.left;
      const shiftY = endBox.top - placed.top;
      if (Math.abs(shiftX) > 0.5 || Math.abs(shiftY) > 0.5) {
        vars.flightLeft = `${endBox.left + shiftX}px`;
        vars.flightTop = `${endBox.top + shiftY}px`;
        renderFlightSheet(vars);
      }

      const pinned = lines.map((line) => line.getBoundingClientRect());
      const flights: LineFlight[] = [];
      for (let index = 0; index < lines.length; index += 1) {
        const start = starts[index];
        const end = pinned[index];
        const scale = start.width / end.width;
        if (!Number.isFinite(scale) || scale <= 0) {
          resetToCompact();
          return null;
        }
        flights.push({
          tx: start.left - end.left,
          ty: start.top - end.top,
          scale,
        });
      }

      return { flights, vars };
    };

    const paint = (motion: { flights: LineFlight[]; vars: FlightVars }, amount: number) => {
      motion.vars.intro = amount.toFixed(4);
      motion.vars.lines = motion.flights.map((flight) => ({
        tx: flight.tx * (1 - amount),
        ty: flight.ty * (1 - amount),
        scale: flight.scale + (1 - flight.scale) * amount,
      }));
      renderFlightSheet(motion.vars);
    };

    const run = (motion: { flights: LineFlight[]; vars: FlightVars } | null) => {
      if (!motion) {
        const name = heroName();
        if (name) stripInjectedMotion(name);
        removeFlightSheet();
        root.classList.remove("is-name-flight");
        root.classList.add("is-name-settled");
      } else {
        paint(motion, 0);
      }

      const started = performance.now();
      const tick = (now: number) => {
        if (cancelled) return;
        const progress = Math.min(1, (now - started) / FLIGHT_MS);
        const nextCount = Math.round(progress * 100);
        if (shown.current !== nextCount) {
          shown.current = nextCount;
          setCount(nextCount);
        }
        if (motion) paint(motion, easeInOutCubic(progress));
        if (progress < 1) {
          schedule(tick);
          return;
        }

        if (motion) {
          motion.vars.intro = "1";
          motion.vars.lines = undefined;
          renderFlightSheet(motion.vars);
        }
        setPhase("fade");
        timeouts.push(
          window.setTimeout(() => {
            if (cancelled) return;
            setPhase("wipe");
            root.classList.add("is-revealed");
          }, 420),
        );
        timeouts.push(
          window.setTimeout(() => {
            if (cancelled) return;
            finish();
          }, 1200),
        );
      };

      schedule(tick);
    };

    let began = false;
    const begin = () => {
      if (cancelled || began) return;
      began = true;
      try {
        run(setupFlight());
      } catch (error) {
        root.dataset.introError = error instanceof Error ? error.message : "error";
        run(null);
      }
    };

    if (!document.fonts || document.fonts.status === "loaded") begin();
    else {
      document.fonts.ready.then(begin);
      timeouts.push(window.setTimeout(begin, 400));
    }

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      window.clearTimeout(timer);
      timeouts.forEach((id) => window.clearTimeout(id));
      if (!finished) resetToCompact();
    };
  }, [lock, unlock]);

  return (
    <div
      className={`preloader${phase === "fade" ? " is-fade" : ""}${phase === "wipe" ? " is-wipe" : ""}${phase === "done" ? " is-done" : ""}`}
      aria-hidden={phase === "done"}
      onTransitionEnd={(event) => {
        if (event.target !== event.currentTarget || event.propertyName !== "transform" || phase !== "wipe") return;
        finishRef.current();
      }}
    >
      <div className="preloader-bg" />
      <div className="preloader-inner">
        <p className="preloader-count preloader-copy" aria-label="Loading">
          <span>{count}</span>
          <span className="preloader-pct">%</span>
        </p>
      </div>
    </div>
  );
}
