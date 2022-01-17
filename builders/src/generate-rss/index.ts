import {
  BuilderContext,
  BuilderOutput,
  createBuilder,
} from '@angular-devkit/architect';
import { JsonObject } from '@angular-devkit/core';
import { readdirSync, writeFileSync } from 'fs';
import { MarkdownMeta } from '../../../utils';
import { getMarkdownMeta } from '../../../utils/get-markdown-meta';
import { Feed } from 'feed';

interface Options extends JsonObject {
  markdownPostsPath: string;
  rssPath: string;
}

export default createBuilder(generateRss);

async function generateRss(
  options: Options,
  context: BuilderContext
): Promise<BuilderOutput> {
  const markdownPostsPath = options.markdownPostsPath;
  const rssPath = options.rssPath;

  context.logger.info(`📒 Generate ${rssPath}.`);

  const findDirectory = (directory: string = '') => {
    const newPath = !directory
      ? markdownPostsPath
      : markdownPostsPath + '/' + directory;

    return readdirSync(newPath, {
      withFileTypes: true,
    })
      .filter((dirent) => dirent.isFile() && dirent.name.endsWith('.md'))
      .map((dirent) => {
        return dirent.name;
      })
      .map((fileName) => {
        return getMarkdownMeta(newPath, fileName);
      });
  };

  const folder = readdirSync(markdownPostsPath, { withFileTypes: true }).reduce(
    (acc, curr) => {
      if (curr.isFile() && curr.name.endsWith('.md')) {
        return acc.add('');
      } else {
        return acc.add(curr.name);
      }
    },
    new Set()
  );

  const allPosts = [...folder]
    .map((f: string) => {
      return findDirectory(f);
    })
    .reduce((acc, curr) => [...acc, ...curr], []);

  const posts = allPosts.sort( (a: MarkdownMeta, b: MarkdownMeta) => {
    const d1 = new Date(a.update || a.date);
    const d2 = new Date(b.update || b.date);
    return d2.getTime() - d1.getTime()
  })

  const siteUrl = 'https://mtwmt.github.io/';
  const feed = new Feed({
    title: "Mandy's Website",
    description: '學習記錄',
    id: siteUrl,
    link: siteUrl,
    language: 'zh',
    // favicon: `${siteUrl}/favicon.ico`,
    copyright: 'All rights reserved 2022, Mandy',
    author: {
      name: 'Mandy',
      email: 'mtwmt@hotmail.com',
      link: siteUrl,
    },
  });

  posts.forEach((post) => {
    feed.addItem({
      title: post.title,
      id: `${siteUrl}blog/${post.layout}/${post.slug}`,
      link: `${siteUrl}blog/${post.layout}/${post.slug}`,
      description: post.summary,
      date: new Date(post.update || post.date),
    });
  });

  writeFileSync(rssPath, feed.rss2());

  context.logger.info('✅ Done');
  return { success: true };
}
