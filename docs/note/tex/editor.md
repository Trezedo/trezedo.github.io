---
icon: vscode-icons:file-type-light-tex
date: 2022-10-18
modified: 2026-03-23
category:
    - latex
tag:
    - latex
    - miktex
---

# LaTeX 写作之编辑器

## TexStudio

TexStudio 对于初学者是比较友好的，它是用于创建 LaTeX 文档的集成编写环境，让 LaTeX 的编写尽可能简单和舒适。

官网地址：<https://texstudio.org/>，最新版本：[![texstudio 版本](https://img.shields.io/github/v/release/texstudio-org/texstudio?label=TexStudio)](https://github.com/texstudio-org/texstudio/releases/latest)

下载地址：

- [Github](https://github.com/texstudio-org/texstudio/releases/)：官网的下载地址
- Github Release 镜像：
    - [北外镜像](https://mirrors.bfsu.edu.cn/github-release/texstudio-org/texstudio/LatestRelease/)
    - [清华镜像](https://mirrors.tuna.tsinghua.edu.cn/github-release/texstudio-org/texstudio/LatestRelease/)

> 北外镜像和清华镜像界面几乎一样，但下载速度在我这却快很多！

## VS Code

下载方式请看：[VS Code 使用](../../software/vscode-usage.md)

安装 [LaTeX Workshop](https://marketplace.visualstudio.com/items?itemName=James-Yu.latex-workshop) 插件

### 反向搜索

虽然通过 LaTeX Workshop 使用 vscode 内置的 pdf 阅读器已经满足基本使用了，但我更喜欢外部的阅读器，例如 SumatraPDF，下面介绍配置其反向搜索的方法。

打开 SumatraPDF ，左上角依次选择菜单 — 设置 — 选项 — 设置反向搜索命令行，输入：

```sh
"D:\path to\VS Code\Code.exe" -g "%f:%l"
```

前面的 `D:\path to\VS Code\` 是 vscode 的安装路径，至于后面的参数，通过 `code -h` 我们得知：

```text
 -g --goto <file:line[:character]>      Open a file at the path on the
                                        specified line and character
                                        position.
```

即用 vscode 打开并跳转到对应文件（`%f`）的行（`%l`）。

> 还可以用其他编辑器打开：
>
> - 记事本：`notepad "%f"` （无法跳转到行）
> - TexStudio：`"D:\path to\texstudio.exe" %f -line %l`

如果双击之后没有任何反应，可能需要检查高级选项（即 **SumatraPDF-settings.txt** 文件）中是否启用了 `EnableTeXEnhancements`：

```ini
InverseSearchCmdLine = "D:\path to\VS Code\Code.exe" -g "%f:%l"
EnableTeXEnhancements = true
```
