export interface MarkdownYamlMeta {
  layout: string;
  title: string;
  categories: string[] | string;
  tags: string[];
  date: Date | string;
  update: Date | string;
  draft?: boolean;
}
