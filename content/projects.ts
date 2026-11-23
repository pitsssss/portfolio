export type ProjectLink = {
  label: string;
  href: string;
};

export type ProjectLayout = "feature" | "split" | "confidential" | "backend" | "product" | "technical";

export type Project = {
  id: string;
  slug: string;
  number: string;
  title: string;
  subtitle: string;
  category: string;
  projectType: string;
  role: string;
  description: string;
  featuredStatement: string;
  challenge?: string;
  engineeringHighlights: string[];
  technologies: string[];
  visibility: string;
  confidential: boolean;
  links: ProjectLink[];
  layout: ProjectLayout;
};

export const WORK = {
  eyebrow: "02 / Selected Work",
  headline: "Real systems. Real engineering decisions.",
  lead: "A selection of products and platforms I've helped design, build, and deliver — from complex backend workflows to user-facing digital experiences.",
  note: "Different projects. Different responsibilities. The same focus on thoughtful engineering.",
} as const;

export const PROJECTS: Project[] = [
  {
    id: "syrtak",
    slug: "syrtak",
    number: "01",
    title: "SYRTAK",
    subtitle: "Digital Licensing Management System",
    category: "End-to-End Software Engineering",
    projectType: "Software engineering graduation project",
    role: "System Analysis · Software Architecture · Backend Engineering · Dashboard Development · Applied AI",
    featuredStatement: "Engineering a controlled digital licensing journey.",
    description:
      "SYRTAK is a graduation project that simulates a government-style digital driving-license platform. It is not an official government system. The model connects citizen applications, document verification, payments, appointments, driving tests, license issuance, fines, administrative operations, and public license verification. My work ran from requirements, business rules, workflow modeling, and database design through backend implementation, the administrative dashboard, AI integration, testing, and deployment preparation. A separate team built the Flutter citizen app. I engineered the backend contracts and coordinated that integration.",
    challenge:
      "The central challenge was not simply building endpoints. It was keeping business behavior consistent across connected operations, changing application states, permissions, payment attempts, and external integrations.",
    engineeringHighlights: [
      "Laravel 12 modular monolith with domain-oriented services",
      "REST APIs and MySQL relational data modeling",
      "State-driven licensing workflows and business-rule validation",
      "Sanctum authentication, RBAC, ownership checks, and audit trails",
      "Database transactions and row-level locking for sensitive operations",
      "Stripe payment integration and webhook processing",
      "Background jobs and notification delivery",
      "Gemini-powered assistant with confirmation and backend revalidation",
      "Automated testing and controlled local performance measurement",
      "Docker-based runtime configuration",
    ],
    technologies: [
      "Laravel",
      "PHP",
      "MySQL",
      "Next.js",
      "React",
      "TypeScript",
      "REST APIs",
      "Stripe",
      "Firebase",
      "Gemini",
      "Docker",
    ],
    visibility: "Public backend source",
    confidential: false,
    links: [
      {
        label: "Backend Source Code",
        href: "https://github.com/pitsssss/DLMS_Project",
      },
    ],
    layout: "feature",
  },
  {
    id: "qasioun",
    slug: "qasioun-journey",
    number: "02",
    title: "Qasioun Journey",
    subtitle: "Tourism and investment platform",
    category: "Professional Frontend Engineering",
    projectType: "Professional team project",
    role: "Frontend Software Engineer",
    featuredStatement: "Building digital experiences for tourism and investment.",
    description:
      "Contributed to Qasioun Journey, a large digital platform for tourism and investment experiences. I developed and improved responsive interfaces, integrated backend services, and implemented user-facing workflows in React and Next.js. The work focused on usability, maintainable components, cross-device behavior, and clear interaction patterns inside a broader engineering team. I did not found the platform or own its backend.",
    engineeringHighlights: [
      "Responsive web interface development",
      "API-driven frontend workflows",
      "Reusable React component architecture",
      "User journeys and interactive features",
      "Arabic RTL improvements",
      "Performance and rendering considerations",
      "Collaboration with backend and product teams",
    ],
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "REST APIs"],
    visibility: "Public website",
    confidential: false,
    links: [{ label: "Visit Website", href: "https://qasiounjourney.com" }],
    layout: "split",
  },
  {
    id: "pms",
    slug: "procurement-management",
    number: "03",
    title: "Procurement Management System",
    subtitle: "Internal purchasing workflows",
    category: "Enterprise Software · Confidential Project",
    projectType: "Confidential client work",
    role: "System Analysis · UX Design · Frontend Engineering · API Integration",
    featuredStatement: "Turning procurement complexity into structured workflows.",
    description:
      "Worked on an internal procurement platform for organizing purchasing processes and improving operational visibility. I analyzed the business requirements and workflows, designed the user experience, built the Next.js frontend, and integrated it with backend services. The Laravel backend was implemented by another engineer.",
    engineeringHighlights: [
      "Business and system requirements analysis",
      "Workflow and user journey design",
      "UX architecture and interface design",
      "Next.js frontend development",
      "REST API integration",
      "Complex forms and administrative interfaces",
      "Coordination with backend development",
    ],
    technologies: ["Next.js", "React", "TypeScript", "REST APIs"],
    visibility: "Confidential client work",
    confidential: true,
    links: [],
    layout: "confidential",
  },
  {
    id: "fatleh",
    slug: "fatleh",
    number: "04",
    title: "FATLEH",
    subtitle: "Smart Tourism Application",
    category: "Backend Engineering · Integrations",
    projectType: "Application backend",
    role: "Backend Software Engineer",
    featuredStatement: "Connecting travel workflows through one backend.",
    description:
      "Engineered the backend for a tourism application covering travel operations, booking workflows, payments, and notifications. I built Laravel REST APIs and database structures for a Flutter client, and connected application logic with third-party travel and payment services. The work included authentication, validation, API design, administrative operations, and external-service integration.",
    engineeringHighlights: [
      "Laravel backend architecture",
      "REST APIs for Flutter integration",
      "Relational database design",
      "Authentication and authorization",
      "Amadeus travel API integration",
      "Stripe payment integration",
      "Firebase notifications",
      "Query and data-access optimization",
    ],
    technologies: ["Laravel", "PHP", "MySQL", "REST APIs", "Amadeus API", "Stripe", "Firebase"],
    visibility: "No public link",
    confidential: false,
    links: [],
    layout: "backend",
  },
  {
    id: "syria-explorer",
    slug: "syria-explorer",
    number: "05",
    title: "Syria Explorer",
    subtitle: "A public tourism prototype",
    category: "Founder-Led Digital Product",
    projectType: "Founder-led prototype",
    role: "Founder · Frontend & Product Development",
    featuredStatement: "Making Syria's destinations easier to discover.",
    description:
      "Created a digital tourism prototype for Syrian destinations, cultural heritage, and travel information. I worked on the product direction, frontend, content structure, search visibility, and performance-oriented implementation. It is a founder-led prototype, not a large travel business.",
    engineeringHighlights: [
      "Product concept and planning",
      "Next.js frontend development",
      "Structured content architecture",
      "Responsive interface design",
      "SEO fundamentals",
      "Rendering and performance improvements",
      "Deployment of a public prototype",
    ],
    technologies: ["Next.js", "React", "TypeScript", "SEO", "Web Performance"],
    visibility: "Prototype described; public domain did not resolve",
    confidential: false,
    links: [],
    layout: "product",
  },
  {
    id: "facebook-posts-api",
    slug: "facebook-posts-api",
    number: "06",
    title: "Facebook Posts API",
    subtitle: "Public source · not a hosted service",
    category: "Backend APIs · Data Integration",
    projectType: "API engineering project",
    role: "API Engineering · Integration & Testing",
    featuredStatement: "Making external content accessible through a reliable API.",
    description:
      "Developed a REST API for retrieving and serving recent public Facebook Page posts. The same codebase also normalizes Instagram profile posts. It includes request validation, API-key controls, caching with fallback behavior, error handling, and a Postman workflow for expected responses, failures, and resilience. There is no claim of public hosting, uptime, or production traffic.",
    engineeringHighlights: [
      "REST API design",
      "External data integration",
      "API-key based access",
      "Input validation and error responses",
      "Cache behavior and fallback handling",
      "Postman collection and environment",
      "Automated API verification",
    ],
    technologies: ["Next.js", "Node.js", "TypeScript", "JavaScript", "Docker", "REST APIs"],
    visibility: "Public source code",
    confidential: false,
    links: [
      {
        label: "View Source Code",
        href: "https://github.com/pitsssss/FB_-_IG_Scrapper_Tool",
      },
    ],
    layout: "technical",
  },
];

export const ADDITIONAL_WORK = [
  {
    id: "internal-operations",
    title: "Internal Operations Platform",
    category: "Confidential Professional Work",
    role: "Frontend Engineering · Requirements Analysis · UX",
    description:
      "Designed and developed the frontend of a private internal platform, from early requirements exploration and user-experience planning through interface implementation and backend integration. The work turned operational needs into useful workflows and a coherent, maintainable product experience.",
  },
  {
    id: "inventory-performance",
    title: "Distributed Inventory & Performance Engineering",
    category: "University Team Engineering Project",
    role: "Performance environment · Benchmarks · Data",
    description:
      "Contributed to a team e-commerce engineering project involving service integration and performance work. My focus was preparing the performance environment, managing datasets, running benchmarks, and reading how the application and database behaved under load. I did not build every part of the system, and the work was not production-scale validation.",
    technologies: ["Laravel", "Java", "Spring gRPC", "MySQL", "PostgreSQL", "Docker", "k6"],
  },
] as const;
