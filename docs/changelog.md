---
article: false
icon: material-icon-theme:changelog
date: 2023-07-20
modified: 2026-03-21
---

# 变更日志

:::tip

此处仅记录博客重大变更，文章更新、修订不列入其中。

:::

## 2022

### 2022-03-15

- 项目重新初始化，建立大量文章及相关配置

### 2022-03-17

- 更新至 vuepress-theme-hope@2.0.0-beta.17
- 尝试通过新增一个按钮实现隐藏、显示侧边栏功能

### 2022-03-18

- 在 AppSetupFiles 添加 'toggle sidebar' 钩子，从 head 中移除对应的 js 脚本
- 为 head 中的 js 脚本添加时间戳，避免缓存

### 2022-03-20

- 更新至 vuepress-theme-hope@2.0.0-beta.22
- 因 beta.18 加入了隐藏侧边栏，取消自己写的功能

### 2022-03-22

- 更新至 vuepress-theme-hope@2.0.0-beta.24
- 使用插件注册组件，而不是在 clientAppEnhance.js 中注册，以减小 app.js 的体积
- 优化侧边栏、导航栏配置
- 添加表格样式以实现对齐并压缩自定义 CSS

### 2022-03-23

- 在 QQ 环境中添加刷新页面的按钮

### 2022-03-27

- 更新至 vuepress-theme-hope@2.0.0-beta.27
- 因 Gitee 无法通过 `/raw/master/*` 链接在博客中展示图片，改用 Gitee Pages 服务托管图片并更新链接

### 2022-03-30

- 更新至 vuepress-theme-hope@2.0.0-beta.28

### 2022-04-02

- 更新至 vuepress@2.0.0-beta.37
- 更新至 vuepress-theme-hope@2.0.0-beta.31

### 2022-04-05

- 更新至 vuepress-theme-hope@2.0.0-beta.35

### 2022-04-06

- 更新至 vuepress@2.0.0-beta.38
- 更新至 vuepress-theme-hope@2.0.0-beta.36

### 2022-04-10

- 更新至 vuepress-theme-hope@2.0.0-beta.37
- 新增 notice 组件

### 2022-04-11

- 更新至 vuepress@2.0.0-beta.39
- 更新至 vuepress-theme-hope@2.0.0-beta.38

### 2022-04-16

- 更新至 vuepress-theme-hope@2.0.0-beta.43

### 2022-04-17

- 更新至 vuepress-theme-hope@2.0.0-beta.45

### 2022-04-22

- 更新主题，自定义表格样式

### 2022-04-23

- 博主名称增加 css 渐变样式

### 2022-04-24

- 更新至 vuepress-theme-hope@2.0.0-beta.47

### 2022-05-07

- 更新至 vuepress@2.0.0-beta.43
- 更新至 vuepress-theme-hope@2.0.0-beta.52
- 修改配置以适配 Breaking Changes：`hopeTheme`、`sidebar`、`navbar`

### 2022-05-08

- 对 config.ts 进行小重构，拆分为多部分配置文件

### 2022-05-09

- 更新至 vuepress-theme-hope@2.0.0-beta.53

### 2022-05-12

- 更新至 vuepress-theme-hope@2.0.0-beta.55

### 2022-05-19

- 更新至 vuepress@2.0.0-beta.45
- 更新至 vuepress-theme-hope@2.0.0-beta.64

### 2022-05-24

- 更新至 vuepress-theme-hope@2.0.0-beta.71

### 2022-05-28

- 更新至 vuepress@2.0.0-beta.46
- 更新至 vuepress-theme-hope@2.0.0-beta.72

### 2022-06-07

- 更新至 vuepress-theme-hope@2.0.0-beta.79
- 修改配置以适配 Breaking Changes：`defineClientConfig`

### 2022-06-13

- 更新至 vuepress@2.0.0-beta.48
- 更新至 vuepress-theme-hope@2.0.0-beta.82

### 2022-06-30

