export interface MarkdownMeta {
  layout: string;
  slug: string;
  title: string;
  date: string;
  categories: string[];
  tags: string[];
  draft?: boolean;
  summary: string;
  content: string;
  originalContent: string;
}
