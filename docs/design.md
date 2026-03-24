# Design Guide — Jimmy's Cafe

## Concept

Jimmy's Cafe uses a warm, "breakfast-inspired" visual language to create an inviting, fast-casual feel. The design is optimized for quick interactions — staff placing orders at the counter and customers browsing a menu on tablet or mobile.

---

## Color Palette

### Base Colors

| Token | Hex | Usage |
| --- | --- | --- |
| `--background` | `#FDFBF2` | Soft Cream — page and screen backgrounds |
| `--foreground` | `#2C1A0E` | Charcoal Brown — all body text |
| `--primary` | `#1E3A5F` | Deep Navy — primary buttons, nav bar, checkout CTA |
| `--primary-foreground` | `#FDFBF2` | Text on navy backgrounds |
| `--accent` | `#F5C518` | Golden Yellow — category icons, highlights, badges |
| `--accent-foreground` | `#2C1A0E` | Text on yellow backgrounds |
| `--muted` | `#F0EDD8` | Warm off-white — card backgrounds, input fills |
| `--muted-foreground` | `#6B5B45` | Medium warm brown — secondary labels, placeholders |
| `--border` | `#E5DFC8` | Warm beige — dividers, input borders, card outlines |
| `--card` | `#FFFFFF` | White — product cards, modals |
| `--destructive` | `#DC2626` | Red — errors, cancel actions |

### Sidebar / Nav Colors

| Token | Hex | Usage |
| --- | --- | --- |
| `--sidebar` | `#1E3A5F` | Navy — primary navigation background |
| `--sidebar-foreground` | `#FDFBF2` | Cream — nav labels and icons |
| `--sidebar-primary` | `#F5C518` | Golden Yellow — active nav item indicator |
| `--sidebar-accent` | `#26487A` | Lighter navy — nav item hover state |

### Semantic Colors (status badges)

| Status | Color | Hex |
| --- | --- | --- |
| PENDING | Amber | `#F59E0B` |
| CONFIRMED | Blue | `#3B82F6` |
| PREPARING | Orange | `#F97316` |
| READY | Green | `#22C55E` |
| COMPLETED | Gray | `#6B7280` |
| CANCELLED | Red | `#EF4444` |
| REFUNDED | Purple | `#A855F7` |

### Role Badge Colors

| Role | Color | Hex |
| --- | --- | --- |
| SUPER_ADMIN | Purple | `#7C3AED` |
| ADMIN | Red | `#DC2626` |
| STAFF | Blue | `#2563EB` |
| USER | Gray | `#6B7280` |

---

## Typography

### Font Family

- **Primary**: Geist Sans (loaded via `next/font/google`) — clean, modern, legible at small sizes
- **Mono**: Geist Mono — order numbers, reference codes only

### Scale

| Style | Size | Weight | Usage |
| --- | --- | --- | --- |
| Page Title | `text-2xl` (24px) | 700 | Dashboard, page headers |
| Section Header | `text-lg` (18px) | 600 | Card titles, section labels |
| Body | `text-sm` (14px) | 400 | Table rows, descriptions |
| Label | `text-sm` (14px) | 500 | Form labels, nav items |
| Caption | `text-xs` (12px) | 400 | Timestamps, helper text |
| Price | `text-xl` (20px) | 700 | Product prices |
| Order Number | `text-sm` mono | 500 | `ORD-2026-0001` format |

---

## Spacing & Layout

### Grid

- Dashboard uses a **4-column grid** for stat cards on desktop, collapsing to 2 on tablet, 1 on mobile
- Content area max-width: `1280px`, centered with `px-6` padding
- Section vertical gap: `gap-6` (24px)

### Radius

| Token | Value | Usage |
| --- | --- | --- |
| `--radius-sm` | `0.375rem` | Badges, tags |
| `--radius-md` | `0.5rem` | Inputs, small buttons |
| `--radius-lg` | `0.625rem` | Cards, dialogs |
| `--radius-xl` | `0.875rem` | Bottom sheets, modals |
| `--radius-2xl` | `1.125rem` | Category icon circles |

### Touch Targets

All interactive elements must be **minimum 44×44px** for tablet POS use. Buttons use `h-10` (40px) minimum, `h-12` (48px) for primary CTAs like Checkout.

---

## Components

### Navigation

From the mockup — bottom tab bar on mobile, top header on desktop/tablet:

- **Logo area**: "Jimmy's Cafe" in `text-lg font-bold` with a coffee cup icon
- **Nav items**: Menu, Orders, Rewards, Profile (mobile); Dashboard, Orders, Products, Customers, Team (admin)
- **Active state**: Golden Yellow `#F5C518` indicator on navy background
- **User button**: Top-right corner (Clerk `UserButton`)

### Product Cards

Observed from mockup:

- White card with `rounded-xl` corners and subtle shadow
- Product image fills top ~55% of card (rounded top corners only)
- Product name: `text-sm font-semibold` in charcoal
- Description: `text-xs` in muted brown, 2-line clamp
- Price: `text-base font-bold` in charcoal
- Add button: Golden Yellow circle `+` in bottom-right corner

### Category Icons

- Circular yellow (`#F5C518`) background, `rounded-full`
- Icon inside: earthy tones (brown for Breakfast, green for Lunch, etc.)
- Label below: `text-xs` centered, charcoal
- Size: `w-14 h-14` icon circle

### Stat Cards (Dashboard)

- White card with warm border `border-border`
- Label: `text-sm text-muted-foreground`
- Value: `text-3xl font-bold text-foreground`
- Optional icon: top-right, muted color

### Checkout Button

- Full-width or prominent fixed position
- Background: Deep Navy `#1E3A5F`
- Text: Cream `#FDFBF2`, `font-semibold`
- Cart icon on left
- Height: `h-12` minimum

### Search Bar

- Rounded pill shape (`rounded-full`)
- Muted background `#F0EDD8`
- Placeholder: "Search menu..." in muted brown
- Search icon on left

### Badges

- Use `rounded-full` pill style for status and role badges
- Font: `text-xs font-medium`
- Padding: `px-2.5 py-0.5`

---

## Iconography

- **Library**: Lucide React (already configured via shadcn)
- **Style**: Outline icons, `strokeWidth={1.5}`
- **Size**: `w-4 h-4` inline, `w-5 h-5` nav, `w-6 h-6` feature icons
- **Category icons**: Use food-themed emoji or custom SVGs with earthy fill colors

---

## Motion & Interaction

- **Transitions**: `transition-colors duration-150` on hover states
- **No heavy animations** — this is a POS tool, speed is the priority
- Hover states: lighten navy `#26487A`, darken yellow slightly
- Focus rings: Navy `#1E3A5F` at 2px offset

---

## Responsive Breakpoints

| Breakpoint | Width | Layout |
| --- | --- | --- |
| Mobile | `< 640px` | Single column, bottom nav |
| Tablet | `640–1024px` | 2-column grid, top nav |
| Desktop | `> 1024px` | 4-column grid, sidebar or top nav |

Primary target for the POS counter view is **tablet landscape (1024×768)**.

---

## Do / Don't

| Do | Don't |
| --- | --- |
| Use cream backgrounds to feel warm | Use stark white `#FFFFFF` as the page background |
| Use navy for primary actions | Use multiple competing accent colors |
| Keep tap targets at 44px minimum | Use text links for primary actions on touch screens |
| Use earthy icon colors for categories | Use generic gray icons for food categories |
| Truncate long product names at 2 lines | Let text overflow and break card layouts |
