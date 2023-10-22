const WORDS_PER_MINUTE = 200;

export function getReadingTime(content) {
  console.log("content", content);
  if (!content) return;
  const clean = content.replace(/<\/?[^>]+(>|$)/g, "");
  const numberOfWords = clean.split(/\s/g).length;
  return Math.ceil(numberOfWords / WORDS_PER_MINUTE);
}
