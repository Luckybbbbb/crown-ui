# Crown UI

[![CI](https://github.com/Luckybbbbb/crown-ui/actions/workflows/ci.yml/badge.svg)](https://github.com/Luckybbbbb/crown-ui/actions/workflows/ci.yml)

[GitHub 仓库](https://github.com/Luckybbbbb/crown-ui) · [v0.1.0 下载](https://github.com/Luckybbbbb/crown-ui/releases/tag/v0.1.0) · [商用授权清单](THIRD_PARTY_NOTICES.md)

原创欧式卡通 React UI 组件库。厚倒角、蓝金配色、金属描边、羊皮纸面板与有触感的界面动效。

组织模式参考 [warcraftcn-ui](https://github.com/TheOrcDev/warcraftcn-ui) 的源码 registry，以及 [animal-island-ui](https://github.com/guokaigdg/animal-island-ui) 的 React 组件包、独立样式和文档示例。组件与视觉在此项目中重新制作。项目采用独立名称，与 Supercell 无关联。

## 启动

需要 Node.js 22.12+。React peer dependency 为 18+，当前开发验证环境为 React 19。

```bash
npm install
npm run dev
```

打开 Vite 打印的本地地址，默认 `http://127.0.0.1:5173/`。

## 四个完整界面

| 界面       | 地址 hash           | 完整交互和动效                                                                         |
| ---------- | ------------------- | -------------------------------------------------------------------------------------- |
| 开始界面   | `#/examples/start`  | 城堡插画、云层漂移、标题与菜单错峰入场、开始入口、设置、指南                           |
| 关卡选择   | `#/examples/levels` | 8 个关卡、锁定与通关状态、星级、本关详情、选中动效和挑战入口                           |
| 玩法主界面 | `#/examples/battle` | 选牌、点击部署、单位行进和攻击、火球伤害、治疗、圣水恢复、伤害飘字、生命条、暂停与退出 |
| 结算界面   | `#/examples/result` | 胜败状态、星级弹入、宝箱、奖励数字增长、胜利彩纸、奖励领取、下一关、失败重试           |

四个界面共享 `demo/screens/Examples.tsx` 的流程状态；各界面文件及独立样式在 `demo/screens/`。

战斗是 UI 组件交互示例：选择卡牌后点击河流下方的己方半场部署，也可聚焦战场后按 Enter 在中央部署。单位自动进攻敌方城堡；火球直接伤害，守护祝福恢复己方生命。敌方每 5 秒进攻，75 秒内击破敌方城堡获胜。剩余生命比例决定 1–3 星。演示未包含完整商业游戏的 AI、平衡和联网逻辑。

进度保存在当前浏览器 `crown-ui-adventure-v1` 中。胜利后领取奖励时解锁下一关；重复打开结果页不会重复获得同一场奖励。直接访问结算页且没有战斗结果时显示明确标注的预览数据，不发放奖励。系统与页面上的减少动效设置均受支持。提示音使用 Web Audio 合成，无远程音频请求。

## 组件

文档按 24 类组织，公开导出 26 个可视组件及 `useToast`：

- 基础：Button、IconButton、Badge、Avatar、Icon、DisplayTitle。
- 布局：Panel、Card、Tabs、Divider。
- 表单：Input、Textarea、Select、Checkbox、Switch、Slider。
- 反馈：Progress、Dialog、ToastProvider、Tooltip。
- 游戏：ResourceCounter、GameCard、LevelNode、StarRating、Chest、GameIllustration。

所有样式类使用 `cr-` 前缀。组件层无第三方运行时依赖，只需要 React / React DOM。语义图标为可缩放 SVG；宝箱、角色卡面和资源图标采用本项目生成的 3D 卡通透明插图，原图保留并提供 WebP 交付副本。组件材质为 CSS。

## 构建与使用

```bash
npm run build       # ESM / CJS / CSS / TypeScript 声明
npm run build:demo  # 组件包、registry 和静态文档站
npm run check      # 类型检查、测试和两种构建
```

组件包尚未发布 npm。从 [GitHub Release](https://github.com/Luckybbbbb/crown-ui/releases/tag/v0.1.0) 下载 `crown-ui-react-0.1.0.tgz` 后可本地安装；同一发行版提供可自行托管的静态文档站 ZIP。`build:demo` 也会生成 `public/downloads/crown-ui-react-0.1.0.tgz`，并复制到静态站下载目录。

```bash
npm install ./crown-ui-react-0.1.0.tgz
```

```tsx
import { Button, Panel, ToastProvider } from "@crown-ui/react";
import "@crown-ui/react/style";
import "@crown-ui/react/fonts";

export default function App() {
  return (
    <ToastProvider>
      <Panel title="欢迎来到晨光王国">
        <Button tone="gold" icon="sword">
          开启冒险
        </Button>
      </Panel>
    </ToastProvider>
  );
}
```

可选引入 `@crown-ui/react/fonts` 加载随包提供的字体：中文 **Crown Rounded SC Heavy**（Resource Han Rounded CN 的粗体改名子集）、英文 Crown Latin Display（Lilita One 的格式转换衍生）。默认可见字号最小 **20px**，整体粗体，游戏文字采用白字黑边与正下方投影。文档英文使用 Nunito 900，缺字回退 Noto Sans SC 900；未引入字体时回退系统字体。所有字体授权和转换记录见 THIRD_PARTY_NOTICES.md。

## 源码分发

运行 `node scripts/build-registry.mjs` 生成包含源码内容的 `public/r/crown-ui.json`。本地服务启动后：

```bash
npx shadcn@latest add http://127.0.0.1:5173/r/crown-ui.json
```

该 registry 将完整组件源码与 CSS 放在 `components/crown-ui/`；从该目录导入组件，在应用入口引入样式。没有 Tailwind 依赖。registry 格式依照 [shadcn 官方规范](https://ui.shadcn.com/docs/registry/registry-item-json) 生成；构建验证源码完整性，CLI 安装还需在实际消费项目中验证。

## 目录

```text
src/                 可复用组件、类型、图标、CSS
demo/                中文组件文档与交互预览
demo/screens/        四个完整界面、流程、轻量战斗逻辑与动效
public/art/          原创演示插画
scripts/             源码 registry 与组件包生成
tests/               组件语义、键盘操作、战斗和奖励状态测试
docs/                设计定义、素材提示词和交付验证记录
dist/                构建后的组件包
demo-dist/           可独立托管的静态文档与演示
```

项目代码、原创 SVG 和选定的生成插图采用 MIT，可用于商业项目；字体采用各自的 SIL OFL 1.1，须保留对应许可证。完整授权清单见 `THIRD_PARTY_NOTICES.md`，素材来源见 `docs/assets.md`。

## 当前插图与字体

- `#/illustrations`：四种品质的宝箱，各有配套关闭与开启状态；另有骑士、游侠、火球、守护盾、金币、宝石和圣水。
- `#/typography`：当前软萌粗圆方案及其他字形的对照；`DisplayTitle` 提供白字、黑描边与正下方立体投影。
- `#/motion`：宝箱待机 / 开箱过程 / 已开箱三个动态状态，以及空星底座、黄色星星砸入与变形回弹的可重播预览。
- `GameIllustration` 支持按 ID 复用生成插图；`Chest` 通过 `rarity` 与 `open` 选择品质和状态。
- `Chest` 还支持 `state="idle | opening | opened"`、`onOpenComplete`、`duration` 和 `loop`；真实结算会先播放三星打击，再开箱爆出金光，随后滚动奖励数字。
- 原图、提示词、WebP 转换记录见 `docs/assets.md`、`docs/art-prompts.md` 与 `docs/art-manifest.json`。外部字体授权见 `THIRD_PARTY_NOTICES.md`。

`IconButton` 提供 `variant="game"`，与 `icon="back"` / `icon="settings"` 搭配使用蓝色厚底座与实心描边图标；四个界面统一使用此导航样式。关卡奖励使用彩色金币 / 宝石插图，选中标签与其他节点保持间距。宝箱扫光按透明轮廓等比例裁切，跟随待机呼吸动画。
