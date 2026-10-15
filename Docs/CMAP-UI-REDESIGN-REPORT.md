# CMAP UI Redesign Report (Oct 2026 — local only, NOT deployed)

## What changed
- **Landing (`cmap/src/app/page.tsx` + `SiteNav.tsx`):** full rewrite — sticky nav with
  accessible mobile menu, hero ("Manage Your Church. Strengthen Accountability. Grow Together."),
  trust strip, 8 working feature cards, 3-step How It Works, Install section (real APK link,
  PWA guidance, browser option), pilot contact via working `mailto:`, honest footer.
- **Login (`cmap/src/app/login/page.tsx`):** branded card, "Welcome Back", real `<label>`s,
  password toggle, friendly errors, loading state, back-to-home link. Removed hardcoded
  demo credentials from source. No reset/registration (those flows do not exist).
- **Dashboard (`cmap/src/app/dashboard/page.tsx`):** same data logic; added header, welcome
  line, sign-out, quick-action grid, secondary nav, honest empty state. No features removed.
- **Design system (`globals.css`):** brand tokens, focus-visible rings, reduced-motion respect,
  responsive rules (menu breakpoint, hero scaling, grids).

## Design decisions
- No new dependencies; no UI framework. Inline-style codebase style preserved where untouched.
- No fabricated claims: dashboard preview marked "Illustrative preview — sample data"; no
  testimonials, customer counts, or outcomes invented; contact is a real `mailto:` (no fake form
  or backend); APK link verified live (`200`, 2,551,340 bytes = known v1.1 binary).
- Auth behavior unchanged (NextAuth credentials + roles + API gates intact).

## Testing (all observed, local dev)
- `tsc --noEmit`: clean. `eslint` on touched files: clean. `next build`: passes.
- Browser: landing sections/nav/menu/links render, zero console errors; mobile menu opens
  (6 items, `aria-expanded` flips); responsive iframes at 375/768/1440 — no overflow, hamburger
  only ≤640px; login labels/toggle/back present; wrong-password shows friendly error; toggle
  flips `password→text`; dashboard renders live data with new entry UI.
- Native install prompt untestable in automation (invisible tab); fallback dialog previously verified.
- Screenshots: environment-blocked (no composited window); none fabricated.

## Remaining / needs you
- **Deploy approval:** changes are committed LOCALLY ONLY (`redesign/*` below). Say "deploy"
  and I will push (Netlify auto-deploys) and smoke-test production.
- Optional next: real contact backend, member self-registration flow, dashboard charts.

## Preview locally
```
cd cmap
npm run dev
```
Open `http://localhost:3000/` (landing), `/login`, `/dashboard` (sign in first).
