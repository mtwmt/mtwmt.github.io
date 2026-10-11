/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface Window {
  /** Google tag 在外部腳本載入前先保存追蹤指令。 */
  dataLayer?: unknown[];
}
