import { Eyebrow } from "@/components/eyebrow";
import { FadeUp, RevealHeading } from "@/components/reveal";
import { ABOUT, PRINCIPLES } from "@/content/profile";

export function About() {
  return (
    <section className="section" id="about">
      <div className="story-grid">
        <div className="story-left">
          <Eyebrow>{ABOUT.eyebrow}</Eyebrow>
          <RevealHeading className="story-title" text={ABOUT.headline} />
          <div className="story-copy">
            {ABOUT.paragraphs.map((paragraph) => (
              <FadeUp as="p" className="lead story-lead" delay={0} duration={520} key={paragraph} y={16}>
                {paragraph}
              </FadeUp>
            ))}
          </div>
          <p className="about-statement">{ABOUT.statement}</p>
        </div>

        <ul className="story-right">
          {PRINCIPLES.map((principle) => (
            <li className="principle" key={principle.index}>
              <span className="principle-index">{principle.index}</span>
              <div>
                <h3 className="principle-title">{principle.title}</h3>
                <p className="principle-copy">{principle.copy}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
