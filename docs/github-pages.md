# GitHub Pages 预览站

公开地址：https://luckybbbbb.github.io/crown-ui/

站点包含组件文档、字体与插图库、宝箱与三星动效预览，以及开始 / 关卡 / 战斗 / 结算四个完整示例。访问者无需登录；示例存档与设置只保存在访问者自己的浏览器。

## 自动部署

仓库 Pages 发布方式设置为 GitHub Actions（`build_type: workflow`）。`.github/workflows/ci.yml` 在推送 `main` 或手动运行时：

1. 执行 `npm ci` 与 `npm run check`，完成类型检查、测试、组件库、registry 和静态站构建。
2. 上传 `demo-dist/` 为 Pages artifact。
3. 检查通过后，由独立 `deploy` job 发布到 `github-pages` environment。

Pull request 只做检查，不部署。仅部署 job 获得 `pages: write` 与 `id-token: write` 权限；Actions 按固定提交 SHA 引用。

## 子目录与资源

Vite 使用相对 `base: "./"`，页面使用 hash 路由，使 `/crown-ui/` 子目录中的界面直达链接可正常打开。组件样式在演示入口显式引入，构建末尾检查导航、遮罩和星级动效样式是否完整。

站点只复制交付所需的插图、字体、许可证、下载包与 registry；生成的原始 PNG 和字体源文件保留在源码仓库。构建输出与本地检查记录不提交 Git。

## 核对方式

- 查看 Actions 中 CI 的 `check` 与 `deploy` 是否成功。
- 打开首页、四个示例、`#/illustrations` 和 `#/motion`；检查字体、彩图素、导航和动画。
- 核对 `downloads/crown-ui-react-0.1.0.tgz` 与 `r/crown-ui.json` 可访问。

GitHub Pages 自定义工作流说明：https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages
