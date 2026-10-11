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
