"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  type ReactNode,
} from "react";
import { ReactLenis, useLenis } from "lenis/react";
import "lenis/dist/lenis.css";
import type Lenis from "lenis";

type ScrollApi = {
  lock: (owner: string) => void;
  unlock: (owner: string) => void;
  scrollTo: (target: string | Element) => void;
};

const ScrollContext = createContext<ScrollApi | null>(null);

export function useScrollLock() {
  const value = useContext(ScrollContext);
  if (!value) {
    throw new Error("useScrollLock must be used within SmoothScroll");
  }
  return value;
}

function ScrollRuntime({ children }: { children: ReactNode }) {
  const lenis = useLenis();
  const lenisRef = useRef<Lenis | undefined>(undefined);
  const owners = useRef(new Set<string>(["preloader"]));

  useLayoutEffect(() => {
    lenisRef.current = lenis;
  }, [lenis]);

  const sync = useCallback(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const locked = !reduce && owners.current.size > 0;
    document.documentElement.classList.toggle("is-locked", locked);
    const instance = lenisRef.current;
    if (!instance) return;
    if (locked) instance.stop();
    else instance.start();
  }, []);

  useEffect(() => {
    sync();
  }, [lenis, sync]);

  const lock = useCallback(
    (owner: string) => {
      owners.current.add(owner);
      sync();
    },
    [sync],
  );

  const unlock = useCallback(
    (owner: string) => {
      owners.current.delete(owner);
      sync();
    },
    [sync],
  );

  const scrollTo = useCallback((target: string | Element) => {
    const instance = lenisRef.current;
    const element = typeof target === "string" ? document.querySelector(target) : target;
    if (!instance || !element) return;
    instance.scrollTo(element as HTMLElement, { offset: 0, force: true });
  }, []);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const node = event.target;
      if (!(node instanceof Element)) return;
      const anchor = node.closest("a[href^='#']");
      if (!(anchor instanceof HTMLAnchorElement)) return;
      const href = anchor.getAttribute("href");
      if (!href || href.length < 2) return;
      const element = document.querySelector(href);
      if (!element) return;
      event.preventDefault();
      scrollTo(element);
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [scrollTo]);

  const api = useMemo(
    () => ({ lock, unlock, scrollTo }),
    [lock, unlock, scrollTo],
  );

  return <ScrollContext.Provider value={api}>{children}</ScrollContext.Provider>;
}

export function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis root options={{ smoothWheel: true, autoRaf: true }}>
      <ScrollRuntime>{children}</ScrollRuntime>
    </ReactLenis>
  );
}
