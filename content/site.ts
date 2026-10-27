export interface NavItem {
  label: string;
  href: string;
  id: string;
}

export interface SiteConfig {
  name: string;
  shortName: string;
  title: string;
  description: string;
  role: string;
  positioning: string;
  location: string;
  timezone: string;
  email: string;
  github: string;
  linkedin: string;
  cvPath: string;
  navItems: NavItem[];
  heroTerminal: {
    user: string;
    host: string;
    command1: string;
    output1: string;
    command2: string;
    output2: string;
  };
  currently: {
    status: 'in-progress' | 'active' | 'planned';
    heading: string;
    text: string;
    targetRole: string;
    certGoal: string;
    projectSlug: string;
  };
}

export const siteConfig: SiteConfig = {
  name: 'Andrews Oppong',
  shortName: 'OA',
  title: 'Andrews Oppong | Full-Stack Engineer → DevOps & Linux Sysadmin',
  description:
    'Full-stack engineer who ships multi-tenant SaaS and owns CI/CD, now building toward DevOps and Linux systems administration (RHCSA candidate) on RHEL.',
  role: 'Full-Stack Engineer → DevOps & Linux Systems Administration',
  positioning:
    'Full-stack engineer who ships multi-tenant SaaS and owns CI/CD, now building toward DevOps and Linux systems administration.',
  location: 'Kumasi, Ghana',
  timezone: 'Africa/Accra',
  email: 'andrewoppong123@gmail.com',
  github: 'https://github.com/An-Drew5',
  linkedin: 'https://linkedin.com/in/andrews-oppong001',
  cvPath: '/Oppong_Andrews_Resume.pdf',
  navItems: [
    { label: 'Home', href: '/', id: 'nav-home' },
    { label: 'Projects', href: '/projects', id: 'nav-projects' },
    { label: 'About', href: '/about', id: 'nav-about' },
    { label: 'Contact', href: '/contact', id: 'nav-contact' },
  ],
  heroTerminal: {
    user: 'andrews',
    host: 'rhel-host',
    command1: 'whoami',
    output1: 'andrews-oppong — full-stack engineer → devops',
    command2: 'cat currently.txt',
    output2: 'Studying for RHCSA. Building a hardened, automated deployment of Arrow on RHEL.',
  },
  currently: {
    status: 'in-progress',
    heading: 'Current Focus: RHCSA & Production RHEL Operations',
    text: 'Building a hardened, automated deployment of Arrow on RHEL 9 with SELinux enforcing, systemd service isolation, and automated CI/CD pipelines.',
    targetRole: 'DevOps / Systems Administration',
    certGoal: 'Red Hat Certified System Administrator (RHCSA)',
    projectSlug: 'arrow-devops',
  },
};
