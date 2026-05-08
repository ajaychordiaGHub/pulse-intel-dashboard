# 🔍 pulse-intel-dashboard

> **Real-time competitive intelligence — know what your competitors are doing before your prospects do.**

[![Built with Bolt](https://img.shields.io/badge/Built%20with-Bolt-6C47FF?style=flat-square)](https://bolt.new)
[![Powered by Supabase](https://img.shields.io/badge/Backend-Supabase-3ECF8E?style=flat-square&logo=supabase)](https://supabase.com)
[![Scraped by Firecrawl](https://img.shields.io/badge/Scraping-Firecrawl-FF6B35?style=flat-square)](https://firecrawl.dev)
[![AI by Claude](https://img.shields.io/badge/AI-Claude%20API-CC785C?style=flat-square)](https://anthropic.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)

---

## 📌 The Problem

Marketing and product teams waste hours every week manually checking competitor websites, reading industry news, and guessing what search terms their rivals are targeting. By the time they notice a competitor dropped prices, launched a product, or shifted positioning — deals are already lost.

Existing tools like Crayon and Klue cost **$1,000+/month** and are built for enterprise. **PulseIntel is built for everyone else.**

---

## ✨ What PulseIntel Does

Add your competitors. PulseIntel automatically scrapes them using **Firecrawl**, monitors news sources daily, and tracks the keywords buyers use to find them. Every signal is analysed by **Claude AI**, which generates a sharp, human-readable intelligence brief telling your team exactly what happened, why it matters, and what to do about it.

> *"Your competitor just dropped prices, launched a new product, and buyers are searching for alternatives. You found out in 30 seconds — not 3 weeks."*

---

## 🎯 The 3 Intelligence Pillars

PulseIntel is organised around three focused Must Have pillars. Each one solves a distinct problem your team faces every week.

---

### 🟢 Pillar 1 — Product & Pricing Intelligence

Tracks what competitors are building, launching, and charging.

| Feature | What It Does |
|---|---|
| **New Product Launch Detector** | Scrapes competitor newsrooms, blogs, and tech press to detect new product launches and feature releases. Claude generates a brief on what launched, who it targets, and whether it overlaps with your roadmap. |
| **Pricing Change & New Offering Monitor** | Snapshots competitor pricing pages daily and diffs them. Detects price cuts, new tiers, billing model changes, and temporary promotions — even ones that expire within days. |
| **Product Review Aggregator** | Scrapes G2, Capterra, and Product Hunt for new competitor reviews. Claude extracts the top complaints and praise themes — turning customer frustration into your sales opportunity. |

**Claude output for every Product signal:**
```
WHAT LAUNCHED / CHANGED:   [Factual summary in 1–2 sentences]
TARGET MARKET:             [Who it's aimed at]
WHY IT MATTERS:            [Business implication for your team]
RECOMMENDED ACTION:        [One concrete step for sales or product]
IMPACT:                    HIGH / MEDIUM / LOW
```

---

### 🟠 Pillar 2 — Market News Daily Digest

Replaces manually checking 10 news sources every morning with one AI-written briefing per competitor, delivered fresh each day.

| Feature | What It Does |
|---|---|
| **Daily News Scrape & Aggregation** | Each morning, Firecrawl scrapes TechCrunch, VentureBeat, Hacker News, Bloomberg Tech, and Google News RSS for every mention of each tracked competitor from the past 24 hours. Claude turns it all into one scannable daily briefing. |
| **Company Blog & Changelog Monitor** | Watches each competitor's own blog, newsroom, and changelog. First-party announcements are often published hours before press coverage — this catches them first. |
| **High-Impact Alert → Slack** | When Claude rates any intelligence as HIGH impact — a major launch, acquisition signal, or market-moving announcement — a Slack alert fires immediately, not just at digest time. |

**Claude daily digest format:**
```
COMPETITOR:       [Company name] — [Date]
TOP STORY:        [Most significant news item of the day]
OTHER MENTIONS:   [2–3 bullet summaries of other coverage]
SENTIMENT:        Positive / Neutral / Negative
WATCH OUT FOR:    [One forward-looking signal to monitor]
```

**Slack alert format (HIGH impact only):**
```
🔴 HIGH IMPACT — [Competitor name]
[What happened in 1 sentence]
[Why it matters in 1 sentence]
→ Action: [One thing to do right now]
🔗 [Link to full intel card in dashboard]
```

---

### 🟣 Pillar 3 — Keyword Intelligence

Surfaces the search terms buyers use to find competitors — scraped directly from the web, no paid SEO tools needed.

| Feature | What It Does |
|---|---|
| **Competitor SEO Keyword Extractor** | Reads page titles, meta descriptions, H1/H2 headings, and repeated phrases across competitor pages. Identifies which terms they're deliberately optimising for — no Ahrefs or SerpAPI required. |
| **Comparison & "vs" Search Term Tracker** | Scrapes Google autocomplete and "People Also Ask" results for competitor brand names to surface bottom-of-funnel buyer questions like "[Competitor] vs [us]" or "[Competitor] alternative". |
| **Keyword Trend & New Term Detector** | Runs weekly and diffs keyword snapshots stored in Supabase. Flags new terms a competitor started targeting this week and dropped terms — and explains the likely strategic intent behind the shift. |

**Claude output for every Keyword signal:**
```
TOP KEYWORDS:       [10 terms they target most actively]
COMPARISON TERMS:   [Buyer "vs" and "alternative" searches]
NEW THIS WEEK:      [Keywords that appeared for the first time]
DROPPED:            [Terms they stopped using]
GAPS FOR US:        [Keywords they rank for that we should cover]
CONTENT TO CREATE:  [Suggested page, article, or ad copy angle]
```

---

## 🛠 How This Project Is Built

PulseIntel is built entirely using **browser-based platforms** — no software installation is needed by any team member.

| Platform | What It Does | Who Uses It |
|---|---|---|
| **[Bolt.new](https://bolt.new)** | AI-powered frontend builder — generates, hosts, and deploys the entire app in the browser | Frontend team |
| **[Supabase](https://supabase.com)** | Cloud database, authentication, and real-time data — managed via a web dashboard | Backend team |
| **[Firecrawl](https://firecrawl.dev)** | Scrapes competitor websites and news sources, returning clean readable content | Backend team |
| **[Claude API](https://anthropic.com)** | Reads scraped content and generates structured intelligence briefs | Backend team |
| **[GitHub](https://github.com/OutSkill45/PulseIntel)** | Stores all project files, tracks every change, coordinates the whole team | All team members |

> ⚡ **No downloads. No terminal. No installation required by anyone on the team.**

---

## 🌐 How Data Flows Through PulseIntel

Every intelligence card — whether it's a product signal, a news digest, or a keyword shift — follows the same pipeline:

```
Competitor URLs
      ↓
Firecrawl (scrape + extract clean markdown)
      ↓
Snapshot stored in Supabase
      ↓
Diff engine (compare latest vs previous snapshot)
      ↓
Claude API (generate structured intelligence brief)
      ↓
intel_cards table in Supabase
      ↓
Dashboard (Bolt UI — cards displayed by pillar)
      ↓
Slack Alert (fires only when IMPACT = HIGH)
```

---

## 🗄 Database Structure (Supabase)

Five tables power the product. All created directly inside the Supabase web dashboard — no coding required to set them up.

| Table | Pillar | What It Stores |
|---|---|---|
| `competitors` | All | Each competitor added by the user — name, URL, category |
| `snapshots` | All | Raw scraped markdown content from each page visit |
| `intel_cards` | All | AI-generated intelligence briefs with pillar tag, impact level, and recommended action |
| `daily_digests` | News | One digest row per competitor per day — top story, mentions, sentiment, forward signal |
| `keyword_snapshots` | Keywords | Weekly keyword captures — top terms, comparison terms, new this week, dropped this week |

---

## 🚀 How the Project Is Set Up

> ⚠️ This project does **not** require cloning, installing packages, or running anything locally.
> All setup and building happens inside Bolt and Supabase's web dashboards.

### Step 1 — The app is built and hosted in Bolt

The entire frontend was built using [Bolt.new](https://bolt.new). Bolt uses AI to generate the code and hosts the app automatically in the cloud. Any UI changes are made directly inside the Bolt editor in your browser.

🔗 **Live Bolt project:** *(add your Bolt project link here)*
🌐 **Live deployed app:** *(add your Bolt deployment URL here)*

### Step 2 — The database is managed in Supabase

All competitor data, scraped snapshots, intelligence cards, daily digests, and keyword snapshots are stored in Supabase. No local database setup needed — everything is managed through the Supabase web dashboard.

🔗 **Supabase project:** *(shared privately with the team — do not post publicly)*

### Step 3 — API keys live inside Bolt's environment settings

All sensitive API keys are stored securely in the **Bolt project → Settings → Environment Variables** panel. They are never stored in GitHub.

| Key | Where to get it |
|---|---|
| `VITE_SUPABASE_URL` | Supabase → Project Settings → API |
| `VITE_SUPABASE_ANON_KEY` | Supabase → Project Settings → API |
| `FIRECRAWL_API_KEY` | [firecrawl.dev/dashboard](https://firecrawl.dev/dashboard) |
| `ANTHROPIC_API_KEY` | [console.anthropic.com](https://console.anthropic.com) |
| `SLACK_WEBHOOK_URL` | Slack App settings |

> 🔐 **Never paste API keys into GitHub files, issues, or comments.** They belong only in Bolt's environment settings panel.

### Step 4 — Bolt publishes code to GitHub automatically

Bolt connects directly to the `OutSkill45/PulseIntel` repository and pushes code changes automatically. The team can view, review, and comment on all changes on the GitHub website — without touching code locally.

**To connect Bolt to GitHub:**
1. Open the Bolt project
2. Click the **GitHub icon** in the top toolbar
3. Select **OutSkill45** as the organisation
4. Select **PulseIntel** as the repository
5. Choose the **`dev`** branch
6. Click **Connect** — Bolt syncs automatically from that point on

---

## 📁 Project Structure

Bolt generates and manages the code files. Team members interact with the GitHub repository through the website only.

```
PulseIntel/
├── src/
│   ├── components/           # UI building blocks — cards, forms, buttons, digest views
│   ├── lib/
│   │   ├── supabase.ts       # Supabase database connection
│   │   ├── firecrawl.ts      # Scraping logic for all three pillars
│   │   └── claude.ts         # AI intelligence brief pipeline
│   ├── pages/
│   │   ├── Dashboard.tsx     # Main intelligence feed — all pillars
│   │   ├── Products.tsx      # Pillar 1 — product & pricing cards
│   │   ├── NewsDigest.tsx    # Pillar 2 — daily digest view
│   │   └── Keywords.tsx      # Pillar 3 — keyword intelligence view
│   └── App.tsx
├── docs/
│   ├── MVP-Feature-Plan.html # Full 3-pillar feature specification
│   └── MARKDOWN_GUIDE.md     # How to write and edit .md files
├── README.md                 # This file
└── CONTRIBUTING.md           # How every team member contributes
```

---

## 👥 Team Roles

| Role | Platform | What They Own |
|---|---|---|
| **Frontend** | Bolt editor | Dashboard UI, Pillar 1/2/3 page views, intelligence cards, Scan Now button, Slack alert config, loading and empty states |
| **Backend / Infra** | Supabase + Bolt env settings | All 5 database tables, Firecrawl scraping for all three pillars, Claude API prompt pipeline, diff logic, daily digest scheduler |
| **Docs & QA** | GitHub website | README, CONTRIBUTING, issue tracking, demo data seeding in Supabase, pre-demo testing checklist |

---

## 📋 Full Must Have Feature List

| # | Feature | Pillar | Priority |
|---|---|---|---|
| 1 | New Product Launch Detector | 🟢 Product & Pricing | ✅ Must Have |
| 2 | Pricing Change & New Offering Monitor | 🟢 Product & Pricing | ✅ Must Have |
| 3 | Product Review Aggregator | 🟢 Product & Pricing | ✅ Must Have |
| 4 | Daily News Scrape & Aggregation | 🟠 Market News | ✅ Must Have |
| 5 | Company Blog & Changelog Monitor | 🟠 Market News | ✅ Must Have |
| 6 | High-Impact Alert → Slack | 🟠 Market News | ✅ Must Have |
| 7 | Competitor SEO Keyword Extractor | 🟣 Keywords | ✅ Must Have |
| 8 | Comparison & "vs" Search Term Tracker | 🟣 Keywords | ✅ Must Have |
| 9 | Keyword Trend & New Term Detector | 🟣 Keywords | ✅ Must Have |

---

## 🤝 Contributing

Every team member — coders and non-coders — contributes through the GitHub website or the Bolt editor. No installation required. Please read [CONTRIBUTING.md](CONTRIBUTING.md) before making any changes.

---

## 📄 License

MIT © 2025 OutSkill45 / PulseIntel Team
