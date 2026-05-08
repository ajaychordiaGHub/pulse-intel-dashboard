## Pulse Intel — Frontend Prototype Plan

A polished, enterprise SaaS competitive-intelligence prototype. Frontend-only with realistic mock data. No marketing landing page — users land directly in the product.

### Design system
- Light, data-dense enterprise theme (think Linear / Attio / Retool).
- Update `src/styles.css` tokens: neutral slate background, white surface cards, indigo primary, semantic tokens for `success` (green), `warning` (amber), `info` (blue), `danger` (red) for impact / change badges.
- Typography: Inter via system stack, compact sizing. Subtle borders, soft shadows.
- Reused shadcn primitives: Button, Card, Input, Checkbox, Select, Tabs, Table, Badge, Sheet (for source preview drawer), Sidebar, Progress, Tooltip, Avatar, Separator, ScrollArea.
- Lucide icons throughout.
- Responsive: full layout on desktop, sidebar collapses to icons on tablet, mobile-friendly stacked cards.

### Routing (TanStack Start, file-based)
First-run flow: `/` redirects to `/onboarding` if no monitor exists in mock state, otherwise to `/dashboard`.

```
src/routes/
  __root.tsx                 (existing — keep)
  index.tsx                  (redirect logic)
  onboarding.tsx             (no sidebar, centered form)
  _app.tsx                   (layout w/ sidebar + header + Outlet)
  _app.dashboard.tsx
  _app.digest.tsx
  _app.comparison.tsx
  _app.keywords.tsx
  _app.settings.tsx          (stub)
```

### Mock data layer
`src/lib/mock-data.ts` — central source of truth:
- Host: HubSpot. Competitors: Salesforce, Zoho, Freshworks, Intercom.
- ~25 findings across categories with: id, company, category, title, summary, sourceUrl, sourceDomain, date, importance (1–5), confidence (0–1), changeType (new/changed/stable).
- Keyword trends: list per company with weekly counts + % change.
- Comparison rollup per competitor.
- Categories: Product Changes, Pricing Changes, Blogs, Market News, Website Changes, Keyword Trends.

State held in a lightweight Zustand store (or React context) so onboarding choices persist across routes for the demo.

### Screens

**1. Onboarding (`/onboarding`)**
- Centered card, multi-section single page (no wizard steps to keep it fast).
- Sections: Host company (name + URL), Competitors (chip list, add up to 5), Target companies / keywords (tag input), Categories (6 checkbox cards with icon + description), Crawl frequency (segmented control: Manual / Daily / Weekly).
- Sticky footer with "Start Monitoring" CTA → seeds the mock store and routes to `/dashboard`.

**2. Main Dashboard (`/dashboard`)**
- Header: monitor name dropdown ("HubSpot Intelligence"), last sync time, "Run scan" button, search.
- 5 summary KPI cards: Product Updates, Pricing Changes, News Mentions, Website Changes, Rising Keywords — each with delta vs last week and sparkline.
- Tabs: All / Product / Pricing / Blogs / Market News / Website Changes / Keywords.
- Filter bar: company multi-select, date range, importance slider, sort.
- Findings feed: dense cards (company avatar, category badge, title, 2-line summary, source domain favicon + URL, relative date, importance dots, confidence %). Click → right-side Sheet "Source Preview" with full summary, screenshot placeholder, raw excerpt, open-in-new-tab.

**3. Daily Digest (`/digest`)**
- Date picker header + "Today's Digest" title, counts.
- Grouped sections by category, collapsible. Each item: AI summary, affected company badge, detected change chip, source link.
- Top-right: Export PDF / Copy link / Share buttons (UI only with toast).

**4. Competitor Comparison (`/comparison`)**
- Sticky-header table. Rows: host (highlighted) + competitors.
- Columns: Company, Latest Product Update, Pricing Movement, Blog Activity (count + sparkline), News Mentions, Top Keywords (chips), Last Scraped.
- Cell badges: New, Changed, Stable, High Impact (color-coded).
- Row click opens drawer with that competitor's recent findings.

**5. Keyword Trends (`/keywords`)**
- Filters: company select, category select, time range.
- Left: ranked list of top keywords (bar fills showing relative frequency, % change with up/down arrows in green/red, "Rising" tag for >25%).
- Right: trend chart (Recharts line/bar) for the selected keyword across companies.
- Rising keywords callout strip at top.

### Sidebar / app shell
- Collapsible icon sidebar (existing shadcn) with: Dashboard, Daily Digest, Comparison, Keywords, Settings.
- Footer: monitor switcher + user avatar.
- Header inside `_app` layout: breadcrumb, global search, notifications icon, "New scan" button.

### States & polish
- Empty states (no findings yet) with illustration and CTA.
- Skeleton loaders on initial card mount (simulated 400ms delay).
- Source-preview Sheet shared across screens.
- Toasts via `sonner` for actions (Export, Copy, Save filters).

### Out of scope
- No backend, auth, real crawling, or AI calls.
- No landing page.
- Charts use static mock arrays.

### Technical notes
- Add `bun add zustand recharts date-fns` for state, charts, and date formatting.
- Keep all colors as semantic tokens in `styles.css`; no hardcoded hex in components.
- Ensure each route file has its own `head()` metadata.
