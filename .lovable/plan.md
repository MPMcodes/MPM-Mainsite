## Phase 1 — Foundation, shell, Home

Scope locked: design tokens, layout shell, Home page. Everything else stubs out. We confirm the foundation looks right before Phase 2 fills in Properties → Admin.

### 1. Stack swap: TanStack Start → Vite + React Router

The template ships TanStack Start (file-based routing, SSR). You asked for plain React Router, so I'll tear out the TanStack pieces and rebuild on a standard Vite SPA.

Remove:
- `src/router.tsx`, `src/server.ts`, `src/start.ts`, `src/routeTree.gen.ts`
- `src/routes/` (entire directory, including `__root.tsx`, `index.tsx`)
- `src/lib/error-capture.ts`, `src/lib/error-page.ts` (TanStack-specific)
- TanStack deps: `@tanstack/react-router`, `@tanstack/react-start`, `@tanstack/router-plugin`, related vite plugins
- `wrangler.jsonc` (Cloudflare Worker config — no longer needed)

Add:
- `react-router-dom`, `framer-motion` (lucide-react and shadcn are already present)
- `src/main.tsx` — standard Vite entry, mounts `<App />` inside `<BrowserRouter>`
- `src/App.tsx` — `<Routes>` table wrapping every page in `<AppLayout>`
- `index.html` at project root — Google Fonts links for Playfair Display + DM Sans, root `<div id="root">`

Update `vite.config.ts` to a plain React SPA config (drop the TanStack plugin, keep `@vitejs/plugin-react` and the `@` alias).

Note: Lovable hosting is tuned for TanStack Start. A plain SPA still works, but SSR and the built-in route-tree typing go away. Confirmed you want this trade.

### 2. Design tokens (oklch, Tailwind v4)

The template uses Tailwind v4 with `@theme inline` and oklch — much cleaner than HSL + `tailwind.config.ts`. I'll keep that pattern and translate your warm palette into oklch equivalents.

Edit `src/styles.css`:
- Replace the existing `:root` token block with the Miedema palette (warm cream background `oklch(~0.90 0.025 75)`, deep espresso foreground, saddle brown primary, caramel accent, etc. — every token from your spec mapped).
- Add `.dark` block (cozy evening, never pure black).
- Add `.admin-theme` block (cooler cream, deeper saddle).
- Add `--sidebar-*` tokens (dark espresso surface).
- Register all new tokens in `@theme inline` so utilities like `bg-sidebar`, `text-sidebar-foreground`, `text-accent` work.
- Set `--radius: 0.75rem`.
- Add keyframes/utilities for `fade-up` and stagger helpers.

Rename file to `src/index.css` per your spec, update the import in `main.tsx`.

### 3. Typography

In `index.html`:
```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&family=DM+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
```

In `src/index.css` under `@theme inline`:
```css
--font-serif: "Playfair Display", ui-serif, Georgia, serif;
--font-sans: "DM Sans", ui-sans-serif, system-ui, sans-serif;
```

`font-serif` and `font-sans` utilities then work everywhere.

### 4. Layout shell

New files:
- `src/components/layout/AppLayout.tsx` — wraps every route. Renders `<BackgroundWash />`, then `<Sidebar />` (lg+) / `<MobileTopBar />` + `<BottomNav />` (<lg), then `<main className="lg:pl-64">` with `<PageTransition>` around the `<Outlet />`.
- `src/components/layout/BackgroundWash.tsx` — two fixed layers behind everything: warm Unsplash photo (`fixed inset-0 -z-20 object-cover`) + cream wash (`fixed inset-0 -z-10 bg-[oklch(var(--background)/0.85)] backdrop-blur-sm`).
- `src/components/layout/Sidebar.tsx` — `w-64` fixed left, espresso surface via sidebar tokens, logo plate at top (text wordmark placeholder for now — you'll upload `public/logo.png` later), vertical nav (Home, Building2, Wrench, FileText, Users, Settings) with `layoutId="activeNav"` indicator, theme toggle + year at bottom.
- `src/components/layout/MobileTopBar.tsx` — centered logo, hamburger opens shadcn `Sheet` mirroring the sidebar.
- `src/components/layout/BottomNav.tsx` — fixed bottom, `bg-card/95 backdrop-blur-md`, 5 icons, active item `-translate-y-0.5 text-accent`.
- `src/components/motion/PageTransition.tsx` — `<motion.div>` with the 8px fade-up, gated by `useReducedMotion()`.
- `src/components/motion/StaggerGrid.tsx` — `staggerChildren: 0.08`, `delayChildren: 0.1`.
- `src/hooks/use-theme.ts` — light/dark toggle, persists to `localStorage`, toggles `class="dark"` on `<html>`.
- `src/hooks/use-reduced-motion.ts` — thin wrapper over framer-motion's hook.

Shadcn `Toaster` (sonner) themed via tokens mounted once in `AppLayout`.

### 5. Routes

`src/App.tsx` declares all eight routes so nav links work today; only Home has real content in Phase 1.

```tsx
<Route element={<AppLayout />}>
  <Route index element={<Home />} />
  <Route path="properties" element={<ComingSoon title="Portfolio" />} />
  <Route path="residents" element={<ComingSoon title="Residents" />} />
  <Route path="maintenance" element={<ComingSoon title="Maintenance" />} />
  <Route path="owners" element={<ComingSoon title="Owners" />} />
  <Route path="journal" element={<ComingSoon title="Journal" />} />
  <Route path="admin" element={<div className="admin-theme"><ComingSoon title="Admin" /></div>} />
  <Route path="*" element={<NotFound />} />
</Route>
```

`ComingSoon` is a tiny card with a Playfair heading and one line of copy — keeps the shell navigable.

### 6. Home page (`src/pages/Home.tsx`)

- Hero card: Playfair `text-5xl md:text-6xl font-semibold tracking-tight` headline "A home, well kept.", DM Sans sub "Boutique residential property management for owners and residents who care about the details."
- Two CTAs: Owner Inquiry (default Button → `/owners`), Resident Portal (outline → `/residents`).
- Three pillar cards in `md:grid-cols-3`: Stewardship, Communication, Craft. Each: accent-tinted lucide icon (Sprout / MessageCircle / Hammer), Playfair heading, two-line DM Sans description. Wrapped in `StaggerGrid`.
- Closing band: italic Playfair pull-quote, signed "— The Miedema Family."

All cards: `bg-card`, `p-8 md:p-10`, `rounded-2xl`, `border border-border/60`, hover lift via Framer Motion spring.

Add a custom `editorial` variant to the shadcn `Button` (transparent, underline on hover, `text-accent`).

### 7. Misc

- `src/pages/NotFound.tsx` — centered card, big serif "404", "Return home" button.
- Lightweight error boundary at the layout level.
- Reasonable Unsplash background URL chosen for warm tones; easy to swap later.
- Logo: temporary Playfair "Miedema" wordmark on a cream plate inside the sidebar until you upload `public/logo.png`. I'll wire the swap so it's a one-line change.

### 8. Acceptance checks before calling Phase 1 done

- No hardcoded color literals in components (everything via tokens).
- Sidebar at lg+, bottom nav + top bar below lg, no layout shift between them.
- Fixed background photo + cream wash visible on every route, content cards float above.
- Home renders with stagger + hover lift; reduced-motion users get instant transitions.
- Build passes, no TypeScript errors, no unused imports.

### Phase 2 preview (not in this build)

Properties → Residents → Maintenance → Owners → Journal → Admin (with `admin-theme` wrapper, Recharts sparklines, metric count-ups). Confirmed only after Phase 1 looks intentional on mobile and desktop.