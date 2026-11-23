import { HeroScene } from "@/components/hero-scene";
import { MetalFigure } from "@/components/metal-figure";

const ROLES = ["Engineer", "Full Stack", "Developer", "AI Specialist"];

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
          <h2 className="hero-roles">
            {ROLES.map((role, index) => (
              <span className="role-line" key={role}>
                <span style={{ animationDelay: `${200 + index * 80}ms` }}>{role}</span>
              </span>
            ))}
          </h2>
          <p className="hero-copy">
            I build software end to end — the interface, the system behind it, and the AI inside it.
            Full-stack development, with AI engineering as the specialty.
          </p>
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
