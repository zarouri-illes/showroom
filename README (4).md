# Car Dealership Website — Modernization & Animation Upgrade

This README contains a ready-to-use prompt for an AI coding assistant (Claude Code, Cursor, etc.) to take an existing car dealership website repo and upgrade it into a modern, smoothly animated experience using **GSAP** and **anime.js**.

---

## How to use this

1. Open the repo in your AI coding tool of choice.
2. Paste the prompt below as-is (or adapt the bracketed parts to match your actual file structure).
3. Let the assistant explore the codebase first, then apply changes incrementally, testing after each major section.

---

## The Prompt

```
You are working inside an existing car dealership website repository. 
Your job is to modernize the UI and add smooth, professional animations 
using GSAP (with ScrollTrigger) and anime.js, WITHOUT breaking existing 
functionality (routing, forms, car listings, filtering, etc.).

### Step 1 — Audit first
Before changing anything:
- Explore the project structure and identify the framework (plain HTML/CSS/JS, 
  React, Vue, Next.js, etc.), the templating approach, and the CSS setup 
  (plain CSS, Sass, Tailwind, CSS modules).
- List all pages/views (home, inventory/listing, car detail, contact, about, 
  financing, etc.).
- Identify reusable components (navbar, footer, car card, hero section, 
  filters, testimonials, forms).
- Check whether GSAP or anime.js are already installed. If not, add them 
  as dependencies (or CDN links if it's a static site).
- Report back a short summary of what you found before making changes.

### Step 2 — Install & set up animation libraries
- Add GSAP (core + ScrollTrigger plugin) and anime.js to the project.
- Create a dedicated animations folder/module (e.g. `src/animations/` or 
  `assets/js/animations.js`) to keep animation logic organized and reusable, 
  instead of scattering GSAP calls across every component.
- Set up a small utility for registering ScrollTrigger and cleaning up 
  animations on route change (important if this is a React/Vue SPA, to 
  avoid memory leaks and duplicate triggers).

### Step 3 — Modernize the visual design
- Refresh the color palette toward a sleek, premium automotive feel: 
  deep charcoal/black backgrounds, a bold accent color (e.g. red, electric 
  blue, or amber), and high-contrast white text — think modern dealership 
  brand sites, not a dated template.
- Improve typography: use a strong, modern sans-serif for headings 
  (e.g. a geometric or condensed font) paired with a clean readable body font.
- Increase whitespace and visual hierarchy — larger hero sections, clearer 
  section separation, consistent spacing scale.
- Modernize car cards: add subtle shadows, rounded corners, hover elevation, 
  and a cleaner layout for price/specs/CTA.
- Make sure everything stays fully responsive on mobile — animations must 
  degrade gracefully on smaller screens (reduce motion or simplify, don't 
  just scale it down).

### Step 4 — GSAP animations (structural / scroll-based)
Implement these using GSAP + ScrollTrigger:
1. **Hero section**: staggered fade/slide-in for headline, subtext, and CTA 
   button on page load. Optional subtle parallax on hero background image.
2. **Navbar**: smooth shrink/blur transition on scroll (e.g. background 
   opacity + height change) instead of an abrupt jump.
3. **Scroll reveals**: sections and car cards fade/slide into view as the 
   user scrolls (staggered by ~0.1s per card in a grid).
4. **Inventory/filter page**: animate car cards in/out smoothly when filters 
   are applied (avoid instant show/hide — use scale + opacity transitions).
5. **Car detail page**: animate the image gallery transitions and spec list 
   reveal with a staggered timeline.
6. **Page transitions** (if SPA): smooth fade or slide between route changes.
7. **Counters**: animate any stats (e.g. "500+ cars sold", "20 years 
   experience") counting up when scrolled into view.

### Step 5 — anime.js animations (micro-interactions)
Use anime.js for smaller, snappier interactions that don't need scroll 
context:
1. Button hover/click micro-animations (scale, ripple, or icon movement).
2. Form input focus states (label float, border animation).
3. Mobile menu open/close animation (staggered link entrance).
4. Icon animations (e.g. a small bounce or rotate on hover for feature icons 
   like "warranty", "financing", "test drive").
5. Loading/skeleton states for car listings while data loads.

### Step 6 — Performance & polish
- Use `will-change` sparingly and only where needed; avoid animating 
  properties that trigger layout reflow (animate `transform` and `opacity`, 
  not `width`/`top`/`left`).
- Respect `prefers-reduced-motion` — provide a reduced/no-animation fallback 
  for accessibility.
- Kill/refresh ScrollTrigger instances properly on unmount or resize to 
  avoid jank and duplicate triggers.
- Test scroll performance on both desktop and mobile — target smooth 60fps 
  animations.
- Double check no existing functionality (form submission, car filtering, 
  routing, image loading) was broken by the changes.

### Step 7 — Deliverables
- All animation code organized in a clear, reusable module structure.
- Short comments explaining each animation trigger and what it does.
- A brief summary at the end of what was changed, file by file.

Work incrementally: implement one section at a time (hero → navbar → 
inventory → car detail → micro-interactions), and pause to let me review 
after each major section rather than doing everything in one massive commit.
```

---

## Notes for later
- If the repo uses **React/Next.js**, ask the assistant to use `@gsap/react`'s `useGSAP()` hook instead of raw `useEffect` for cleaner cleanup.
- If it's a **static/plain HTML site**, GSAP + anime.js can be added via CDN `<script>` tags with no build step needed.
- Consider Lenis (smooth scroll library) alongside GSAP ScrollTrigger for that extra "buttery" scroll feel often seen on premium sites.
