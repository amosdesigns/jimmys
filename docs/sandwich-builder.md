# Sandwich Builder — Feature Spec

**Status:** Draft for review
**Owner:** Jerome
**Last updated:** 2026-04-20
**Related:** [overview](./overview.md) · [architecture](./architecture.md) · [data-models](./data-models.md) · [design](./design.md)

## 1. Purpose

Define the end-to-end workflow for building a sandwich in Jimmy's Orders: from the guest tapping "Build a Sandwich" in the customer menu through the line cook handing it across the counter. The feature has two synchronized surfaces — the `(menu)` guest builder and the `(dashboard)` kitchen ticket — and a shared data model that extends the existing `Product`/`OrderItem` graph rather than replacing it.

This doc is the contract for the frontend wizard, the server actions, the schema migration, and the kitchen display.

> **Reminder (AGENTS.md):** This project is on Next.js 16 + Prisma 7. Before writing any implementation, read `node_modules/next/dist/docs/` for current App Router conventions — several APIs moved between 14 and 16.

## 2. Scope (v1)

**In scope:**

- A five-step guided builder (Bread → Cheese → Protein → Veg → Sauce)
- Per-category min/max rules, "Skip" for optional steps, upcharge on second-of-category
- Price quoted live from the server; client cannot author prices
- Allergen tags surfaced on ingredient tiles; declared allergies warn but don't block (v1)
- Out-of-stock handling at select time and at submit time (race safe)
- Guest checkout (walk-up, tablet kiosk) and signed-in "save as favorite"
- Kitchen ticket renders the sandwich in the same top-to-bottom order the guest built it
- Order flows through the existing `OrderStatus` lifecycle — no new top-level states

**Out of scope (flagged for v2 below):**

- Split sandwiches ("half turkey / half ham")
- Combos (sandwich + side + drink bundling)
- Nutrition calculator
- Loyalty / rewards integration (the `(menu)/menu/rewards` page exists but the surface is separate)
- Admin UI for managing option groups — v1 ships with seeded data; admin editing lands in v2

## 3. Personas

**Maya — the guest.** Orders on a counter-mounted tablet or on her phone via `(menu)/menu`. Fast, legible, one-thumb flow. Every step must have a default path forward.

**Dre — the line cook.** Runs the build station from the kitchen display. Opens the Orders page, reads the ticket top-to-bottom, builds. Big type, no color-only cues, two-tap state transitions.

**Sam — the shift lead (MANAGER/ADMIN).** Monitors queue depth, 86s ingredients, voids/refunds. Works from `(dashboard)/orders`.

**Jimmy — the owner (SUPER_ADMIN/ADMIN).** Not in the v1 loop beyond seeding the menu. v2 gives him the option-group editor.

## 4. Fits within the existing architecture

The existing architecture, from [architecture.md](./architecture.md):

- `(auth)/` — public
- `(dashboard)/` — staff, protected by Clerk
- `(menu)/` — guest-facing menu surface
- Data fetching in Server Components via Prisma; mutations via API routes (today) or server actions (prefer for new work)

**Where the builder lives:**

| Surface | Location | Type |
| --- | --- | --- |
| Guest wizard | `app/(menu)/menu/build/page.tsx` + step subroutes | Server Component shell, Client Component wizard |
| Cart & checkout | `app/(menu)/menu/cart/page.tsx` (new) | Client Component |
| Kitchen ticket | Extend `app/(dashboard)/orders/page.tsx` ticket rendering | Server Component with client-action buttons |
| Ingredient admin (v2) | `app/(dashboard)/products/[id]/options/page.tsx` | Later |

**New components (`components/menu/build/`):**

- `BuildWizard.tsx` — the state owner; mounts one `StepPanel` at a time
- `StepPanel.tsx` — generic step shell (title, grid, Back/Skip/Next)
- `IngredientTile.tsx` — the tap target; variants for single-select and multi-select
- `SandwichSummary.tsx` — running-total rail, sticky right on tablet, bottom on mobile
- `IngredientDetailSheet.tsx` — bottom sheet for allergen/nutrition info

**New components (`components/dashboard/orders/`):**

