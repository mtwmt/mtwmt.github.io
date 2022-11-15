import {
  BuilderContext,
  BuilderOutput,
  createBuilder,
} from '@angular-devkit/architect';
import { JsonObject } from '@angular-devkit/core';
import { readdirSync, writeFileSync } from 'fs';
// import { range } from 'ramda';
import { getMarkdownMeta } from '../../../utils/get-markdown-meta';
import { slugify } from '../../../utils/slugify';

interface Options extends JsonObject {
  markdownPostsPath: string;
  urlsPath: string;
}

// const PAGE_SIZE = 10;

// const getPageCount = (input: any[]) => Math.ceil(input.length / PAGE_SIZE);

export default createBuilder(generateUrls);

async function generateUrls(
  options: Options,
  context: BuilderContext
): Promise<BuilderOutput> {
  const markdownPostsPath = options.markdownPostsPath;
  const urlsPath = options.urlsPath;

  const urls = [
    '/about',
    '/contact',
    '/404',
    '/blog',
    '/blog/list',
  ];

  context.logger.info(`🔁 Generate ${urlsPath}.`);

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

  const posts = [...folder]
    .map((f: string) => {
      return findDirectory(f);
    })
    .reduce((acc, curr) => [...acc, ...curr], []);

  context.logger.info(`📝 Generating post pages.`);

  // single post
  const postPages = posts.map((post) => {
    return `/blog/${post?.layout}/${post?.slug}`;
  });
  urls.push(...postPages);

  context.logger.info(`📁 Generating category pages.`);
  // categories page
  const categoriesInPosts = posts
    .reduce(
      (prev, curr) => [...prev, ...(curr?.categories || [])],
      [] as string[]
    )
    .filter((category) => !!category);
  const categories = [...new Set(categoriesInPosts)];

  const categoryUrls = categories.reduce((prev, category) => {
    const categorySlug = slugify(category);
    return [...prev, `/blog/categories/${categorySlug.toLowerCase()}`];
  }, []);

  urls.push(...categoryUrls);

  context.logger.info(`🏷  Generating tag pages.`);
  // categories page
  const tagsInPosts = posts
    .reduce((prev, curr) => [...prev, ...(curr?.tags || [])], [] as string[])
    .filter((tag) => !!tag);
  const tags = [...new Set(tagsInPosts)];
  const tagUrls = tags.reduce((prev, tagName) => {
    const tagSlug = slugify(tagName);

    return [...prev, `/blog/tags/${tagSlug.toLowerCase()}`];
  }, []);
  urls.push(...tagUrls);

  //#endregion

  writeFileSync(urlsPath, urls.join('\n'));

  context.logger.info('✅ Done.');
  return { success: true };
}
