"use client";

import { useEffect } from "react";

const FONT_BASE = 16;
const BASE_W = 1920;
const COEF = 0.6666;

export function AdaptiveGrid() {
  useEffect(() => {
    const applyAdaptiveGrid = () => {
      const width = window.innerWidth;
      const reduction = ((BASE_W - width) / BASE_W) * 100 * COEF;
      const size = FONT_BASE - (FONT_BASE * reduction) / 100;
      if (size > FONT_BASE) {
        document.documentElement.style.fontSize = `${size}px`;
      } else {
        document.documentElement.style.removeProperty("font-size");
      }
    };

    applyAdaptiveGrid();
    window.addEventListener("resize", applyAdaptiveGrid);
    return () => window.removeEventListener("resize", applyAdaptiveGrid);
  }, []);

  return null;
}
