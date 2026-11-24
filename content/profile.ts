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
    "I'm Peter Toss, a full-stack engineer. I start with the problem, the workflows, and the decisions that shape the system.",
    "Then I build the interface, APIs, data, and practical AI together, so the product stays clear and able to change.",
  ],
  statement: "Good software is understood, designed, tested, and improved.",
} as const;

export const PRINCIPLES = [
  {
    index: "01",
    title: "Understand before building",
    copy: "Problem, workflows, and constraints come before the build.",
  },
  {
    index: "02",
    title: "Engineer the full system",
    copy: "Interface, API, data, and integrations act as one system.",
  },
  {
    index: "03",
    title: "Build for real conditions",
    copy: "Permissions, failure handling, and testing belong in the build.",
  },
  {
    index: "04",
    title: "Use AI with purpose",
    copy: "Used where it helps, with critical decisions kept in the product.",
  },
] as const;