- `SandwichTicket.tsx` — renders a configurable `OrderItem` as a build-order card
- `TicketStateButtons.tsx` — Start / Ready / Bump

## 5. Build order & category rules

Five categories, fixed order. This order is product-opinionated — it mirrors how Dre actually stacks the sandwich on the line, which keeps the guest's mental model and the kitchen's hands in sync.

| # | Category | Required | Min | Max | Notes |
|---|----------|----------|-----|-----|-------|
| 1 | Bread | Yes | 1 | 1 | Single-select. Includes a `no_bread` option (lettuce wrap, price delta `-$1.00`) so every guest funnels through step 1. Has a `toasted` modifier. |
| 2 | Cheese | No | 0 | 2 | Skippable. Second slice triggers `secondSelectionFee`. |
| 3 | Protein | Yes | 1 | 2 | Second protein triggers `secondSelectionFee` ("double-up"). |
| 4 | Veg | No | 0 | 6 | Free. Hard cap of 6 so the sandwich still holds. |
| 5 | Sauce | No | 0 | 3 | Free. Each selection exposes an `on_the_side` modifier. |

Bread and Protein are the only required steps. Every other step renders a "Skip" button that advances without adding anything.

## 6. Guest build flow

The builder is a linear wizard with a persistent summary rail. The rail shows the running sandwich composition and server-quoted running total. Each step owns one category.

### 6.1 Entry

From `(menu)/menu`, the "Build a Sandwich" featured tile opens `/menu/build`. The shell Server Component creates a `SandwichDraft` record (persisted, guest-session scoped) and redirects into step 1. An unfinished draft persists for 24h keyed by a cookie (`jc_draft`) so an interrupted guest resumes.

### 6.2 Step 1 — Bread

Grid of bread options. Tile: photo, name, price delta from the $8.50 base (blank if `$0`). Single-select. Below the grid, a `Toasted` toggle. "Next" enables on selection.

### 6.3 Step 2 — Cheese

Multi-select grid, cap 2. Selected tiles show a count badge (`1×`, `2×`). "Skip" is the primary-weight CTA until anything is selected, at which point it becomes "Next." Picking a second slice immediately updates the summary rail with the `+$1.00` upcharge.

### 6.4 Step 3 — Protein

Grid with a soft divider between "Standard" and "Premium" ingredients (`isPremium` flag on `Ingredient`). Premium tiles show their delta in the corner. Required step, max 2. "Skip" is not shown; the CTA is a disabled "Next" until one protein is chosen. Second protein → `secondSelectionFee`.

### 6.5 Step 4 — Veg

Multi-select grid, cap 6. At the cap, unselected tiles dim and show a tooltip "Max 6 veggies." All free.

### 6.6 Step 5 — Sauce

Multi-select, cap 3. Each selected sauce exposes a small `On the side` checkbox (it sets the `on_the_side` modifier on the chosen option). Free.

### 6.7 Review

Single screen. Each category labeled with its ingredients and modifiers, a per-line breakdown, and total. Two CTAs: "Add to Order" (primary, navy) and "Save as Favorite" (secondary, authenticated users only; opens a name prompt).

### 6.8 Navigation

- Back preserves selections on the destination step.
- The progress indicator is tappable; jumping back is always allowed.
- Jumping forward is only allowed when all intermediate required steps are satisfied.

### 6.9 Ingredient detail sheet

Tapping the `i` on any tile opens `IngredientDetailSheet` (a shadcn `Sheet`). Shows photo, description, allergens ("Contains: dairy, soy"), and nutrition where set. Has an inline Add so guests can commit from the detail view.

### 6.10 Empty / error states

- **Category fully 86'd** (all ingredients in a category `isAvailable = false`): show a card "We're out of [category] right now — skipping" with a Continue button. Required categories in this state block submit; a top-level banner tells the guest to pick a different sandwich or come back later.
- **Network lost mid-build**: draft persists locally; a snackbar announces offline; pricing/inventory show last-known with a stale indicator.
- **Ingredient goes 86'd between select and review** (race): the review screen highlights the offending line red with a one-tap "Remove" or "Swap."

## 7. Kitchen build flow

