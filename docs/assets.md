# 演示素材

## 皇家城堡

- 文件：`public/art/royal-castle.png`
- 用途：文档首屏、开始界面和开始界面缩略预览。
- 工具：内置 `image_gen`，新建图像，非 CLI。
- 生成日期：2026-11-03。
- 生成后复制进工作区，项目不依赖用户目录的生成缓存。

最终提示词：

> Use case: stylized-concept. Create an original polished European cartoon mobile-game environment illustration for the hero banner of Crown UI, a royal fantasy interface component library. Wide landscape composition, approximately 3:2. A charming chunky medieval blue-roofed stone castle with golden crown finials sits on a floating grassy island, a smaller blue and gold treasure chest and faceted purple elixir crystals in the foreground, little royal-blue pennants, warm golden afternoon sunshine, soft puffy clouds in bright pale blue sky. High-end stylized 3D mobile strategy game art: exaggerated bevels, thick sculpted silhouettes, tactile painted stone, saturated royal blue and gold, lush simple green grass, soft ambient occlusion, appealing toy-like proportions. Main castle occupies right half; left quarter is mostly soft open blue sky fading into mist so HTML copy can overlap later. Attractive crafted composition with depth and a few drifting leaves, no characters needed. No text, no letters, no logos, no interface controls, no watermark. Original asset, not a screenshot or recreation of an existing game.

## 组件视觉

`src/icons.tsx` 为代码绘制的语义 SVG 图标。Chest 已替换为下述 3D 卡通插图；按钮、面板、卡牌框和关卡节点由 HTML / CSS 组成，卡牌肖像使用生成的 3D 插图。

## 3D 卡通插图库

按用户提供的本项目城堡插画作为材质、光照和美术方向参考，使用内置 `image_gen` 新建四种品质的关闭宝箱，再分别以关闭图制作对应开启状态；另外生成骑士、游侠、火球、守护盾牌、金币、宝石和圣水。

- 选定素材：8 个宝箱状态 + 4 个角色 / 战斗图标 + 3 个资源图标 + 黄色立体星星及对应空星槽，共 17 张。
- 未修改的原始透明 PNG：`public/art/originals/`。
- 组件交付副本：`src/assets/*.webp`，512px 范围内等比缩放并编码，保持原图内容与 alpha。只处理分辨率和格式，不重绘或修图。
- 记录：`docs/art-manifest.json`；提示词：`docs/art-prompts.md`。
- 初次生成的 `chest-legendary-open-candidate.png` 仅作为保留候选，不包含在当前组件映射中；选定版本以对应关闭图编辑而成。
- 不包含官方游戏贴图、商标或角色。字体来源和许可文件见 `THIRD_PARTY_NOTICES.md`。

## 动态表现

`Chest` 支持 `idle`、`opening`、`opened` 三状态：待机呼吸、金属扫光与星点；开箱蓄力抖动、金色光束、爆闪、放射光和 20 个粒子；已开箱浮动、流光和余辉。`onOpenComplete` 在过程结束时触发，`loop` 用于动态预览。

`StarRating` 的三个空星底图始终保留。黄色星星按 350 / 800 / 1250ms 错峰开始砸入，在接触时压扁、反向拉伸并回弹；配套冲击光圈、短闪、碎屑和行列微震。真实结算按“星级打击 → 宝箱开箱 → 奖励数字”播放一次。动态预览入口为 `#/motion`。

英文演示字体来自 `@fontsource/nunito`，遵循包内 OFL 许可证；组件默认回退系统字体，不强制远程字体。
