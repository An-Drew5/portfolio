export interface ProjectPhase {
  number: number;
  title: string;
  description: string;
  status: 'in-progress' | 'planned';
}

export interface Project {
  slug: string;
  title: string;
  shortDescription: string;
  category: string;
  status: 'in-progress' | 'active (running)' | 'planned';
  featured: boolean;
  role: string;
  teamSize?: string;
  problem: string;
  keyDecisions: string[];
  stack: string[];
  resultStatus: string;
  liveUrl?: string;
  githubUrl?: string;
  repoPlaceholder?: string;
  archDiagramPlaceholder?: string;
  phases?: ProjectPhase[];
  highlights: string[];
}

export const projects: Project[] = [
  {
    slug: 'arrow-devops',
    title: 'Arrow: Production Self-Hosting on Hardened RHEL',
    shortDescription:
      'Running Arrow multi-tenant SaaS on enterprise Red Hat Enterprise Linux (RHEL) with SELinux, systemd isolation, automated backups, and CI/CD.',
    category: 'DevOps & Linux Sysadmin',
    status: 'in-progress',
    featured: true,
    role: 'Infrastructure & Systems Engineer (Solo, studying for RHCSA)',
    problem:
      'Taking Arrow (a multi-tenant school management SaaS) from PaaS hosting to an enterprise self-hosted environment, configured the way a real infrastructure team operates on an enterprise RHEL server.',
    keyDecisions: [
      'Standardized on RHEL 9 for enterprise stability, FIPS compliance readiness, and alignment with RHCSA practical competencies.',
      'Enforced strict SELinux targeted policies and minimal firewalld service exposure rather than disabling security controls.',
      'Structured PostgreSQL and Node.js runtimes under unprivileged system accounts managed as discrete systemd service units.',
      'Designed automated backup pipelines with cryptographic verification before committing to offsite synchronization.',
      'Planned zero-downtime SSH deployments via automated GitHub Actions with pre-flight smoke tests.',
    ],
    stack: [
      'Red Hat Enterprise Linux (RHEL 9)',
      'SELinux',
      'firewalld',
      'systemd',
      'LVM',
      'Nginx',
      'PostgreSQL',
      'Node.js',
      'GitHub Actions',
      'Ansible',
      'Prometheus',
      'Grafana',
    ],
    resultStatus:
      'Active development environment in progress. Currently validating Phase 1 hardening and systemd service profiles. RHCSA exam preparation ongoing.',
    githubUrl: 'https://github.com/An-Drew5/arrow-ops',
    repoPlaceholder: 'GitHub repository: arrow-ops (private while hardening, will be public upon baseline release)',
    archDiagramPlaceholder:
      'Architecture: Client TLS -> Nginx Reverse Proxy -> Node.js systemd Service -> PostgreSQL on LVM Volume (with SELinux contexts enforced)',
    highlights: [
      'Enterprise RHEL 9 baseline configuration with SELinux in enforcing mode',
      'LVM storage allocation for independent DB and app log growth',
      'Fully automated GitHub Actions deployment over hardened SSH',
      'Ansible playbooks for idempotent provisioning from bare OS',
    ],
    phases: [
      {
        number: 1,
        title: 'RHEL 9 VM, Hardening & Perimeter Defense',
        description: 'Provisioned RHEL 9 VM, dedicated non-root ops users, key-only SSH, firewalld zone rules, and enforcing SELinux.',
        status: 'in-progress',
      },
      {
        number: 2,
        title: 'LVM Storage & systemd Service Isolation',
        description: 'LVM-backed dynamic volume allocation; isolated PostgreSQL and Node.js application daemonized as systemd units with resource limits.',
        status: 'planned',
      },
      {
        number: 3,
        title: 'Nginx Reverse Proxy & Automated TLS',
        description: "Hardened Nginx edge with modern TLS 1.3 ciphers, Let's Encrypt automated certbot renewal, and HTTP/2 proxying.",
        status: 'planned',
      },
      {
        number: 4,
        title: 'Automated & Tested Backup Pipeline',
        description: 'Scheduled, checksummed database snapshots, retention lifecycle management, and disaster recovery restore verification scripts.',
        status: 'planned',
      },
      {
        number: 5,
        title: 'GitHub Actions SSH Deployment Pipeline',
        description: 'CI/CD runner triggering zero-downtime blue/green deployment over SSH with rollbacks upon failed health checks.',
        status: 'planned',
      },
      {
        number: 6,
        title: 'Prometheus & Grafana Observability',
        description: 'Node exporter telemetry, PostgreSQL metrics collector, and real-time Grafana system dashboards with alert triggers.',
        status: 'planned',
      },
      {
        number: 7,
        title: 'Idempotent Ansible Provisioning',
        description: 'Infrastructure as Code playbook recreating the complete hardened RHEL production environment from scratch in minutes.',
        status: 'planned',
      },
    ],
  },
  {
    slug: 'smart-study',
    title: 'Smart Study: AI-Powered BECE Exam Prep Platform',
    shortDescription:
      'Next.js 14 frontend, resilient flashcard engine with spaced repetition, and 5 path-filtered GitHub Actions CI/CD pipelines across polyglot microservices.',
    category: 'Frontend & CI/CD Engineering',
    status: 'active (running)',
    featured: true,
    role: 'Frontend Engineer & CI/CD Owner',
    teamSize: '5-person cross-functional capstone team',
    problem:
      'Junior high students in Ghana preparing for the BECE needed an adaptive, accessible digital platform with instant AI explanations and timed exam simulations across mobile and desktop.',
    keyDecisions: [
      'Built a high-performance Next.js App Router frontend with custom design system and responsive navigation.',
      'Developed an interactive flashcard engine featuring automatic requeueing of missed questions in both timed and untimed modes.',
      'Engineered secure JWT authentication via httpOnly cookies with automatic token refresh to prevent XSS credential leakage.',
      'Shipped an AI study assistant with dual surfaces: a dedicated deep-dive page and a persistent global collapsible widget.',
      'Architected 5 path-filtered GitHub Actions workflows across a polyglot backend (TypeScript, PHP, Python x2), eliminating cross-language build failures.',
    ],
    stack: [
      'Next.js 14',
      'TypeScript',
      'Tailwind CSS',
      'GitHub Actions',
      'JWT Auth',
      'AI Assistant API',
      'Vercel',
      'Polyglot Microservices',
    ],
    resultStatus:
      'Successfully deployed to production on Vercel. Handled simulated student exam sessions with zero auth desync and streamlined 5-engineer team velocity.',
    liveUrl: 'https://smart-study-woad.vercel.app',
    githubUrl: 'https://github.com/An-Drew5/smart-study',
    highlights: [
      'Engineered 5 path-filtered GitHub Actions CI/CD pipelines across polyglot microservices',
      'Dynamic MCQ flashcard engine with automatic missed-question requeueing',
      'Secure httpOnly cookie JWT authentication architecture',
      'Dual-surface AI assistant (collapsible widget + dedicated page)',
    ],
  },
  {
    slug: 'arrow-saas',
    title: 'Arrow: Multi-Tenant School Management SaaS',
    shortDescription:
      'Solo-built multi-tenant school ERP with tenant-isolated data, granular RBAC scoping, and transactional rollback-safe student enrollment.',
    category: 'Full-Stack SaaS Engineering',
    status: 'active (running)',
    featured: true,
    role: 'Solo Full-Stack Developer',
    problem:
      'Schools required an intuitive administrative ERP that prevents cross-tenant data leaks, strictly bounds teacher visibility by subject/class, and handles atomic student record creation without orphaned data.',
    keyDecisions: [
      'Implemented database tenant isolation with tenant-scoped JWT claims enforced at both API gateway and data access layers.',
      'Designed granular RBAC scoping teacher permissions specifically by assigned class and subject, rather than broad role-wide grants.',
      'Enforced atomic PostgreSQL transactions across student records, class enrollments, and guardian links to ensure zero orphaned data on failure.',
      'Implemented concurrency-safe, human-readable student ID generation avoiding counter race conditions.',
      'Created a flexible, non-hardcoded grading engine adaptable to varying national and institutional assessment rubrics.',
    ],
    stack: [
      'React',
      'Vite',
      'Node.js',
      'Express',
      'PostgreSQL',
      'JWT Auth',
      'RBAC',
      'Tailwind CSS',
    ],
    resultStatus:
      'Deployed on Vercel and cloud database. Successfully tested across multiple concurrent test school tenants with zero data contamination.',
    liveUrl: 'https://arrow-management-system.vercel.app',
    githubUrl: 'https://github.com/An-Drew5/arrow-management-system',
    highlights: [
      'Complete multi-tenant isolation across independent school domains',
      'Granular subject-and-class-level RBAC for teachers and staff',
      'ACID transactional student enrollment ensuring zero orphaned records',
      'Concurrency-safe human-readable student ID generation engine',
    ],
  },
  {
    slug: 'quick-curtains',
    title: 'Quick Curtains & Deco: E-Commerce Platform',
    shortDescription:
      'Modern home decor storefront with dynamic catalog filtering, Paystack payment gateway integration, and responsive checkout.',
    category: 'E-Commerce & Payments',
    status: 'active (running)',
    featured: false,
    role: 'Frontend & Integrations Developer',
    problem:
      'A bespoke interior decor business needed a responsive catalog storefront that allows customers to filter fabrics and seamlessly pay via Ghanaian mobile money and cards.',
    keyDecisions: [
      'Engineered a fast React + TypeScript storefront with optimized client-side filtering and search across large product catalogs.',
      'Integrated Paystack API for real-time local currency transactions with verified webhook confirmations.',
      'Designed a modular UI component system ensuring seamless mobile-first browsing on low-bandwidth connections.',
    ],
    stack: [
      'React',
      'TypeScript',
      'Paystack API',
      'Tailwind CSS',
      'Vite',
      'Vercel',
    ],
    resultStatus:
      'Live in production. Successfully processes secure mobile money and card transactions with automated order logging.',
    liveUrl: 'https://quick-curtains-and-deco.vercel.app',
    githubUrl: 'https://github.com/An-Drew5/quick-curtains-and-deco',
    highlights: [
      'Seamless Paystack payment gateway integration with webhook confirmation',
      'High-performance client-side catalog filtering and state management',
      'Mobile-optimized commerce checkout tailored for Ghanaian market',
    ],
  },
];
