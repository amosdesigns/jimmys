# Jimmy's Orders — Project Overview

A full-featured order management and point-of-sale (POS) system for restaurants and food businesses. Staff can manage orders, products, customers, and payments from a single dashboard.

## Tech Stack

| Layer | Technology |
| --- | --- |
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4, Radix UI |
| Database | PostgreSQL (Supabase) |
| ORM | Prisma 7 |
| Auth | Clerk |
| Email | Resend |
| Webhooks | Svix |
| Forms | React Hook Form + Zod |
| Testing | Playwright |

## Project Structure

```text
app/              # Next.js App Router pages
  (auth)/         # Sign-in / sign-up routes
  (dashboard)/    # Protected dashboard routes
  api/            # API route handlers
lib/              # Shared server utilities (prisma, resend)
hooks/            # Shared React hooks
types/            # Shared TypeScript types
prisma/           # Schema, migrations, seed
docs/             # Project planning & documentation
public/           # Static assets
```

## Key Docs

- [Architecture](./architecture.md) — system design and data flow
- [Data Models](./data-models.md) — database schema reference
- [Features](./features.md) — feature list and roadmap
- [Auth & Roles](./auth-roles.md) — user roles and access control
- [Design System](./design.md) — color palette, tokens, and UI principles
