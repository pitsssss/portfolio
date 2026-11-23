"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
  type Ref,
} from "react";

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || prefersReducedMotion()) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setInView(true);
        observer.disconnect();
      },
      { threshold: 0, rootMargin: "0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return { ref, inView };
}

type FadeTag = "div" | "li" | "p";

type FadeProps = {
  as?: FadeTag;
  className?: string;
  children: ReactNode;
  delay?: number;
  duration?: number;
  y?: number;
  fromScale?: number;
};

export function FadeUp({
  as = "div",
  className = "",
  children,
  delay = 0,
  duration = 560,
  y = 24,
  fromScale = 1,
}: FadeProps) {
  const { ref, inView } = useInView<HTMLElement>();
  const style = {
    "--delay": `${delay}ms`,
    "--dur": `${duration}ms`,
    "--y": `${y}px`,
    "--from-scale": String(fromScale),
  } as CSSProperties;
  const classes = `fade-up${inView ? " in-view" : ""}${className ? ` ${className}` : ""}`;

  if (as === "li") {
    return (
      <li ref={ref as Ref<HTMLLIElement>} className={classes} style={style}>
        {children}
      </li>
    );
  }

  if (as === "p") {
    return (
      <p ref={ref as Ref<HTMLParagraphElement>} className={classes} style={style}>
        {children}
      </p>
    );
  }

  return (
    <div ref={ref as Ref<HTMLDivElement>} className={classes} style={style}>
      {children}
    </div>
  );
}

type HeadingTag = "h1" | "h2";

type HeadingProps = {
  as?: HeadingTag;
  text: string;
  className?: string;
  duration?: number;
  stagger?: number;
};

export function RevealHeading({
  as = "h2",
  text,
  className = "",
  duration = 880,
  stagger = 90,
}: HeadingProps) {
  const ref = useRef<HTMLHeadingElement>(null);
  const [lines, setLines] = useState<string[] | null>(null);
  const [inView, setInView] = useState(false);

  const measure = useCallback(() => {
    const element = ref.current;
    if (!element || element.clientWidth === 0) return;

    const words = text.trim().split(/\s+/);
    const computed = getComputedStyle(element);
    const measurer = document.createElement("div");
    measurer.setAttribute("aria-hidden", "true");
    measurer.style.position = "absolute";
    measurer.style.visibility = "hidden";
    measurer.style.pointerEvents = "none";
    measurer.style.left = "0";
    measurer.style.top = "0";
    measurer.style.width = `${element.clientWidth}px`;
    measurer.style.font = computed.font;
    measurer.style.letterSpacing = computed.letterSpacing;
    measurer.style.textTransform = computed.textTransform;
    measurer.style.lineHeight = computed.lineHeight;
    measurer.style.whiteSpace = "normal";

    words.forEach((word, index) => {
      const span = document.createElement("span");
      span.textContent = word;
      measurer.appendChild(span);
      if (index < words.length - 1) measurer.appendChild(document.createTextNode(" "));
    });

    element.appendChild(measurer);
    const spans = [...measurer.querySelectorAll("span")];
    const groups: string[][] = [];
    let lastTop = Number.NEGATIVE_INFINITY;

    spans.forEach((span, index) => {
      const top = span.offsetTop;
      const word = words[index] ?? "";
      if (top - lastTop > 2) {
        groups.push([word]);
        lastTop = top;
      } else {
        groups[groups.length - 1]?.push(word);
      }
    });

    measurer.remove();
    const next = groups.map((group) => group.join(" "));

    setLines((current) => {
      if (
        current &&
        current.length === next.length &&
        current.every((line, index) => line === next[index])
      ) {
        return current;
      }
      return next;
    });
  }, [text]);

  useLayoutEffect(() => {
    measure();
  }, [measure]);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const onResize = () => {
      requestAnimationFrame(measure);
    };
    window.addEventListener("resize", onResize);

    if (prefersReducedMotion()) {
      return () => window.removeEventListener("resize", onResize);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setInView(true);
        observer.disconnect();
      },
      { threshold: 0, rootMargin: "0px" },
    );
    observer.observe(element);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, [measure]);

  const Tag = as;
  const rendered = lines ?? [text];

  return (
    <Tag
      ref={ref}
      className={`reveal-heading display-title ${className}${inView ? " in-view" : ""}`}
    >
      {rendered.map((line, index) => (
        <span className="line-mask" key={`${index}-${line}`}>
          <span
            className="line-inner"
            style={{
              transitionDuration: `${duration}ms`,
              transitionDelay: inView ? `${index * stagger}ms` : "0ms",
            }}
          >
            {line}
          </span>
        </span>
      ))}
    </Tag>
  );
}
