import type { APIRoute } from "astro";
import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE_TITLE, SITE_DESCRIPTION } from "../consts";
import { sortByDate } from "../lib/sortByDate";
import { getNoteExcerpt } from "../lib/notes";

export const GET: APIRoute = async (context) => {
  if (!context.site) throw new Error("RSS 需要 astro.config.mjs 的 site 設定");
  const posts = sortByDate(await getCollection("blog"));
  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.update ?? post.data.date,
      description: getNoteExcerpt(post.body),
      link: `/blog/${post.id}/`,
    })),
  });
};
