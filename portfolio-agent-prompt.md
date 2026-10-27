# Build Brief: Andrews Oppong's Portfolio Website

You are building a production-quality personal portfolio for **Oppong Andrews**, a full-stack engineer in Kumasi, Ghana, who is pivoting toward **DevOps / Sysadmin** while studying for the **RHCSA**. The site must look stunning, feel smooth, and itself be proof of engineering quality.

Work in phases. After each phase, run the build and lint, fix errors, and give a short summary before continuing. Ask me only when blocked.

---

## 1. Stack

- Next.js (App Router) + TypeScript (strict)
- Tailwind CSS with design tokens as CSS variables
- GSAP (+ ScrollTrigger) for scroll and entrance animation; Lenis for smooth scrolling (optional, must be disabled under reduced motion)
- Resend for email, via a Next.js Route Handler
- Zod for validation
- next-themes (or an equivalent) for light/dark
- next/font: **JetBrains Mono** (terminal elements, headings accents) + **Geist** or **Inter** (body)
- Deploy target: Vercel

## 2. Design direction: "Terminal, but premium"

Terminal-inspired, NOT a cheesy hacker cliché. Think refined developer tool: precise grid, generous whitespace, monospace accents, subtle motion. No matrix rain, no neon overload, no fake green-on-black everywhere.

**Dark mode (default):** near-black background (~`#0b0d0e`), soft off-white text, one accent (phosphor green ~`#4ade80` or similar), muted borders, very subtle noise/grid texture.
**Light mode:** warm paper background (~`#f6f4ee`), ink-dark text, a deeper green accent with good contrast. It must look designed, not like an inverted dark theme.

Recurring motifs (use with restraint):
- Prompt-style labels: `~/projects`, `$ whoami`, `[ok]`, `[wip]`
- Window chrome (three dots, title bar) on cards and the hero terminal
- Blinking block cursor on the hero line
- Status pills like a `systemctl status` output (`active (running)`)
- Thin 1px borders, 8px grid, rounded-lg corners

**Hero:** a terminal window that "types" a short sequence once on load, then settles into the real content:
```
$ whoami
andrews-oppong — full-stack engineer → devops
$ cat currently.txt
Studying for RHCSA. Building a hardened, automated deployment of Arrow on Rocky Linux.
```
The typing sequence must be skippable (click/keypress), must not repeat on every navigation, and must render the final content immediately for reduced-motion users and for crawlers (no content hidden from the DOM).

**Nice touches (implement if time allows, in this order):**
1. Command palette on `Ctrl/Cmd + K` to jump to pages, toggle theme, download CV, copy email
2. Subtle cursor-following glow on cards
3. Smooth page transitions
4. Footer with a fake `uptime` / local time in Kumasi (Africa/Accra)

## 3. Navigation and structure

Nav links, in this order: **Home · Projects · About · Contact**
Right side of the nav: **Download CV** button (secondary style) and a **light/dark toggle** (sun/moon icon, accessible label, remembers choice, respects system preference on first visit, no flash of wrong theme).
Mobile: a clean full-screen or slide-in menu with the same items, animated, focus-trapped, closes on route change.

Routes:
- `/` Home
- `/projects` and `/projects/[slug]` (case study pages)
- `/about`
- `/contact`

Sticky nav with a blur background that appears on scroll. Active link indicator must animate smoothly.

## 4. Page content

Use the real content below. **Do not invent metrics, employers, clients, certifications, or dates.** If something is missing, leave a clearly marked `TODO` in a content file, not in the UI.

Keep all copy in `/content` (typed data files or MDX), not hardcoded inside components.

### Home
- Hero terminal (above)
- One-line positioning: *Full-stack engineer who ships multi-tenant SaaS and owns CI/CD, now building toward DevOps and Linux systems administration.*
- CTAs: "View projects" and "Get in touch"
- "Currently" block (see Arrow DevOps project below)
- Featured projects (3 cards) with status pills
- Skills as a compact grouped grid (see below), not a wall of logos
- Short closing CTA to Contact

### Projects
Each project is a mini case study: **Problem → My role → Key decisions → Stack → Result/Status → Links.** Include a screenshot slot per project (placeholder component if no image yet) and a live link where one exists.