- 更新至 vuepress-theme-hope@2.0.0-beta.84
- 因更改 gitee 用户名，更新所有图片链接地址的域名
- 移除 package.json 中 `axios`、`uglify-js` 等无关依赖
- 尝试使用 deploy.cmd 部署构建产物至 pages 分支

### 2022-07-10

- 更新至 vuepress-theme-hope@2.0.0-beta.85

### 2022-07-11

- 统一使用 prettier 格式化 markdown
- 引入 iconfont 图标

### 2022-07-14

- 更新至 vuepress@2.0.0-beta.49
- 更新至 vuepress-theme-hope@2.0.0-beta.86

### 2022-07-15

- 分批次格式化 markdown
- VScode 插件 cSpell 新增词库

### 2022-07-16

- 新增自定义脚本：通过图片 url 设置大小，例如：`![alt](/link#w50)` --> `width: 50%`

### 2022-07-17

- 使用 css 匹配特定图片 alt 实现居中、设置宽度

### 2022-07-18

- 在 home、tag、category、star、slide 页面增加自定义背景图
- 通过 css 设置图片默认居中
- 当图片 URL 不可用时，使用默认背景色以提高兼容性

### 2022-07-19

- 更新至 vuepress-theme-hope@2.0.0-beta.87

### 2022-07-31

- 批量更新文章的分类和标签信息

### 2022-08-02

- mdEnhance 配置取消 `enableAll`，改用逐一启用的方式

### 2022-08-07

- 更新至 vuepress-theme-hope@2.0.0-beta.88

### 2022-08-11

- 更新至 vuepress-theme-hope@2.0.0-beta.90

### 2022-08-13

- 统一将 frontmatter 中的 title 移至正文内容
- frontmatter 添加 date

### 2022-08-18

- 通过 preamble.sty 为 Obsidian MathJax 导入自定义宏
- 在主题的 katex options 实现类似自定义宏

### 2022-08-19

- 更新至 vuepress-theme-hope@2.0.0-beta.91
- 优化侧边栏结构
- 更新链表、排序算法相关文章，并自定义相关 LaTeX 公式

### 2022-09-02

- 更新至 vuepress@2.0.0-beta.51
- 更新至 vuepress-theme-hope@2.0.0-beta.97
- 暂时切换打包器为 webpack

### 2022-09-03

- 为了 monorepo 更换包管理器为 pnpm
- 开始将博客部署至 Netlify。
- 尝试以插件形式更换博客背景，但为了方便部署而取消

### 2022-09-15

- 更新至 vuepress-theme-hope@2.0.0-beta.100

### 2022-09-17

- 更新至 vuepress-theme-hope@2.0.0-beta.101
- 同时为 katex & mathjax 实现 `\tag` 相关宏
- CSS 修正滚动定位至 `\tag` 公式的顶部距离

### 2022-09-22

- 更新至 vuepress-theme-hope@2.0.0-beta.103

### 2022-09-30

- 更新至 vuepress-theme-hope@2.0.0-beta.104

### 2022-10-09

- 更新至 vuepress-theme-hope@2.0.0-beta.108

### 2022-10-14

- 更新至 vuepress-theme-hope@2.0.0-beta.110

### 2022-10-19

- 将 Obsidian 工作区的文件加入 git

### 2022-11-17

- 更新至 vuepress@2.0.0-beta.53
- 更新至 vuepress-theme-hope@2.0.0-beta.122

### 2022-11-21

- 更新至 vuepress-theme-hope@2.0.0-beta.125

### 2022-12-02

- 更新至 vuepress-theme-hope@2.0.0-beta.132

### 2022-12-10

- 更新至 vuepress-theme-hope@2.0.0-beta.133
- 更新 Obsidian 插件

### 2022-12-27

- 更新至 vuepress@2.0.0-beta.59
- 更新至 vuepress-theme-hope@2.0.0-beta.145

## 2023

### 2023-01-02

