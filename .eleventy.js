module.exports = function(eleventyConfig) {
    // Copy CSS and JS directly to the output folder
    eleventyConfig.addPassthroughCopy("assets");

    // Optional: Add a shortcode for Markdown content if you want to include
    // it directly in a Nunjucks/Liquid template.
    // Otherwise, .md files are processed automatically.
    const markdownIt = require('markdown-it');
    eleventyConfig.setLibrary("md", markdownIt()); // Use markdown-it for better control

    eleventyConfig.addFilter("markdownify", (markdownString) => {
        return markdownIt().render(markdownString);
    });

    eleventyConfig.addCollection("projects", function(collection) {
        return collection.getFilteredByGlob("projects/*.md").sort((a, b) => {
            return new Date(b.date) - new Date(a.date); // Sort by date, newest first
        });
    });

    return {
        dir: {
            input: "./",       // Look for templates/content in the root
            includes: "_includes", // Where to find partials/components
            output: "_site"    // Output to this folder for GH Pages
        }
    };
};
