# Homepage Design System

## 1. Atmosphere & Identity

The homepage is a personal, technical profile led by an illuminated wordmark, direct first-person writing, and a restrained aurora. The interface should feel authored and precise without turning personal information into dashboard statistics or decorating factual content with system-status language.

## 2. Color

The implementation uses Material UI theme roles for text and surfaces, with the following established accents:

| Role | Light | Dark | Usage |
| --- | --- | --- | --- |
| Primary accent | `#b5194d` | `#8b9dff` | Links, headings, focus, and project accents |
| Secondary accent | `#c04472` | `#ff71d8` | Wordmark and localized aurora highlights |
| Contact accent | `#7a5700` | `#53e6c3` | Contact controls and availability details |
| Main surface | `#f7f5f8` | `#090b10` | Page background |
| Reading surface | `rgba(255, 255, 255, 0.72)` | `rgba(17, 20, 28, 0.72)` | Text-heavy sections |
| Elevated surface | `rgba(255, 255, 255, 0.84)` | `rgba(23, 27, 37, 0.78)` | Controls and project cards |
| Hairline | `rgba(35, 25, 42, 0.10)` | `rgba(255, 255, 255, 0.08)` | Surface rims and dividers |

Rules:

- Prefer Material UI semantic palette roles such as `text.primary`, `text.secondary`, `primary`, `secondary`, and `info`.
- Accent gradients may combine the established primary and secondary colors, but remain localized to the hero, headings, and interactive highlights.
- Body copy uses neutral text roles; accent colors never carry entire paragraphs.
- The grid remains below `0.05` opacity in dark mode and `0.04` in light mode, fading further behind reading surfaces.
- Status feedback must distinguish success from failure through both text and color. In dark mode, accent colors form a restrained rim around an elevated surface rather than filling the entire overlay.

## 3. Typography

- Display and body stack: `Sora, system-ui, sans-serif`.
- Technical/utility stack: `Kode Mono, ui-monospace, monospace`.
- Display/site title: fluid `clamp(48px, 8vw, 88px)`, weight 700, `-0.085em` tracking, unit line-height, and `0.08em` bottom padding on the painted text element so the `g` is never clipped. The larger intro wordmark uses the same relative metrics so its FLIP handoff scales into the final title without a line-box jump.
- Hero statement: fluid `clamp(28px, 4vw, 52px)`, weight 600, balanced wrapping.
- Section heading: fluid `clamp(28px, 4vw, 44px)`, rendered with semantic heading elements.
- Card heading: Material UI `h6`, weight 700.
- Body: 16–18px with a maximum readable measure of 65 characters.
- Secondary/card copy: 14px minimum.
- Overline and metadata labels: 12–13px Kode Mono, weight 600, uppercase with expanded tracking.

There is one page-level `h1`; sections follow with `h2`, and card titles use `h3` where appropriate.

## 4. Spacing & Layout

- Base unit: 4px, inherited from the Material UI spacing system.
- Common steps: 4, 8, 12, 16, 20, 24, 32, and 48px.
- Page content uses a centered `min(1180px, calc(100% - 32px))` shell.
- The desktop hero uses one full-width editorial identity block followed by a compact, left-aligned social row.
- Major sections use 80–120px vertical spacing on desktop and 56–80px on mobile.
- Card layouts collapse to a readable single column at 375px and must not create horizontal scrolling.
- Floating controls account for safe-area insets and scroll with content on small screens.
- The hero opens with the `Delemangi` wordmark and a short first-person statement; name, location, and work details appear naturally in the page copy instead of a resume-style overline.
- The hero relies on the page's natural reading flow rather than duplicating nearby section navigation with call-to-action buttons.
- Employment details live in the experience section rather than being repeated in the hero.
- Project presentation uses one curated grid of dimensional cards. Only active, substantive work earns a card; narrow utilities and repositories already represented by an organization card are omitted.
- Technologies appear on the project cards that use them. The page does not include a separate skills inventory.
- Project cards sharing a desktop grid row stretch to the same visual height while retaining their independent hover translation.
- Aurora and tonal overlay layers stay fixed to the viewport while the background container owns vertical scrolling, so no layer edge can appear between sections.

## 5. Components

### Floating Bar

- **Structure:** compact translucent control group with a hairline rim, inset highlight, and grouped icon buttons.
- **States:** default, hover, focus-visible, active.
- **Accessibility:** every icon button has an explicit accessible name, keyboard support, and a 2px primary-accent focus-visible outline with a 2px offset.
- **Motion:** transform/opacity feedback only; no transform under reduced motion.

### Project Card

- **Structure:** elevated project panel with title, description, and technology chips. The card itself owns one primary destination; redundant text actions are omitted.
- **States:** default, hover, focus-visible, active.
- **Accessibility:** destinations are semantic anchors; nested links must never trigger a second destination.
- **Motion:** cursor-local highlight, short elevation, and spring-like press affordance; all transforms are disabled under reduced motion.

### Hero Social Row

