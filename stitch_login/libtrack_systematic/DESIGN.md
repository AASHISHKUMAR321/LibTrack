# Design System Specification: The Digital Curator

## 1. Overview & Creative North Star
The "Digital Curator" is the creative North Star for this design system. We are moving beyond the generic "utility app" aesthetic to create an experience that feels like a high-end, modern architectural library. The goal is to balance the reliability of a professional tool with the breathing room of an editorial lookbook.

We achieve this through **Intentional Asymmetry** and **Tonal Depth**. By avoiding rigid, boxed-in grids and instead using overlapping surfaces and high-contrast typography scales (Inter vs. Manrope), we create a "signature" look. The UI should feel curated, not just managed—shifting from a "database of books" to an "exhibition of knowledge."

## 2. Colors & Surface Philosophy
This system rejects the "flat" web. We use color to define physical space and priority, moving away from structural lines toward atmospheric transitions.

### The "No-Line" Rule
**Standard 1px solid borders are strictly prohibited for sectioning.** Boundaries must be defined solely through background color shifts or subtle tonal transitions. For example, a `surface-container-low` (#f3f3f3) sidebar should sit against a `surface` (#f9f9f9) main content area without a dividing line.

### Surface Hierarchy & Nesting
Treat the UI as a series of nested physical layers.
- **Base:** `surface` (#f9f9f9)
- **Primary Containers:** `surface-container-lowest` (#ffffff) for high-focus cards.
- **Structural Elements:** `surface-container` (#eeeeee) or `surface-container-high` (#e8e8e8) for background groupings.
- **Nesting Logic:** Always place a lighter surface (e.g., `surface-container-lowest`) on top of a darker one (e.g., `surface-container-low`) to create a natural, "raised" optical effect.

### Glass & Gradient Rule
To prevent the UI from feeling "out-of-the-box," use **Glassmorphism** for floating elements (like Navigation Bars or Quick-Action Overlays). 
- **Recipe:** Semi-transparent `surface` color (80% opacity) + `backdrop-blur: 20px`.
- **Signature Textures:** For primary CTAs or hero headers, use a subtle linear gradient from `primary` (#005ea4) to `primary-container` (#0077ce) at a 135-degree angle. This adds "soul" and depth that flat hex codes lack.

## 3. Typography
The system uses a pairing of **Manrope** (Display/Headlines) for an authoritative, modern editorial feel and **Inter** (Body/Labels) for technical precision and high legibility.

| Level | Token | Font | Size | Usage |
| :--- | :--- | :--- | :--- | :--- |
| **Display** | `display-lg` | Manrope | 3.5rem | Hero statistics, large visual impact. |
| **Headline**| `headline-md`| Manrope | 1.75rem | Section titles, book category names. |
| **Title**   | `title-lg`   | Inter | 1.375rem | Card headers, book titles in detail views. |
| **Body**    | `body-md`    | Inter | 0.875rem | Descriptions, metadata, general content. |
| **Label**   | `label-md`   | Inter | 0.75rem | Overdue tags, ISBN numbers, small caps. |

**Editorial Note:** Use wide letter-spacing (0.05em) for `label-sm` in all-caps to create a premium "archival" feel.

## 4. Elevation & Depth
Depth is achieved through **Tonal Layering** first, and **Ambient Light** second.

- **The Layering Principle:** Avoid shadows for static cards. Instead, use the `surface-container-lowest` (#ffffff) on a `surface-container` (#eeeeee) background. This creates a soft "lift."
- **Ambient Shadows:** For "floating" components (Modals, Popovers), use a multi-layered shadow: `0px 4px 20px rgba(26, 28, 28, 0.06)`. The shadow color is a tinted version of `on-surface` (#1a1c1c), mimicking natural light.
- **The "Ghost Border" Fallback:** If a border is required for accessibility, use the `outline-variant` token at **15% opacity**. Never use 100% opaque borders.
- **Roundedness Scale:** 
    - Buttons & Inputs: `md` (0.75rem)
    - Cards & Large Containers: `xl` (1.5rem)
    - Chips: `full` (9999px)

## 5. Components

### Cards & Lists
**Forbid the use of divider lines.** 
- Use vertical white space (`spacing-6` / 1.5rem) to separate list items. 
- For cards, use `surface-container-lowest` with an `xl` corner radius. 
- Overlap elements: Let a book cover "break" the top margin of a card by `-1rem` to create a 3D effect.

### Buttons
- **Primary:** Gradient fill (`primary` to `primary-container`) with `on-primary` text. No shadow.
- **Secondary:** `surface-container-high` background with `primary` text.
- **Tertiary:** Transparent background with `primary` text; background shifts to `primary-fixed` at 10% opacity on hover.

### Input Fields
- **Style:** Use a "Filled" style with `surface-container-high` background.
- **Focus:** No heavy borders. Transition the background to `surface-container-lowest` and add a subtle 2px bottom-stroke of `primary`.

### Navigation (The Floating Dock)
Instead of a standard sidebar, use a centered, floating navigation dock at the bottom of the screen using the **Glassmorphism** recipe. This maximizes screen real estate and feels more "app-native" and modern.

### Library-Specific Components
- **Status Pills:** Use `secondary_container` (#98f994) for "Available" and `tertiary_container` (#db322f) for "Overdue." Use `label-md` bold for the text.
- **Progress Gauge:** For reading tracking, use a thick 8px stroke with `primary` for progress and `surface-container-highest` for the track.

## 6. Do's and Don'ts

### Do
- **Do** use `spacing-12` (3rem) for top-level page margins to create an editorial "breathing" effect.
- **Do** use `on-surface-variant` (#404752) for secondary metadata to create a clear visual hierarchy.
- **Do** utilize the `display` typography for empty states (e.g., "Your shelf is empty.") to make them feel intentional.

### Don't
- **Don't** use pure black (#000000) for text. Always use `on-surface` (#1a1c1c).
- **Don't** use 1px dividers between list items; use background-color nesting or 16px of vertical space.
- **Don't** use "Drop Shadows" on buttons. Use tonal contrast to indicate interactivity.
- **Don't** crowd the interface. If a screen feels full, increase the `surface` padding rather than shrinking the text.