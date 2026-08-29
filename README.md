# Zolsi.CC

Internet safety in plain language, for children, parents and grandparents.
An independent, open-source educational resource focused on digital safety and child protection.

Live at [zolsi.cc](https://zolsi.cc).

## Core Principles

- **Zero tracking & runtime requests:** No cookies, no analytics, no advertising, no tracking, and no external CDN dependencies. Fonts and assets are fully self-hosted.
- **Privacy by design:** No accounts or server-side data collection. The only values stored locally are user preferences (text size, language) in their own browser (`localStorage`).
- **Accessible without JavaScript:** Core navigation, text content, and FAQs work cleanly with JavaScript disabled.
- **High accessibility standards:** WCAG AA throughout, AAA body text contrast, minimum 44px touch targets, skip links, and full respect for `prefers-reduced-motion`.

## Running Locally

The site requires no build step, compiler, or dependencies. The HTML files are the source.

Because link paths are root-relative, serve the directory with any local static server:

```bash
npx serve .
```

or with Python:

```bash
python -m http.server 8000
```

## Structure

```
index.html                  home (English)
basics/                     passwords, sharing, scams, settings
for-teens/                  guidance written directly for young people
for-parents/                guidance for parents and carers
warning-signs/              grooming patterns, fake profiles, sextortion
get-help/                   verified helplines and reporting hotlines
about/                      project background and scope
lang/                       translations (German: de/, Spanish: es/)
assets/css/                 base styles and component tokens
assets/js/                  lightweight progressive enhancement scripts
assets/fonts/               self-hosted WOFF2 fonts
assets/img/                 logo and icon assets
```

## Translations and Updates

The site is translated across English, German, and Spanish. Changes to shared navigation, layout structure, or crisis reporting resources should be kept consistent across all language folders (`/`, `lang/de/`, `lang/es/`).

When updating crisis resources in `get-help/`:

- Always verify every phone number, URL, and operational hours directly with the official source organization.
- Update the last-verified date shown on the page.

## License

- **Content & Writing:** Creative Commons Attribution 4.0 International ([LICENSE-CONTENT](LICENSE-CONTENT)). Adapt and share freely with attribution.
- **Code:** MIT ([LICENSE](LICENSE)).
- **Fonts:** SIL Open Font License 1.1 (licenses in `assets/fonts/`).
- **Brand & Logo:** All rights reserved. Please credit Zolsi.CC when adapting content, without presenting modified copies as official Zolsi.CC releases.
