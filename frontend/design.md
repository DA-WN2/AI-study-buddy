---
name: Obsidian Flux
colors:
  surface: '#131315'
  surface-dim: '#131315'
  surface-bright: '#39393b'
  surface-container-lowest: '#0e0e10'
  surface-container-low: '#1c1b1d'
  surface-container: '#201f22'
  surface-container-high: '#2a2a2c'
  surface-container-highest: '#353437'
  on-surface: '#e5e1e4'
  on-surface-variant: '#cfc2d6'
  inverse-surface: '#e5e1e4'
  inverse-on-surface: '#313032'
  outline: '#988d9f'
  outline-variant: '#4c4353'
  surface-tint: '#dcb8ff'
  primary: '#dcb8ff'
  on-primary: '#480082'
  primary-container: '#9347e1'
  on-primary-container: '#fcf1ff'
  inverse-primary: '#8031ce'
  secondary: '#89ceff'
  on-secondary: '#00344d'
  secondary-container: '#00a2e6'
  on-secondary-container: '#00344e'
  tertiary: '#fabb59'
  on-tertiary: '#442b00'
  tertiary-container: '#986600'
  on-tertiary-container: '#fff3e8'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#efdbff'
  primary-fixed-dim: '#dcb8ff'
  on-primary-fixed: '#2b0052'
  on-primary-fixed-variant: '#6702b5'
  secondary-fixed: '#c9e6ff'
  secondary-fixed-dim: '#89ceff'
  on-secondary-fixed: '#001e2f'
  on-secondary-fixed-variant: '#004c6e'
  tertiary-fixed: '#ffddb1'
  tertiary-fixed-dim: '#fabb59'
  on-tertiary-fixed: '#291800'
  on-tertiary-fixed-variant: '#624000'
  background: '#131315'
  on-background: '#e5e1e4'
  surface-variant: '#353437'
typography:
  display-lg:
    fontFamily: Geist
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.04em
  headline-lg:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Geist
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-md:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.4'
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1.2'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 40px
  container-max: 1440px
  stack-gap: 16px
---

## Brand & Style

The design system is engineered for high-performance AI and SaaS platforms, prioritizing focus through a "Dark Mode First" philosophy. The aesthetic leans heavily into **Glassmorphism**, utilizing depth, light refraction, and subtle motion to create a sophisticated, immersive environment.

The brand personality is professional, cutting-edge, and calm. It avoids the clutter of traditional dashboards by leveraging generous whitespace and "floating" interface elements. The emotional response should be one of clarity and technical mastery, where the UI feels like a high-end tool that recedes into the background, allowing the data and AI insights to take center stage.

## Colors

This design system utilizes a deep, nocturnal palette to reduce eye strain and emphasize luminous content.

- **Primary (Violet):** A vibrant, electric violet (`#9347e1`) used for primary actions, active states, and focus indicators. It provides a striking contrast against the dark base.
- **Secondary (Sky):** Used for data visualization accents, secondary callouts, or informative status indicators.
- **Neutral/Base:** A range of deep charcoals and near-blacks based on the neutral seed (`#09090b`).
- **Glass Surfaces:** Containers use semi-transparent fills (`rgba(30, 41, 59, 0.5)`) combined with high-saturation background blurs (20px-40px) to simulate frosted obsidian.
- **Accessibility:** Text maintains a high contrast ratio against dark backgrounds, primarily using off-whites and cool greys to ensure legibility without "blooming" effects on OLED screens.

## Typography

The design system exclusively uses **Geist**, a typeface designed for precision and technical clarity. Its geometric construction complements the glassmorphic aesthetic.

- **Scale:** Headlines use tight letter spacing and heavy weights to create a sense of authority. 
- **Readability:** Body text uses a slightly more generous line height (1.6) to ensure long-form data or AI responses remain legible against dark, blurred backgrounds.
- **Labels:** Small labels and UI metadata utilize medium or semi-bold weights to maintain visibility at smaller scales.

## Layout & Spacing

The layout follows a **Fluid Grid** model with a focus on "Floating" architecture. Instead of edge-to-edge containers, elements sit within defined margins, creating a sense of lightness.

- **Desktop (12 Columns):** Content is centered with a max width of 1440px. Gutters are fixed at 24px to provide ample breathing room between glass cards.
- **Floating Sidebar:** The primary navigation sits in a glass-morphic container, offset from the left edge by 20px, rather than docked to the browser edge.
- **Spacing Rhythm:** Based on a 4px baseline. Components generally use 16px (4 units) or 24px (6 units) for internal padding to maintain a spacious, modern feel.
- **Mobile:** The layout collapses to a single column with 16px side margins. The floating sidebar transitions to a bottom-docked glass navigation bar or a full-screen overlay.

## Elevation & Depth

Hierarchy is established through transparency and blur intensity rather than traditional drop shadows.

- **Base Layer:** The darkest layer, typically based on `#09090b`.
- **Level 1 (Glass Cards):** `rgba(255, 255, 255, 0.03)` fill with a 32px backdrop-blur. A subtle 1px border (`rgba(255, 255, 255, 0.1)`) acts as a highlight on the "top" edge to define the shape.
- **Level 2 (Modals/Popovers):** Higher opacity fill and a more pronounced shadow to pull the element forward.
- **Shadows:** Use large-radius, low-opacity shadows with a subtle Violet tint (derived from `#9347e1`) to create a luminous glow effect behind primary cards.

## Shapes

The design system utilizes **Hyper-Rounded** geometry to soften the technical nature of the UI.

- **Cards & Primary Containers:** Use `rounded-2xl` (16px) or `rounded-3xl` (24px) for large dashboard widgets.
- **Buttons & Inputs:** Consistent 12px (rounded-xl) corners to maintain a friendly, approachable tactile feel.
- **Interactive States:** On hover, shapes may slightly expand or increase their border-glow to provide immediate visual feedback.

## Components

### Buttons
- **Primary:** Solid Violet-to-Blue gradient with a subtle inner glow. Text is white.
- **Secondary (Glass):** Semi-transparent white fill (`0.1`) with a backdrop blur. High-contrast white text.
- **Ghost:** No background, Violet border on hover only.

### Glass Cards
Every card is a "vessel." They must feature:
- `backdrop-filter: blur(20px);`
- `border: 1px solid rgba(255, 255, 255, 0.1);`
- Padding: 24px for desktop, 16px for mobile.

### Input Fields
Inputs should feel integrated into the glass surface. Use a slightly darker background than the card they sit on with a focus ring that utilizes the Primary Violet color with a 4px blur (glow).

### Sidebar & Navigation
- **Floating Sidebar:** A vertical glass pillar with 16px internal padding. Icons use the Primary color for active states, paired with a subtle vertical indicator bar.
- **Top Navbar:** Minimalist, often just a breadcrumb and user profile, utilizing the same glass properties but with a thinner profile.

### Chips & Badges
Small, pill-shaped elements with high-saturation backgrounds and low-opacity fills (e.g., a "Success" badge is green text on a 10% opacity green background).