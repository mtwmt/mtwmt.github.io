/** 必要 UI 缺失時清楚報錯，避免在後續事件中出現不明的 null 錯誤。 */
export function requireElement<T extends Element>(selector: string, type: { new (): T }): T {
  const element = document.querySelector(selector);
  if (!(element instanceof type)) {
    throw new Error(`找不到必要的首頁元素：${selector}`);
  }
  return element;
}
