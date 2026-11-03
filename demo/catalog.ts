import type { IconName } from "../src";
export const groups: {
  title: string;
  items: { id: string; name: string; en: string; icon: IconName }[];
}[] = [
  {
    title: "基础组件",
    items: [
      { id: "button", name: "按钮", en: "Button", icon: "play" },
      {
        id: "display-title",
        name: "游戏标题",
        en: "DisplayTitle",
        icon: "crown",
      },
      { id: "badge", name: "徽章", en: "Badge", icon: "shield" },
      { id: "avatar", name: "头像", en: "Avatar", icon: "user" },
      { id: "icon", name: "图标", en: "Icon", icon: "spark" },
    ],
  },
  {
    title: "布局与容器",
    items: [
      { id: "panel", name: "面板", en: "Panel", icon: "grid" },
      { id: "card", name: "卡片", en: "Card", icon: "book" },
      { id: "tabs", name: "标签页", en: "Tabs", icon: "menu" },
      { id: "divider", name: "分割线", en: "Divider", icon: "plus" },
    ],
  },
  {
    title: "表单与反馈",
    items: [
      { id: "input", name: "输入框", en: "Input", icon: "code" },
      { id: "select", name: "选择器", en: "Select", icon: "chevron" },
      { id: "checkbox", name: "复选框", en: "Checkbox", icon: "check" },
      { id: "switch", name: "开关", en: "Switch", icon: "settings" },
      { id: "slider", name: "滑块", en: "Slider", icon: "volume" },
      { id: "progress", name: "进度条", en: "Progress", icon: "bolt" },
      { id: "dialog", name: "弹窗", en: "Dialog", icon: "grid" },
      { id: "toast", name: "消息通知", en: "Toast", icon: "info" },
      { id: "tooltip", name: "文字提示", en: "Tooltip", icon: "info" },
    ],
  },
  {
    title: "游戏组件",
    items: [
      { id: "resource", name: "资源栏", en: "ResourceCounter", icon: "coin" },
      { id: "game-card", name: "战斗卡牌", en: "GameCard", icon: "sword" },
      { id: "level", name: "关卡节点", en: "LevelNode", icon: "map" },
      { id: "stars", name: "星级评分", en: "StarRating", icon: "star" },
      { id: "chest", name: "宝箱", en: "Chest", icon: "chest" },
      {
        id: "illustration",
        name: "3D 插图",
        en: "GameIllustration",
        icon: "spark",
      },
    ],
  },
];
export const catalog = groups.flatMap((g) => g.items);
export const screenLinks = [
  { id: "start", name: "开始界面", en: "Start screen", icon: "home" },
  { id: "levels", name: "关卡选择", en: "Level selection", icon: "map" },
  { id: "battle", name: "玩法主界面", en: "Battle screen", icon: "sword" },
  { id: "result", name: "结算界面", en: "Results screen", icon: "trophy" },
] as const;