The kitchen ticket is a mirror of the builder. When an order submits, each sandwich `OrderItem` renders as a `SandwichTicket` with the same five blocks in the same order Dre would build them.

### 7.1 Ticket anatomy

- **Header:** order number, line position ("1 of 2"), ETA, `OrderType` badge.
- **Body:** five blocks in build order (Bread, Cheese, Protein, Veg, Sauce). Empty optional categories collapse to an italic line ("No cheese") — the eye still sweeps the step, nothing gets missed.
- **Modifiers:** inline, bold. ("Sourdough — toasted", "Mayo — on the side")
- **Allergy flag:** if the customer declared an allergy, a red pill sits above the ticket with the allergen. (v1 soft-warns; v2 hard-blocks with override.)
- **Footer:** Start / Mark Ready / Bump.

### 7.2 Per-line state

v1 introduces a minimal per-line state so kitchen can track multi-line orders without rolling the whole `Order` forward prematurely. See §10 for the schema addition.

Line states: `QUEUED` → `IN_PROGRESS` → `READY` → `DELIVERED` | `VOIDED`

Dre taps Start on the first line to move `QUEUED → IN_PROGRESS`. When all lines on an order are `READY`, the `Order.status` auto-advances from `PREPARING` to `READY` and the guest is notified.

### 7.3 Shift lead actions

Sam has a kebab menu on any ticket: void with reason code, flag allergen issue, refire a dropped sandwich. Voids write to an audit log (v2; v1 logs to `notifications`).

### 7.4 Layout

Landscape-first, 2–4 tickets per row depending on viewport. Tickets are uniform width; height grows with content. Newest orders enter from the right. Auto-scroll is off — Dre controls pagination.

## 8. Order lifecycle

Uses the existing `OrderStatus` enum from [data-models.md](./data-models.md); no new top-level states.

```
PENDING → CONFIRMED → PREPARING → READY → COMPLETED
                                       ↘ CANCELLED / REFUNDED
```

- **PENDING**: order record created, payment pending.
- **CONFIRMED**: payment captured, ticket shows up on kitchen display. Sets `Order.confirmedAt`.
- **PREPARING**: at least one line is `IN_PROGRESS`. Sets `Order.preparedAt` on first transition.
- **READY**: all lines `READY`. Sets `Order.readyAt`. Triggers guest notification.
- **COMPLETED**: guest received. Sets `Order.completedAt`.
- **CANCELLED / REFUNDED**: voided or refunded per shift-lead action.

Per-line `OrderItemStatus` (new, see §10) rolls up into `Order.status` via a single helper `recalcOrderStatus(orderId)` called after every line transition. Centralizing the rollup avoids drift between surfaces.

## 9. Validation & business rules

Rules are enforced at two layers: the client blocks obviously-invalid states for UX; the server action re-validates on submit for correctness. **Server is the source of truth** — always.

- **Bread required.** Submit rejects any sandwich without a bread option.
- **Protein required.** Same.
- **Category caps.** Server validates counts per group. Violations return a structured `ValidationError` keyed by `groupName`.
- **Availability at submit.** Re-check `isAvailable` on every selected ingredient. If any now 86'd, submit fails with the list; client prompts swap.
- **Allergen soft-warn.** If the customer's declared allergens intersect an ingredient's `allergens`, submit succeeds and attaches an `allergenFlag` string to the `OrderItem`. The ticket renders a red pill. (v2: setting to hard-block with override.)
- **Price stability.** Client-submitted total is informational. Server recomputes from the authoritative menu. If server total differs by > $0.01, submit is rejected with the corrected quote; client re-prompts "Price updated to $X, confirm?"
- **Modifier compatibility.** Modifiers are scoped to a category (e.g. `toasted` → Bread only; `on_the_side` → Sauce only). Mismatches are rejected.

## 10. Schema extensions

Additive migration — the existing `Category`/`Product`/`OrderItem` model continues to work unchanged for non-configurable items (drinks, sides, pastries).

### 10.1 New models

