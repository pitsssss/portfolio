import { Eyebrow } from "@/components/eyebrow";
import { FadeUp, RevealHeading } from "@/components/reveal";
import { ADDITIONAL_WORK, PROJECTS, WORK, type Project } from "@/content/projects";

function ProjectLinks({ project }: { project: Project }) {
  if (project.confidential) {
    return <p className="work-private">Confidential Client Work</p>;
  }

  if (project.links.length === 0) {
    return null;
  }

  return (
    <ul className="work-links">
      {project.links.map((link) => (
        <li key={link.href}>
          <a
            className="work-link"
            href={link.href}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={`${link.label} for ${project.title}`}
          >
            <span className="social-rule" aria-hidden="true" />
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  );
}

function ProjectPiece({ project }: { project: Project }) {
  return (
    <article className={`work-piece work-${project.layout}`} id={project.slug}>
      <div className="work-index" aria-hidden="true">
        {project.number}
      </div>
      <div className="work-body">
        <p className="work-category">{project.category}</p>
        <h3 className="work-title">{project.title}</h3>
        <p className="work-subtitle">{project.subtitle}</p>
        <p className="work-statement">{project.featuredStatement}</p>
        <p className="work-description">{project.description}</p>
        {project.challenge ? <p className="work-challenge">{project.challenge}</p> : null}
        <dl className="work-facts">
          <div>
            <dt>Role</dt>
            <dd>{project.role}</dd>
          </div>
          <div>
            <dt>Context</dt>
            <dd>{project.projectType}</dd>
          </div>
        </dl>
        <ul className="work-tech" aria-label={`${project.title} technologies`}>
          {project.technologies.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <details className="work-more">
          <summary>Engineering highlights</summary>
          <ul>
            {project.engineeringHighlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </details>
        <ProjectLinks project={project} />
      </div>
    </article>
  );
}

export function Projects() {
  return (
    <section className="section" id="work">
      <div className="section-head">
        <div>
          <Eyebrow>{WORK.eyebrow}</Eyebrow>
          <RevealHeading className="venture-title" text={WORK.headline} />
        </div>
        <div className="section-notes">
          <p className="lead section-lead">{WORK.lead}</p>
          <p className="section-note">{WORK.note}</p>
        </div>
      </div>

      <div className="work-list">
        {PROJECTS.map((project, index) => (
          <FadeUp key={project.id} delay={index % 2 === 1 ? 80 : 0} y={28}>
            <ProjectPiece project={project} />
          </FadeUp>
        ))}
      </div>

      <div className="additional-work">
        <h3 className="additional-title">Additional work</h3>
        <ul>
          {ADDITIONAL_WORK.map((item) => (
            <li key={item.id}>
              <p className="work-category">{item.category}</p>
              <h4>{item.title}</h4>
              <p className="work-role">{item.role}</p>
              <p className="work-description">{item.description}</p>
              {"technologies" in item ? (
                <ul className="work-tech" aria-label={`${item.title} technologies`}>
                  {item.technologies.map((tech) => (
                    <li key={tech}>{tech}</li>
                  ))}
                </ul>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
