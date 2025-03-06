import adapter from "@sveltejs/adapter-static";
import sveltePreprocess from "svelte-preprocess";

const dev = process.argv.includes("dev");

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: [sveltePreprocess({})],

  kit: {
    adapter: adapter({
      pages: "build",
      assets: "build",
      fallback: undefined,
      precompress: false,
      strict: true,
    }),

    paths: {
      base: dev ? "" : process.env.BASE_PATH,
    },
  },
  vitePlugin: {
    inspector: {
      toggleKeyCombo: "alt-x",
      showToggleButton: "always",
      toggleButtonPos: "bottom-right",
    },
  },
};

export default config;
