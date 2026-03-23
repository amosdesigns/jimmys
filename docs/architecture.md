# Architecture

## Overview

Jimmy's Orders is a server-rendered Next.js application using the App Router. Most data fetching happens in React Server Components. Client components are used only where interactivity is required (forms, modals, real-time updates).

## Request Flow

```
Browser
  └─ proxy.ts (Clerk auth gate — runs before every request)
       └─ App Router
            ├─ (auth)/ — public routes (sign-in, sign-up)
            └─ (dashboard)/ — protected routes
                 ├─ Server Components fetch data directly via Prisma
                 └─ Client Components call API routes for mutations
```

## Layers

### Proxy (`proxy.ts`)
Runs on every request before routing. Protects all routes except `/sign-in`, `/sign-up`, and `/api/webhooks/*`. Powered by Clerk's `clerkMiddleware`.

### App Router (`app/`)
- **Route groups** keep auth and dashboard layouts separate
- **Server Components** (default) — fetch data, no bundle cost
- **Client Components** — forms, interactive UI, browser APIs

### API Routes (`app/api/`)
REST-style handlers for mutations and webhooks.

| Route | Purpose |
|---|---|
| `POST /api/webhooks/clerk` | Sync Clerk user events to the database |

### Data Layer (`lib/prisma.ts`)
Single shared Prisma client instance. Uses a global singleton in development to avoid hot-reload connection exhaustion.

### Email (`lib/resend.ts`)
Transactional email via Resend. Used for order confirmations and notifications.

## Deployment Target

Vercel (zero-config with Next.js). Database hosted on Supabase.
