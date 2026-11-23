import { Eyebrow } from "@/components/eyebrow";
import { FadeUp, RevealHeading } from "@/components/reveal";

const PRINCIPLES = [
  {
    index: "01",
    title: "Build the whole product",
    copy: "Interface, API, and data are one job. A screen is finished when the system behind it holds up.",
  },
  {
    index: "02",
    title: "Put AI where the work is",
    copy: "Models belong in the product: retrieval, tools, evaluation, and the interface a person actually uses.",
  },
  {
    index: "03",
    title: "Keep the stack honest",
    copy: "Clear architecture, typed boundaries, and paths you can test. Speed is useless if the next change is fragile.",
  },
  {
    index: "04",
    title: "Start from the problem",
    copy: "Choose the layer that should change — UI, service, or model — instead of reaching for a tool first.",
  },
];

export function About() {
  return (
    <section className="section" id="about">
      <div className="story-grid">
        <div className="story-left">
          <Eyebrow>About</Eyebrow>
          <RevealHeading className="story-title" text="Software, built end to end." />
          <FadeUp as="p" className="lead story-lead" delay={0} duration={520} y={16}>
            I&apos;m Peter Toss, a software engineer, full-stack developer, and AI engineering
            specialist. I take a product from the interface to the API to the model, and I stay
            through the part where it has to work in production.
          </FadeUp>
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
