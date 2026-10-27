export interface SkillGroup {
  category: string;
  command: string;
  isLearning?: boolean;
  skills: {
    name: string;
    level?: string;
    badge?: string;
  }[];
}

export const skillGroups: SkillGroup[] = [
  {
    category: 'Active Focus & RHCSA Learning',
    command: '$ rpm -qa | grep -E "rhcsa|rhel|ansible"',
    isLearning: true,
    skills: [
      { name: 'Red Hat Certified System Administrator (RHCSA)', badge: 'Exam Prep' },
      { name: 'RHEL 9 Administration', badge: 'Active Focus' },
      { name: 'SELinux (Targeted Policy & Enforcing Mode)' },
      { name: 'firewalld & Network Packet Filtering' },
      { name: 'LVM (Logical Volume Management)' },
      { name: 'systemd Services, Timers & Resource Limits' },
      { name: 'Ansible (Playbooks, Roles & Idempotent Automation)' },
      { name: 'Bash Scripting & Automation' },
    ],
  },
  {
    category: 'DevOps, CI/CD & Cloud Infrastructure',
    command: '$ git log --oneline -n 1 && gh workflow status',
    skills: [
      { name: 'Git & Trunk/Feature-Branch Workflows' },
      { name: 'GitHub Actions (Multi-language Path Filtering)' },
      { name: 'Docker (Container Fundamentals & Multi-stage Builds)' },
      { name: 'Vercel Edge Deployment' },
      { name: 'Render Cloud Platform' },
      { name: 'SSH Key Hardening & Linux Remote Management' },
    ],
  },
  {
    category: 'Backend & Systems Engineering',
    command: '$ node --version && express --health',
    skills: [
      { name: 'Node.js & Express' },
      { name: 'RESTful API Architecture' },
      { name: 'JWT Authentication & Session Management' },
      { name: 'Granular RBAC (Role-Based Access Control)' },
      { name: 'Multi-Tenant System Design' },
      { name: 'Microservices Architecture' },
    ],
  },
  {
    category: 'Databases & Data Modeling',
    command: '$ psql -c "\\l" && mysql -e "SHOW STATUS;"',
    skills: [
      { name: 'PostgreSQL' },
      { name: 'MySQL' },
      { name: 'SQLite' },
      { name: 'Drizzle ORM' },
      { name: 'SQL Query Optimization & Indexing' },
      { name: 'ACID Transactional Integrity & Rollback Safety' },
    ],
  },
  {
    category: 'Frontend Engineering',
    command: '$ npx next info --summary',
    skills: [
      { name: 'React' },
      { name: 'Next.js (App Router)' },
      { name: 'TypeScript' },
      { name: 'Tailwind CSS' },
      { name: 'GSAP Animation Suite' },
      { name: 'React Native' },
      { name: 'Responsive Web Design' },
      { name: 'WCAG Accessibility Standards' },
    ],
  },
  {
    category: 'Languages & Architecture',
    command: '$ cat /etc/environment-skills',
    skills: [
      { name: 'TypeScript' },
      { name: 'JavaScript (ESNext)' },
      { name: 'Python' },
      { name: 'SQL' },
      { name: 'Clean Architecture' },
      { name: 'SOLID Design Principles' },
      { name: 'Paystack Payment API Integration' },
    ],
  },
];
