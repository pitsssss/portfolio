export const SERVICES_INTRO = {
  eyebrow: "03 / Services",
  headline: "From the first decision to the final implementation.",
  lead: "I help turn ideas, business requirements, and technical challenges into well-engineered digital products.",
} as const;

export const SERVICES = [
  {
    index: "01",
    title: "Full-Stack Web Development",
    copy: "I design and develop complete web applications, from responsive user interfaces to backend APIs, database integration, and production-oriented delivery.",
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
    copy: "I build and improve backend foundations for applications with complex business workflows, integrations, and data requirements.",
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
    copy: "I integrate practical AI capabilities into existing products and workflows, connecting language models with application logic, tools, and controlled actions.",
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
    copy: "I help shape software before and during development by translating operational needs into clear workflows, requirements, technical designs, and usable interfaces.",
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
  note: "A working set from real projects. Not a ranking, and not a claim of equal depth in every tool.",
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
