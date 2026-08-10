import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE } from "../site";

export async function GET(context: { site?: URL }) {
  const articles = (await getCollection("articles", ({ data }) => !data.draft)).sort(
    (a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf(),
  );

  return rss({
    title: `${SITE.name} - AIエージェントナレッジ`,
    description: SITE.description,
    site: context.site ?? new URL(SITE.url),
    items: articles.map((article) => ({
      title: article.data.title,
      description: article.data.description,
      pubDate: article.data.publishedAt,
      link: `/articles/${article.id}/`,
      categories: article.data.tags,
    })),
    customData: "<language>ja</language>",
  });
}
