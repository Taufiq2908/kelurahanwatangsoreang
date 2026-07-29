# Government Digital Service: Design Principles
**Kelurahan Watang Soreang**

This document outlines the strict Government Digital Service design system rules for this portal. 

## 1. Core Philosophy: Honest UX & Task Completion
The primary objective of this portal is not visual beauty. The objective is to build trust and help citizens complete real-world tasks immediately.
- **Honest UX:** Never imply digital features that do not exist. Fake search bars, fake chat widgets, and fake "Ajukan Online" buttons destroy citizen trust. If a service must be completed physically at the Kelurahan office, explicitly state it.
- **Next Action Principle:** Every page must naturally guide the citizen toward a real next action (e.g., "Prepare documents -> Visit office").
- **Clarity Over Aesthetics:** A citizen should know exactly what to do within five seconds.

## 2. Accessibility (a11y) & Mobile-First
We are designing for the extremes: elderly citizens, low digital literacy, and small Android phones with poor connections.
- **Touch Targets:** Absolute minimum **44x44px** for ANY interactive element on mobile.
- **Optical Alignment:** Do not simply mathematically center content. Ensure text does not feel "oversized" or "zoomed in" on small mobile viewports.
- **Contrast:** Strict WCAG AA contrast ratios against backgrounds.
- **Reduced Motion:** All animations (handled centrally in `src/design/motion.js`) must respect `prefers-reduced-motion`. 

## 3. Typography & Spacing Hierarchy
Do not use arbitrary Tailwind font-sizes or padding (e.g., avoid `text-[13px]`). Use the semantic CSS classes in `index.css`:
- `.text-editorial-h1`: Authoritative, tight-tracking titles (Hero sections).
- `.text-editorial-h2`: Section titles.
- `.text-editorial-h3`: Card/Item titles.
- `.text-editorial-body`: Primary readable text for paragraphs.
- `.text-editorial-meta`: Dates, tags, and small utility labels.
- **Whitespace is structural.** Prefer generous whitespace over heavy borders or box shadows.

## 4. Cards and Components
- **Card Usage:** White backgrounds, thin borders, very subtle shadows (`.shadow-editorial`). No rainbow gradients. No startup/SaaS aesthetics.
- **Avoid Card Overuse:** Lists (News, Announcements) often read better as flat lists with hairlines (1px borders) rather than boxed cards to reduce cognitive load.

## 5. Trust Indicators
- The website must quietly communicate legitimacy.
- Use explicit trust markers: "Website Resmi Pemerintah", "Jam Operasional", "Diperbarui", "Kontak Resmi".
- Hide unavailable information. Never use empty placeholder text.