```prisma
// prisma/schema.prisma — additions

enum OrderItemStatus {
  QUEUED
  IN_PROGRESS
  READY
  DELIVERED
  VOIDED
}

enum SandwichCategoryKind {
  BREAD
  CHEESE
  PROTEIN
  VEG
  SAUCE
}

model Ingredient {
  id          String               @id @default(cuid())
  name        String               @unique
  slug        String               @unique
  description String?              @db.Text
  imageUrl    String?
  kind        SandwichCategoryKind
  isPremium   Boolean              @default(false)
  isAvailable Boolean              @default(true)

  // Allergens as discrete strings — queryable, no enum lock-in
  allergens   String[]

  // Optional inventory — aligns with Product.trackInventory pattern
  trackInventory Boolean @default(false)
  stockQuantity  Int?

  sortOrder   Int     @default(0)

  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  options     ProductOption[]

  @@index([kind, isAvailable])
  @@index([sortOrder])
}

model ProductOptionGroup {
  id                   String               @id @default(cuid())
  productId            String
  product              Product              @relation(fields: [productId], references: [id], onDelete: Cascade)

  kind                 SandwichCategoryKind
  name                 String               // display label, e.g. "Cheese"
  position             Int                  // 1..5 for the build order
  minSelections        Int                  @default(0)
  maxSelections        Int                  @default(1)
  secondSelectionFee   Decimal              @db.Decimal(10, 2) @default(0)

  options              ProductOption[]

  @@unique([productId, position])
  @@index([productId])
}

model ProductOption {
  id           String              @id @default(cuid())
  groupId      String
  group        ProductOptionGroup  @relation(fields: [groupId], references: [id], onDelete: Cascade)

  ingredientId String
  ingredient   Ingredient          @relation(fields: [ingredientId], references: [id], onDelete: Restrict)

  priceDelta   Decimal             @db.Decimal(10, 2) @default(0)
  sortOrder    Int                 @default(0)

  @@unique([groupId, ingredientId])
  @@index([groupId])
}

model SandwichDraft {
  id             String    @id @default(cuid())
  sessionCookie  String    @unique   // jc_draft cookie value
  userId         String?              // null for guest; set if signed in
  productId      String               // the "Build Your Own Sandwich" product

  // Structured composition, validated against the product's groups
  composition    Json

  expiresAt      DateTime
  createdAt      DateTime  @default(now())
  updatedAt      DateTime  @updatedAt

  @@index([sessionCookie])
  @@index([userId])
  @@index([expiresAt])
}

model SavedSandwich {
  id          String   @id @default(cuid())
  userId      String
  name        String
  productId   String
  composition Json     // same shape as SandwichDraft.composition

  createdAt   DateTime @default(now())

  @@index([userId])
}
```

### 10.2 Modifications to existing models

```prisma
model Product {
  // ... existing fields ...

  // NEW — flags a configurable product (Build Your Own Sandwich)
  isConfigurable Boolean               @default(false)
  basePrice      Decimal?              @db.Decimal(10, 2)   // for configurable products; regular `price` stays for simple products
  optionGroups   ProductOptionGroup[]
}

model OrderItem {
  // ... existing fields ...

  // NEW — per-line kitchen state
  status       OrderItemStatus @default(QUEUED)
  startedAt    DateTime?
  readyAt      DateTime?
  deliveredAt  DateTime?
  voidedAt     DateTime?
  voidReason   String?

  // `modifiers String?` stays — keep as JSON snapshot of the resolved composition
  // (group name, option name, option priceDelta, modifiers[]) so the ticket and the
  // receipt are stable even after the menu changes.

  @@index([status])
}
```

The `OrderItem.modifiers` field stays as the historical snapshot (text JSON matching the [data-models.md](./data-models.md) contract). New composition data flows from `SandwichDraft.composition` → `OrderItem.modifiers` at submit. Historical orders survive menu edits.

### 10.3 Seed update

The existing `prisma/seed.ts` seeds generic products. Extend it with:

