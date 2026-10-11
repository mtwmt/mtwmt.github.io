import { contact } from "./site";
import { about } from "./about";

/** 首頁文案。標題、介紹、按鈕集中在這裡，修改不需要碰 3D 程式。 */
export const home = {
  title: "Mandy — Side Projects 與開發筆記",
  shareTitle: "Mandy — 作品與筆記",
  description: "跟著頁仔探索 Mandy 的作品、Side Projects、開發筆記與生活記錄。",
  brand: "Mandy's Web",
  tagline: "作品・筆記・日常",
  eyebrow: "HELLO, I'M",
  name: "Mandy",
  introduction: [
    "這裡放著我的 Side Projects，還有一路累積的筆記。",
    "跟著頁仔走走，逛逛我的小世界。",
  ],
  startLabel: "跟著頁仔逛逛 ↗",
  loadingLabel: "小島準備中…",
  // 歡迎卡片下方的捷徑：不想走小島也能直接看作品或筆記。
  worksLabel: "看作品",
  readingLabel: "讀筆記",
};

export interface PanelLink {
  text: string;
  href: string;
  secondary?: boolean;
  external?: boolean;
}

export interface ContentPanel {
  eyebrow: string;
  title: string;
  description: string;
  links: PanelLink[];
}

/** 固定內容面板由 Astro 輸出；遊戲只負責決定何時打開。 */
export const panels = {
  projects: {
    eyebrow: "SIDE PROJECT WORKSHOP",
    title: "Side Project 工坊",
    description: "App、工具和小遊戲，都是從「不如來做做看」開始的。",
    links: [
      {
        text: "GitHub 上的更多作品 ↗",
        href: contact.github,
        secondary: true,
        external: true,
      },
    ],
  },
  notes: {
    eyebrow: "FIELD NOTES",
    title: "來筆記屋翻翻。",
    description: "學習時留下的線索、踩坑後記住的事，還有生活裡的小發現。",
    links: [
      { text: "全部筆記 ↗", href: "/blog/page/1/" },
      { text: "搜尋文章 ↗", href: "/search/", secondary: true },
    ],
  },
  about: {
    eyebrow: "HELLO THERE",
    title: "我是 Mandy，很高興認識你。",
    description: about.role,
    links: [
      { text: "填寫聯絡表單 →", href: "/contact/" },
      { text: "寫信給 Mandy ↗", href: `mailto:${contact.email}`, secondary: true },
      {
        text: "GitHub ↗",
        href: contact.github,
        secondary: true,
        external: true,
      },
    ],
  },
  ironman: {
    eyebrow: "ITHOME IRONMAN",
    title: "連續 30 天的鐵人賽。",
    description: "參加 iThome 鐵人賽，每天一篇、連續三十天寫下的系列文章。",
    links: [{ text: "所有系列文 ↗", href: "/blog/tags/" }],
  },
  friends: {
    eyebrow: "FRIENDS",
    title: "往朋友那裡走走。",
    description: "路標指向島外，那裡有朋友們的部落格，也都很值得逛逛。",
    links: [],
  },
  contact: {
    eyebrow: "CONTACT",
    title: "與我聯絡",
    description: "有想交流的點子，或想聊聊作品，歡迎留言給我。",
    links: [
      { text: "填寫聯絡表單 →", href: "/contact/" },
      { text: "寫信給 Mandy ↗", href: `mailto:${contact.email}`, secondary: true },
      {
        text: "GitHub ↗",
        href: contact.github,
        secondary: true,
        external: true,
      },
    ],
  },
  help: {
    eyebrow: "HOW TO EXPLORE / 小島散步指南",
    title: "用自己的步調，慢慢逛。",
    description:
      "走近工坊、筆記屋或小屋，畫面下方會出現互動提示。到信箱可以與我聯絡，也可以轉轉紙風車，累了就到長椅坐一下。",
    links: [{ text: "直接看文章 ↗", href: "/blog/page/1/" }],
  },
} satisfies Record<string, ContentPanel>;
export type PanelId = keyof typeof panels;

export const helpInstructions = [
  "WASD / 方向鍵：移動頁仔",
  "Shift：跑快一點",
  "Space：跳躍",
  "拖曳畫面：轉動鏡頭",
  "滾輪：拉近或拉遠",
  "E：和附近的地方互動",
  "長椅：按 E 坐下；再按 E、移動或跳躍站起來",
  "手機：左手搖桿移動，右手拖曳轉視角",
  "小地圖的地名：直接抵達該區",
  "右上角月亮／太陽：切換夜晚與白天",
];

/** 遊戲中的短提示；不會改變移動或動畫行為。 */
export const messages = {
  seated: "坐下休息一下。按 E、移動或跳躍就能站起來。",
  standing: "繼續逛逛吧。",
  wind: "起風了！頁仔的紙角和地上的紙張都跟著動了。",
  greeting: "嗨！我是頁仔。一起去找點有趣的東西吧。",
  arrived: "已抵達，點下方提示就能探索這個地方。",
  reset: "回到起點了，慢慢逛。",
  sceneFailed: "3D 世界暫時無法載入，仍然可以查看作品與閱讀筆記。",
};
