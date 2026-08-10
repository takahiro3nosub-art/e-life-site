import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://e-life.site",
  output: "static",
  integrations: [sitemap()],
});
