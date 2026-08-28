# Zolsi.CC

Internet safety in plain language, for children, parents and grandparents.

A static site about staying safe online, centred on child safety. It explains
how the common harms actually work, what the warning signs look like, and which
real organisations to contact when something has gone wrong.

Live at [zolsi.cc](https://zolsi.cc).

## Principles

- **Readable first.** Short sentences, ordinary words, every technical term
  explained on first use. Body text is set in Atkinson Hyperlegible, designed by
  the Braille Institute for readers with low vision.
- **Calm, not alarming.** The risks are described accurately rather than
  dramatically.
- **Verified, or not published.** Every organisation and phone number on the
  get help page was checked against that organisation's own site. Anything that
  could not be confirmed is not on the page.
- **Nothing collected.** No accounts, analytics, advertising, tracking cookies
  or third party scripts. Fonts are self hosted. The only stored value is the
  reader's chosen text size, kept in their own browser.
- **Works everywhere.** Every page is fully readable with JavaScript disabled.

## Structure

```
index.html              home
basics/                 passwords, sharing, scams, settings
for-teens/              written directly to young people
for-parents/            for parents and carers
warning-signs/          grooming pattern, fake profiles, sextortion
get-help/               verified organisations
about/                  what this is and is not
404.html
assets/css/base.css     tokens, reset, type scale, layout primitives
assets/css/components.css  header, footer, cards, callouts, sections
assets/js/site.js       nav toggle, text size control, scroll reveal
assets/fonts/           self hosted woff2 plus OFL licences
assets/img/             logo and favicons
Logos/                  original source logos
```

No build step and no dependencies. The HTML is the source.

## Running it locally

Any static server works. From the repository root:

```
npx serve .
```

or

```
python -m http.server 8000
```

Then open the address it prints. Links are root relative, so opening the HTML
files directly from the filesystem will not resolve them correctly - use a
server.

## Accessibility

- Target is WCAG AA throughout, AAA for body text contrast.
- Base body text is 19px at a 1.7 line height, with a measure of about 66
  characters.
- A text size control in the header scales the whole site and persists.
- All interactive targets are at least 44px, most 48px.
- Visible focus rings on everything focusable, plus a skip to content link.
- `prefers-reduced-motion` disables the scroll reveal entirely.

## Logo

`Logo-Transparent.png` is a near white mark, so it is used directly on the dark
footer band and inverted with CSS in the light header. `Logo-Background.png` is
used only to generate the favicons. Scaled copies live in `assets/img/`.

## Deployment

GitHub Pages from `main`, with `CNAME` set to `zolsi.cc` and `.nojekyll`
present. DNS for the apex domain must point at GitHub's Pages servers; the
current records are listed in
[GitHub's custom domain documentation](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site).

## Maintenance

The most important recurring job is re-checking the links, phone numbers and
opening hours on `get-help/`. Someone will follow them at a bad moment. The
date of the last check is printed on that page and should be updated whenever
it is done.

## Licence

MIT. See [LICENSE](LICENSE).
