# Design System

## Concept

Jimmy's Cafe uses a warm, "breakfast-inspired" color palette to create an inviting, fast-casual feel. Every color choice is intentional — evoking the comfort of a neighborhood cafe while maintaining the clarity needed for a fast-moving POS environment.

---

## Color Palette

| Element | Color | Description |
|---|---|---|
| Background | Soft Cream / Pale Yellow | Warm, neutral base — clean but more welcoming than stark white |
| Primary Action | Deep Navy Blue | High-contrast elements like "Checkout" to guide the user's eye |
| Accents | Golden Yellow | Category icons and highlights — reinforces the "cafe and sunshine" vibe |
| Typography | Charcoal / Dark Brown | High readability with a softer, more organic feel than pure black |

---

## Design Logic

**Warmth** — The heavy use of yellows and creams mimics common breakfast items (eggs, butter, toasted bread) to subtly stimulate appetite.

**Trust** — Dark blue for buttons and navigation provides stability and professional service, consistent with modern food-ordering apps.

**Clarity** — Icons use earthy tones (browns, greens, oranges) to make categories like "Lunch" or "Drinks" instantly recognizable without reading the label.

---

## Tailwind Token Mapping

These custom tokens should be added to `app/globals.css` when building out the UI:

```css
:root {
  --color-background:     #FDFBF2; /* Soft Cream */
  --color-primary:        #1E3A5F; /* Deep Navy Blue */
  --color-accent:         #F5C518; /* Golden Yellow */
  --color-text:           #2C1A0E; /* Charcoal / Dark Brown */
}
```

---

## UI Principles

- **Fast-casual clarity** — staff need to place an order in seconds; layouts should be scannable at a glance
- **Touch-friendly** — buttons and tap targets sized for tablet use at the counter
- **Category-first** — product browsing starts with visual category cards, not lists
