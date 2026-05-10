# Profile Architect

> AI-powered dating app profile optimization for Hinge, Bumble, and Tinder.

Built with Next.js 14, Supabase, Anthropic Claude, and Replicate.

---

## Quick Start

```bash
# 1. Clone the repo
git clone https://github.com/YOUR_USERNAME/profile-architect.git
cd profile-architect

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
# Fill in your keys (see below)

# 4. Run dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Environment Variables

Copy `.env.example` to `.env.local` and fill in:

| Variable | Where to get it |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase project settings → API |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase project settings → API |
| `ANTHROPIC_API_KEY` | https://console.anthropic.com |
| `OPENAI_API_KEY` | https://platform.openai.com (optional) |
| `REPLICATE_API_TOKEN` | https://replicate.com/account |

---

## Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor**
3. Run the migration file: `supabase/migrations/001_initial_schema.sql`
4. Copy your project URL and anon key into `.env.local`

---

## Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
# Or use vercel env add
vercel env add ANTHROPIC_API_KEY
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel env add SUPABASE_SERVICE_ROLE_KEY
vercel env add REPLICATE_API_TOKEN
```

Or connect your GitHub repo to Vercel and it auto-deploys on push.

---

## Create GitHub Repo (Claude Code)

```bash
# In Claude Code terminal:
cd profile-architect
git init
git add .
git commit -m "feat: initial Profile Architect setup"

# Create repo and push (requires gh CLI)
gh repo create profile-architect --public --push --source=.

# Or manually:
git remote add origin https://github.com/YOUR_USERNAME/profile-architect.git
git branch -M main
git push -u origin main
```

---

## Project Structure

```
profile-architect/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Landing page
│   │   ├── layout.tsx            # Root layout
│   │   ├── auth/
│   │   │   ├── login/page.tsx
│   │   │   └── register/page.tsx
│   │   ├── dashboard/page.tsx    # Main dashboard
│   │   ├── analyzer/page.tsx     # Profile analyzer
│   │   ├── builder/page.tsx      # Profile builder + AI chat
│   │   ├── photo-studio/page.tsx # AI photo generation
│   │   ├── onboarding/page.tsx   # 6-step onboarding
│   │   └── api/
│   │       ├── analyze/route.ts       # Claude profile analysis
│   │       ├── generate-prompts/route.ts  # Prompt generation
│   │       ├── generate-photos/route.ts   # Replicate image gen
│   │       └── chat/route.ts          # Streaming AI coach
│   ├── components/
│   │   ├── ui/          # Button, Card, Badge, ScoreRing
│   │   └── layout/      # Sidebar, AppShell
│   ├── lib/
│   │   ├── supabase/    # client, server, middleware
│   │   └── utils/       # cn, scoring helpers
│   ├── stores/
│   │   └── userStore.ts  # Zustand global state
│   ├── types/
│   │   └── index.ts      # All TypeScript types
│   └── middleware.ts      # Auth guard
├── supabase/
│   └── migrations/001_initial_schema.sql
├── public/
│   └── manifest.json     # PWA manifest
├── .env.example
├── vercel.json
└── README.md
```

---

## Features

- **Profile Analyzer** — Claude-powered psychological breakdown with 7 sub-scores
- **Profile Builder** — AI-generated Hinge/Bumble/Tinder prompts with live regeneration
- **AI Coach Chat** — Streaming conversation with a sharp profile coach
- **Photo Studio** — Realistic photo generation via Replicate (SDXL)
- **Onboarding Flow** — 6-step animated onboarding with archetype detection
- **Dashboard** — Score overview, priority fixes, photo sequencing
- **Auth** — Supabase email/password authentication
- **PWA** — Installable on iOS and Android

---

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: TailwindCSS + CSS variables
- **Animation**: Framer Motion
- **Auth + DB**: Supabase
- **AI Analysis**: Anthropic Claude (claude-sonnet-4)
- **Image Gen**: Replicate (SDXL)
- **State**: Zustand with persistence
- **Deployment**: Vercel

---

## Roadmap

- [ ] Photo upload + face-swap via InstantID on Replicate
- [ ] Photo ranking/voting system
- [ ] Message opener generator
- [ ] Match quality analytics charts
- [ ] Mobile app (React Native / Expo)
- [ ] Profile A/B testing tracker
- [ ] Subscription billing (Stripe)
