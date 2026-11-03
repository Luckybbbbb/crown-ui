# 外部资源与商业使用清单

当前默认中文 UI 字体为 **Crown Rounded SC Heavy**，基于 [Resource Han Rounded CN v0.990 官方发行包](https://github.com/CyanoHao/Resource-Han-Rounded/releases/tag/v0.990) 的 Heavy 字重，按 SIL OFL 1.1 许可对子集和 Web 格式进行处理并改名。保留 Copyright © 2018–2022 Cyano Hao、Adobe 的版权声明及 `ResourceHanRounded-OFL.txt`。覆盖 GB2312 常用字符、标点及项目当前文字，缺字回退 Noto Sans SC / 设备字体。

游戏界面默认字号最小 20px、粗体、白字黑边和正下方阴影；站酷快乐体与得意黑保留在设计对照页，不再作为默认 UI 字体。

2026-11-03。项目外部字体均选择明确的开放字体许可来源。商业使用须随分发保留对应许可证及版权声明；字体文件本身不能作为独立商品售卖。

| 资源                      | 来源                                                                                                                                | 许可                         | 本项目用途与分发                                                                                                                            |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| ZCOOL KuaiLe / 站酷快乐体 | [Google Fonts 官方仓库](https://github.com/google/fonts/tree/main/ofl/zcoolkuaile)；Copyright 2018 The ZCOOL KuaiLe Project Authors | SIL OFL 1.1                  | 中文展示标题、主要按钮；原 TTF 转 WOFF2，字形未修改；保留 `ZCOOLKuaiLe-OFL.txt`                                                             |
| Lilita One                | [Google Fonts 官方仓库](https://github.com/google/fonts/tree/main/ofl/lilitaone)；Copyright 2011 Juan Montoreano                    | SIL OFL 1.1，保留名称 Lilita | 转换 WOFF2 的衍生版本已把内部 family / full / PostScript 名改为 Crown Latin Display；版权和许可证保留，字形未修改；保留 `LilitaOne-OFL.txt` |
| Smiley Sans / 得意黑      | [作者官方 v2.0.1 发行包](https://github.com/atelier-anchor/smiley-sans/releases/tag/v2.0.1)；atelierAnchor                          | SIL OFL 1.1                  | 字体比较页使用未经修改的官方 WOFF2；不作为正文，不包含在组件包默认字体中；保留 `SmileySans-OFL.txt`                                         |
| Noto Sans SC              | [Noto CJK 官方项目](https://github.com/notofonts/noto-cjk)，由 `@fontsource/noto-sans-sc` 提供 Web 字体                             | SIL OFL 1.1                  | 文档正文；字体许可证复制到静态站 `fonts/NotoSansSC-OFL.txt`                                                                                 |
| Nunito                    | [Google Fonts 官方仓库](https://github.com/google/fonts/tree/main/ofl/nunito)，由 `@fontsource/nunito` 提供                         | SIL OFL 1.1                  | 英文正文；字体许可证复制到静态站 `fonts/Nunito-OFL.txt`                                                                                     |
| React / React DOM         | [facebook/react](https://github.com/facebook/react)                                                                                 | MIT                          | 组件 peer dependency，不内嵌 React 实现；消费项目按自身依赖清单保留许可证                                                                   |

项目自写组件、语义 SVG 图标、城堡和 17 张选定 UI 插图采用根目录 MIT License，允许商业项目使用、修改与随项目分发，并须保留许可证。生成插图由内置 image_gen 为本项目制作，来源、提示词、原图和文件映射记录在 `docs/assets.md`、`docs/art-prompts.md` 与 `docs/art-manifest.json`；生成服务条款见 [OpenAI Terms of Use](https://openai.com/policies/terms-of-use/)。未引入官方游戏贴图、Logo 或角色素材。MIT 的授权及免责条款随项目提供；外部字体继续各自遵循 OFL。

系统字体只作为设备已有字体回退，不把其字体文件复制或随包分发。“原系统黑体”仅在对照页调用设备本地字体。

组件包中的字体许可证位于 `dist/fonts/`，随字体文件保留。源码 registry 会内嵌默认展示字体，并附完整 OFL 许可。字体许可证独立于项目 MIT License，不因打包改变许可。
