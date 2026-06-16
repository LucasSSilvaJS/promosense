# PromoSense

> A web app that analyzes customer reviews in e-commerce. It was made as an AI solution to study how monthly discount events (like Black Friday) change **what people think**, **how much they trust the offers**, and **how they buy** online.

Responsive web interface (mobile-first), built with React and ready to work as a **PWA** (Progressive Web App).

[![Senac](https://img.shields.io/badge/Institution-Senac%20College-blue)](https://www.senac.br/)
[![React](https://img.shields.io/badge/Frontend-React%2019-61DAFB)](https://react.dev/)
[![License](https://img.shields.io/badge/license-Academic%20Project-green)](#license)

---

## Project Overview

**PromoSense** is a sentiment analyzer for online stores. The app reads product reviews and classifies them as **positive**, **negative**, or **neutral**. It also shows results by promotional period (Black Friday, Double Dates, Consumer Day, etc.) and by topic: price, delivery, and quality.

---

## Key Features

The app meets these functional requirements:

| ID | Feature |
|----|---------|
| **RF01** | Classify review sentiment as **positive**, **negative**, or **neutral** |
| **RF02** | Filter reviews by **promotional period** (Black Friday, Double Dates, Consumer Day, etc.) |
| **RF03** | Show a **dashboard** with indicators and the distribution of analysis results |
| **RF04** | Analyze sentiment by **aspects**: price, delivery, and quality, plus overall sentiment |

---

## Tech Stack

* **Frontend:** [React 19](https://react.dev/), [Vite 8](https://vite.dev/), [React Router DOM](https://reactrouter.com/)
* **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
* **Icons:** [React Icons](https://react-icons.github.io/react-icons/)
* **PWA:** [vite-plugin-pwa](https://vite-pwa-org.netlify.app/) — offline cache support
* **Testing:** Vitest + Testing Library

---

## Getting Started (Local Development)

Follow these steps to run the project on your computer.

### 1. Prerequisites

You need:

* [Node.js](https://nodejs.org/) version 18 or higher
* npm (comes with Node.js)

### 2. Setup and Run

Open the terminal and run:

```bash
cd promosense
npm install
npm run dev          # development → http://localhost:5173
npm run build        # production build
npm run preview      # preview build → http://localhost:4173
npm run lint         # ESLint check
```

The app consumes the sentiment analysis API. By default, it uses `https://backend-promosense.onrender.com`. To point to another backend, copy `.env.example` to `.env` and set `VITE_API_URL`.

---

## Tests

There are two types of tests: **automated** (fast, repeatable) and **manual** (real layout, mobile, PWA).

| Type | Tool | When to use |
|------|------|-------------|
| Automated | Vitest + Testing Library | After code changes; before delivery |
| Manual | Browser + DevTools | Check visual design, responsive layout, and PWA install |

### Automated tests

Inside the `promosense/` folder:

```bash
npm test              # run once
npm run test:watch    # run again when you save files
```

**Three levels** — from small to big:

| Level | What it tests | Files |
|-------|---------------|-------|
| **Unit (UT)** | One function or component alone | `src/utils/analytics.test.js`, `SentimentBadge.test.jsx`, `PromoPeriodFilter.test.jsx` |
| **Integration (IT)** | Full page with API data loading | `src/pages/*/index.test.jsx` |
| **System (ST)** | App with routes and navigation | `src/App.system.test.jsx` |

**Scenarios covered by `npm test`**

| ID | What it checks |
|----|----------------|
| UT-01 | Filter by period (`all` and specific campaign) |
| UT-02 | Filter by sentiment |
| UT-03 | Count by sentiment |
| UT-04 | Percentages with empty list → 0% |
| UT-05 | Percentage calculation (50% / 25% / 25%) |
| UT-06 | Aspect summary (e.g. negative price) |
| UT-07 | Dashboard snapshot by period |
| UT-08 | Sentiment badge (label and color) |
| UT-09 | Badge in compact mode |
| UT-10 | Promo filter: active button and `onChange` |
| IT-01 | Dashboard: Black Friday updates metrics |
| IT-02 | Dashboard: change period and go back to "all" |
| IT-03 | Dashboard: percentages sum ~100% |
| IT-04 | Reviews: Consumer Day filter |
| IT-05 | Reviews: only negative reviews |
| IT-06 | Reviews: period + sentiment together |
| IT-07 | Reviews: empty list with message |
| IT-08 | Reviews: card with author, text, and sentiments (Cliente Shopee #8411) |
| IT-10 | Home: module links |
| ST-01 | Flow Home → Dashboard → Reviews with filters |
| ST-02 | Home: banner and modules |
| ST-03 | Header: active link highlighted |
| ST-09 | Filters with accessible labels (ARIA) |

> **ST-04 to ST-08** do not run in the terminal — use the manual checklist below.

### Manual tests

**Preparation:** run `npm run dev` (or `build` + `preview` for PWA).

Mark ✅ when the result is correct.

| ID | Step | Expected result |
|----|------|-----------------|
| **ST-04** | Open `/` | Research banner and "Dashboard" / "Reviews" cards are visible |
| **ST-04** | Go to `/dashboard`, click different periods | KPIs, bars, and aspect cards change |
| **ST-04** | Go to `/avaliacoes`, combine period and sentiment | Counter "Showing X of Y" and cards match the filter |
| **ST-05** | Make the window smaller (less than 768px) or use DevTools mobile mode | Hamburger menu; links open the correct page |
| **ST-06** | Click Home → Dashboard → Reviews in the header | Correct page; active item has light background |
| **ST-07** | `build` + `preview` → install app (Chrome: "Install PromoSense") | App opens in its own window; icon on desktop |
| **ST-08** | With app installed, turn off network and navigate between routes | Main pages still open (PWA cache) |

**PWA tip:** after changing icon or cache, use **Ctrl+Shift+R** or clear the Service Worker in DevTools → **Application**.

---

## Folder Structure

```
frontend react/
├── README.md
├── README-ENGLISH.md
└── promosense/             # React application
    ├── public/             # Static files (logo, favicon, PWA icons)
    │   ├── logo.png
    │   └── favicon.ico
    ├── src/
    │   ├── assets/         # Images used in components
    │   ├── api/            # HTTP client and API response mapping
    │   ├── components/     # Reusable UI components
    │   ├── config/         # Settings (navigation, home highlights)
    │   ├── constants/      # Domain constants (sentiments, aspects)
    │   ├── data/           # Static fallback data (promotional periods)
    │   ├── hooks/          # Data loading (dashboard, reviews, periods)
    │   ├── pages/          # App pages (one folder per route)
    │   ├── utils/          # Helper functions (dashboard calculations)
    │   ├── App.jsx         # Route definitions
    │   ├── main.jsx        # React entry point
    │   └── global.css      # Global styles and Tailwind import
    ├── index.html
    ├── vite.config.js      # Vite + Tailwind + PWA
    └── package.json
```

---

## Main Pages

| Route | File | Description |
|-------|------|-------------|
| `/` | `promosense/src/pages/home/index.jsx` | Home page with project idea and links to modules |
| `/dashboard` | `promosense/src/pages/dashboard/index.jsx` | Report with metrics, sentiment distribution, and aspect analysis |
| `/avaliacoes` | `promosense/src/pages/reviews/index.jsx` | List of classified reviews with promotional period filter |

All pages are inside `AppLayout`, which shows a fixed header on every route.

---

## Main Components

### Layout and navigation

| Component | Usage |
|-----------|-------|
| **AppLayout** | Wraps all pages; shows `SiteHeader` and current route content with `<Outlet />` |
| **SiteHeader** | Fixed header with logo (link to home), desktop menu, and hamburger menu on mobile |
| **PrimaryNav** | Navigation links; accepts `variant="mobile"` for column layout |
| **NavAction** | Single menu item; uses React Router `NavLink` with active state |
| **PageShell** | Default page wrapper: title, subtitle, and content area with max width |

### Home

| Component | Usage |
|-----------|-------|
| **ResearchBanner** | Dark banner with research idea and three topics: perception, credibility, and behavior |
| **FeatureSpotlight** | Module card with icon, title, description, and "Access module" link |

### Dashboard and analysis

| Component | Usage |
|-----------|-------|
| **PromoPeriodFilter** | Buttons to filter data by promotional period (RF02); horizontal scroll on mobile |
| **MetricHighlight** | KPI card (total reviews, % positive, neutral, negative) |
| **SentimentDistribution** | Progress bars with sentiment percentages (RF01 / RF03) |
| **AspectInsightCard** | Main sentiment and percentages by aspect (price, delivery, quality) on dashboard (RF04) |

### Reviews

| Component | Usage |
|-----------|-------|
| **ReviewInsightCard** | One review card: author, period, date, text, overall sentiment, and aspects |
| **SentimentBadge** | Visual label (positive / neutral / negative) with icon and color |
| **AspectTagRow** | Row of tags with sentiment per aspect inside each review |

### Data and utilities

| File | Usage |
|------|-------|
| `promosense/src/api/promosenseApi.js` | API calls (dashboard, reviews, promotional periods) |
| `promosense/src/api/mappers.js` | Converts API payloads to the UI format |
| `promosense/src/hooks/useDashboard.js` | Loads the dashboard snapshot for the selected period |
| `promosense/src/hooks/useReviews.js` | Loads paginated reviews with period and sentiment filters |
| `promosense/src/hooks/usePromotionalPeriods.js` | Loads promotional periods from the API (with local fallback) |
| `promosense/src/data/promotionalPeriods.js` | Promotional periods used as fallback when the API fails |
| `promosense/src/utils/analytics.js` | Functions to filter reviews and build dashboard snapshot |
| `promosense/src/constants/sentiment.js` | Labels and lists for sentiments and aspects |
| `promosense/src/config/navigation.js` | Main menu items |
| `promosense/src/config/features.js` | Feature cards shown on home page |

---

## PWA

* **Manifest:** created on build (`manifest.webmanifest`)
* **Service Worker:** caches assets and SPA fallback for offline routes
* **Icon:** `promosense/public/logo.png` (browser tab and app install)
* **Update:** `registerType: 'autoUpdate'` — new version applies when you reload

---

## Available Scripts

Run these commands inside the `promosense/` folder:

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server with HMR |
| `npm run build` | Production build in `dist/` folder |
| `npm run preview` | Local preview of the build |
| `npm run lint` | ESLint check |
| `npm test` | Automated tests (Vitest) |
| `npm run test:watch` | Tests in watch mode |

---

## Future Improvements

If we had more time, we plan to:

* Add user login and save filter preferences
* Support more languages in the interface
* Add charts and export reports (PDF/CSV)

---

## License

Academic / research project. Use it according to the rules of the institution responsible for this work.