- **Structure:** one uncontained icon row with a subtle vertical separator between copy actions and external profiles; no category labels, glass panels, or horizontal filler rule.
- **Behavior:** remains left-aligned beneath the statement and wraps only when the viewport requires it.
- **Accessibility:** every control retains its explicit accessible name, tooltip, and focus-visible treatment.
- **Feedback:** hover help uses the current elevated surface, while copy success or failure temporarily suppresses hover help and appears on its own tonal surface.

### Site Footer

- **Structure:** a single quiet divider, a three-line name, role/location, and age signature on the left, and compact text links for contact, selected personal profiles, and source on the right. The age uses the technical typeface and remains visually subordinate.
- **Behavior:** aligns in one row on desktop and stacks into a readable wrap on narrow screens. The age shows completed years at rest; hover, pointer hold, and keyboard focus reveal nine-decimal progress between UTC anniversary instants, updated once per second within a fixed footprint so the footer never shifts. Mouse clicks preserve disclosure for the full hover and pointer exit collapses it; touch release never pins the disclosure open.
- **Accessibility:** links remain descriptive without relying on icons or tooltips. The age disclosure is a native button with a visible focus indicator and an accessible name that follows the displayed value.
- **Motion:** the decimal portion expands and collapses through the standard short transition; reduced motion makes the state change immediate.

### Intro Sequence

- **Structure:** fixed decorative overlay rendered above an already-mounted page; it is hidden from assistive technology.
- **Accessibility:** the mounted page remains in the accessibility tree throughout, and Escape dismisses the decorative overlay immediately.
- **Timing:** deterministic sequence on every page load and never coupled to network or module loading. The overlay enters, hands the wordmark to the real heading, then enters an explicit exit phase with a roughly 350ms eased opacity fade before unmounting.
- **Handoff:** the illuminated wordmark stands alone, resolves, then uses a FLIP-style transform to meet the real page heading before the overlay fades as one surface.
- **Reduced motion:** a brief opacity-only exit; no secondary status copy, scramble, scale, or spatial handoff.

### Reading Surface

- **Structure:** translucent tonal section with a subtle rim and directional light, used only where it improves hierarchy or contrast.
- **Depth:** one outer containment ring, one inset top highlight, and a tinted ambient shadow. A single blur does not qualify as a finished surface.

### Skill Chip

- **Structure:** compact Material UI chip.
- **States:** static label; no hover, focus, or active affordance.
- **Accessibility:** non-actionable metadata that does not masquerade as navigation.
- **Motion:** none.

### Reveal Text

- **Structure:** visible text with optional entrance treatment.
- **Accessibility:** content remains present and readable without animation.
- **Motion:** opacity/transform reveal only; renders immediately under reduced motion.

## 6. Motion & Interaction

| Type | Duration | Easing | Usage |
| --- | --- | --- | --- |
| Micro | 100–150ms | ease-out | Press, focus, and icon swaps |
| Standard | 180–280ms | cubic-bezier(.2,.8,.2,1) | Hover, surface, and underline feedback |
| Overlay exit | 350ms | cubic-bezier(.16,1,.3,1) | Intro surface handoff and removal |
| Reveal | 450–650ms | cubic-bezier(.16,1,.3,1) | Section masks and content entrances |
| Emphasis | 650–900ms | cubic-bezier(.4,1,.4,1) | Intro wordmark and theme transition |

Rules:

- Prefer `transform`, `opacity`, and color/filter effects; compact disclosure and underline affordances may animate `max-width` or `background-size` when they do not shift surrounding layout.
- Motion communicates interaction or state. The intro may cover the page briefly, but the page is already mounted and the sequence never waits on loading.
- Spatial movement is interruptible and limited to short transforms; opacity and filter transitions use fixed easing.
- Section reveals travel no more than 16px and run once.
- `prefers-reduced-motion: reduce` disables decorative transforms, ripples, scrambles, smooth scrolling, and staged reveals.
- State changes such as clipboard success or failure remain immediate and explicit.

## 7. Depth & Surface

The depth strategy follows a single overhead light source. Elevated surfaces combine a low-opacity outer ring, inset top highlight, inset bottom shade, and cool-tinted ambient shadow. The page atmosphere uses a localized multi-stop aurora, subtle grain, and a fine grid; reading zones remain quieter than the hero. Shadows support hierarchy and interaction rather than decorating every block.

## 8. Accessibility Constraints & Accepted Debt

### Constraints

- Target WCAG 2.2 AA.
- Maintain visible keyboard focus, semantic landmarks, sequential headings, and descriptive link/button names.
- Expose the segmented hero identity as one deterministic screen-reader string while keeping its responsive visual rendering out of the accessibility tree.
- All interactions work without a pointer.
- Reduced-motion preferences are honored throughout the page.
- Success and error feedback is announced through visible text and an appropriate live region.

### Accepted Debt

| Item | Location | Why accepted | Owner / Exit |
| --- | --- | --- | --- |
| Existing raw color literals | Legacy MUI `sx` and styled components outside the redesigned surfaces | The redesign migrates touched surfaces first to keep the change reviewable | Consolidate remaining literals during future component work |
