# 📘 Trezedo Blog

[![作者: Trezedo](https://img.shields.io/badge/作者-Trezedo-blue.svg?style=for-the-badge)](https://zedo.netlify.app)
[![License: MIT](https://img.shields.io/badge/许可-MIT-blue.svg?style=for-the-badge)](https://github.com/trezedo/trezedo.github.io/blob/main/LICENSE)

## ✨ 项目简介

此仓库是一个基于 Vue 和 VuePress 的静态文档博客项目，包含自定义插件、样式和完整的个人笔记。
项目创建于 2022 年，经过持续演进，已累积丰富的文档内容与生态扩展能力。

### 🛠️ 环境要求

- Node.js 22+
- pnpm >= 10.0.0

## 🚀 快速开始

```bash
# 安装依赖（仅需首次）
pnpm i

# 启动开发服务器
pnpm docs:dev

# 构建生产版本
pnpm docs:build

# 预览构建结果
pnpm preview
```

## ⚙️ 可用脚本

| 命令                            | 说明                                     |
| ------------------------------- | ---------------------------------------- |
| `pnpm docs:dev`                 | 启动 VuePress 开发服务器（含热更新）     |
| `pnpm docs:clean-dev`           | 清除缓存后启动开发服务器                 |
| `pnpm docs:build`               | 构建静态站点                             |
| `pnpm preview`                  | 预览构建后的站点（使用 Vite）            |
| `pnpm docs:up`                  | 更新 VuePress 及相关主题（`vp-update`）  |
| `pnpm docs:fmt`                 | 格式化 `docs/` 下的文档（基于 prettier） |
| `pnpm fmt` / `pnpm fmt:check`   | 代码格式化（基于 oxfmt）                 |
| `pnpm lint` / `pnpm lint:fix`   | 代码检查（基于 oxlint）                  |
| `pnpm push:ge` / `pnpm push:gh` | 分别推送到 Gitee 或 GitHub 远程仓库      |
| `pnpm hook`                     | 安装 Lefthook Git 钩子                   |

> 项目默认使用 oxfmt 进行格式化，同时仍然保留了 prettier，因为它对 Markdown 的格式化能力较好（尤其是表格）。

## 📁 项目结构

```text
.
├── docs/                      # 文档源目录（可作为 Obsidian 仓库打开）
│   ├── .vuepress/             # VuePress 配置
│   ├── .obsidian/             # Obsidian 配置与插件设置
│   ├── blog/                  # 博客文章
│   ├── demo/                  # 示例代码/演示
│   ├── exercises/             # 解题练习
│   ├── notes/                 # 学习笔记/心得
│   ├── tech/                  # 技术文章/文档
│   ├── changelog.md           # 重大变更日志
│   ├── home.md                # 项目主页（仅作为 demo）
│   ├── intro.md               # 介绍页
│   ├── slide.md               # 幻灯片（仅作为 demo）
│   ├── preamble.sty           # LaTeX 宏（Obsidian MathJax 插件）
│   └── README.md              # 博客主页
├── public/                    # 静态资源目录
├── .oxfmtrc.json              # oxfmt 格式化配置
├── .oxlintrc.json             # oxlint 检查配置
├── .prettierrc                # Prettier 配置
├── lefthook.yml               # Lefthook Git 钩子配置
├── package.json
├── pnpm-lock.yaml
└── ...其他配置文件
```

## 🧰 技术栈

- **核心框架**：Vue 3 + VuePress 2
- **主题与插件**：
    - [`vuepress-theme-hope`](https://theme-hope.vuejs.press/zh/)
    - `@vuepress/plugin-comment`
    - `@vuepress/plugin-notice`
    - `@vuepress/plugin-register-components`
    - `@vuepress/plugin-revealjs`
    - `@vuepress/plugin-slimsearch`（目前存在 bug，不保证可用）
    - `vuepress-plugin-components`
    - `vuepress-plugin-md-enhance`
    - `vuepress-plugin-math`
- **增强功能**：
    - `@vue/repl` – Vue 交互式 REPL
    - `@vueuse/core` – Vue 组合式工具集
    - `@viz-js/viz` – Graphviz 图形渲染
    - `mermaid` – 流程图 / 图表
    - `notivue` – 通知提示组件
    - `flowchart.ts` – 流程图生成
    - `markmap-lib` / `markmap-view` / `markmap-toolbar` – 思维导图支持
- **代码质量**：
    - `oxfmt` / `oxlint` – 高性能格式化与检查
    - `prettier` – Markdown 文件格式化（效果比 `oxfmt` 更好）
    - `lefthook` – Git 钩子管理器
    - Obsidian Linter 插件（功能更丰富）

## 📐 代码规范

- 使用 `pnpm lint` 进行静态检查
- 使用 `pnpm fmt` 格式化代码（oxfmt）
- 推荐在提交前运行 `pnpm fmt && pnpm lint`，或安装 Lefthook 钩子自动执行：

```bash
pnpm hook # 一次性安装钩子（首次克隆后 / 修改 lefthook.yml 后执行）
```

- 配置了 lefthook.yml，将在 pre-commit 阶段自动运行格式化。

## 🗃️ Obsidian 集成

本项目 `docs` 目录可直接作为 Obsidian 仓库打开。推荐启用以下社区插件（已在 `docs/.obsidian/community-plugins.json` 中声明）：

- `Advanced Tables` – 表格编辑增强
- `Any Block` – 自定义块语法（含 `:::` 块）
- `Clear Unused Images` – 清理未引用图片
- `Easy Typing` – 编辑体验优化
- `Extended MathJax` – LaTeX 公式增强
- `Front Matter Title` – 从 frontmatter 提取标题并展示
- `Linter` – 笔记格式化
- `Style Settings` – 主题样式调整，自定义 CSS
- `Universal Renderer` – 通用渲染支持（主要是 `dot` 块）

注意：Linter 插件要求新建的 Markdown 文件必须包含 YAML Frontmatter（YAML key 排序），例如：

```md
---
date: 2026-01-01
---

# 文档标题
```

## 🔧 自定义与扩展

基本遵从 VuePress Theme Hope 官方模板的文件结构：

- **主题配置**：位于 `docs/.vuepress/theme.{ts,js}`
- **侧边栏/导航**：通过主题的 `sidebar` 与 `navbar` 配置
- **添加新文档**：在 `docs/` 下创建 `.md` 文件，并按现有目录归类即可自动生成路由

## 📜 许可证

本项目采用 [MIT](https://choosealicense.com/licenses/mit/) 许可证。
