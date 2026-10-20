#!/usr/bin/env node
/**
 * Tell IndexNow (Bing, Yandex, Seznam, Naver…) that the site changed, so Bing
 * recrawls without waiting. Bing matters beyond Bing: ChatGPT search and
 * Copilot read its index. Google does not use IndexNow; it reads the sitemap.
 *
 *   node tools/indexnow.mjs            # every URL in the live sitemap
 *
 * The key is public by design: IndexNow proves ownership by fetching
 * https://respiraapp.fit/<key>.txt, which is src/<key>.txt. Run it only after
 * a deploy is live, or the key file may not be there yet. The deploy workflow
 * calls it after content pushes, not after the daily data rebuild.
 */
const HOST = "respiraapp.fit";
const KEY = "f7c6ad555bb40546ca8bb5a2ecfb6661";

const res = await fetch(`https://${HOST}/sitemap.xml`);
if (!res.ok) throw new Error(`sitemap: ${res.status}`);
const urls = [...(await res.text()).matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const keyCheck = await fetch(`https://${HOST}/${KEY}.txt`);
if (!keyCheck.ok || (await keyCheck.text()).trim() !== KEY) throw new Error("key file is not live yet");

const post = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList: urls }),
});
console.log(`IndexNow: ${urls.length} URLs, HTTP ${post.status}`);
// 200 and 202 are both success (202: key not yet validated, retried later).
if (post.status !== 200 && post.status !== 202) { console.log(await post.text()); process.exit(1); }
