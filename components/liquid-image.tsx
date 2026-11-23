"use client";

import { useEffect, useId, useRef, useState } from "react";

type LiquidImageProps = {
  alt: string;
  src?: string;
  videoSrc?: string;
  poster?: string;
  bare?: boolean;
  displacement?: number;
  className?: string;
  objectPosition?: string;
  placeholderLabel?: string;
  priority?: boolean;
};

type Motion = {
  scale: number;
  freq: number;
  scaleVelocity: number;
  freqVelocity: number;
};

const REST_SCALE = 1;
const REST_FREQ = 0.009;
const HOT_FREQ = 0.022;
const TENSION = 140;
const FRICTION = 13;

function canDistort() {
  return window.matchMedia("(hover: hover) and (min-width: 769px)").matches
    && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function LiquidImage({
  alt,
  src,
  videoSrc,
  poster,
  bare = false,
  displacement = 28,
  className = "",
  objectPosition = "center center",
  placeholderLabel,
  priority = false,
}: LiquidImageProps) {
  const rawId = useId().replace(/:/g, "");
  const filterId = `liquid-${rawId}`;
  const rootRef = useRef<HTMLElement>(null);
  const turbulenceRef = useRef<SVGFETurbulenceElement>(null);
  const displacementRef = useRef<SVGFEDisplacementMapElement>(null);
  const frameRef = useRef(0);
  const motionRef = useRef<Motion>({
    scale: REST_SCALE,
    freq: REST_FREQ,
    scaleVelocity: 0,
    freqVelocity: 0,
  });
  const targetRef = useRef({ scale: REST_SCALE, freq: REST_FREQ });
  const [failed, setFailed] = useState(false);
  const [hot, setHot] = useState(false);

  useEffect(() => {
    let last = performance.now();

    const step = (now: number) => {
      const dt = Math.min(0.032, (now - last) / 1000);
      last = now;
      const motion = motionRef.current;
      const target = targetRef.current;

      const scaleAccel = TENSION * (target.scale - motion.scale) - FRICTION * motion.scaleVelocity;
      motion.scaleVelocity += scaleAccel * dt;
      motion.scale += motion.scaleVelocity * dt;

      const freqAccel = TENSION * (target.freq - motion.freq) - FRICTION * motion.freqVelocity;
      motion.freqVelocity += freqAccel * dt;
      motion.freq += motion.freqVelocity * dt;

      displacementRef.current?.setAttribute("scale", motion.scale.toFixed(3));
      turbulenceRef.current?.setAttribute("baseFrequency", motion.freq.toFixed(5));

      const settled =
        Math.abs(target.scale - motion.scale) < 0.04 &&
        Math.abs(motion.scaleVelocity) < 0.04 &&
        Math.abs(target.freq - motion.freq) < 0.00015 &&
        Math.abs(motion.freqVelocity) < 0.00015;

      if (!settled) {
        frameRef.current = requestAnimationFrame(step);
      } else {
        displacementRef.current?.setAttribute("scale", String(target.scale));
        turbulenceRef.current?.setAttribute("baseFrequency", String(target.freq));
        frameRef.current = 0;
      }
    };

    const start = () => {
      if (frameRef.current) return;
      last = performance.now();
      frameRef.current = requestAnimationFrame(step);
    };

    const setTarget = (scale: number, freq: number) => {
      targetRef.current = { scale, freq };
      start();
    };

    const node = rootRef.current;
    if (!node) return;

    const enter = () => {
      if (!canDistort()) return;
      setHot(true);
      setTarget(displacement, HOT_FREQ);
    };
    const leave = () => {
      setHot(false);
      setTarget(REST_SCALE, REST_FREQ);
    };

    node.addEventListener("pointerenter", enter);
    node.addEventListener("pointerleave", leave);
    return () => {
      node.removeEventListener("pointerenter", enter);
      node.removeEventListener("pointerleave", leave);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      frameRef.current = 0;
    };
  }, [displacement]);
  const showMedia = !failed && (videoSrc || src);

  return (
    <figure
      ref={rootRef}
      role="img"
      aria-label={alt}
      className={`liquid${bare ? " is-bare" : ""}${hot ? " is-hot" : ""}${className ? ` ${className}` : ""}`}
    >
      <svg className="liquid-svg" aria-hidden="true">
        <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%" colorInterpolationFilters="sRGB">
          <feTurbulence
            ref={turbulenceRef}
            type="fractalNoise"
            baseFrequency={REST_FREQ}
            numOctaves={2}
            seed={2}
            result="noise"
          />
          <feDisplacementMap
            ref={displacementRef}
            in="SourceGraphic"
            in2="noise"
            scale={REST_SCALE}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>

      {showMedia && videoSrc ? (
        <video
          className="liquid-media"
          style={{ objectPosition, filter: `url(#${filterId})` }}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={poster}
          onError={() => setFailed(true)}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      ) : null}

      {showMedia && !videoSrc && src ? (
        // The SVG displacement filter has to sit on the raw image element.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          className="liquid-media"
          src={src}
          alt=""
          draggable={false}
          decoding="async"
          loading={priority ? "eager" : "lazy"}
          style={{ objectPosition, filter: `url(#${filterId})` }}
          onError={() => setFailed(true)}
        />
      ) : null}

      {!bare && showMedia ? (
        <>
          <span className="liquid-veil" />
          <span className="liquid-glow" />
          <span className="liquid-vignette" />
        </>
      ) : null}

      {!showMedia && placeholderLabel ? (
        <span className="liquid-label">{placeholderLabel}</span>
      ) : null}
    </figure>
  );
}
