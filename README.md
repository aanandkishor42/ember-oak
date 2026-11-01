# EMBER & OAK

> A fictional upscale restaurant experience — modern fire kitchen, wood-fired dishes.

EMBER & OAK is a fictional fine-dining restaurant concept: dark, warm, cinematic, and
built around the drama of open flame. This repository contains the complete, production-grade
marketing & dining-experience website for the concept, crafted as a portfolio piece.

## Overview

A single-page-worthy multi-route experience for an upscale fire-kitchen restaurant:

- **Home** (`/`) — cinematic hero, story with animated counters, signature dishes, full menu,
  chef's special banner, gallery with lightbox, testimonials, reservation form, hours & location.
- **Menu** (`/menu`) — animated category tabs (Starters / Mains / Desserts / Drinks) with
  framer-motion list transitions and dietary badges.
- **Reservations** (`/reservations`) — validated reservation request form with loading state and
  animated success flow.
- **About** (`/about`) — extended story, chef band, hours & location.

## Features

- Sticky glass-on-scroll navbar with animated underlines, full-screen mobile menu, scroll progress bar.
- Full-screen hero with staggered word-reveal headline, parallax background, dual CTAs, scroll indicator.
- Story section with parallax images, overlapping editorial composition, animated count-up stats.
- Signature dishes: horizontal snap-scroll showcase with arrow controls.
- Menu with animated tab filtering and veg / spicy / chef's pick badges.
- Chef's special: full-width parallax banner with pull-quote.
- Masonry gallery with accessible lightbox (ESC, arrow keys, focus management, scroll lock).
- Auto-playing testimonial carousel with star ratings and controls.
- Reservation form with real validation, inline errors, loading state, animated success state.
- Hours, location, map placeholder, newsletter signup, footer with socials and quick links.
- Preloader, page transitions, back-to-top, scroll reveal animations, marquee, custom scrollbar,
  grain overlay, focus rings, `prefers-reduced-motion` support.

## Tech Stack

- React 18 + Vite 5
- Tailwind CSS 3 (custom warm dark theme)
- Framer Motion 11 (all animation)
- React Router 6 (4 routes)
- lucide-react (icons)
- Google Fonts: Playfair Display + Inter
- ESLint + Prettier

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Build & Preview

```bash
npm run build
npm run preview
```

## Project Structure

```
ember-oak/
├── public/               # favicon, _redirects (Netlify SPA fallback)
├── src/
│   ├── components/
│   │   ├── layout/       # Navbar, MobileMenu, Footer, Preloader, BackToTop
│   │   ├── sections/     # Hero, Marquee, About, SignatureDishes, MenuSection,
│   │   │                 # ChefSpecial, ChefBand, Gallery, Testimonials,
│   │   │                 # ReservationSection, HoursLocation
│   │   └── ui/           # Button, SectionHeading, Badge, Input, DishCard, Modal, Container
│   ├── data/             # menu, testimonials, gallery, site content
│   ├── hooks/            # useInView, useScrollPosition, useMediaQuery
│   ├── pages/            # Home, Menu, Reservations, About
│   ├── utils/            # cn, image helpers
│   ├── App.jsx, main.jsx, index.css
├── index.html
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── vercel.json
```

## Deployment

### Vercel (recommended)

The project ships with `vercel.json` containing the SPA rewrite:

```json
{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
```

Deploy with:

```bash
npm i -g vercel
vercel --prod
```

### Netlify

`public/_redirects` contains `/* /index.html 200` for drag-and-drop deploys.

### Manual steps

1. Push this repo to GitHub.
2. Import at [vercel.com/new](https://vercel.com/new) — Framework: **Vite**, Build Command: `npm run build`, Output Directory: `dist`.
3. Or drag the `dist/` folder at [app.netlify.com/drop](https://app.netlify.com/drop).

## How to Customize for a Client

1. **Restaurant name / copy**: edit `src/data/site.js` and the copy inside `src/components/sections/*`.
2. **Colors**: tokens live in `tailwind.config.js` (`charcoal`, `ember`, `gold`, `cream`) and `src/index.css` (`.eyebrow`, `.grain`).
3. **Menu**: dishes live in `src/data/menu.js` (categories, badges, prices, descriptions, images).
4. **Images**: swap Unsplash IDs in `src/utils/images.js` and `src/data/gallery.js`.
5. **Fonts / type**: Google Fonts link in `index.html`; heading font in `tailwind.config.js`.

## Scripts

| Command           | Description                     |
| ----------------- | -------------------------------- |
| `npm run dev`     | Start dev server                |
| `npm run build`   | Production build                |
| `npm run preview` | Preview production build        |
| `npm run lint`    | ESLint over `src`               |
| `npm run format`  | Prettier over source files     |