1. A "Build Your Own Sandwich" Product (`isConfigurable: true`, `basePrice: 8.50`, no `price`).
2. Five `ProductOptionGroup` rows: Bread/Cheese/Protein/Veg/Sauce with min/max/fee per the table in §5.
3. Seed `Ingredient` rows per kind — 4 breads, 4 cheeses, 4 proteins (2 standard + 2 premium), 8 veg, 6 sauces — enough to test all paths.
4. Wire `ProductOption` rows linking each ingredient to its group with its `priceDelta`.

Keep the existing generic seed (Classic Burger, Grilled Chicken, etc.) so the rest of the POS surface is still populated.

## 11. Server actions (`app/(menu)/menu/build/actions.ts`)

Prefer server actions over API routes for the builder — the wizard is entirely inside the `(menu)` segment, there's no external API consumer for these, and server actions give us progressive enhancement for free.

```ts
"use server"

// Create or hydrate a draft for the current session.
export async function getOrCreateDraft(): Promise<SandwichDraft>

// Set the selections for a single group. Validates against the group's rules
// and re-prices. Returns the updated draft + server-authoritative price.
export async function updateDraftGroup(input: {
  draftId: string
  groupId: string
  selections: Array<{ optionId: string; modifierKeys: string[] }>
}): Promise<{ draft: SandwichDraft; subtotal: Decimal; issues: ValidationIssue[] }>

// Submit: validates, re-prices, creates an Order + OrderItem, snapshots
// composition into OrderItem.modifiers, clears the draft.
// Idempotent on draft id.
export async function submitSandwichToOrder(input: {
  draftId: string
  orderId?: string  // add to an existing in-progress order (dine-in multi-item flow)
}): Promise<{ orderId: string; orderItemId: string }>

// Save current draft composition as a favorite (signed-in only).
export async function saveDraftAsFavorite(input: {
  draftId: string
  name: string
}): Promise<SavedSandwich>

// Kitchen: advance a line's state. Requires STAFF+ role.
export async function advanceOrderItemStatus(input: {
  orderItemId: string
  to: OrderItemStatus
  reason?: string  // required for VOIDED
}): Promise<OrderItem>
```

Role-gate `advanceOrderItemStatus` with a helper like `requireStaffRole()` pulled from Clerk session + `User.role`.

## 12. Pricing

```
sandwich_subtotal =
    product.basePrice
  + Σ(option.priceDelta for each selected option)
  + Σ(group.secondSelectionFee for each group where selections.length == 2)
  + Σ(modifier.priceDelta where applicable)   // toasted is free in v1; leaves the hook in place
```

Order-level totals (`subtotal`, `taxAmount`, `discountAmount`, `tipAmount`, `totalAmount`) follow the existing `Order` fields from [data-models.md](./data-models.md). Tax is location-scoped (hardcoded rate in v1; configurable in v2). Tips are post-subtotal.

## 13. Design notes

Uses the tokens in [design.md](./design.md). A few builder-specific calls:

- **Step headers:** `text-2xl font-bold`, cream background, 24px top padding. Step number chip in Golden Yellow to the left.
- **Tile grid:** 2-up on mobile, 3-up on tablet portrait, 4-up on tablet landscape (the POS target). Tiles are `rounded-xl` on `--muted` with `--border`.
- **Selected tile state:** 2px Deep Navy ring, Golden Yellow badge in top-right with count or checkmark.
- **Summary rail:** sticky, `--card` background, list-style composition, `text-xl font-bold` for running total. On mobile it docks to a collapsible bottom sheet; tap to expand the full list.
- **CTAs:** "Next" and "Add to Order" use the Checkout button style (`h-12`, Deep Navy, cream text). "Skip" uses `variant="outline"`.
- **Kitchen ticket sandwich block:** `rounded-lg` card per sandwich, category names in `text-xs uppercase tracking-wide --muted-foreground`, ingredients in `text-base font-medium`. Modifiers in bold, set off with an em dash.

## 14. Telemetry

Write to `notifications` + a new lightweight `order_events` table (v2), but at minimum emit server-side log lines for these in v1:

- `builder.started { draftId }`
- `builder.step_completed { draftId, step, selectionCount, durationMs }`
- `builder.abandoned { draftId, lastStep }`
- `builder.ingredient_oos_hit { ingredientId, step }`
- `order.submitted { orderId, sandwichCount, total }`
- `kitchen.item_state_changed { orderItemId, from, to, sinceSubmitMs }`

