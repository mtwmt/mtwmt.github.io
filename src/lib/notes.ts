export function formatNoteDate(date: Date): string {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  return `${year}.${month}.${day}`;
}

export function getNoteExcerpt(content: string | undefined): string {
  return (content ?? "")
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/<[^>]*>/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/^\s*#{1,6}\s+.*$/gm, " ")
    .replace(/^\s*([-*_])(?:\s*\1){2,}\s*$/gm, " ")
    .replace(/^\s*(?:[-+*]|\d+\.)\s+/gm, "")
    .replace(/[*_`>#|~]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 130);
}

/** 標籤、分類頁的 meta description：列出篇數與最新幾篇的標題，避免每頁共用同一句。 */
export function describeNotes(label: string, posts: { data: { title: string } }[]): string {
  const titles = posts
    .slice(0, 3)
    .map((post) => `〈${post.data.title}〉`)
    .join("、");
  return `${label}共 ${posts.length} 篇筆記，包含${titles}${posts.length > 3 ? "等" : ""}。`;
}
