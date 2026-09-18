# Loro Labs — Recreation

A faithful recreation of the [Loro Labs](https://lorolabs.ai/) landing page, built
with **React + Vite + TypeScript + Tailwind CSS**, with advanced scroll animations
powered by **Framer Motion** and **GSAP (ScrollTrigger)**.

> This is an educational recreation for learning purposes. All original brand
> content belongs to Loro Labs.

## Stack

- ⚡ **Vite** — dev server & build
- ⚛️ **React 18** + **TypeScript**
- 🎨 **Tailwind CSS** — utility styling with a custom deep-red theme
- 🌀 **Framer Motion** — reveals, counters, staggered word animations
- 📜 **GSAP + ScrollTrigger** — pinned horizontal scroll for the services section

## Getting started

```bash
pnpm install
pnpm dev      # start the dev server (http://localhost:5173)
pnpm build    # type-check + production build to /dist
pnpm preview  # preview the production build
```

## Project structure

```
src/
├── components/
│   ├── Navbar.tsx        # floating glass pill nav + mobile menu
│   ├── Hero.tsx          # parallax hero with red gradient
│   ├── Services.tsx      # GSAP pinned horizontal-scroll cards (01–06)
│   ├── Testimonial.tsx   # quote + animated stat counters
│   ├── TechStack.tsx     # dual-direction infinite marquee
│   ├── DisplayBanner.tsx # word-by-word big statement text
│   ├── Difference.tsx    # "The Loro Difference" cards
│   ├── Industries.tsx    # industries grid
│   ├── Demo.tsx          # live-demo launch card
│   ├── Contact.tsx       # CTA + contact details
│   ├── Footer.tsx
│   ├── ConsentNotice.tsx
│   ├── Reveal.tsx        # reusable scroll-reveal wrapper
│   └── Counter.tsx       # count-up-on-view number
├── data/content.ts       # all copy in one place
├── App.tsx
├── main.tsx
└── index.css
```

## Notes

- Section images use Unsplash placeholders — swap the URLs in `src/data/content.ts`
  and `src/components/Hero.tsx` for your own assets.
- Fonts use **Quicksand** (Google Fonts) to approximate the rounded look.
- The horizontal services scroll is desktop-only; on mobile the cards stack.
