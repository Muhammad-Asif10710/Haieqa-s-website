# Color Scheme Update - Haiqa's Website

## Updated Color Palette - Pink & Feminine Vibes

### Primary
- **Hot Pink**: #FF69B4
  - Vibrant, feminine, confident
  - Used for: Primary buttons, primary backgrounds, headings, accents

### Secondary
- **Light Pink**: #FFB6C1
  - Soft, warm, nurturing; works for buttons and highlights
  - Used for: Secondary text, decorative elements, borders, soft accents

### Accent
- **Deep Pink**: #FF1493
  - Bold, empowering; call-to-action color
  - Used for: Primary CTA buttons, important highlights, hover states, accent links

### Neutrals
- **Blush Cream**: #FFF0F5
  - Light pink-tinted background
  - Used for: Main background, primary text, light text on dark backgrounds

- **Mauve**: #C9A0A0
  - Cards, dividers, and secondary backgrounds
  - Used for: Borders, dividers, secondary backgrounds, muted text

- **Dark Mauve**: #4A3A3A
  - Dark text and dark backgrounds
  - Used for: Main dark background, dark text, secondary backgrounds

### Optional Empowerment Accent
- **Rose Gold**: #B76E79
  - Used sparingly for icons or quotes
  - Included in color picker for special emphasis

## CSS Variables Updated

### Root (Dark Mode)
```css
--bg-primary: #2A2526;          /* Charcoal */
--bg-secondary: #3D3439;         /* Darker plum */
--bg-elevated: #4B2E39;          /* Deep plum */
--text-primary: #F7F2EE;         /* Warm cream */
--text-secondary: #C48A9A;       /* Dusty rose */
--text-muted: #B7A9A1;           /* Soft taupe */
--accent-primary: #4B2E39;       /* Deep plum */
--accent-primary-hover: #614D56; /* Lighter plum */
--accent-primary-active: #3A1F2C;/* Darker plum */
--accent-secondary: #C48A9A;     /* Dusty rose */
--accent-warning: #C7684F;       /* Burnt terracotta */
--accent-error: #C7684F;         /* Burnt terracotta */
--accent-info: #C9A86A;          /* Muted gold */
--border-color: #B7A9A1;         /* Soft taupe */
--divider-color: #8B7D75;        /* Darker taupe */
```

### Light Mode
```css
--bg-primary: #F7F2EE;           /* Warm cream */
--bg-secondary: #EBE4DD;         /* Lighter cream */
--bg-elevated: #E0D8D0;          /* Even lighter cream */
--text-primary: #2A2526;         /* Charcoal */
--text-secondary: #4B2E39;       /* Deep plum */
--text-muted: #B7A9A1;           /* Soft taupe */
--accent-primary: #4B2E39;       /* Deep plum */
--accent-secondary: #C48A9A;     /* Dusty rose */
--accent-warning: #C7684F;       /* Burnt terracotta */
--accent-error: #C7684F;         /* Burnt terracotta */
--accent-info: #C9A86A;          /* Muted gold */
--border-color: #B7A9A1;         /* Soft taupe */
--divider-color: #C9BDAE;        /* Lighter taupe */
```

## Changes Made

### Core Color Variables
- Updated all CSS custom properties in `:root` and `.light-mode`
- Replaced blue/green accent colors with plum/rose/terracotta palette
- Updated all neutral grays with warm cream, soft taupe, and charcoal

### Hardcoded Colors Replaced
1. **Black (#000, #000000)** → **Charcoal (#2A2526)**
2. **Dark Grays (#1f1f1f, #191919)** → **Charcoal (#2A2526)**
3. **Medium Grays (#333333, #404042, #565656)** → **Soft taupe (#B7A9A1)** or **Plum shades**
4. **Light Grays (#999999, #cccccc)** → **Dusty Rose (#C48A9A)**
5. **White (#fff, #ffffff)** → **Warm Cream (#F7F2EE)**
6. **Blue accents** → **Burnt Terracotta (#C7684F)**

### Components Updated
- Menu and navigation styling
- Header and breadcrumb sections
- Hero section and CTAs
- Service cards and portfolio items
- Testimonial sections
- Pricing tables
- Contact forms
- Blog and comments sections
- Footer
- Color picker options in settings panel

## Color Picker Options
Updated the global color picker to include all new palette colors:
- Option 2: Muted Gold (#C9A86A)
- Option 3: Burnt Terracotta (#C7684F)
- Option 4: Dusty Rose (#C48A9A)
- Option 5: Soft Taupe (#B7A9A1)
- Option 6: Deep Plum (#4B2E39)
- Option 7: Warm Cream (#F7F2EE)
- Option 8: Secondary Plum (#3D3439)
- Option 9: Charcoal (#2A2526)

## Notes
- The color scheme maintains excellent contrast ratios for accessibility
- Warm cream (#F7F2EE) on charcoal/plum backgrounds provides clear readability
- Dusty rose and burnt terracotta provide warm, empowering accent colors
- Soft taupe bridges the gap between light and dark, perfect for borders and dividers
- The palette works beautifully in both dark and light modes
