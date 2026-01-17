module.exports = function (eleventyConfig) {
    // Copy CSS and JS directly to the output folder
    eleventyConfig.addPassthroughCopy("assets");

    // Optional: Add a shortcode for Markdown content if you want to include
    // it directly in a Nunjucks/Liquid template.
    // Otherwise, .md files are processed automatically.
    const markdownIt = require("markdown-it");
    mdOptions = {
        html: true, // Allow HTML tags in Markdown
        breaks: true, // Convert newlines to <br>
        linkify: true, // Automatically convert URLs into links
        typographer: true, // Enable smartypants and other typographic replacements
    };
    eleventyConfig.setLibrary("md", markdownIt(mdOptions)); // Use markdown-it for better control

    eleventyConfig.addFilter("markdownify", (markdownString) => {
        return markdownIt().render(markdownString);
    });

    eleventyConfig.addFilter("calculateAge", function(birthDate) {
        const birth = new Date(birthDate);
        const now = new Date();
        let age = now.getFullYear() - birth.getFullYear();
        const monthDiff = now.getMonth() - birth.getMonth();

        // Adjust if the birthday hasn't occurred yet this year
        if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < birth.getDate())) {
        age--;
        }
        return age;
    });

    eleventyConfig.addCollection("projects", function (collection) {
        return collection.getFilteredByGlob("projects/*.md").sort((a, b) => {
            return new Date(b.date) - new Date(a.date); // Sort by date, newest first
        });
    });

    return {
        dir: {
            input: "./", // Look for templates/content in the root
            includes: "_includes", // Where to find partials/components
            output: "_site", // Output to this folder for GH Pages
        },
    };
};
