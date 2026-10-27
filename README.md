# Andrews Oppong — Engineering Portfolio

> **Role:** Full-Stack Engineer → DevOps & Linux Systems Administration (RHCSA Candidate)  
> **Aesthetic:** "Terminal, but premium" — Refined developer tool aesthetics, dark mode default, warm paper light mode, monospace accents, zero matrix clichés.  
> **Deployment Target:** Vercel Edge Network  

[![CI & Quality Gate](https://github.com/An-Drew5/portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/An-Drew5/portfolio/actions)

---

## 🛠️ Stack & Architecture

- **Framework:** Next.js 14 (App Router) + TypeScript (`strict: true`)
- **Styling:** Tailwind CSS with design tokens mapped to CSS custom variables (`--bg-primary`, `--accent`, `--border-subtle`)
- **Typography:** JetBrains Mono (terminal elements, prompts, status pills) + Inter (headings, body copy) via `next/font`
- **Theming:** `next-themes` (Dark near-black default `#0b0d0e`, Warm paper light `#f6f4ee`, zero flash of unstyled theme)
- **Interactive UI:** Command palette (`Ctrl/Cmd + K`), cursor-following card glow, skippable typing terminal hero, interactive 7-phase RHEL deployment roadmap
- **Contact Dispatch:** Next.js Route Handler `app/api/contact/route.ts` with Zod validation, honeypot spam protection, in-memory rate limiting, and **Resend** email transmission
- **CI/CD:** GitHub Actions workflow running ESLint, TypeScript compilation check, and Next.js production build

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js `v20.x` or `v22.x`
- npm `v10.x` or higher

### 2. Installation
```bash
git clone https://github.com/An-Drew5/portfolio.git
cd portfolio
npm install
```

### 3. Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

| Variable | Description | Default / Example |
|---|---|---|
| `RESEND_API_KEY` | Resend API key for live email delivery | `re_123456789...` |
| `CONTACT_TO_EMAIL` | Inbox destination for contact submissions | `andrewoppong123@gmail.com` |
| `CONTACT_FROM_EMAIL` | Verified sender in Resend | `onboarding@resend.dev` (testing) |

> **Note on Testing the Contact Form Locally:**  
> If `RESEND_API_KEY` is not provided in `.env.local`, the contact API route automatically operates in **Local Test Simulation Mode**, returning a successful response without failing. When you obtain a live key from [resend.com](https://resend.com), paste it into `.env.local` to send real emails to `andrewoppong123@gmail.com`.

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📸 How to Swap the Profile Photo

The `<ProfilePhoto />` component reads directly from:
```
public/images/andrews.jpg
```
- **Recommended image resolution:** `600px x 600px` (square 1:1 aspect ratio), high-resolution JPG or PNG.
- **Graceful Fallback:** While the file is not yet dropped in, the component automatically renders a high-end terminal frame with Andrews' initials (`OA`), status reticles, and the `[RHEL 9]` indicator.
- To swap: simply save your photo as `andrews.jpg` inside the `public/images/` directory. No code changes required!

---

## 📄 How to Place the Resume PDF

Download buttons throughout the site point canonically to:
```
public/Oppong_Andrews_Resume.pdf
```
- Drop your finalized resume into `public/Oppong_Andrews_Resume.pdf`.
- All buttons use `download="Oppong_Andrews_Resume.pdf"` for instant download across desktop and mobile.

---

## ✏️ How to Edit Site Content

All copy and project details are decoupled in typed data files inside `/content`:
- `content/site.ts`: Site metadata, hero commands, navigation links, Kumasi timezone, social URLs.
- `content/projects.ts`: Project case studies, 7-phase RHEL deployment roadmap, technical stack lists, and GitHub/live links.
- `content/experience.ts`: Work history (Amalitech, Xcelsz, Ghana COCOBOD sysadmin), achievements, and education.
- `content/skills.ts`: Grouped skills grid, including the highlighted RHCSA learning track.

---

## 🌐 Deploying to Vercel

1. Push your repository to GitHub.
2. Sign in to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Select your GitHub repository.
4. Under **Environment Variables**, add:
   - `RESEND_API_KEY`
   - `CONTACT_TO_EMAIL` (`andrewoppong123@gmail.com`)
   - `CONTACT_FROM_EMAIL`
5. Click **Deploy**. Vercel will build the Next.js App Router application automatically.

---

## 📜 License
MIT © Andrews Oppong
