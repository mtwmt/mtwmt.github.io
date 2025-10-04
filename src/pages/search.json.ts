import { getCollection } from "astro:content";
import { sortByDate } from "../lib/sortByDate";

async function getPosts() {
  
  const posts = await getCollection("blog")
  const sortedPosts = sortByDate(posts);

  return sortedPosts.map((post) => {
    return {
      slug: post.slug,
      title: post.data.title,
      date: post.data.date,
      // article: post.body
      //   .replace(/<[^>]*>/gm, "")
      //   .replace(/[\n#]/g, "")
      //   .trim(),
    };
  });
   
}

export async function GET({}) {
  return new Response(JSON.stringify(await getPosts()), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
