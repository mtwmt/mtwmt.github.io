export interface MarkdownYamlMeta {
  layout: string;
  title: string;
  category: string[] | string;
  tags: string[];
  date: Date | string;
  draft?: boolean;
}
