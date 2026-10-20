#!/usr/bin/env node
/**
 * Weekly Google Search Console report: what the site gets from Google search,
 * by page type, and what changed.
 *
 *   GSC_SERVICE_ACCOUNT_JSON='{…}' node tools/gsc-report.mjs [outDir]
 *
 * Auth is a service account added as a user (Restricted is enough) to the
 * Search Console property. The JWT is signed here with node:crypto, so the
 * script needs no dependency. GSC_SITE picks the property; by default it
 * tries the domain property and then the URL-prefix one.
 *
 * Windows: the last 28 days with final data (Search Console runs ~3 days
 * behind) against the 28 before. Writes <outDir>/<date>.json and
 * <outDir>/latest.md (default outDir: reports/gsc), and appends the Markdown
 * to $GITHUB_STEP_SUMMARY when it runs in Actions.
 *
 * What it answers:
 * - totals and per-group clicks, impressions, CTR and position, with deltas;
 * - the pages added for a reason (WATCH) and whether Google shows them yet;
 * - "opportunities": query + page pairs at positions 5–20 with impressions,
 *   the ones a better title or section could move onto page one;
 * - countries, because the site serves Spain, the US, the UK, Australia and
 *   Japan with different pages.
 */
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const OUT_DIR = process.argv[2] || path.join("reports", "gsc");
const SITES = process.env.GSC_SITE ? [process.env.GSC_SITE] : ["sc-domain:respiraapp.fit", "https://respiraapp.fit/"];
const LAG_DAYS = 3;
const WINDOW = 28;

// Pages published for a specific reason, with the day they went live, so the
// report says whether Google has started showing them.
const WATCH = [
  { path: "/ja/", since: "2026-10-20", why: "Japanese landing (sugi season from February)" },
  { path: "/en/pollen-australia", since: "2026-10-19", why: "Australia landing, grass season Oct–Jan" },
  { path: "/en/best-pollen-apps-australia", since: "2026-10-20", why: "Australia apps comparison" },
  { path: "/", since: "2026-10-20", why: "Spanish home redesign + testimonials" },
  { path: "/en/", since: "2026-10-20", why: "English home redesign + testimonials" },
];

// First match wins; order matters (specific before general).
const GROUPS = [
  ["Legal & support", /^\/(en\/|ja\/)?(privacidad|privacy|condiciones|terms|soporte|support|delete-account)/],
  ["Home ES", /^\/$/],
  ["Home EN", /^\/en\/?$/],
  ["Japan", /^\/ja\//],
  ["Australia", /^\/en\/(pollen-australia|best-pollen-apps-australia)$/],
  ["EN comparisons", /^\/en\/(best-pollen-apps|respira-vs-)/],
  ["EN tools & maps", /^\/en\/(pollen-calendar|pollen-food-allergy|pollen-map-)/],
  ["UK/IE cities", /^\/en\/[a-z-]+\/pollen-/],
  ["US cities", /^\/en\/pollen-/],
  ["EN allergens", /^\/en\/allergy-/],
  ["ES cross pages", /^\/polen-(olivo|gramineas)-/],
  ["ES cities", /^\/polen-/],
  ["ES allergens", /^\/alergia-(?!cruzada)/],
  ["ES tools & maps", /^\/(calendario-polen|alergia-cruzada-polen-alimentos|mapa-polen-espana|calidad-aire-y-polen|mejores-apps-alergia-espana)/],
];

function groupOf(p) {
  for (const [name, re] of GROUPS) if (re.test(p)) return name;
  return "Other";
}

function pathOf(url) {
  try {
    const p = new URL(url).pathname.replace(/\.html$/, "");
    return p === "" ? "/" : p;
  } catch { return url; }
}

const ymd = (d) => d.toISOString().slice(0, 10);
function daysAgo(n) { const d = new Date(); d.setUTCDate(d.getUTCDate() - n); return d; }

async function accessToken(sa) {
  const now = Math.floor(Date.now() / 1000);
  const b64 = (o) => Buffer.from(JSON.stringify(o)).toString("base64url");
  const unsigned = `${b64({ alg: "RS256", typ: "JWT" })}.${b64({
    iss: sa.client_email,
    scope: "https://www.googleapis.com/auth/webmasters.readonly",
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600,
  })}`;
  const sig = crypto.createSign("RSA-SHA256").update(unsigned).sign(sa.private_key, "base64url");
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion: `${unsigned}.${sig}` }),
  });
  const j = await res.json();
  if (!res.ok) throw new Error(`token: ${res.status} ${JSON.stringify(j)}`);
  return j.access_token;
}

