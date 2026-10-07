import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import netlify from "@astrojs/netlify";
import robotsTxt from "astro-robots-txt";
import UnoCSS from "@unocss/astro";
import icon from "astro-icon";
import solidJs from "@astrojs/solid-js";
import { remarkReadingTime } from "./src/lib/remark-reading-time.mjs";
import mdx from "@astrojs/mdx";
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex';

// https://astro.build/config
export default defineConfig({
  site: "https://kcm.sh/",
  prefetch: true,
  integrations: [sitemap(), robotsTxt({
    sitemap: ["https://kcm.sh/sitemap-index.xml", "https://kcm.sh/sitemap-0.xml"]
  }), solidJs(), UnoCSS({
    injectReset: true
  }), icon(), mdx()],
  markdown: {
    remarkPlugins: [remarkReadingTime, remarkMath],
    rehypePlugins: [rehypeKatex],
    shikiConfig: {
      theme: "dracula-soft"
    }
  },
  output: 'hybrid',
  adapter: netlify()
});