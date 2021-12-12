import {
  BuilderContext,
  BuilderOutput,
  createBuilder,
} from '@angular-devkit/architect';
import { JsonObject } from '@angular-devkit/core';
import { readdirSync, writeFileSync } from 'fs';
import { getMarkdownMeta } from '../../../utils/get-markdown-meta';

interface Options extends JsonObject {
  markdownPostsPath: string;
  targetJsonPath: string;
}

export default createBuilder(generateBlogPostsJson);

async function generateBlogPostsJson(
  options: Options,
  context: BuilderContext
): Promise<BuilderOutput> {
  const markdownPostsPath = options.markdownPostsPath;
  const targetJsonPath = options.targetJsonPath;

  context.logger.info(
    `📃 Generate ${targetJsonPath} from markdown files in ${markdownPostsPath}`
  );

  const findDirectory = (directory: string = '') => {
    const newPath = !directory
      ? markdownPostsPath
      : markdownPostsPath + '/' + directory;

    console.log('newPath', newPath);
    return readdirSync(newPath, {
      withFileTypes: true,
    })
      .filter((dirent) => dirent.isFile() && dirent.name.endsWith('.md'))
      .map((dirent) => {
        console.log('dirent.name', dirent.name);
        return dirent.name;
      })
      .map((fileName) => {
        return getMarkdownMeta(newPath, fileName);
      })
      .filter((markdownMeta) => !!markdownMeta)
      .filter((markdownMeta) => !markdownMeta?.draft)
      .map((markdownMeta) => {
        return {
          folder: markdownMeta!.layout.toLowerCase(),
          slug: markdownMeta!.slug,
          title: markdownMeta!.title,
          date: markdownMeta!.date,
          categories: markdownMeta!.categories,
          tags: markdownMeta!.tags,
          summary: markdownMeta!.summary,
        };
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

  writeFileSync(targetJsonPath, JSON.stringify(posts));

  context.logger.info('✅ Done');
  return { success: true };
}