async function query(token, site, body) {
  const rows = [];
  for (let startRow = 0; ; startRow += 25000) {
    const res = await fetch(`https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(site)}/searchAnalytics/query`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ ...body, rowLimit: 25000, startRow, dataState: "final" }),
    });
    const j = await res.json();
    if (!res.ok) { const e = new Error(`${site}: ${res.status} ${j.error?.message || ""}`); e.status = res.status; throw e; }
    rows.push(...(j.rows || []));
    if (!j.rows || j.rows.length < 25000) return rows;
  }
}

function sum(rows) {
  let clicks = 0, impressions = 0, posW = 0;
  for (const r of rows) { clicks += r.clicks; impressions += r.impressions; posW += r.position * r.impressions; }
  return { clicks, impressions, ctr: impressions ? clicks / impressions : 0, position: impressions ? posW / impressions : null };
}

const fmtN = (n) => Math.round(n).toLocaleString("en-US");
const fmtPct = (x) => `${(x * 100).toFixed(1)}%`;
const fmtPos = (p) => (p == null ? "–" : p.toFixed(1));
function delta(a, b) {
  if (!b) return a ? "new" : "–";
  const d = (a - b) / b;
  return `${d >= 0 ? "+" : ""}${(d * 100).toFixed(0)}%`;
}
function posDelta(a, b) {
  if (a == null || b == null) return "–";
  const d = b - a; // positive = moved up
  return `${d >= 0 ? "↑" : "↓"}${Math.abs(d).toFixed(1)}`;
}

