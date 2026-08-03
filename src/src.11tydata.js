// Flat .html output (polen-madrid.html, not polen-madrid/index.html).
// GitHub Pages serves flat files extensionless with a 200 and NO redirect,
// which keeps the indexed URLs (/polen-madrid, no trailing slash) byte-identical.
// Directory-style output would make GitHub Pages 301 /polen-madrid -> /polen-madrid/,
// changing every canonical URL. See Fase A report.
export default {
  eleventyComputed: {
    permalink: (data) => `${data.page.filePathStem}.html`,
  },
};
