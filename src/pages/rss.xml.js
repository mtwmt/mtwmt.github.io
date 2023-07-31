import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE_TITLE, SITE_DESCRIPTION } from '../consts';

export async function get(context) {
	const posts = await getCollection('blog');
	return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    // items: []
    items: posts.map((post) => ({
    	// ...post.data,
	title: post.data.title,
        date: post.data.update || post.data.date,
        description: post.data.description,
    	link: `/blog/${post.slug}/`,
    })),
  });
}
