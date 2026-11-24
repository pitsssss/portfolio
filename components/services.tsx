import { Eyebrow } from "@/components/eyebrow";
import { RevealHeading } from "@/components/reveal";
import { SERVICES, SERVICES_INTRO, TOOLS } from "@/content/services";

export function Services() {
  return (
    <section className="section" id="services">
      <div className="section-head">
        <div>
          <Eyebrow>{SERVICES_INTRO.eyebrow}</Eyebrow>
          <RevealHeading className="venture-title" text={SERVICES_INTRO.headline} />
          <p className="lead section-lead">{SERVICES_INTRO.lead}</p>
        </div>
      </div>

      <ol className="service-list">
        {SERVICES.map((service) => (
          <li className="service-line" key={service.index}>
            <span className="principle-index">{service.index}</span>
            <div>
              <h3 className="principle-title">{service.title}</h3>
              <p className="principle-copy">{service.copy}</p>
              <ul className="capability-list">
                {service.capabilities.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>

      <div className="tools" id="tools">
        <h3 className="tools-title">{TOOLS.headline}</h3>
        <p className="section-note">{TOOLS.note}</p>
        <dl className="tool-groups">
          {TOOLS.groups.map((group) => (
            <div key={group.label}>
              <dt>{group.label}</dt>
              <dd>{group.items.join(" · ")}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
