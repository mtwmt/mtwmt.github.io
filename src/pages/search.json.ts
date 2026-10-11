import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { sortByDate } from "../lib/sortByDate";

/** 文章索引（標題、網址代號、日期），建置時產生靜態 JSON。 */
export const GET: APIRoute = async () => {
  const posts = sortByDate(await getCollection("blog")).map((post) => ({
    slug: post.id,
    title: post.data.title,
    date: post.data.date,
  }));

  return new Response(JSON.stringify(posts), {
    headers: { "Content-Type": "application/json" },
  });
};
