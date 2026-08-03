export default function (eleventyConfig) {
  // Static assets copied as-is to the output root
  eleventyConfig.addPassthroughCopy("src/*.{png,txt,xml}");
  eleventyConfig.addPassthroughCopy({ "src/CNAME": "CNAME" });

  return {
    dir: {
      input: "src",
      output: "_site",
    },
    htmlTemplateEngine: "liquid",
  };
}