async function main() {
  const raw = process.env.GSC_SERVICE_ACCOUNT_JSON;
  if (!raw) { console.log("GSC_SERVICE_ACCOUNT_JSON is not set; nothing to do."); return; }
  const sa = JSON.parse(raw);
  const token = await accessToken(sa);

  const end = daysAgo(LAG_DAYS);
  const start = daysAgo(LAG_DAYS + WINDOW - 1);
  const prevEnd = daysAgo(LAG_DAYS + WINDOW);
  const prevStart = daysAgo(LAG_DAYS + 2 * WINDOW - 1);
  const cur = { startDate: ymd(start), endDate: ymd(end) };
  const prev = { startDate: ymd(prevStart), endDate: ymd(prevEnd) };

  let site, pagesCur;
  for (const s of SITES) {
    try { pagesCur = await query(token, s, { ...cur, dimensions: ["page"] }); site = s; break; }
    catch (e) { if (e.status !== 403 && e.status !== 404) throw e; console.log(`skip ${s}: ${e.message}`); }
  }
  if (!site) throw new Error(`the service account ${sa.client_email} has no access to ${SITES.join(" or ")}`);

  const [pagesPrev, qpCur, countryCur, countryPrev] = await Promise.all([
    query(token, site, { ...prev, dimensions: ["page"] }),
    query(token, site, { ...cur, dimensions: ["query", "page"] }),
    query(token, site, { ...cur, dimensions: ["country"] }),
    query(token, site, { ...prev, dimensions: ["country"] }),
  ]);

  const byGroup = (rows) => {
    const m = new Map();
    for (const r of rows) { const g = groupOf(pathOf(r.keys[0])); if (!m.has(g)) m.set(g, []); m.get(g).push(r); }
    return m;
  };
  const gCur = byGroup(pagesCur), gPrev = byGroup(pagesPrev);
  const groups = [...new Set([...gCur.keys(), ...gPrev.keys()])].map((g) => ({
    group: g, cur: sum(gCur.get(g) || []), prev: sum(gPrev.get(g) || []),
  })).sort((a, b) => b.cur.impressions - a.cur.impressions);

  const pageMap = (rows) => new Map(rows.map((r) => [pathOf(r.keys[0]), r]));
  const pc = pageMap(pagesCur), pp = pageMap(pagesPrev);
  const watch = WATCH.map((w) => ({ ...w, cur: pc.get(w.path) || null, prev: pp.get(w.path) || null }));

  const opportunities = qpCur
    .filter((r) => r.position >= 5 && r.position <= 20 && r.impressions >= 10)
    .sort((a, b) => b.impressions - a.impressions)
    .slice(0, 30)
    .map((r) => ({ query: r.keys[0], page: pathOf(r.keys[1]), impressions: r.impressions, clicks: r.clicks, position: r.position }));

  const topQueries = qpCur.slice().sort((a, b) => b.clicks - a.clicks || b.impressions - a.impressions).slice(0, 25)
    .map((r) => ({ query: r.keys[0], page: pathOf(r.keys[1]), clicks: r.clicks, impressions: r.impressions, position: r.position }));

  const cp = new Map(countryPrev.map((r) => [r.keys[0], r]));
  const countries = countryCur.sort((a, b) => b.impressions - a.impressions).slice(0, 12)
    .map((r) => ({ country: r.keys[0].toUpperCase(), cur: sum([r]), prev: sum(cp.get(r.keys[0]) ? [cp.get(r.keys[0])] : []) }));

  const totals = { cur: sum(pagesCur), prev: sum(pagesPrev) };
  const data = { generatedAt: new Date().toISOString(), site, window: { cur, prev }, totals, groups, watch, opportunities, topQueries, countries };

  const md = [];
  md.push(`# Search Console — ${cur.startDate} to ${cur.endDate}`, "");
  md.push(`Property \`${site}\`. Compared with ${prev.startDate} to ${prev.endDate}. Final data only (about ${LAG_DAYS} days behind).`, "");
  md.push(`**Clicks ${fmtN(totals.cur.clicks)}** (${delta(totals.cur.clicks, totals.prev.clicks)}) · **impressions ${fmtN(totals.cur.impressions)}** (${delta(totals.cur.impressions, totals.prev.impressions)}) · CTR ${fmtPct(totals.cur.ctr)} · position ${fmtPos(totals.cur.position)} (${posDelta(totals.cur.position, totals.prev.position)})`, "");
  md.push("## By page type", "", "| Group | Clicks | Δ | Impressions | Δ | CTR | Position |", "|---|---:|---:|---:|---:|---:|---:|");
  for (const g of groups) md.push(`| ${g.group} | ${fmtN(g.cur.clicks)} | ${delta(g.cur.clicks, g.prev.clicks)} | ${fmtN(g.cur.impressions)} | ${delta(g.cur.impressions, g.prev.impressions)} | ${fmtPct(g.cur.ctr)} | ${fmtPos(g.cur.position)} (${posDelta(g.cur.position, g.prev.position)}) |`);
  md.push("", "## Pages we are watching", "", "| Page | Live since | Clicks | Impressions | Position | Why |", "|---|---|---:|---:|---:|---|");
  for (const w of watch) md.push(`| ${w.path} | ${w.since} | ${w.cur ? fmtN(w.cur.clicks) : 0} | ${w.cur ? fmtN(w.cur.impressions) : "not shown yet"} | ${w.cur ? fmtPos(w.cur.position) : "–"} | ${w.why} |`);
  md.push("", "## Opportunities (position 5–20, ≥10 impressions)", "", "A better title, a section that answers the query, or an internal link can move these onto the first page.", "", "| Query | Page | Impressions | Clicks | Position |", "|---|---|---:|---:|---:|");
  for (const o of opportunities) md.push(`| ${o.query} | ${o.page} | ${fmtN(o.impressions)} | ${fmtN(o.clicks)} | ${fmtPos(o.position)} |`);
  if (!opportunities.length) md.push("| (none yet) | | | | |");
  md.push("", "## Top queries", "", "| Query | Page | Clicks | Impressions | Position |", "|---|---|---:|---:|---:|");
  for (const q of topQueries) md.push(`| ${q.query} | ${q.page} | ${fmtN(q.clicks)} | ${fmtN(q.impressions)} | ${fmtPos(q.position)} |`);
  md.push("", "## Countries", "", "| Country | Clicks | Δ | Impressions | Δ | Position |", "|---|---:|---:|---:|---:|---:|");
  for (const c of countries) md.push(`| ${c.country} | ${fmtN(c.cur.clicks)} | ${delta(c.cur.clicks, c.prev.clicks)} | ${fmtN(c.cur.impressions)} | ${delta(c.cur.impressions, c.prev.impressions)} | ${fmtPos(c.cur.position)} |`);
  md.push("");
  const text = md.join("\n");

  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.writeFileSync(path.join(OUT_DIR, `${ymd(new Date())}.json`), JSON.stringify(data, null, 2));
  fs.writeFileSync(path.join(OUT_DIR, "latest.md"), text);
  if (process.env.GITHUB_STEP_SUMMARY) fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, text);
  console.log(text);
}

main().catch((e) => { console.error(e.message); process.exit(1); });
