
# "Midnight-LED" UI Theme

This document outlines the design tokens and visual guidelines for the SL MkIII Template Builder application, following the "Midnight-LED" theme.

## Color Palette

```js
colors: {
  midnight:  '#0d1117',   // background like Components
  gunmetal:  '#1c2128',   // panels & cards
  accent:    '#08e0ff',   // LED‑blue (pad glow, links, buttons)
  accentDim: '#036b85',   // subdued accent for borders
  slate:     '#949ba5',   // tertiary text
  white:     '#ffffff'    // primary text
}
```

## Typography

- **Font Family**: Inter (Google Fonts)
- **Fallbacks**: system-ui, sans-serif
- **Headings**: White, font-medium (Inter 500)
- **Body Text**: slate color, regular weight
- **Accents/Labels**: LED accent blue for emphasis and interactive elements

## Components

### Header Bar
- Height: h-10
- Background: gunmetal
- Contains: Logomark (rotated square), App Title (accent color), Status LED

### Content Cards
- Background: gunmetal/80 (with opacity)
- Border Radius: rounded-2xl (0.75rem)
- Padding: p-8
- Shadow: shadow-lg

### Drag & Drop Zone
- Border: border-2 border-dashed border-accentDim
- Active State: border-accent with ledPulse animation
- Hover State: ring-2 ring-accent/50

### Virtual Controls
- **Knobs**: Circular divs with pointer and inner darker circle
- **Faders**: Vertical sliders with accent fill
- **Pads**: Square buttons with hover glow effect
- All controls display parameter name (accent color) and CC# (slate color)

### Buttons
- Background: accent color
- Hover: accent with opacity 90%
- Text: white
- Focus: ring-2 ring-offset-2 ring-accent

## Animations

- **ledPulse**: Subtle pulsing glow effect for active elements
- **dataSent**: Left-to-right progress animation for successful operations

## Watermark
- Hardware image at 25% opacity
- Positioned in footer area
- Non-interactive background element

## Responsive Design
- Standard desktop layout for ≥768px
- Stack UI elements and adjust spacing for <768px
- Ensure drag & drop functionality works on mobile

## Accessibility
- Contrast ratio: accent on midnight = 4.9:1 (WCAG AA)
- Focus states clearly visible
- Form elements properly labeled
- Error states clearly communicated
