import { Eyebrow } from "@/components/eyebrow";
import { ProjectCard } from "@/components/project-card";
import { RevealHeading } from "@/components/reveal";

const PROJECTS = [
  {
    index: "01",
    name: "Product platforms",
    category: "Full stack",
    stack: "Next.js · APIs",
    focus: "Web products",
    blurb: "Applications with a considered interface and the services, auth, and data behind them.",
  },
  {
    index: "02",
    name: "AI in the product",
    category: "AI engineering",
    stack: "Models · Evals",
    focus: "Applied AI",
    blurb: "Retrieval, tools, and evaluation wired into a flow a person can actually use.",
  },
  {
    index: "03",
    name: "Agent workflows",
    category: "AI systems",
    stack: "Tools · Orchestration",
    focus: "Agents",
    blurb: "Multi-step systems that call tools, keep context, and fail in ways you can see and fix.",
  },
  {
    index: "04",
    name: "Interface to system",
    category: "Product engineering",
    stack: "UI · Backend",
    focus: "End to end",
    blurb: "From the first screen to the production path — one build, not a handoff between specialties.",
  },
];

export function Projects() {
  return (
    <section className="section" id="projects">
      <div className="section-head">
        <div>
          <Eyebrow>Projects</Eyebrow>
          <RevealHeading className="venture-title" text="The work I take apart and ship." />
        </div>
        <p className="section-kicker">04 / Focus areas</p>
      </div>

      <ul className="venture-list">
        {PROJECTS.map((project, index) => (
          <ProjectCard key={project.name} project={project} offset={index % 2 === 1} />
        ))}
      </ul>
    </section>
  );
}
