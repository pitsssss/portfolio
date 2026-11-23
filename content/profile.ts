export const SITE_URL = "https://peter-toss-portfolio.vercel.app";

export const NAV = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
] as const;

export const MARQUEE = [
  "Software Architecture",
  "Full-Stack Development",
  "Applied AI",
  "Backend Systems",
  "Product Engineering",
] as const;

export const CONTACT = {
  email: "petertoss2004@gmail.com",
  mailto: "mailto:petertoss2004@gmail.com",
  github: "https://github.com/pitsssss",
  linkedin: "https://www.linkedin.com/in/peter-toss",
} as const;

export const HERO = {
  eyebrow: "Peter Toss / Software Engineer",
  identity: ["Full-Stack", "Software Engineer."],
  headline: "I engineer digital products from idea to implementation.",
  paragraph:
    "I turn complex requirements into thoughtful interfaces, reliable backend systems, and practical AI-powered experiences — connecting product thinking with hands-on software engineering.",
  specialization: "Software Architecture · Full-Stack Development · Applied AI",
  primary: { label: "Explore My Work", href: "#work" },
  secondary: { label: "Let's Talk", href: "#contact" },
} as const;

export const ABOUT = {
  eyebrow: "01 / About",
  headline: "I think beyond the interface.",
  paragraphs: [
    "I'm Peter Toss, a Full-Stack Software Engineer with a foundation in software architecture, system analysis, and product development.",
    "My work starts before the first line of code. I like understanding the problem, mapping the workflows, and identifying the decisions that will shape the system.",
    "From there, I work across the stack — building interfaces, designing APIs, modeling data, integrating services, and making sure the pieces work together.",
    "I've contributed to professional web platforms, internal business systems, and end-to-end engineering projects. I also work with practical AI integrations, including LLM-powered features, controlled agents, and workflow automation.",
    "What matters most to me is building software that solves real problems, remains understandable, and can evolve without becoming fragile.",
  ],
  statement: "Good software is not just written. It's understood, designed, tested, and improved.",
} as const;

export const PRINCIPLES = [
  {
    index: "01",
    title: "Understand before building",
    copy: "I start with the business problem, user needs, workflows, and constraints before deciding how the software should work.",
  },
  {
    index: "02",
    title: "Engineer the full system",
    copy: "I connect the interface, API, database, and integrations so the product behaves as one coherent system.",
  },
  {
    index: "03",
    title: "Build for real conditions",
    copy: "Permissions, validation, failure handling, maintainability, and testing are part of the implementation — not afterthoughts.",
  },
  {
    index: "04",
    title: "Use AI with purpose",
    copy: "I integrate AI where it adds real value, while keeping business rules, sensitive operations, and critical decisions under application control.",
  },
] as const;
