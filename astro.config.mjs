import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import netlify from "@astrojs/netlify";
import robotsTxt from "astro-robots-txt";
import UnoCSS from "@unocss/astro";
import icon from "astro-icon";
import solidJs from "@astrojs/solid-js";
import { remarkReadingTime } from "./src/lib/remark-reading-time.mjs";
import mdx from "@astrojs/mdx";
import embeds from "astro-embed/integration";

// https://astro.build/config
export default defineConfig({
  site: "https://kcoopermiller.github.io/",
  integrations: [sitemap(), robotsTxt({
    sitemap: ["https://kcoopermiller.github.io/sitemap-index.xml", "https://kcoopermiller.github.io/sitemap-0.xml"]
  }), solidJs(), UnoCSS({
    injectReset: true
  }), icon(), embeds(), mdx()],
  markdown: {
    remarkPlugins: [remarkReadingTime],
    shikiConfig: {
      theme: "dracula-soft"
    }
  },
  output: 'server',
  adapter: netlify()
});