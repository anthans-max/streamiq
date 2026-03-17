# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server (typically port 3001 if 3000 is in use)
npm run build    # Production build — must pass with 0 errors before committing
npm run lint     # ESLint
npm run start    # Start production server
```

No test runner is configured. Verify changes by running `npm run build` and checking the dev server.

## Architecture

**Single-page app inside Next.js App Router.** `src/app/page.tsx` is a `'use client'` component that owns all client-side routing via a `page` state variable. Navigation never changes the URL — clicking nav items calls `navigate(key)` which updates state and scrolls to top. All section components are also `'use client'`.

`layout.tsx` is the only true server component. It injects three Google Font CSS variables (`--font-display`, `--font-body`, `--font-mono`) and the global stylesheet.

**Styling: custom CSS only.** Tailwind is installed as a dev dependency but is intentionally unused — `@import "tailwindcss"` was removed from `globals.css`. All styling uses CSS custom properties defined in `globals.css` and inline styles in components. Never add Tailwind utility classes.

**Streaming AI responses.** Both `/api/chat` and `/api/analyze` use `@anthropic-ai/sdk` with `client.messages.stream()` and forward native Anthropic SSE events verbatim to the client. The client-side parser (in `AnalyticsSection` and `ChatSection`) looks for `e.type === "content_block_delta" && e.delta?.type === "text_delta"` to extract text chunks.

**Contact form** (`/api/contact`) logs the submission to the console and always returns success — there is no database. A hardcoded `DEMO_LEADS` array in the route shows representative sample data. Resend email is optional — if `RESEND_API_KEY` and `RESEND_TO_EMAIL` are set, a notification is sent; a failure is logged but the route still returns 200.

**PDF export** (`src/lib/exportPdf.ts`) is a pure client-side utility using `jsPDF`. It receives the parsed `DataRow[]` array and the completed AI insight string, then generates and triggers a download of a multi-page A4 PDF. It is called directly from `AnalyticsSection` — there is no API route involved.

## Environment Variables

Copy `.env.local.example` to `.env.local`. `ANTHROPIC_API_KEY` is required for AI features. No database is required.

```
ANTHROPIC_API_KEY
RESEND_API_KEY / RESEND_FROM_EMAIL / RESEND_TO_EMAIL   # optional email notification
```

## Key Constraints

- **Do not edit** `design-reference/streamiq-lotus.jsx` — it is the original prototype, kept for reference only.
- The app uses `model: "claude-sonnet-4-20250514"` in both API routes. Use the same model string for any new AI routes.
- `useIsMobile` hook guards `window.innerWidth` with an SSR check; use it whenever you need viewport-conditional rendering in client components.
- Charts (`BarChart`, `DonutChart`, `Sparkline`) are custom SVG components — no chart library is used.
- `public/og-image.png` is a static 1200×630 OG image. Regenerate it with `node scripts/generate-og.js` (requires `sharp`, already a devDependency). Do not edit the PNG directly.
