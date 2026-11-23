import { HeroScene } from "@/components/hero-scene";
import { MetalFigure } from "@/components/metal-figure";
import { HERO } from "@/content/profile";

function NameLine({ text, delay }: { text: string; delay: number }) {
  return (
    <span className="name-line">
      {text.split("").map((char, index) => (
        <span
          key={`${char}-${index}`}
          className="name-letter"
          style={{ animationDelay: `${delay + index * 52}ms` }}
        >
          {char}
        </span>
      ))}
    </span>
  );
}

export function Hero() {
  return (
    <HeroScene>
      <div className="hero-chrome">
        <div className="hero-top">
          <div className="hero-identity">
            <p className="hero-kicker">{HERO.eyebrow}</p>
            <h2 className="hero-roles">
              {HERO.identity.map((line, index) => (
                <span className="role-line" key={line}>
                  <span style={{ animationDelay: `${200 + index * 90}ms` }}>{line}</span>
                </span>
              ))}
            </h2>
          </div>

          <div className="hero-aside">
            <p className="hero-headline">{HERO.headline}</p>
            <p className="hero-copy">{HERO.paragraph}</p>
            <p className="hero-spec">{HERO.specialization}</p>
            <div className="hero-actions">
              <a className="hero-action" href={HERO.primary.href}>
                {HERO.primary.label}
                <span aria-hidden="true">↘</span>
              </a>
              <a className="hero-action hero-action-quiet" href={HERO.secondary.href}>
                {HERO.secondary.label}
              </a>
            </div>
          </div>
        </div>

        <p className="scroll-cue">
          <span className="scroll-rule" aria-hidden="true" />
          Scroll to enter
        </p>
      </div>

      <h1 className="hero-name">
        <NameLine text="Peter" delay={0} />
        <NameLine text="Toss" delay={240} />
      </h1>

      <MetalFigure />

      <div className="hero-base" />
    </HeroScene>
  );
}