- 更新至 vuepress@2.0.0-beta.60
- 更新至 vuepress-theme-hope@2.0.0-beta.147
- 为搭配 Obsidian 代码高亮，代码块语言 `c++` --> `cpp`

### 2023-01-07

- 更新至 vuepress-theme-hope@2.0.0-beta.152

### 2023-01-14

- 更新至 vuepress-theme-hope@2.0.0-beta.157
- frontmatter: `description` --> `excerpt`
- 将现有图片部署至 gitee pages，不再使用相对路径

### 2023-01-29

- 更新至 vuepress-theme-hope@2.0.0-beta.170

### 2023-02-11

- 更新至 vuepress-theme-hope@2.0.0-beta.173
- 新增 Speech.vue 组件，可调用设备 TTS 朗读选中内容
- 选中文字美化，添加半透明主题色背景

### 2023-03-02

- 更新至 vuepress@2.0.0-beta.61
- 更新至 vuepress-theme-hope@2.0.0-beta.185

### 2023-03-06

- 更新至 vuepress-theme-hope@2.0.0-beta.189
- 添加鼠标 CSS 粒子效果

### 2023-03-14

- 更新至 vuepress-theme-hope@2.0.0-beta.193
- 为搭配 Obsidian 代码高亮，代码块语言 `ps1` --> `powershell`

### 2023-03-15

- 启用 SearchPro 插件进行内容搜索
- 使用 `cross-env` 设置 `NODE_OPTIONS` 避免 Netlify 部署失败

### 2023-03-23

- 更新至 vuepress-theme-hope@2.0.0-beta.197

### 2023-04-04

- 更新至 vuepress-theme-hope@2.0.0-beta.201
- 更新 Obsidian 工作区插件

### 2023-04-10

- 更新至 vuepress-theme-hope@2.0.0-beta.202
- 新增 notice 公告组件

### 2023-04-14

- 更新至 vuepress-theme-hope@2.0.0-beta.203
- 通过 packageManager 指定 pnpm@8，避免 Netlify 与本地的 pnpm 跨版本

### 2023-04-18

- 启用 Giscus 作为评论系统

### 2023-04-21

- 使用 shields.io 展示库/包的最新版本号
- 取消大屏时字体放大为 18px

### 2023-04-22

- 更新至 vuepress-theme-hope@2.0.0-beta.205
- 通过 `/sitemap.xml` 将文档构建时间插入公告标题
- css 设置行内图片与文字底部对齐
- 简化侧边栏结构

### 2023-04-24

- 更新至 vuepress-theme-hope@2.0.0-beta.206
- `batch` 代码块的注释：`#` --> `::`
- site-name 设置彩色动态渐变

### 2023-05-12

- 更新至 vuepress@2.0.0-beta.62
- 更新至 vuepress-theme-hope@v2.0.0-beta.210
- `/note/lang/` 目录移至 `/lang/`

### 2023-06-04

- 更新至 vuepress-theme-hope@v2.0.0-beta.219
- 更新 css 选择器（Breaking Changes）
- 暂时禁用 search-pro 插件

### 2023-06-05

- 更新至 vuepress-theme-hope@v2.0.0-beta.220
- 重启 search-pro，css 样式调整

### 2023-07-20

- 更新至 vuepress@2.0.0-beta.66
- 更新至 vuepress-theme-hope@v2.0.0-beta.233
- 添加变更日志页面（changelog）
- 修改 `NormalPage.vue` 组件中背景图并改用图床链接
- 修正 [数据结构 - 单链表](./notes/data-structure/linear-list/singly-linked-list.md) 文中图片链接地址

### 2023-07-24

- 因 `res.abeim.cn` 服务失效，更换头像链接为 `q1.qlogo.cn`

### 2023-08-30

- 对多数修改的文章进行备份

## 2025

### 2025-10-15

- 更新至 vuepress@2.0.0-rc.24
- 更新至 vuepress-theme-hope@2.0.0-rc.94

### 2025-11-24

