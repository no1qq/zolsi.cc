# Zolsi.CC

Internet safety in plain language, for children, parents and grandparents.
A static site about staying safe online, centred on child safety.

Live at [zolsi.cc](https://zolsi.cc).

## Running it locally

Any static server works. From the repository root:

```
npx serve .
```

Links are root relative, so opening the HTML files straight from the filesystem
will not resolve them. Use a server.

## Structure

```
index.html                  home
basics/                     passwords, sharing, scams, settings
for-teens/                  written directly to young people
for-parents/                for parents and carers
warning-signs/              grooming pattern, fake profiles, sextortion
get-help/                   verified organisations
about/                      what the site is and is not
404.html
assets/css/base.css         tokens, reset, type scale, layout primitives
assets/css/components.css   header, footer, entries, callouts, sections
assets/js/site.js           nav toggle, text size control, scroll reveal
assets/fonts/               self hosted woff2 plus OFL licences
assets/img/                 logo and favicons
Logos/                      original source logos
CNAME, .nojekyll            GitHub Pages configuration
```

No build step and no dependencies. The HTML is the source.

## Editing pages

**The header and footer are duplicated in all eight HTML files.** There is no
templating layer, so a change to the navigation, the footer or anything in
`<head>` has to be made in every one of them. This is deliberate: it keeps the
site dependency free and means navigation works with JavaScript disabled. Just
do not change one page and assume the rest followed.

Spacing is composed from tokens in `base.css`. Sections carry bottom padding
only, and `.section-ruled` adds the top padding under its rule, so a gap
between two sections is `--section-gap` plus `--rule-gap`. Adding top padding
back to `.section` will double every gap on the site.

## Constraints worth not breaking

- **No third party requests at runtime.** Fonts are self hosted. No analytics,
  no advertising, no tracking cookies, no CDN, no external scripts. The only
  stored value is the reader's chosen text size, in their own browser.
- **Every page must stay readable with JavaScript off.** JavaScript only
  enhances. Without it the navigation renders expanded instead of behind the
  menu button, the scroll reveal is skipped, and the text size control hides
  itself rather than sitting there doing nothing. The questions on the home
  page are plain `<details>` elements with no script and no animation at all.
- **WCAG AA throughout, AAA for body text contrast.** Interactive targets at
  least 44px, visible focus rings, a skip link, and `prefers-reduced-motion`
  honoured. Body text is 19px at a 1.7 line height.
- **The logo asset is near white.** `Logo-Transparent.png` is used as is on the
  dark footer band and inverted with CSS in the light header. That inversion is
  intentional, not a bug. `Logo-Background.png` only generates the favicons.

## Maintaining the get help page

The most important recurring job. `get-help/` lists real reporting routes,
takedown services and helplines, and someone will follow them at a bad moment.

- Re-check every link, phone number and set of opening hours against the
  organisation's own site.
- Nothing goes on that page that cannot be confirmed there.
- The date of the last check is printed on the page. Update it when you check.

## Deployment

GitHub Pages from `main`, with `CNAME` set to `zolsi.cc` and `.nojekyll`
present. DNS for the apex domain must point at GitHub's Pages servers; the
current records are in
[GitHub's custom domain documentation](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site).

## Licence

Split, because most of this repository is writing rather than software. See
[LICENSE](LICENSE) for the full statement.

- **The writing** (prose, page copy, SVG diagrams): Creative Commons
  Attribution 4.0 International. Full text in [LICENSE-CONTENT](LICENSE-CONTENT).
  Reuse and adapt it freely, including commercially, with credit and a note of
  any changes.
- **The code** (HTML, CSS, JavaScript): MIT.
- **The fonts**: SIL Open Font License 1.1, licences in `assets/fonts/`.
- **The name and logo**: all rights reserved. Credit Zolsi.CC as a source, but
  do not present an adapted version as being Zolsi.CC.