1. **Arrow: Production Self-Hosting on Hardened Rocky Linux** — status: **in progress** (the "currently building" project)
   - Goal: take Arrow (my multi-tenant school management SaaS) and run it the way a real ops team would, on a RHEL-compatible server.
   - Planned phases (show as an interactive progress tracker, **all phases marked planned or in progress; do not mark anything complete**):
     1. Rocky/AlmaLinux VM, users, SSH hardening, firewalld, SELinux enforcing
     2. LVM-backed storage; PostgreSQL and Node app as systemd services
     3. Nginx reverse proxy with TLS (Let's Encrypt)
     4. Automated, tested backups and restores
     5. GitHub Actions pipeline deploying over SSH
     6. Monitoring and alerting with Prometheus and Grafana
     7. Ansible to provision the whole environment from scratch
   - Include a placeholder for an architecture diagram and a link slot for the GitHub repo.
   - Tone: honest. "Studying for RHCSA" is accurate; do not claim the certification.
2. **Smart Study: AI-Powered BECE Exam Prep Platform** — https://smart-study-woad.vercel.app
   - Role: Frontend Engineer & CI/CD Owner, 5-person cross-functional capstone team.
   - Next.js (App Router, TypeScript, Tailwind) frontend for a 3-pillar platform: MCQ flashcards, an AI study assistant, articles. Custom design system, responsive navigation, flashcard engine with automatic requeueing of missed questions, timed and untimed modes.
   - Secure JWT auth via httpOnly cookies; reusable AI chat engine shipped as a full page and a global collapsible widget.
   - Owned CI/CD: 5 independent, path-filtered GitHub Actions pipelines across a polyglot microservices backend (TypeScript, PHP, Python ×2); resolved cross-language build, dependency and branch-protection failures; deployed production frontend to Vercel.
3. **Arrow: Multi-Tenant School Management SaaS** — https://arrow-management-system.vercel.app
   - Solo full-stack developer. React/Vite, Node.js/Express, PostgreSQL.
   - Tenant-isolated data and JWT auth across independent school tenants.
   - Granular RBAC scoping teacher access by class and subject, not role alone.
   - Transactional, rollback-safe student creation across student, class and guardian records.
   - Concurrency-safe human-readable student ID generation; flexible, non-hardcoded grading engine. Planned: a performance-intelligence layer to surface at-risk students.
   - Note: this is the application; project 1 is about how it gets deployed and operated.
4. **Quick Curtains & Deco: E-Commerce Platform** — https://quick-curtains-and-deco.vercel.app
   - React + TypeScript storefront, reusable components, dynamic listings, filtering.
   - Paystack integration for real checkout and transaction processing; optimized rendering; scalable state management.

### About
- A short personal story in first person that explains the move from full-stack development into DevOps/sysadmin (draft it from the CV, keep it modest and genuine, and leave it easy for me to edit).
- Photo area: use a `<ProfilePhoto />` component that reads `/public/images/andrews.jpg`. **Until the file exists, render a tasteful placeholder** (initials "OA" in a terminal-style frame). I will supply the photo later; swapping it must require only dropping in the file (note the recommended size in the README).
- Experience timeline (compact, terminal-log style):
  - **Amalitech**, Software Engineering Intern (Voluntary), Sep 2026 – Oct 2026: owned frontend architecture and delivery for Smart Study; designed 5 path-filtered GitHub Actions pipelines; established the Git branching and PR workflow (feature → develop → main) across 5 engineers and recovered safely from an accidental production-branch merge using revert-based practices; JWT auth and dual-surface AI chat; Vercel deployment including monorepo and env configuration.
  - **Xcelsz Solutions**, Full-Stack Engineering Intern, Jun 2025 – Dec 2025: React, TypeScript, Node.js features; RESTful APIs; SQL optimization with MySQL and Drizzle ORM; modular component systems; Agile sprints, code reviews, CI/CD improvements.
  - **Ghana COCOBOD**, Information Systems Assistant (National Service), Oct 2022 – Nov 2023: maintained IT infrastructure, supported network operations, resolved hardware/software issues, explained technical solutions to non-technical stakeholders. *(This is real sysadmin-adjacent experience; give it fair weight in the DevOps story.)*
  - Education: BSc Information Technology, University of Energy and Natural Resources, Sunyani, Ghana, 2018 – 2022.
- Skills (grouped):
  - Languages: JavaScript, TypeScript, Python, SQL
  - Frontend: React, Next.js (App Router), React Native, Tailwind CSS, GSAP, Material UI, Styled Components
  - Backend: Node.js, Express, REST API design, JWT auth & RBAC, microservices
  - Databases: PostgreSQL, MySQL, SQLite, SQL performance optimization and data modeling
  - DevOps & tools: Git, GitHub Actions, Docker (fundamentals), Vercel, Render
  - Integrations: Paystack
  - Architecture: Clean Architecture, SOLID, multi-tenant system design
  - **Learning (visually distinct):** RHCSA, Linux administration (SELinux, firewalld, LVM, systemd), Ansible
- Download CV button here too.

### Contact
- Heading in terminal style (e.g. `$ ./contact --new-message`)
- Form fields: name, email, subject (optional), message. A honeypot field for spam. Clear validation messages, loading state, success and error states, no page reload.
- Also show: andrewoppong123@gmail.com (with copy-to-clipboard), LinkedIn linkedin.com/in/andrews-oppong001, GitHub github.com/An-Drew5, location Kumasi, Ghana.
- Do NOT put the phone number in the HTML by default (spam scraping). Leave it out; it stays on the CV only.

## 5. Contact form: it must really send email

- `app/api/contact/route.ts` (POST), server-side only.
- Validate with Zod on both client and server; sanitize inputs; cap message length.
- Send via **Resend**. Env vars in `.env.local` and documented in `.env.example`:
  - `RESEND_API_KEY`
  - `CONTACT_TO_EMAIL` (= andrewoppong123@gmail.com)
  - `CONTACT_FROM_EMAIL` (a verified sender or Resend's onboarding address for testing)
- Set `reply-to` to the visitor's email so I can reply directly.
- Spam protection: honeypot field + simple per-IP rate limiting (in-memory is fine to start; note the limitation) + optional Cloudflare Turnstile hook left ready but disabled.
- Never expose the API key to the client. Return generic errors to the client and log details server-side.
- Write a README section on getting a Resend key and testing the form locally.

## 6. CV download

- Place the PDF at `/public/Oppong_Andrews_Resume.pdf` (I will provide the file; if it is missing, stop and tell me rather than faking one).
- The nav button uses the `download` attribute with a clean filename.

## 7. Motion and performance rules

- Animation must serve the content: staggered text reveals, scroll-triggered section entrances, magnetic or subtle hover states, smooth theme transition. Nothing that blocks reading or input.
- **Respect `prefers-reduced-motion`** everywhere (GSAP and Lenis included).
- Animate only `transform` and `opacity` where possible; no layout thrash; clean up GSAP contexts on unmount (`gsap.context` + revert).
- Target Lighthouse **90+ on all four categories** on mobile. Use `next/image`, font subsetting, no unused dependencies, lazy-load below-the-fold effects.
- Mobile-first. Test at 360px, 768px, 1280px, and 1920px. No horizontal scroll.

## 8. Accessibility and SEO

- Semantic landmarks, a skip-to-content link, visible focus rings, keyboard-operable nav, menu and command palette, AA contrast in **both** themes, proper alt text, form labels and `aria-live` for form status.
- Per-page metadata, Open Graph and Twitter cards, a generated OG image, `sitemap.xml`, `robots.txt`, JSON-LD `Person` schema.
- Favicon in the terminal style (e.g. a `>_` mark).

## 9. Code quality

- Folder layout: `app/`, `components/` (ui, layout, sections), `content/`, `lib/`, `styles/`, `public/`.
- Reusable primitives: `Button`, `Card`, `TerminalWindow`, `StatusPill`, `SectionHeading`, `Reveal`, `ThemeToggle`.
- ESLint + Prettier, no `any`, no dead code, meaningful commit messages (conventional commits).
- Add a GitHub Actions workflow that runs lint, type-check and build on every PR (this should showcase my CI skills).
- README with: overview, stack, how to run, env vars, how to swap the photo, how to edit content, how to deploy to Vercel.

## 10. Phases

1. **Foundation:** project setup, tokens, fonts, theme (no flash), layout, nav, footer, mobile menu
2. **Home:** terminal hero, currently block, featured projects, skills
3. **Projects:** list page and case study pages, including the Arrow DevOps phase tracker
4. **About and Contact:** timeline, photo component, working contact form with Resend
5. **Polish:** page transitions, command palette, scroll animations, reduced-motion pass
6. **Quality:** accessibility audit, Lighthouse, SEO, CI workflow, README
7. **Deploy:** Vercel instructions and an env-var checklist

## 11. Definition of done

- Both themes look intentional and polished
- The contact form delivers a real email end to end
- No fabricated claims anywhere in the content
- Lighthouse 90+, no console errors, build passes in CI
- Photo and CV swap require only dropping in files

Begin with Phase 1. Before writing code, briefly confirm your plan and list any files or credentials you need from me.
