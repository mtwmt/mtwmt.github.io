export interface MarkdownMeta {
  layout: string;
  slug: string;
  title: string;
  date: string;
  update: string;
  categories: string[];
  tags: string[];
  draft?: boolean;
  summary: string;
  content: string;
  originalContent: string;
}
