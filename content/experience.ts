export interface TimelineItem {
  period: string;
  role: string;
  organization: string;
  location: string;
  type: 'work' | 'education';
  commandLabel: string;
  summary: string;
  achievements: string[];
  skills: string[];
  isSysadminAdjacent?: boolean;
}

export const experiences: TimelineItem[] = [
  {
    period: 'Sep 2026 – Oct 2026',
    role: 'Software Engineering Intern (Voluntary)',
    organization: 'Amalitech',
    location: 'Takoradi / Remote, Ghana',
    type: 'work',
    commandLabel: '$ systemctl status amalitech.service',
    summary:
      'Owned frontend architecture and delivery for Smart Study within a 5-person cross-functional team, spearheading continuous integration and robust release management.',
    achievements: [
      'Designed and deployed 5 path-filtered GitHub Actions pipelines across a polyglot microservices backend (TypeScript, PHP, Python ×2), eliminating cross-language build failures.',
      'Established disciplined Git branching and PR workflow (feature → develop → main) across 5 engineers.',
      'Safely recovered from an accidental production-branch merge using clean revert-based practices without service interruption.',
      'Architected secure JWT authentication via httpOnly cookies and integrated dual-surface AI assistant (collapsible widget and dedicated page).',
      'Configured Vercel production deployment including monorepo routing, edge rewrites, and environment variable security.',
    ],
    skills: ['Next.js 14', 'TypeScript', 'GitHub Actions', 'CI/CD Pipelines', 'Git Flow', 'JWT Auth', 'Vercel'],
  },
  {
    period: 'Jun 2025 – Dec 2025',
    role: 'Full-Stack Engineering Intern',
    organization: 'Xcelsz Solutions',
    location: 'Kumasi, Ghana',
    type: 'work',
    commandLabel: '$ systemctl status xcelsz-solutions.service',
    summary:
      'Engineered responsive web applications and backend microservices, optimizing query performance and building modular component libraries.',
    achievements: [
      'Developed and shipped production web interfaces using React, TypeScript, and Node.js.',
      'Designed and integrated RESTful APIs with structured validation and error handling.',
      'Executed SQL database query optimization and schema migrations using MySQL and Drizzle ORM, lowering response latencies.',
      'Contributed to code reviews, Agile sprint ceremonies, and automated testing in CI pipelines.',
    ],
    skills: ['React', 'TypeScript', 'Node.js', 'Express', 'MySQL', 'Drizzle ORM', 'REST APIs', 'Agile/Scrum'],
  },
  {
    period: 'Oct 2022 – Nov 2023',
    role: 'Information Systems Assistant (National Service)',
    organization: 'Ghana Cocoa Board (COCOBOD)',
    location: 'Kumasi, Ghana',
    type: 'work',
    commandLabel: '$ systemctl status cocobod-sysadmin.service',
    isSysadminAdjacent: true,
    summary:
      'Maintained enterprise IT infrastructure, managed localized server and network operations, and provided foundational sysadmin support across departmental computing nodes.',
    achievements: [
      'Managed and maintained workstation hardware, localized network infrastructure, switch connectivity, and office peripherals across departmental teams.',
      'Diagnosed and resolved complex operating system, network connectivity, and user access issues, sustaining high system availability.',
      'Configured local user permissions, software deployments, and system security baselines across enterprise endpoints.',
      'Communicated root causes and practical IT solutions effectively to both technical staff and non-technical stakeholders.',
    ],
    skills: ['IT Infrastructure', 'Network Troubleshooting', 'System Diagnostics', 'User Access & Permissions', 'Endpoint Security'],
  },
  {
    period: '2018 – 2022',
    role: 'BSc Information Technology',
    organization: 'University of Energy and Natural Resources (UENR)',
    location: 'Sunyani, Ghana',
    type: 'education',
    commandLabel: '$ cat education.log',
    summary:
      'Rigorous academic training in computer networking, operating systems, data structures, algorithms, database systems, and software engineering.',
    achievements: [
      'Graduated with comprehensive foundation in computer systems architecture, networking protocols (TCP/IP, DNS, subnetting), and database design.',
      'Completed practical coursework in Linux environment tooling, shell scripting, and systems analysis.',
    ],
    skills: ['Computer Networks', 'Operating Systems', 'Data Structures', 'Relational Databases', 'Linux Fundamentals'],
  },
];
