// Default: flat .html output (polen-madrid.html, not polen-madrid/index.html).
// GitHub Pages serves flat files extensionless with a 200 and NO redirect,
// which keeps the indexed URLs (/polen-madrid, no trailing slash) intact.
// Directory-style output would make GitHub Pages 301 /polen-madrid -> /polen-madrid/,
// changing every canonical URL. See README "URLs".
//
// Templates that set their own permalink in front matter (asset templates,
// paginated templates, permalink: false) keep it — this computed default only
// fills the gap. Note: an unset permalink arrives as "" (empty string), not
// undefined, so the check is explicit.
export default {
  eleventyComputed: {
    permalink: (data) => {
      if (data.permalink === false || (typeof data.permalink === "string" && data.permalink !== "")) {
        return data.permalink;
      }
      return `${data.page.filePathStem}.html`;
    },
  },
};
