// Audits the built site (_site/) against Google's SEO Starter Guide:
// https://developers.google.com/search/docs/fundamentals/seo-starter-guide
//
//   npm run build && node tools/seo-audit.mjs
//
// Errors fail the run (exit 1); warnings are printed and do not. The
// google-seo-starter skill (pfernan95/respira-app, .claude/skills/) explains
// each rule and which part of the guide it comes from. What the guide says
// does NOT matter is deliberately not scored: word counts, keyword density,
// heading order. A meta keywords tag is flagged only as dead weight.
//
// Parsing uses the Chromium that playwright-core already needs for the OG
// image, with JavaScript OFF: what is checked is the HTML a crawler receives.
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright-core';

const SITE = path.resolve('_site');
const ORIGIN = 'https://respiraapp.fit';

function findChromium() {
  if (process.env.PLAYWRIGHT_CHROMIUM) return process.env.PLAYWRIGHT_CHROMIUM;
  const root = process.env.PLAYWRIGHT_BROWSERS_PATH || '/opt/pw-browsers';
  if (!fs.existsSync(root)) return undefined; // let playwright find its own
  for (const d of fs.readdirSync(root).filter(d => /^chromium-\d+$/.test(d)).sort().reverse()) {
    const bin = path.join(root, d, 'chrome-linux', 'chrome');
    if (fs.existsSync(bin)) return bin;
  }
  return undefined;
}

// URL path ("/polen-madrid", "/en/", "/") → file in _site, the way GitHub
// Pages resolves it.
function fileFor(urlPath) {
  const p = decodeURIComponent(urlPath.split('#')[0].split('?')[0]);
  const candidates = p.endsWith('/')
    ? [path.join(SITE, p, 'index.html')]
    : [path.join(SITE, p), path.join(SITE, p + '.html'), path.join(SITE, p, 'index.html')];
  return candidates.find(f => fs.existsSync(f) && fs.statSync(f).isFile());
}

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(e =>
    e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)]);
}

// The page's own public URL, as the canonical should spell it.
function urlFor(file) {
  let rel = '/' + path.relative(SITE, file).split(path.sep).join('/');
  if (rel.endsWith('/index.html')) return rel.slice(0, -'index.html'.length);
  return rel.replace(/\.html$/, '');
}

// Anchor text that says nothing about the destination (guide: "Write good
// anchor text"). Compared after trimming and lower-casing, whole text only.
const GENERIC_ANCHORS = new Set([
  'click here', 'here', 'read more', 'more', 'learn more', 'link', 'this', 'this page',
  'aquí', 'aqui', 'haz clic aquí', 'pulsa aquí', 'más', 'mas', 'leer más', 'ver más',
  'saber más', 'más información', 'mas informacion', 'more info', 'more information', 'enlace', 'este enlace', 'esta página',
]);

const errors = [];
const warnings = [];
const err = (page, msg) => errors.push(`${page}: ${msg}`);
const warn = (page, msg) => warnings.push(`${page}: ${msg}`);

const htmlFiles = walk(SITE).filter(f => f.endsWith('.html'));
const sitemap = fs.readFileSync(path.join(SITE, 'sitemap.xml'), 'utf8');
const sitemapUrls = new Set([...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]));

const browser = await chromium.launch({ executablePath: findChromium() });
const context = await browser.newContext({ javaScriptEnabled: false });
const tab = await context.newPage();
// Nothing leaves the machine: stylesheets, fonts and images are irrelevant to
// what is being read here.
await tab.route('**/*', route => route.request().url().startsWith('data:') ? route.continue() : route.abort());

const pages = [];
for (const file of htmlFiles) {
  await tab.setContent(fs.readFileSync(file, 'utf8'), { waitUntil: 'domcontentloaded' });
  const d = await tab.evaluate(() => {
    const attr = (sel, a) => document.querySelector(sel)?.getAttribute(a) ?? null;
    const main = document.querySelector('main') || document.body;
    return {
      lang: document.documentElement.getAttribute('lang'),
      title: document.querySelector('head > title')?.textContent ?? null,
      titles: document.querySelectorAll('head > title').length,
      description: attr('meta[name="description"]', 'content'),
      descriptions: document.querySelectorAll('meta[name="description"]').length,
      robots: attr('meta[name="robots"]', 'content') || '',
      viewport: attr('meta[name="viewport"]', 'content'),
      canonical: attr('link[rel="canonical"]', 'href'),
      canonicals: document.querySelectorAll('link[rel="canonical"]').length,
      metaKeywords: !!document.querySelector('meta[name="keywords"]'),
      ogImage: attr('meta[property="og:image"]', 'content'),
      favicon: !!document.querySelector('link[rel~="icon"]'),
      hreflang: [...document.querySelectorAll('head link[rel="alternate"][hreflang]')]
        .map(l => ({ lang: l.getAttribute('hreflang'), href: l.getAttribute('href') })),
      h1: [...document.querySelectorAll('h1')].map(h => h.textContent.trim()),
      images: [...document.querySelectorAll('img')].map(i => ({
        src: i.getAttribute('src'), alt: i.getAttribute('alt'),
        decorative: i.getAttribute('aria-hidden') === 'true' || i.getAttribute('role') === 'presentation',
        sized: i.hasAttribute('width') && i.hasAttribute('height'),
      })),
      links: [...document.querySelectorAll('a[href]')].map(a => ({
        href: a.getAttribute('href'),
        text: (a.getAttribute('aria-label') || a.textContent || a.querySelector('img')?.getAttribute('alt') || '').replace(/\s+/g, ' ').trim(),
        rel: a.getAttribute('rel') || '',
      })),
      jsonld: [...document.querySelectorAll('script[type="application/ld+json"]')].map(s => s.textContent),
      text: main.innerText.replace(/\s+/g, ' ').trim(),
    };
  });
  pages.push({ file, url: urlFor(file), ...d });
}
await browser.close();

