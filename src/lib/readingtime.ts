export function getReadingTime(content: string | undefined): number {
  const text = (content ?? "").replace(/<[^>]*>/g, " ");
  // 中文依字數、英文依單字估算，避免中文段落只有一個空白詞的問題。
  const characters = text.match(/\p{Script=Han}/gu)?.length ?? 0;
  const words = text.match(/[a-zA-Z0-9]+(?:['-][a-zA-Z0-9]+)*/g)?.length ?? 0;
  return Math.max(1, Math.ceil(characters / 400 + words / 200));
}
