"use client";

import { useEffect, useRef } from "react";

export function MetalFigure() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const start = () => {
      video.muted = true;
      if (motion.matches) {
        video.pause();
        return;
      }
      video.play().catch(() => {});
    };

    start();
    video.addEventListener("canplay", start);
    window.addEventListener("resize", start);
    document.addEventListener("visibilitychange", start);
    motion.addEventListener("change", start);
    return () => {
      video.removeEventListener("canplay", start);
      window.removeEventListener("resize", start);
      document.removeEventListener("visibilitychange", start);
      motion.removeEventListener("change", start);
    };
  }, []);

  return (
    <div className="hero-figure" aria-hidden="true">
      <div className="hero-figure-motion">
      <video
        ref={videoRef}
        className="hero-figure-video"
        autoPlay
        muted
        loop
        playsInline
        poster="/metal-human/metal-human.jpg"
        preload="auto"
      >
        <source src="/metal-human/metal-human.mp4" type="video/mp4" />
      </video>
      </div>
    </div>
  );
}
