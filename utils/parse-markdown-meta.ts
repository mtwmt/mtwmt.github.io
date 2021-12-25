import * as yaml from 'js-yaml';
import { MarkdownMeta } from './markdown-meta';
import { MarkdownYamlMeta } from './parse-markdown-meta.interface';
import { transformMarkdown } from './transform-markdown';

const markdownYamlMetaPattern = /^(?:\-\-\-)(.*?)(?:\-\-\-|\.\.\.)/s;

export const parseMarkdownMeta = (markdownContent: string, slug: string) => {
  const yamlMetaMatch = markdownContent.match(markdownYamlMetaPattern);

  // 沒指定 metadata 則不使用
  if (!yamlMetaMatch || yamlMetaMatch.length <= 1) {
    return null;
  }

  if (yamlMetaMatch && yamlMetaMatch.length > 1) {
    // 解析開頭的 yaml meta
    const yamlContent = yamlMetaMatch[1];
    const yamlMeta = yaml.load(yamlContent) as MarkdownYamlMeta;

    // 解析 <!-- more -->
    const blogContent = markdownContent.replace(yamlMetaMatch[0], '');
    const blogContentChunks = blogContent.split(/<!--\s*more\s*-->/);
    // 將內容重新組合
    let summary = '';
    let content = '';
    if (blogContentChunks.length === 1) {
      summary = blogContentChunks[0];
      content = blogContentChunks[0];
    } else {
      summary = blogContentChunks[0];
      content = blogContentChunks.slice(1).join('\r\n');
    }
    return <MarkdownMeta>{
      layout: yamlMeta.layout,
      slug: slug,
      title: yamlMeta.title,
      date: yamlMeta.date,
      update: yamlMeta.update,
      categories:
        typeof yamlMeta.categories === 'string'
          ? [yamlMeta.categories]
          : yamlMeta.categories,
      tags: yamlMeta.tags,
      draft: !!yamlMeta.draft,
      summary: transformMarkdown(summary, slug)
        // .slice(0, 300)
        .replace(/<[^>]*>/gm, '')
        .replace(/\n/g, '')
        .trim()
        .slice(0, 100),
      content: transformMarkdown(content, slug),
      originalContent: markdownContent,
    };
  }

  return null;
};
