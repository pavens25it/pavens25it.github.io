export type ProjectCategory = "Backend & Systems" | "Frontend & Web";

export interface Project {
  slug: string;
  index: string;
  repoName: string;
  title: string;
  subtitle: string;
  category: ProjectCategory;
  year: string;
  featured: boolean;
  shortDescription: string;
  overview: string;
  problemStatement: string;
  solution: string;
  keyFeatures: string[];
  technologies: string[];
  developmentProcess: string[];
  visualCaption: string;
  githubUrl: string;
  liveDemoUrl: string | null;
  deploymentNote: string;
  primaryLanguage: string;
}

export interface SkillCategory {
  index: string;
  title: string;
  description: string;
  items: string[];
}

export const PROFILE = {
  name: "Paven S.",
  monogram: "PS.",
  role: "Information Technology Student | Developer",
  institution: "Kongu Engineering College",
  degree: "B.Tech in Information Technology",
  location: "Perundurai, Erode, India",
  email: "pavens.25it@kongu.edu",
  github: "https://github.com/pavens25it",
  githubHandle: "@pavens25it",
  linkedin: "https://www.linkedin.com/in/paven-s-20a1b83b7/",
  portfolioRepo: "https://github.com/pavens25it/pavens25it.github.io",
  headline: "Engineering structured software for real-world problems.",
  intro:
    "Information Technology undergraduate focused on practical application development—ranging from multithreaded Java systems and relational database architectures to responsive TypeScript web interfaces.",
} as const;

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    index: "01",
    title: "Programming Languages",
    description:
      "Core languages used across academic systems, database utilities, and web applications.",
    items: ["Java", "TypeScript", "JavaScript", "SQL", "HTML", "CSS"],
  },
  {
    index: "02",
    title: "Frontend Development",
    description:
      "Component-driven interfaces, App Router architectures, and responsive web experiences.",
    items: [
      "Next.js (App Router)",
      "React",
      "Tailwind CSS",
      "Vite",
      "Responsive Design",
    ],
  },
  {
    index: "03",
    title: "Backend Development",
    description:
      "Application engines, JDBC data layers, multithreaded processing, and structured CLI tooling.",
    items: [
      "Java SE (17 / 21)",
      "JDBC",
      "Multithreading",
      "DAO Architecture",
      "Console & CLI Systems",
    ],
  },
  {
    index: "04",
    title: "Databases",
    description:
      "Relational modeling, schema constraints, and parameterized queries for academic & placement data.",
    items: [
      "MySQL 8.0",
      "PostgreSQL",
      "Relational Schema Design",
      "PreparedStatement",
    ],
  },
  {
    index: "05",
    title: "Tools & Technologies",
    description:
      "Build pipelines, automated unit testing, cloud virtual machines, and web deployment workflows.",
    items: [
      "Git & GitHub",
      "Apache Maven",
      "JUnit 5",
      "Oracle Cloud Infrastructure (OCI)",
      "Vercel",
      "Linux",
      "Windows Batch",
      "ESLint & Oxlint",
    ],
  },
];

