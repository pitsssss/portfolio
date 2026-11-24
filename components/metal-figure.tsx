"use client";

import { useEffect, useRef } from "react";

const PLAYBACK_RATE = 1.45;

export function MetalFigure() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const start = () => {
      video.muted = true;
      video.defaultMuted = true;
      video.playsInline = true;
      video.playbackRate = PLAYBACK_RATE;

      if (motion.matches) {
        video.pause();
        return;
      }

      if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
        video.play().catch(() => {});
      }
    };

    start();
    video.addEventListener("loadeddata", start);
    video.addEventListener("canplay", start);
    video.addEventListener("canplaythrough", start);
    video.addEventListener("stalled", start);
    video.addEventListener("suspend", start);
    video.addEventListener("waiting", start);
    window.addEventListener("resize", start);
    window.addEventListener("focus", start);
    document.addEventListener("visibilitychange", start);
    document.addEventListener("pointerdown", start, { once: true });
    motion.addEventListener("change", start);

    return () => {
      video.removeEventListener("loadeddata", start);
      video.removeEventListener("canplay", start);
      video.removeEventListener("canplaythrough", start);
      video.removeEventListener("stalled", start);
      video.removeEventListener("suspend", start);
      video.removeEventListener("waiting", start);
      window.removeEventListener("resize", start);
      window.removeEventListener("focus", start);
      document.removeEventListener("visibilitychange", start);
      document.removeEventListener("pointerdown", start);
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
          <source src="/metal-human/metal-human-web.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  );
}
