// Lighthouse (SEO, accessibility, best practices) over every URL in the
// sitemap. Google's own measurement of the things the SEO Starter Guide asks
// for, per page rather than for the two pages anyone remembers to test.
//
//   node tools/lighthouse-all.mjs                         # the live site
//   node tools/lighthouse-all.mjs http://localhost:8080   # a local build
//
// Writes reports/lighthouse/all-pages.json and prints every page under 100
// with the audits it failed. Exit 1 if any SEO score is below 100.
// LH_CONCURRENCY (default 4) sets how many Chromes run at once.
import fs from 'node:fs';
import path from 'node:path';
import { execFile } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const base = (process.argv[2] || 'https://respiraapp.fit').replace(/\/$/, '');
const concurrency = Number(process.env.LH_CONCURRENCY || 4);

function findChromium() {
  if (process.env.CHROME_PATH) return process.env.CHROME_PATH;
  const root = process.env.PLAYWRIGHT_BROWSERS_PATH || '/opt/pw-browsers';
  if (!fs.existsSync(root)) return undefined;
  for (const d of fs.readdirSync(root).filter(d => /^chromium-\d+$/.test(d)).sort().reverse()) {
    const bin = path.join(root, d, 'chrome-linux', 'chrome');
    if (fs.existsSync(bin)) return bin;
  }
  return undefined;
}

const sitemap = fs.readFileSync('_site/sitemap.xml', 'utf8');
// LH_ONLY=<regex> limits the run to matching paths, e.g. LH_ONLY='^/en/'.
const only = process.env.LH_ONLY ? new RegExp(process.env.LH_ONLY) : null;
const paths = [...sitemap.matchAll(/<loc>https:\/\/respiraapp\.fit([^<]*)<\/loc>/g)]
  .map(m => m[1] || '/')
  .filter(p => !only || only.test(p));
const flags = ['--headless=new', '--no-sandbox'];
// Chrome ignores HTTPS_PROXY on its own; pass it through when there is one.
if (process.env.HTTPS_PROXY && !/localhost|127\.0\.0\.1/.test(base)) flags.push('--proxy-server=' + process.env.HTTPS_PROXY);

// One Lighthouse per child process. Several runs inside one process share
// Lighthouse's global performance marks and fail with "performance mark has
// not been set"; separate processes are the supported way to parallelise.
const cli = path.join(path.dirname(fileURLToPath(import.meta.resolve('lighthouse/package.json'))), 'cli', 'index.js');
const chromePath = findChromium();
function audit(url) {
  return new Promise(resolve => {
    execFile(process.execPath, [cli, url, '--quiet', '--output=json', '--output-path=stdout',
      '--form-factor=mobile', '--only-categories=seo,accessibility,best-practices',
      `--chrome-flags=${flags.join(' ')}`],
    { env: { ...process.env, ...(chromePath ? { CHROME_PATH: chromePath } : {}) }, maxBuffer: 256 * 1024 * 1024 },
    (error, stdout, stderr) => {
      try {
        const lhr = JSON.parse(stdout);
        if (lhr.runtimeError) return resolve({ error: lhr.runtimeError.message });
        resolve({
          scores: Object.fromEntries(Object.entries(lhr.categories).map(([k, v]) => [k, Math.round(v.score * 100)])),
          failed: Object.values(lhr.audits)
            .filter(a => a.score !== null && a.score < 1 && !['informative', 'manual', 'notApplicable'].includes(a.scoreDisplayMode))
            .map(a => a.id),
        });
      } catch {
        resolve({ error: (stderr || String(error)).trim().split('\n').pop() });
      }
    });
  });
}

const results = {};
let next = 0;
async function worker() {
  while (next < paths.length) {
    const p = paths[next++];
    results[p] = await audit(base + p);
    process.stdout.write(results[p].error ? 'x' : '.');
  }
}
await Promise.all(Array.from({ length: concurrency }, worker));

fs.mkdirSync('reports/lighthouse', { recursive: true });
fs.writeFileSync('reports/lighthouse/all-pages.json', JSON.stringify({ base, ranAt: new Date().toISOString(), results }, null, 1));

const rows = Object.entries(results);
const cats = ['seo', 'accessibility', 'best-practices'];
console.log(`\n${rows.length} pages on ${base}`);
for (const c of cats) {
  const s = rows.map(([, r]) => r.scores?.[c]).filter(v => v != null);
  console.log(`${c.padEnd(15)} min ${Math.min(...s)}  mean ${(s.reduce((a, b) => a + b, 0) / s.length).toFixed(1)}  pages <100: ${s.filter(v => v < 100).length}`);
}
for (const [p, r] of rows) {
  if (r.error) console.log(`ERROR ${p}: ${r.error}`);
  else if (cats.some(c => r.scores[c] < 100)) console.log(`${p}  ${cats.map(c => c + ' ' + r.scores[c]).join('  ')}  failed: ${r.failed.join(', ')}`);
}
process.exit(rows.some(([, r]) => r.error || r.scores.seo < 100) ? 1 : 0);