export const PROJECTS: Project[] = [
  {
    slug: "kec-placement-eligibility-system",
    index: "01",
    repoName: "JavaTeamProject",
    title: "KEC Placement & Campus Recruitment Eligibility System",
    subtitle: "Distributed Java Placement Analytics Engine on OCI",
    category: "Backend & Systems",
    year: "2026",
    featured: true,
    shortDescription:
      "Application-host Java analytics engine for screening 500+ placement candidates with multithreaded evaluation, CSV sanitization, and remote JDBC persistence.",
    overview:
      "Built as the Application Host (Student 1 / OCI VM 1) in a two-node distributed architecture on Oracle Cloud Infrastructure. The Java engine handles candidate screening, recruitment-category weighting, multithreaded batch evaluation, CSV import and sanitization, and company shortlist exports while communicating remotely with a separate database host over JDBC.",
    problemStatement:
      "Campus recruitment drives involve screening hundreds of student records against distinct company categories, active backlog limits, critical subject cutoffs, and strict roll-number formatting—making manual spreadsheet filtering error-prone and slow to audit.",
    solution:
      "Designed a modular Maven-built Java 17 analytics engine cleanly decoupled from database administration. Connection details load from Linux environment variables (with property-file fallback), supporting both MySQL and PostgreSQL drivers, offline fallback modes, and an interactive 13-option console workflow.",
    keyFeatures: [
      "Multithreaded candidate evaluation benchmarked across 500+ student records.",
      "Active backlog gating (> 2 marked non-eligible), critical subject cutoffs, and recruitment category weighting.",
      "Structured roll-number validation and string processing using regex, substring, indexOf, and String.format.",
      "CSV import, data sanitization, and formatted company shortlist export.",
      "Dual JDBC driver support (MySQL Connector/J & PostgreSQL) configured via OCI environment variables.",
      "29 automated JUnit 5 tests verifying evaluation logic, multithreading, validation, and offline fallback.",
    ],
    technologies: [
      "Java 17",
      "Apache Maven",
      "MySQL JDBC",
      "PostgreSQL JDBC",
      "JUnit 5",
      "Oracle Cloud (OCI)",
      "Linux",
    ],
    developmentProcess: [
      "Defined clear separation of concerns between OCI VM 1 (Application Host) and OCI VM 2 (Database Host).",
      "Implemented candidate parsing, eligibility rule evaluation, and multithreaded execution pipelines in Java 17.",
      "Configured externalized environment variable connectivity for secure remote JDBC access.",
      "Verified core modules with 29 JUnit 5 tests and packaged a standalone executable fat JAR via Maven.",
    ],
    visualCaption:
      "Architectural topology: OCI VM 1 Java analytics engine connected over JDBC to remote database host VM 2.",
    githubUrl: "https://github.com/pavens25it/JavaTeamProject",
    liveDemoUrl: null,
    deploymentNote: "Packaged as an executable Maven fat JAR for OCI Linux VM / CLI execution.",
    primaryLanguage: "Java",
  },
  {
    slug: "kec-r2024-student-evaluation-system",
    index: "02",
    repoName: "KEC-R2024-Student-Evaluation-System",
    title: "KEC R2024 Student Evaluation System",
    subtitle: "Continuous Academic Assessment & SGPA Engine in Java + MySQL",
    category: "Backend & Systems",
    year: "2026",
    featured: true,
    shortDescription:
      "Console-based Java 21 & MySQL JDBC system implementing Kongu Engineering College Regulation 2024 attendance gating, weighted assessments, and SGPA mark sheets.",
    overview:
      "A relational, menu-driven Java JDBC application tailored to Kongu Engineering College (Autonomous) Regulation 2024 academic rules. It manages student records, course structures, incremental assessment phases, attendance eligibility, and institutional semester mark-sheet generation.",
    problemStatement:
      "Academic evaluation under R2024 combines distinct Theory (40/60), Practical (60/40), and Embedded (50/50) weightings alongside 75% attendance gating, medical condonation ranges (65%–74.9%), and multi-phase CIA/ESE mark entries that must never overwrite earlier assessments.",
    solution:
      "Engineered a clean DAO-layered Java architecture (StudentDAO, AcademicDAO, DBConnection) backed by a normalized MySQL 8.0 schema (kec_schema.sql) with foreign keys, check constraints, PreparedStatement queries, and externalized db.properties configuration.",
    keyFeatures: [
      "Full CRUD management for Students and Courses across Theory, Practical, and Embedded structures.",
      "Attendance gating enforcing 75% eligibility, 65%–74.9% condonation workflow, and <65% SA barring.",
      "Three-phase incremental assessment entry (CIA 1 & 2, assignments/quizzes/labs, ESE/AB) preserving prior marks atomically.",
      "Weighted R2024 grading engine computing letter grades (O, A+, A, B+, B, RA, SA, AB), grade points, and SGPA.",
      "90-column ASCII institutional Semester Mark Sheets, defaulter reports, and PENDING status handling.",
      "One-click Windows Batch utilities (compile.bat, run.bat, test.bat, view_db.bat) and seeded test data.",
    ],
    technologies: [
      "Java 21",
      "MySQL 8.0",
      "JDBC (Connector/J)",
      "SQL",
      "Windows Batch",
    ],
    developmentProcess: [
      "Modeled the Regulation 2024 relational schema in kec_schema.sql with foreign keys and integrity constraints.",
      "Built isolated DAO classes using PreparedStatement and externalized db.properties credentials.",
      "Implemented phased assessment entry, weighted course rules, and ASCII tabular reporting.",
      "Added automated seeding scripts, TestRunner verification, flowcharts, and a repository demo video.",
    ],
    visualCaption:
      "Evaluation matrix: R2024 weighted CIA/ESE split across Theory, Practical, and Embedded courses backed by MySQL.",
    githubUrl:
      "https://github.com/pavens25it/KEC-R2024-Student-Evaluation-System",
    liveDemoUrl: null,
    deploymentNote:
      "Console JDBC application with local MySQL setup and an included walkthrough video inside the repository.",
    primaryLanguage: "Java",
  },
  {
    slug: "ap-dental-care-demo",
    index: "03",
    repoName: "ap-dental-care-demo",
    title: "AP Dental Care",
    subtitle: "Config-Driven Dental Clinic Website in Next.js & TypeScript",
    category: "Frontend & Web",
    year: "2026",
    featured: true,
    shortDescription:
      "Responsive healthcare website built with Next.js App Router, React, TypeScript, and Tailwind CSS, structured around modular clinic sections and centralized data configuration.",
    overview:
      "A production-deployed clinic website demo for AP Dental Care built with Next.js App Router and TypeScript. Every content block—from treatments and patient experience to appointment and contact details—is driven from a centralized configuration module for straightforward maintenance.",
    problemStatement:
      "Local clinics often rely on fragmented static pages that are difficult to update when treatments, clinic notices, or appointment details change, while still needing clear structure and mobile responsiveness for patients.",
    solution:
      "Architected a clean modular React component tree paired with a single source-of-truth config file (src/config/clinicData), semantic SEO metadata, smooth section scrolling, and Tailwind CSS v4 styling deployed on Vercel.",
    keyFeatures: [
      "Centralized clinic data layer (clinicData) powering metadata, services, and page content.",
      "Dedicated modular sections: Navbar, NoticeBanner, Hero, AboutClinic, Treatments, PatientExperience, AppointmentSection, ContactSection, and Footer.",
      "Structured coverage of treatments including Teeth Cleaning, Root Canal Treatment, Clear Aligners, Teeth Whitening, and Dental Implants.",
      "Responsive mobile-first layout with Next.js metadata & viewport configuration.",
      "Live production deployment hosted on Vercel.",
    ],
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Lucide React",
      "Vercel",
    ],
    developmentProcess: [
      "Structured clinic content into a typed src/config/clinicData module to decouple UI from copy.",
      "Designed and built independent, reusable section components under src/components.",
      "Configured Next.js App Router SEO metadata, smooth scroll behavior, and responsive typography.",
      "Linted with ESLint and deployed live on Vercel.",
    ],
    visualCaption:
      "Component architecture: Centralized clinicData configuration driving nine modular Next.js clinic sections.",
    githubUrl: "https://github.com/pavens25it/ap-dental-care-demo",
    liveDemoUrl: "https://ap-dental-care-demo.vercel.app",
    deploymentNote: "Live deployment hosted on Vercel.",
    primaryLanguage: "TypeScript",
  },
  {
    slug: "pawfect-pet-shop-demo",
    index: "04",
    repoName: "demoPET",
    title: "Pawfect — Pet Shop Storefront",
    subtitle: "Modular Retail Web Interface Built with React, TypeScript & Vite",
    category: "Frontend & Web",
    year: "2026",
    featured: true,
    shortDescription:
      "Interactive pet shop storefront featuring category filtering, modular product and service sections, testimonials, and smooth section navigation built with React and Vite.",
    overview:
      "A storefront web application ('Pawfect — Premium Pet Shop') engineered with React 19, TypeScript, and Vite. Organized into clean domain components covering product browsing, category selection, pet services, location info, and customer inquiry flows.",
    problemStatement:
      "Retail storefronts require clear product discoverability across categories alongside store services, location details, and quick contact paths without overwhelming shoppers.",
    solution:
      "Built a fast Vite + React TypeScript application with state-driven category filtering connecting CategoryGrid and ProductGrid, complemented by smooth offset section scrolling and reusable UI components.",
    keyFeatures: [
      "Interactive category selection linking CategoryGrid directly to ProductGrid filtering.",
      "Reusable ProductCard architecture alongside dedicated Services, WhyChooseUs, About, Testimonials, and Location sections.",
      "ContactSection, ContactForm, and FloatingWhatsAppButton for accessible store inquiries.",
      "Smooth header-offset scroll navigation across storefront sections.",
      "Typed project architecture organized across components, config, types, and utils with Oxlint verification.",
    ],
    technologies: [
      "React",
      "TypeScript",
      "Vite",
      "CSS",
      "Lucide React",
      "Oxlint",
    ],
    developmentProcess: [
      "Bootstrapped a lightweight React + TypeScript workspace using Vite.",
      "Separated storefront concerns into typed data configs, utilities, and 15 focused UI components.",
      "Wired interactive category state and smooth offset scrolling in App.tsx.",
      "Verified TypeScript compilation (tsc -b) and linting with Oxlint.",
    ],
    visualCaption:
      "Storefront structure: Category state filtering connected across modular Vite + React retail components.",
    githubUrl: "https://github.com/pavens25it/demoPET",
    liveDemoUrl: null,
    deploymentNote: "Source repository built with Vite (npm run dev / npm run build).",
    primaryLanguage: "TypeScript",
  },
];

export const PROJECT_CATEGORIES: Array<"All" | ProjectCategory> = [
  "All",
  "Backend & Systems",
  "Frontend & Web",
];

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((project) => project.slug === slug);
}
