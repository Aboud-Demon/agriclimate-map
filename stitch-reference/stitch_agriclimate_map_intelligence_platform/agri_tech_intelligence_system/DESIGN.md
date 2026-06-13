---
name: Agri-Tech Intelligence System
colors:
  surface: '#fbfbe2'
  surface-dim: '#dbdcc3'
  surface-bright: '#fbfbe2'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f5dc'
  surface-container: '#efefd7'
  surface-container-high: '#eaead1'
  surface-container-highest: '#e4e4cc'
  on-surface: '#1b1d0e'
  on-surface-variant: '#41493e'
  inverse-surface: '#303221'
  inverse-on-surface: '#f2f2d9'
  outline: '#717a6d'
  outline-variant: '#c0c9bb'
  surface-tint: '#2a6b2c'
  primary: '#00450d'
  on-primary: '#ffffff'
  primary-container: '#1b5e20'
  on-primary-container: '#90d689'
  inverse-primary: '#91d78a'
  secondary: '#00639a'
  on-secondary: '#ffffff'
  secondary-container: '#51b2fe'
  on-secondary-container: '#00436a'
  tertiary: '#50342c'
  on-tertiary: '#ffffff'
  tertiary-container: '#694b42'
  on-tertiary-container: '#e6bcb0'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#acf4a4'
  primary-fixed-dim: '#91d78a'
  on-primary-fixed: '#002203'
  on-primary-fixed-variant: '#0c5216'
  secondary-fixed: '#cee5ff'
  secondary-fixed-dim: '#96ccff'
  on-secondary-fixed: '#001d32'
  on-secondary-fixed-variant: '#004a75'
  tertiary-fixed: '#ffdbd0'
  tertiary-fixed-dim: '#e7bdb1'
  on-tertiary-fixed: '#2c160e'
  on-tertiary-fixed-variant: '#5d4037'
  background: '#fbfbe2'
  on-background: '#1b1d0e'
  surface-variant: '#e4e4cc'
typography:
  headline-xl:
    fontFamily: Inter
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.04em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 40px
  xl: 64px
  gutter: 24px
  margin: 32px
  container-max: 1440px
---

## Brand & Style

This design system is built for high-stakes agricultural decision-making. The brand personality is **authoritative, scientific, and precise**, designed to instill confidence in researchers, farmers, and climate analysts. It avoids unnecessary decorative elements in favor of data density and clarity.

The visual style leans into **Modern Corporate** with a **Tactile** edge. It utilizes a refined palette derived from natural elements—soil, vegetation, and sky—processed through a clean, digital lens. The interface prioritizes legibility and spatial organization to ensure that complex environmental data remains actionable. It balances the "earthy" nature of agriculture with the "technical" nature of climate science through high-quality typography and a structured grid.

## Colors

The color strategy is rooted in environmental realism. 

- **Primary (Deep Green):** Represents vegetation health and growth. Used for primary actions, active navigation states, and branding elements.
- **Secondary (Sky Blue):** Symbolizes water resources and atmospheric data. Used for interactive data points, links, and climate-related highlights.
- **Tertiary (Earth Brown):** Represents soil intelligence. Used for specialized data categories and secondary structural accents.
- **Neutral (Beige & White):** The beige serves as a soft, low-fatigue background for dashboard containers, preventing the starkness of pure white while maintaining a clean, professional appearance.

Color application should be functional: use green for positive growth trends, brown for soil metrics, and blue for irrigation or weather-related data.

## Typography

The design system utilizes **Inter** exclusively to leverage its exceptional legibility in data-heavy environments. The typeface's tall x-height and neutral character make it ideal for reading complex coordinates, soil pH levels, and climate timestamps.

- **Headlines:** Use Bold and Semi-Bold weights with slight negative letter-spacing for a modern, "engineered" look.
- **Body:** Standardized at 16px for optimal readability across monitor types.
- **Labels:** Used for table headers and metadata. These often use Medium or Semi-Bold weights and slight tracking to differentiate them from body text.
- **Data Display:** When displaying numerical metrics, ensure tabular lining figures are used to allow for easy vertical comparison of soil and climate data.

## Layout & Spacing

The layout follows a **Fixed-Fluid Hybrid** model. The main dashboard content sits within a 12-column grid with a maximum container width of 1440px to ensure data density doesn't become overwhelming on ultra-wide monitors.

- **Grid Logic:** Use 24px gutters. Sidebars are fixed at 280px to maintain consistent navigation, while the main map/dashboard area expands to fill the remaining space.
- **Spacing Rhythm:** Based on an 8px scale. Use `md (24px)` for internal card padding and `sm (12px)` for spacing between related data points.
- **Responsive Behavior:** 
  - **Desktop:** 12 columns, 32px margins.
  - **Tablet:** 6 columns, 24px margins. Sidebar collapses to an icon-only rail.
  - **Mobile:** 4 columns, 16px margins. Cards stack vertically; complex maps utilize full-bleed displays with floating action buttons.

## Elevation & Depth

Hierarchy in this design system is achieved through **Tonal Layering** and **Ambient Shadows**.

- **Surface Levels:** The primary background is white (`#FFFFFF`). Secondary containers (cards/panels) use the beige (`#F5F5DC`) or white with a very subtle border.
- **Shadows:** Use extremely soft, diffused shadows with a slight green tint in the shadow color (e.g., `rgba(27, 94, 32, 0.05)`) to tie the depth into the brand palette. Shadows should suggest the surface is resting just above the map layer.
- **Interactive Depth:** On hover, cards should slightly lift (increase shadow spread) rather than change color, maintaining the "realistic" feel of a physical dashboard.
- **Map Overlays:** Use a subtle backdrop blur (glassmorphism) for panels that sit directly over the satellite imagery to maintain legibility without completely obscuring the map data beneath.

## Shapes

The shape language is **Rounded**, balancing the "hard science" of the data with a "modern, approachable" feel. 

- **Cards & Panels:** Use a base radius of 0.5rem (`8px`). Large dashboard sections or map containers can use `rounded-lg` (16px).
- **Buttons & Inputs:** Follow the 8px standard to maintain a cohesive look.
- **Data Indicators:** Chips and status badges should use a full "pill" radius to distinguish them from interactive buttons.
- **Icons:** Use a consistent 2px stroke weight with slightly rounded terminals to match the UI's roundedness.

## Components

### Buttons
- **Primary:** Deep Green background, White text. High-contrast, no gradient.
- **Secondary:** Earth Brown border with matching text.
- **Ghost:** Sky Blue text, no background. Used for tertiary actions within map views.

### Cards
- **Metric Cards:** White background, 1px border (`#E0E0E0`), 8px radius. Include a small sparkline chart for 24-hour climate trends.
- **Map Containers:** Full-bleed within their segment, with floating controls for zoom, layers, and historical playback.

### Inputs & Selects
- **Form Fields:** Use a subtle beige background to distinguish them from the white card surface. Labels sit above the field in `label-sm` typography.
- **Segmented Controls:** Used for switching between "Soil," "Climate," and "Yield" views. These should have a tactile "toggle" feel.

### Lists & Tables
- **Data Tables:** High density. Use alternating row colors (White and very light Beige) to assist in horizontal scanning. Headers remain "sticky" during scroll.

### Chips & Badges
- **Status Indicators:** Use Sky Blue for "Normal," Deep Green for "Optimal," and Error Red for "Alert" (e.g., frost warning or drought stress).

### Dashboard Navigation
- **Sidebar:** Dark Green (`#1B5E20`) or a very dark version of it. Icons are white or light green to indicate the active state. This provides a strong visual anchor for the system.