/** 地標座標是世界座標 [左右 X, 前後 Z]；label 是招牌的 [X, 高度 Y, Z]。 */
interface Destination {
  point: [number, number];
  label?: [number, number, number];
  name: string;
  action: string;
  /** 傳送後頁仔面向的方向（弧度，0 = 朝 +Z、π = 朝 -Z）；鏡頭會在背後。未設定時朝北（π）。 */
  facing?: number;
}

export const destinations = {
  projects: {
    point: [-12.3, 3.5],
    label: [-12.75, 6.3, -1.2],
    name: "Side Project 工坊",
    action: "看看 Mandy 的作品",
  },
  notes: {
    point: [3.9, -4.5],
    label: [3.9, 6.8, -6.5],
    name: "筆記屋",
    action: "翻開開發與生活筆記",
  },
  about: {
    point: [15, 6.2],
    label: [15, 5.7, 5.3],
    name: "關於我的小屋",
    action: "認識 Mandy",
  },
  // 頒獎台在工坊西側（台面朝東），路標在關於我小屋的東側海邊。
  ironman: {
    point: [-15.6, 3.9],
    label: [-19.2, 5.6, 2.55],
    name: "鐵人賽頒獎台",
    // 面向西北邊的頒獎台；鏡頭因此在東南側，不會被風車擋住。
    facing: -1.93,
    action: "看看鐵人賽系列文",
  },
  friends: {
    // 站在路標西南側、面向北方；鏡頭在南邊海面上，不會被西側的小屋擋住。
    point: [20.4, 6.4],
    label: [21.9, 6.6, 3.6],
    name: "朋友的路標",
    action: "看看通往朋友的路",
  },
  wind: { point: [-17.1, 8.25], name: "紙風車", action: "轉動紙風車" },
  contact: { point: [6, 9.15], name: "與我聯絡", action: "與我聯絡" },
  bench: { point: [10.5, 13.2], name: "紙板長椅", action: "坐下休息" },
} satisfies Record<string, Destination>;

export type DestinationId = keyof typeof destinations;
export type InteractionId = DestinationId | "yezi";

/** 招牌和小地圖的可見文字；id 必須對應上方地標。 */
export const landmarks = [
  {
    id: "projects",
    title: "SIDE PROJECTS",
    subtitle: "工坊",
    mapLabel: "工坊",
    travelLabel: "前往 Side Project 工坊",
  },
  {
    id: "notes",
    title: "FIELD NOTES",
    subtitle: "筆記屋",
    mapLabel: "筆記",
    travelLabel: "前往筆記屋",
  },
  {
    id: "about",
    title: "ABOUT MANDY",
    subtitle: "關於我的小屋",
    mapLabel: "小屋",
    travelLabel: "前往關於我的小屋",
  },
  {
    id: "ironman",
    title: "IRONMAN",
    subtitle: "鐵人賽",
    mapLabel: "鐵人",
    travelLabel: "前往鐵人賽頒獎台",
  },
  {
    id: "friends",
    title: "FRIENDS",
    subtitle: "朋友的路標",
    mapLabel: "朋友",
    travelLabel: "前往朋友的路標",
  },
] satisfies Array<{
  id: DestinationId;
  title: string;
  subtitle: string;
  mapLabel: string;
  travelLabel: string;
}>;