- 游戏攻略文档校对与重构，规范格式、修正链接
- 整理并增强 Node.js 与常用软件文档，补充镜像、命令和环境变量示例。
- 更新 Obsidian 工作区插件

### 2025-11-25

- 所有图片均托管至 Netlify CDN，修正若干文章链接
- 统一 Frontmatter 中 icon 字段使用 Iconify 图标
- 添加 Prettier 配置并完善编辑器插件规则

## 2026

### 2026-03-06

- 更新 Obsidian 插件及配置

### 2026-03-07

- 更新至 vuepress@2.0.0-rc.26
- 更新至 vuepress-theme-hope@2.0.0-rc.103
- 使用 Obsidian Lint 插件对所有文章格式化
- 更新 VScode 工作区配置
- 修正博客背景图片链接
- 取消自定义表格样式

### 2026-03-18

- 删除老旧样式，使用落霞孤鹜字体
- 更新 hope 主题的 `guide` 文件夹为 `demo`
- 按新版 hope 主题 demo 更新 package.json
- 按照主题文档对侧边栏等内容进行更新，更正新主题使用旧配置的情况
- 更新 Obsidian 插件及配置

### 2026-03-19

- 移除 `templateBuild` 选项，恢复 HTML 模板的 SSR 可用性
- 配置 katex 选项（取消丑陋的注释）

### 2026-03-20

- 根据 git log 维护更新日志

### 2026-03-23

- Frontmatter: category 和 tag 统一使用 lowercase（除 `QQ` 外），并适当调整
- Frontmatter: 修改、补充合适的图标

### 2026-03-24

- 移除早期用于实现和测试文章列表的旧组件
- 为 `excel` 代码块高亮添加 Shiki 别名
- 实现 graphviz 插件，支持将 `graphviz` 或 `dot` 代码块渲染为图片

### 2026-03-25

- 重构 speech 插件，使用 VueUse API 避免自行维护
- 按内容领域（技术栈、工具等）自然分类，调整目录结构及文件名
- 所有文件夹下添加 `README.md` 并选择合适的图标
- 移除错误的 `vue-router` 引入，改用 `vuepress/client` 提供的 `useRouter`

### 2026-03-26

- 默认将 graphviz 渲染为 `img` 标签，避免小屏时超出页面宽度
- 修复移动端 $\KaTeX$ 公式编号（`.tag`）遮挡公式内容（`.base`）的问题
- 取消正文中链接的左右 `padding`，因为格式化后会在左右两端增加空格
- 定义缺失的 `--bg-color-blur` 为目录增加主题背景色，使用毛玻璃模糊效果

### 2026-03-27

- 鼠标悬浮目录时再使背景模糊，避免影响阅读
- 导航栏毛玻璃效果
- `.katex-html` 样式美化：滚动条与默认的的保持一致、左侧适当增加 `padding`，使含 `\tag` 的较短公式视觉上更美观。

### 2026-03-28

- 更新至 vuepress@2.0.0-rc.27
- 更新至 vuepress-theme-hope@2.0.0-rc.104
- 启用 oxfmt 进行格式化，保留 prettier 对 markdown 的格式化功能，并格式化所有文件
- 移除项目中的 `.{svg, dot}` 附件，改用 `dot` 代码块渲染
- 维护项目根目录下的 `README.md`
- 移除依赖 `katex`，改用 `@vuepress/plugin-markdown-math`
- 实现自定义变更日志提示框，可读取最新 changelog

### 2026-04-04

- 更新至 vuepress-theme-hope@2.0.0-rc.106
- 搜索功能基本可用，但还是存在少量问题
- CSS 设置图片默认居中

### 2026-04-11

- 以插件形式引入 notivue 通知组件
- 初步重构 deco 插件，改用更规范的 vuepress 插件形式，移除 `/custom` 和 `/packages/plugin-deco` 目录
- 引入 oxlint-tsgolint 以支持检查 typescript 类型
- 统一修改插件名为 `plugin*`
- 修复字体加粗异常
