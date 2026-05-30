# Wasabi Redesign: Investor-Facing Design System

This document outlines the modern, minimal design system implemented for Wasabi, focused on high-signal clarity for investors and executive teams.

## 1. Design Tokens

### Colors
- **Background**: `#fbfbfb` (Soft White) - Reduces fatigue and feels premium.
- **Surface**: `#ffffff` (Pure White) - Card backgrounds and primary surfaces.
- **Accent**: `#0d9488` (Teal 600) - Used for primary CTAs and critical data highlights.
- **Charcoal**: `#111827` (Charcoal 900) - For high-contrast typography.
- **Grays**: Subtle gray scale (`#f3f4f6`, `#e5e7eb`, `#9ca3af`) for borders and muted text.

### Typography
- **Primary Family**: Inter (Sans-serif)
- **H1**: 40px, Bold
- **H2**: 28px, Semibold
- **Body**: 16px, Regular
- **Microcopy**: 10px-12px, Bold, Uppercase (for metadata and labels).

### Shadows & Spacing
- **Shadow Soft**: `0 1px 3px 0 rgb(0 0 0 / 0.1)`
- **Shadow Card**: `0 4px 6px -1px rgb(0 0 0 / 0.05)`
- **Hero Spacing**: 48-64px
- **Standard Padding**: 24px (Cards), 32px (Sections)

## 2. Component Specifications

### Navbar
- **Height**: 64px
- **Layout**: Integrated search, notification hub, and "Generate Brief" primary CTA.
- **Interaction**: Fixed at top, subtle bottom border.

### Sidebar
- **Width**: 256px
- **Style**: Integrated into background, subtle active indicators in Teal 50.
- **Logic**: Condensed navigation with high-density status microcopy.

### StatCards
- **Focus**: Single data metric highlighted.
- **Visuals**: Unified Teal sparkline, minimal iconography, status trend indicator.

### AlertCard
- **Layout**: 3-tier hierarchy (Company -> Title -> Summary).
- **Style**: Minimal borders, hover shadow, colored severity badges.

### TrendChart
- **Axes**: Simplified, muted gridlines.
- **Color**: Single Teal series color with subtle opacity fill.

## 3. Implementation Summary
- **Grid Strategy**: 2-column dashboard layout. Left column (380px) for KPIs and filters; Right column (flexible) for deep dive analysis and monitoring feeds.
- **Mobile Logic**: Collapses to single column with search and primary CTA fixed at top.
- **Performance**: Tailwind v3 compatible, no legacy glass-effects or heavy gradients.
- **Accessibility**: 4.5:1 contrast ratios met for all primary text and CTAs.
