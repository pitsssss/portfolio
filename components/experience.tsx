import { Eyebrow } from "@/components/eyebrow";
import { RevealHeading } from "@/components/reveal";
import { COMMUNITY, EXPERIENCE, EXPERIENCE_INTRO } from "@/content/experience";

export function Experience() {
  return (
    <section className="section" id="experience">
      <div className="section-head">
        <div>
          <Eyebrow>{EXPERIENCE_INTRO.eyebrow}</Eyebrow>
          <RevealHeading className="venture-title" text={EXPERIENCE_INTRO.headline} />
        </div>
        <p className="lead section-lead">{EXPERIENCE_INTRO.lead}</p>
      </div>

      <ol className="exp-list">
        {EXPERIENCE.map((item) => (
          <li className="exp-item" key={item.index}>
            <span className="principle-index">{item.index}</span>
            <div>
              <div className="exp-head">
                <h3 className="principle-title">{item.role}</h3>
                <p className="exp-dates">{item.dates}</p>
              </div>
              <p className="exp-org">{item.org}</p>
              <p className="principle-copy">{item.copy}</p>
            </div>
          </li>
        ))}
      </ol>

      <aside className="community">
        <Eyebrow>{COMMUNITY.eyebrow}</Eyebrow>
        <h3 className="community-title">{COMMUNITY.headline}</h3>
        <p className="principle-copy">{COMMUNITY.copy}</p>
      </aside>
    </section>
  );
}
