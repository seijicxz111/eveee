<<<<<<< HEAD
# Seijicxz Portfolio — Chiikawa Theme 🐾

A fully redesigned portfolio built with **Next.js 14**, **Tailwind CSS**, **Framer Motion**, and **Three.js**, featuring a soft Chiikawa-inspired aesthetic using a custom blue palette.

---

## ✨ Tech Stack

| Tech | Version | Purpose |
|------|---------|---------|
| Next.js | 14 | App Router, SSR/SSG |
| Tailwind CSS | 3 | Utility-first styling |
| Framer Motion | 11 | Animations & transitions |
| Three.js | 0.165 | 3D floating bubble background |

---

## 🎨 Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `--deep` | `#355872` | Primary text, buttons |
| `--mid` | `#7AAACE` | Accents, borders |
| `--sky` | `#9CD5FF` | Highlights, soft backgrounds |
| `--cream` | `#F7F8F0` | Page background |
| `--petal` | `#F9C5D1` | Soft pink accents |

---

## 📁 Folder Structure

```
seijicxz-portfolio/
├── app/
│   ├── globals.css          # Global styles, CSS vars, utilities
│   ├── layout.jsx           # Root layout, metadata, font imports
│   └── page.jsx             # Main page, assembles all sections
│
├── components/
│   ├── Navbar.jsx           # Sticky nav with active section tracking
│   ├── ThreeCanvas.jsx      # Three.js floating bubbles background
│   ├── Footer.jsx           # Footer with copyright
│   │
│   ├── sections/
│   │   ├── Hero.jsx         # Hero with typed text, mascot, social links
│   │   ├── Stats.jsx        # Animated counter stats
│   │   ├── Skills.jsx       # Tabbed skill bars + tech tag cloud
│   │   ├── Projects.jsx     # GitHub repo grid with filters + pagination
│   │   ├── Education.jsx    # Timeline for education & certifications
│   │   └── Contact.jsx      # Contact form + social links
│   │
│   └── ui/
│       ├── SectionTitle.jsx # Reusable decorated section header
│       ├── ScrollProgress.jsx  # Top scroll progress bar
│       ├── BackToTop.jsx    # Floating back-to-top button
│       └── PhClock.jsx      # Philippine Time clock widget
│
├── public/
│   └── logo.png             # Add your favicon/logo here
│
├── package.json
├── next.config.js
├── tailwind.config.js
└── postcss.config.js
```

---

## 🚀 Setup & Installation

### Prerequisites
- Node.js **18+** (LTS recommended)
- npm, yarn, or pnpm

### Step 1 — Clone / extract the project
```bash
cd seijicxz-portfolio
```

### Step 2 — Install dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
```

This installs:
- `next`, `react`, `react-dom`
- `framer-motion`
- `three` (Three.js)
- `@react-three/fiber` & `@react-three/drei` *(optional helpers)*
- `tailwindcss`, `autoprefixer`, `postcss`
- `clsx`

### Step 3 — Run the dev server
```bash
npm run dev
```
Open **http://localhost:3000** in your browser.

### Step 4 — Build for production
```bash
npm run build
npm start
```

---

## 🔧 Customization Checklist

| File | What to change |
|------|----------------|
| `app/layout.jsx` | Site title, description, favicon |
| `components/sections/Hero.jsx` | Name, profile image URL, social links, ROLES array |
| `components/sections/Stats.jsx` | STATS array values |
| `components/sections/Skills.jsx` | SKILL_GROUPS with your real stack + percentages |
| `components/sections/Projects.jsx` | GitHub username in the fetch URL (`seijicxz`) |
| `components/sections/Education.jsx` | Your school, certifications, links |
| `components/sections/Contact.jsx` | Your email, social URLs; wire up Formspree/EmailJS |
| `components/Footer.jsx` | Your name + socials |
| `public/logo.png` | Replace with your actual logo/favicon |

---

## 📬 Setting Up the Contact Form

The form currently simulates a submission. To make it live:

### Option A — Formspree (easiest)
1. Go to https://formspree.io and create a free account
2. Create a form and get your endpoint URL
3. In `Contact.jsx`, replace the `handleSubmit` with:
```js
const res = await fetch('https://formspree.io/f/YOUR_ID', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(form),
});
if (res.ok) setStatus('sent');
else setStatus('error');
```

### Option B — EmailJS
1. Go to https://www.emailjs.com
2. `npm install @emailjs/browser`
3. Use `emailjs.send(serviceId, templateId, form, publicKey)` in the handler

---

## 🌐 Deployment

### Vercel (recommended for Next.js)
```bash
npx vercel
```
Or connect your GitHub repo at https://vercel.com

### Netlify
```bash
npm run build
# Deploy the .next folder
```
Add `next.config.js` output: `'export'` for static hosting if needed.

---

## 🐾 Notes on Three.js

`ThreeCanvas.jsx` uses a dynamic import (`import('three')`) to avoid SSR issues. The canvas renders:
- **28 floating spheres** in palette colors with soft opacity
- **120 star particles** in `#7AAACE`
- **Ambient + directional + point lights** for soft shading

To increase/decrease performance, adjust `starCount` and the sphere count (`28`) in `ThreeCanvas.jsx`.

---

Made with 💙 by Seijicxz
=======
# seijicxz_portfolio
my space in the internet
>>>>>>> 33e8a2d5e0bad85f9b7c2c86a825f8d46a807ff4
