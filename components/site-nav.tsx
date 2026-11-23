"use client";

import { useEffect, useState } from "react";
import { useScrollLock } from "@/components/smooth-scroll";
import { NAV } from "@/content/profile";

export function SiteNav() {
  const { lock, unlock } = useScrollLock();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) lock("menu");
    else unlock("menu");
  }, [open, lock, unlock]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const close = () => setOpen(false);

  return (
    <header className="site-header">
      <div
        className={`mobile-menu${open ? " is-open" : ""}`}
        aria-hidden={!open}
        inert={!open}
      >
        <ul className="mobile-list">
          {NAV.map(({ label, href }, index) => (
            <li key={href}>
              <a className="mobile-link" href={href} onClick={close}>
                <span
                  className="mobile-link-inner"
                  style={{ transitionDelay: open ? `${120 + index * 80}ms` : "0ms" }}
                >
                  {label}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <nav className="site-nav" aria-label="Primary">
        <a className="logo" href="#top" onClick={close}>
          <span className="monogram">PT</span>
          <span className="brand-name">Peter Toss</span>
        </a>

        <ul className="desktop-nav">
          {NAV.map(({ label, href }) => (
            <li key={href}>
              <a className="nav-link" href={href}>
                {label}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className={`burger${open ? " is-open" : ""}`}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          <span className="burger-bar" />
          <span className="burger-bar" />
          <span className="burger-bar" />
        </button>
      </nav>
    </header>
  );
}
