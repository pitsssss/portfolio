import { Eyebrow } from "@/components/eyebrow";
import { FadeUp, RevealHeading } from "@/components/reveal";
import { CV, EXPERIENCE_INTRO } from "@/content/experience";

export function Experience() {
  return (
    <section className="section" id="experience">
      <div className="experience-intro">
        <Eyebrow>{EXPERIENCE_INTRO.eyebrow}</Eyebrow>
        <RevealHeading className="venture-title" text={EXPERIENCE_INTRO.headline} />
        <p className="lead experience-lead">{EXPERIENCE_INTRO.lead}</p>
        <FadeUp className="cv-release-wrap" delay={140} y={16}>
          <a
            className="cv-release"
            href={CV.href}
            download={CV.fileName}
          >
            <span className="cv-release-top">
              <span className="cv-release-label">Download My CV</span>
              <span className="cv-release-arrow" aria-hidden="true">
                ↓
              </span>
            </span>
            <span className="cv-release-rule" aria-hidden="true" />
            <span className="cv-release-meta">
              <span>PDF Document</span>
              <span>01 File</span>
            </span>
          </a>
        </FadeUp>
      </div>
    </section>
  );
}
