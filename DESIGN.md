# Homepage Design System

## 1. Atmosphere & Identity

The homepage is a personal, technical profile with a restrained playful edge. Its signature is an aurora-like pink/blue accent over a subtle grid, with translucent controls and short tactile interactions that keep the page expressive without obscuring its content.

## 2. Color

The implementation uses Material UI theme roles for text and surfaces, with the following established accents:

| Role | Light | Dark | Usage |
| --- | --- | --- | --- |
| Primary accent | `#b5194d` | `#6a82fb` | Links, headings, focus and portfolio accents |
| Secondary accent | `#ffc0cd` | `#ff63e9` | Aurora surfaces; not foreground text in light mode |
| Contact accent | `#9a5b00` | `#00ffd0` | Contact controls |
| Main surface | `#fdfcfd` | `#181e24` | Page background |
| Elevated surface | `rgba(255, 255, 255, 0.6)` | `rgba(24, 30, 36, 0.55)` | Floating controls |

Rules:

- Prefer Material UI semantic palette roles such as `text.primary`, `text.secondary`, `primary`, `secondary`, and `info`.
- Accent gradients may combine the established primary and secondary accent colors.
- Status feedback must distinguish success from failure through both text and color.

## 3. Typography

- Font stack: `Kode Mono, monospace`.
- Display/site title: 48px, bold visual emphasis.
- Section heading: Material UI `h4`/`h5` scale, rendered with semantic heading elements.
- Card heading: Material UI `h6`, weight 700.
- Body: 16px default.
- Secondary/card copy: 14px minimum.
- Overline labels: 12px, weight 600, uppercase with expanded tracking.

There is one page-level `h1`; sections follow with `h2`, and card titles use `h3` where appropriate.

## 4. Spacing & Layout

- Base unit: 4px, inherited from the Material UI spacing system.
- Common steps: 4, 8, 12, 16, 20, 24, 32, and 48px.
- Page content is a centered vertical column with full-width responsive rows.
- Card layouts collapse to a readable single column at 375px and must not create horizontal scrolling.
- Floating controls account for safe-area insets and scroll with content on small screens.

## 5. Components

### Floating Bar

- **Structure:** translucent flex cluster containing icon buttons.
- **States:** default, hover, focus-visible, active.
- **Accessibility:** every icon button has an explicit accessible name and keyboard support.
- **Motion:** transform/opacity feedback only; no transform under reduced motion.

### Project Card

- **Structure:** card content with title, description, technology chips, and explicit destination links.
- **States:** default, hover, focus-visible, active.
- **Accessibility:** destinations are semantic anchors; nested links must never trigger a second destination.
- **Motion:** short elevation/scale affordance, disabled under reduced motion.

### Skill Chip

- **Structure:** compact Material UI chip.
- **States:** default, hover, focus-visible, active.
- **Accessibility:** decorative interaction only; it does not masquerade as navigation.
- **Motion:** highlight sweep and transform are disabled under reduced motion.

### Reveal Text

- **Structure:** visible text with optional entrance treatment.
- **Accessibility:** content remains present and readable without animation.
- **Motion:** opacity/transform reveal only; renders immediately under reduced motion.

## 6. Motion & Interaction

| Type | Duration | Easing | Usage |
| --- | --- | --- | --- |
| Micro | 100–150ms | ease-out | Press and focus feedback |
| Standard | 200–300ms | ease-in-out | Hover, reveal, and popover feedback |
| Emphasis | 600–800ms | cubic-bezier(.4, 1, .4, 1) | Site-title scramble or entrance treatment |

Rules:

- Prefer `transform`, `opacity`, and color/filter effects; compact disclosure and underline affordances may animate `max-width` or `background-size` when they do not shift surrounding layout.
- Motion communicates interaction or state; it does not delay access to content.
- `prefers-reduced-motion: reduce` disables decorative transforms, ripples, scrambles, smooth scrolling, and staged reveals.
- State changes such as clipboard success or failure remain immediate and explicit.

## 7. Depth & Surface

The depth strategy is mixed: translucent tonal surfaces use subtle borders and restrained shadows, while the page atmosphere uses layered radial gradients and a fine grid. Shadows support interactive elevation and must not become the primary separator for every section.

## 8. Accessibility Constraints & Accepted Debt

### Constraints

- Target WCAG 2.2 AA.
- Maintain visible keyboard focus, semantic landmarks, sequential headings, and descriptive link/button names.
- All interactions work without a pointer.
- Reduced-motion preferences are honored throughout the page.
- Success and error feedback is announced through visible text and an appropriate live region.

### Accepted Debt

| Item | Location | Why accepted | Owner / Exit |
| --- | --- | --- | --- |
| Existing raw color literals | Existing MUI `sx` and styled components | This document codifies the current visual system; a token migration would be an unrelated redesign | Consolidate only during a future visual-system refactor |