The first three give us the guest funnel. The last one gives us SLA: submit → READY time by sandwich. `ingredient_oos_hit` is the 86'd UX cliff — Sam needs to see that in real time.

## 15. Open questions

Intentionally undecided, flagged so they don't ship as silent defaults:

- **Payment capture timing.** Authorize on submit, capture on `CONFIRMED → PREPARING`? Or capture immediately? Affects refund UX if an ingredient is 86'd between submit and start. Need @Jerome call.
- **Tablet kiosk vs. phone.** Is `(menu)` targeting a mounted counter tablet, the guest's own phone, or both? The design implies tablet-first; Maya on her phone is secondary. Locking this affects layout density and auth flow.
- **Single vs. multi-location.** Menu overrides per location? Current schema doesn't have `Location`. If v1 is one shop, ignore; if we're planning for two, add `locationId` now before we have historical data to migrate.
- **Admin option-group editor.** v1 seeds. When does v2 land? If Jimmy wants to flip a weekly special without a deploy, we need it sooner.
- **Hard-block on allergens.** v1 warns, v2 blocks-with-override. Worth validating with Jimmy — some shops prefer hard-block as a liability story.
- **"Skip" copy.** "Skip" is unambiguous but cold. "No cheese, thanks" feels more like the cafe. Small UX call, worth a quick vote.

## 16. Implementation plan (suggested order)

1. **Migration** — add enums, `Ingredient`, `ProductOptionGroup`, `ProductOption`, `SandwichDraft`, `SavedSandwich`; extend `Product` and `OrderItem`.
2. **Seed** — BYO Sandwich product + ingredients + options; keep existing seeds.
3. **Server actions** — `getOrCreateDraft`, `updateDraftGroup`, `submitSandwichToOrder`, `advanceOrderItemStatus`.
4. **Guest wizard** — `BuildWizard`, `StepPanel`, `IngredientTile`, `SandwichSummary`. Wire into `app/(menu)/menu/build/page.tsx`.
5. **Cart + checkout** — `(menu)/menu/cart` hands off to the existing checkout surface.
6. **Kitchen ticket** — `SandwichTicket` component in `(dashboard)/orders`. State transition buttons.
7. **Allergen + availability race** — review screen revalidation, snackbar on submit failure.
8. **Telemetry** — log lines first, table later.
9. **Playwright** — happy path (build → submit → kitchen advance → ready), required-step guard, 86'd ingredient, price-mismatch rejection.

## 17. Appendix — example sandwich end-to-end

Maya opens `(menu)/menu` → taps Build. She picks **sourdough, toasted**, skips cheese, picks **grilled chicken + bacon** (bacon is a second-protein `secondSelectionFee` of $2.50), veg: lettuce, tomato, red onion, pickles, sauce: chipotle mayo (on the side) + honey mustard. Review:

```
Sourdough (toasted)
Grilled chicken, Bacon (+$2.50 double-up)
Lettuce, Tomato, Red onion, Pickles
Chipotle mayo (on the side), Honey mustard
----------------------------------
Subtotal  $11.00
Tax          0.98
Total     $11.98
```

She taps Add to Order, checks out, pays. `submitSandwichToOrder` creates an `Order` with one `OrderItem`, snapshots the composition to `OrderItem.modifiers`, sets `Order.status = CONFIRMED`. Dre's Orders page auto-refreshes; the new `SandwichTicket` shows the five blocks in build order. He taps Start (`OrderItem.status = IN_PROGRESS`, `Order.status = PREPARING`), builds top-to-bottom, taps Mark Ready. `recalcOrderStatus` flips the order to `READY`, Maya's phone buzzes, she walks up.

---

**Next up once this is signed off:** I'd start with the migration (Step 1) because everything else is downstream of the schema. Before that, the two things most worth validating with you are (a) the `ProductOptionGroup`-per-Product model vs. a shared global group (I recommend per-product for v1 — it's more code but it leaves room for "Club Sandwich" vs. "Breakfast Sandwich" to have different rules later), and (b) the capture-timing call under §15.
