export const SERVICES_INTRO = {
  eyebrow: "03 / Services",
  headline: "From the first decision to the final implementation.",
  lead: "I help turn ideas, business requirements, and technical challenges into well-engineered digital products.",
} as const;

export const SERVICES = [
  {
    index: "01",
    title: "Full-Stack Web Development",
    copy: "Interfaces, APIs, data, and delivery as one product.",
    capabilities: [
      "Next.js & React",
      "Laravel & Node.js ecosystems",
      "REST API integration",
      "Authentication & permissions",
      "Responsive interfaces",
      "Database-backed applications",
    ],
  },
  {
    index: "02",
    title: "Backend Systems & Architecture",
    copy: "Workflows, integrations, and data that stay consistent.",
    capabilities: [
      "System architecture",
      "Domain and business logic",
      "REST API design",
      "Relational database modeling",
      "Authentication & RBAC",
      "Transactions & data integrity",
      "Background jobs",
      "Testing and performance analysis",
    ],
  },
  {
    index: "03",
    title: "AI Integration & Automation",
    copy: "AI features wired to real logic, with control kept in the product.",
    capabilities: [
      "LLM API integration",
      "AI-powered product features",
      "Controlled AI agents",
      "Tool integrations",
      "Workflow automation",
      "n8n",
      "Human confirmation and validation flows",
    ],
  },
  {
    index: "04",
    title: "System Analysis & Product Engineering",
    copy: "Needs turned into workflows, requirements, and interfaces.",
    capabilities: [
      "Requirements analysis",
      "Business process modeling",
      "User journeys",
      "Use cases and specifications",
      "UX structure",
      "Software architecture planning",
      "Technical documentation",
      "Product-development collaboration",
    ],
  },
] as const;

export const TOOLS = {
  headline: "Tools change. Engineering fundamentals stay.",
  note: "A working set from real projects. Not a ranking.",
  groups: [
    {
      label: "Frontend",
      items: ["Next.js", "React", "TypeScript", "JavaScript", "Tailwind CSS"],
    },
    {
      label: "Backend",
      items: ["Laravel", "PHP", "Node.js", "REST APIs"],
    },
    {
      label: "Databases",
      items: ["MySQL", "PostgreSQL", "MariaDB"],
    },
    {
      label: "Architecture & Security",
      items: [
        "Requirements Engineering",
        "Software Architecture",
        "Database Design",
        "Authentication",
        "RBAC",
        "System Integration",
      ],
    },
    {
      label: "Delivery",
      items: ["Git", "GitHub", "GitLab", "Docker", "CI/CD", "Postman", "Vercel", "Railway", "Render"],
    },
    {
      label: "Applied AI",
      items: ["Gemini API", "LLM Integration", "AI Agents", "Workflow Automation", "Python", "n8n"],
    },
  ],
} as const;