const byUrl = new Map(pages.map(p => [p.url, p]));
const indexable = pages.filter(p => !/noindex/i.test(p.robots));
const seenTitle = new Map();
const seenDesc = new Map();

for (const p of pages) {
  const u = p.url;
  const noindex = /noindex/i.test(p.robots);

  // ── Help Google find your content ──────────────────────────────────────
  if (noindex && sitemapUrls.has(ORIGIN + u)) err(u, 'noindex page listed in sitemap.xml');
  if (!noindex && !sitemapUrls.has(ORIGIN + u)) err(u, 'indexable page missing from sitemap.xml');
  if (!p.viewport) err(u, 'no <meta name="viewport"> (mobile-first indexing)');
  if (!p.lang) err(u, 'no <html lang>');

  // ── Organise your site: one URL per piece of content ───────────────────
  if (!noindex) {
    if (p.canonicals !== 1) err(u, `${p.canonicals} canonical links (want exactly 1)`);
    else if (p.canonical !== ORIGIN + u) err(u, `canonical ${p.canonical} is not the page's own URL ${ORIGIN + u}`);
  }
  if (/[A-Z_ ]|%[0-9A-F]{2}/.test(u)) warn(u, 'URL is not lowercase words joined by hyphens');

  // ── Influence your title links and snippets ────────────────────────────
  const title = (p.title || '').trim();
  if (p.titles !== 1 || !title) err(u, `needs exactly one non-empty <title> (has ${p.titles})`);
  else if (!noindex) {
    if (seenTitle.has(title)) err(u, `title duplicates ${seenTitle.get(title)}: "${title}"`);
    else seenTitle.set(title, u);
    if (title.length > 65) warn(u, `title is ${title.length} chars, likely truncated: "${title}"`);
    if (!/respira/i.test(title)) warn(u, `title does not name the site: "${title}"`);
  }
  const desc = (p.description || '').trim();
  if (p.descriptions !== 1 || !desc) err(u, `needs exactly one non-empty meta description (has ${p.descriptions})`);
  else if (!noindex) {
    if (seenDesc.has(desc)) err(u, `meta description duplicates ${seenDesc.get(desc)}`);
    else seenDesc.set(desc, u);
    if (desc.length > 160) warn(u, `meta description is ${desc.length} chars`);
    if (desc.length < 70) warn(u, `meta description is only ${desc.length} chars`);
  }
  if (p.metaKeywords) warn(u, 'meta keywords tag: Google ignores it, remove it');
  if (!p.ogImage) warn(u, 'no og:image');
  if (!p.favicon) err(u, 'no favicon link');

  // ── Content: readable, with a clear heading ────────────────────────────
  if (p.h1.length === 0) err(u, 'no <h1>');
  if (p.h1.length > 1 && !noindex) warn(u, `${p.h1.length} <h1> elements`);

  // ── Images: alt text, dimensions ───────────────────────────────────────
  for (const img of p.images) {
    if (img.alt === null) err(u, `<img src="${img.src}"> has no alt attribute`);
    else if (!img.alt.trim() && !img.decorative) err(u, `<img src="${img.src}"> has empty alt but is not marked decorative`);
    if (!img.sized) warn(u, `<img src="${img.src}"> has no width/height (layout shift)`);
  }

  // ── Links: every internal link resolves, anchor text is descriptive ────
  for (const l of p.links) {
    const h = l.href;
    if (/^(mailto:|tel:|#|javascript:)/.test(h)) continue;
    const text = l.text.toLowerCase();
    if (!text) err(u, `link to ${h} has no text`);
    else if (GENERIC_ANCHORS.has(text)) err(u, `link to ${h} has generic anchor text "${l.text}"`);
    let target;
    if (h.startsWith('/')) target = h;
    else if (h.startsWith(ORIGIN)) target = h.slice(ORIGIN.length) || '/';
    else if (/^https?:/.test(h)) continue;
    else target = path.posix.join(path.posix.dirname(u.endsWith('/') ? u + 'x' : u), h);
    if (!fileFor(target)) err(u, `broken internal link ${h}`);
  }

  // ── Structured data parses ─────────────────────────────────────────────
  for (const block of p.jsonld) {
    try {
      const data = JSON.parse(block);
      const items = Array.isArray(data) ? data : [data];
      for (const it of items) if (!it['@context']) err(u, 'JSON-LD block without @context');
    } catch (e) { err(u, `JSON-LD does not parse: ${e.message}`); }
  }

  // ── hreflang: targets exist, are indexable, and point back ─────────────
  if (p.hreflang.length) {
    if (!p.hreflang.some(h => h.href === ORIGIN + u)) err(u, 'hreflang cluster does not include the page itself');
    for (const h of p.hreflang) {
      const other = byUrl.get(h.href.replace(ORIGIN, ''));
      if (!other) { err(u, `hreflang ${h.lang} → ${h.href} does not exist`); continue; }
      if (/noindex/i.test(other.robots)) err(u, `hreflang ${h.lang} → noindex page ${h.href}`);
      if (!other.hreflang.some(b => b.href === ORIGIN + u)) err(u, `hreflang ${h.lang} → ${h.href} does not link back`);
    }
  }
}

// ── Every sitemap URL is a real, indexable page ──────────────────────────
for (const loc of sitemapUrls) {
  const p = byUrl.get(loc.replace(ORIGIN, '') || '/');
  if (!p) err(loc, 'in sitemap.xml but no such page');
}

// ── Duplicate content: identical main text on two indexable URLs ─────────
// (guide: "each piece of content is accessible through only one URL").
// Near-duplicates of templated pages are reported, not failed: the guide
// says duplication wastes crawl, it is not a penalty.
const byText = new Map();
for (const p of indexable) {
  if (byText.has(p.text)) err(p.url, `main content identical to ${byText.get(p.text)}`);
  else byText.set(p.text, p.url);
}
function shingles(t) {
  const w = t.toLowerCase().split(' ');
  const s = new Set();
  for (let i = 0; i + 5 <= w.length; i++) s.add(w.slice(i, i + 5).join(' '));
  return s;
}
const sh = indexable.map(p => [p.url, shingles(p.text)]);
let nearDup = 0;
const worst = [];
for (let i = 0; i < sh.length; i++) for (let j = i + 1; j < sh.length; j++) {
  const [a, A] = sh[i], [b, B] = sh[j];
  let inter = 0;
  for (const x of A) if (B.has(x)) inter++;
  const jac = inter / (A.size + B.size - inter || 1);
  if (jac > 0.8) { nearDup++; worst.push([jac, a, b]); }
}
worst.sort((x, y) => y[0] - x[0]);
for (const [jac, a, b] of worst.slice(0, 10)) warn(a, `${Math.round(jac * 100)}% of its text is shared with ${b}`);
if (nearDup > 10) warnings.push(`… ${nearDup} page pairs share more than 80% of their text in total`);

// ── llms.txt: what AI answer engines read first. Every link must resolve
// to an indexable page, same as the sitemap.
const llms = fs.readFileSync(path.join(SITE, 'llms.txt'), 'utf8');
for (const [, href] of llms.matchAll(/\]\((https:\/\/respiraapp\.fit[^)\s]*)\)/g)) {
  const u = href.slice(ORIGIN.length) || '/';
  if (u === '/sitemap.xml') continue;
  const p = byUrl.get(u);
  if (!p) err('llms.txt', `links to ${href}, which does not exist`);
  else if (/noindex/i.test(p.robots)) err('llms.txt', `links to noindex page ${href}`);
}

// ── robots.txt must not block resources Google needs to render ───────────
const robots = fs.readFileSync(path.join(SITE, 'robots.txt'), 'utf8');
if (/Disallow:\s*\/(assets|.*\.css|.*\.js)/i.test(robots)) err('robots.txt', 'blocks CSS/JS that Google needs to render the page');
if (!/Sitemap:\s*https:\/\/respiraapp\.fit\/sitemap\.xml/.test(robots)) err('robots.txt', 'does not declare the sitemap');

console.log(`${pages.length} HTML files, ${indexable.length} indexable, ${sitemapUrls.size} in sitemap`);
for (const w of warnings) console.log('warn  ' + w);
for (const e of errors) console.log('ERROR ' + e);
console.log(`\n${errors.length} errors, ${warnings.length} warnings`);
process.exit(errors.length ? 1 : 0);
