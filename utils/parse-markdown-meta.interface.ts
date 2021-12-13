export interface MarkdownYamlMeta {
  layout: string;
  title: string;
  categories: string[] | string;
  tags: string[];
  date: Date | string;
  draft?: boolean;
}
