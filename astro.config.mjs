import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { satteri } from "@astrojs/markdown-satteri";
import externalLinks from "./scripts/satteri-external-links.mjs";

export default defineConfig({
  site: "https://e-life.site",
  output: "static",
  integrations: [sitemap()],
  markdown: { processor: satteri({ hastPlugins: [externalLinks({ site: "https://e-life.site" })] }) },
});
