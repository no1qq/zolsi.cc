const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

const PAGES = [
  { slug: '', lang: 'en', file: path.join(ROOT, 'index.html') },
  { slug: 'about', lang: 'en', file: path.join(ROOT, 'about', 'index.html') },
  { slug: 'basics', lang: 'en', file: path.join(ROOT, 'basics', 'index.html') },
  { slug: 'for-parents', lang: 'en', file: path.join(ROOT, 'for-parents', 'index.html') },
  { slug: 'for-teens', lang: 'en', file: path.join(ROOT, 'for-teens', 'index.html') },
  { slug: 'get-help', lang: 'en', file: path.join(ROOT, 'get-help', 'index.html') },
  { slug: 'warning-signs', lang: 'en', file: path.join(ROOT, 'warning-signs', 'index.html') },
  { slug: '', lang: 'de', file: path.join(ROOT, 'lang', 'de', 'index.html') },
  { slug: 'about', lang: 'de', file: path.join(ROOT, 'lang', 'de', 'about', 'index.html') },
  { slug: 'basics', lang: 'de', file: path.join(ROOT, 'lang', 'de', 'basics', 'index.html') },
  { slug: 'for-parents', lang: 'de', file: path.join(ROOT, 'lang', 'de', 'for-parents', 'index.html') },
  { slug: 'for-teens', lang: 'de', file: path.join(ROOT, 'lang', 'de', 'for-teens', 'index.html') },
  { slug: 'get-help', lang: 'de', file: path.join(ROOT, 'lang', 'de', 'get-help', 'index.html') },
  { slug: 'warning-signs', lang: 'de', file: path.join(ROOT, 'lang', 'de', 'warning-signs', 'index.html') },
  { slug: '', lang: 'es', file: path.join(ROOT, 'lang', 'es', 'index.html') },
  { slug: 'about', lang: 'es', file: path.join(ROOT, 'lang', 'es', 'about', 'index.html') },
  { slug: 'basics', lang: 'es', file: path.join(ROOT, 'lang', 'es', 'basics', 'index.html') },
  { slug: 'for-parents', lang: 'es', file: path.join(ROOT, 'lang', 'es', 'for-parents', 'index.html') },
  { slug: 'for-teens', lang: 'es', file: path.join(ROOT, 'lang', 'es', 'for-teens', 'index.html') },
  { slug: 'get-help', lang: 'es', file: path.join(ROOT, 'lang', 'es', 'get-help', 'index.html') },
  { slug: 'warning-signs', lang: 'es', file: path.join(ROOT, 'lang', 'es', 'warning-signs', 'index.html') },
];

function generateHreflangTags(slug) {
  const suffix = slug ? `${slug}/` : '';
  const enUrl = `https://zolsi.cc/${suffix}`;
  const deUrl = `https://zolsi.cc/lang/de/${suffix}`;
  const esUrl = `https://zolsi.cc/lang/es/${suffix}`;

  return `    <link rel="alternate" hreflang="en" href="${enUrl}" />\n` +
         `    <link rel="alternate" hreflang="de" href="${deUrl}" />\n` +
         `    <link rel="alternate" hreflang="es" href="${esUrl}" />\n` +
         `    <link rel="alternate" hreflang="x-default" href="${enUrl}" />`;
}

function updateHreflang(content, slug) {
  const hreflangRegex = /(\s*<link rel="alternate" hreflang="[^"]+" href="[^"]+" \/>)+/g;
  const newTags = generateHreflangTags(slug);

  if (hreflangRegex.test(content)) {
    return content.replace(hreflangRegex, '\n' + newTags);
  }

  const canonicalRegex = /(<link rel="canonical" href="[^"]+" \/>)/;
  if (canonicalRegex.test(content)) {
    return content.replace(canonicalRegex, `$1\n${newTags}`);
  }

  return content;
}

function run() {
  const args = process.argv.slice(2);
  const applyChanges = args.includes('--sync') || args.includes('--apply');
  let errors = 0;
  let modifiedCount = 0;

  for (const page of PAGES) {
    if (!fs.existsSync(page.file)) {
      console.error(`Missing file: ${page.file}`);
      errors++;
      continue;
    }

    const content = fs.readFileSync(page.file, 'utf8');
    const updated = updateHreflang(content, page.slug);

    if (updated !== content) {
      if (applyChanges) {
        fs.writeFileSync(page.file, updated, 'utf8');
        modifiedCount++;
        console.log(`Updated: ${path.relative(ROOT, page.file)}`);
      } else {
        errors++;
        console.log(`Discrepancy in hreflang tags: ${path.relative(ROOT, page.file)}`);
      }
    }
  }

  if (applyChanges) {
    console.log(`Sync complete. ${modifiedCount} files updated.`);
    process.exit(0);
  } else {
    if (errors === 0) {
      console.log('All 21 pages are synchronized with valid hreflang alternate tags.');
      process.exit(0);
    } else {
      console.log(`Check failed with ${errors} discrepancies.`);
      process.exit(1);
    }
  }
}

run();
