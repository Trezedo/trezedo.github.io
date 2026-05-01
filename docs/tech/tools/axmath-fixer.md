---
article: false
icon: vscode-icons:file-type-light-tex
date: 2021-07-20
modified: 2026-03-23
category:
    - latex
tag:
    - axmath
---

# AxMath 工具

## 简介

该工具主要用于转换 Axmath 中 `Translate to LaTeX` 功能所输出的公式代码，以便在 Markdown、$\LaTeX$ 中使用，尤其用于公式与文本混排。

例如：

```tex
$$
\text{现在开始，我们用}z=a+b\textrm{i}\text{来表示一个复数，并称}a\text{为}z\text{的实部，}b\text{为}z\text{的虚部，记为}a=\text{Re}z,b=\text{Im}z
$$
```

将转化为

```tex
现在开始，我们用 $z=a+b{\rm i}$ 来表示一个复数，并称 $a$ 为 $z$ 的实部，$b$ 为 $z$ 的虚部，记为 $a={\rm Re}z,b={\rm Im}z$
```

## 特点

### 格式化

这部分包括修正 Axmath 的部分错误行为（主要是 v2.5）~~dddd~~，以及简化一些语法：

1. `aligned`：如果连续多行公式以 `=`、`\xlongequal` 开头，则将他们合并为 `aligned` 环境并对齐；
2. `binom`：将可能为二项式系数的 `array` 转化为 `\binom{·}{·}`；
3. `display`：如果某行是一整个行内公式，转化成块级公式；
4. `matrix`：格式化矩阵，支持 `pmatrix`, `vmatrix`, `bmatrix`, `Bmatrix`, `Vmatrix`。不支持嵌套的 matrix；
5. `underset`：调整 `\underset{·}{·}`。例如 `\underset{·}{\lim}` 将调整为 `\lim_{·}`。支持该项主要是因为看到不少人这么用。

### 自定义替换规则

本工具主要基于正则表达式，因此也支持用户自定义替换规则。规则可以包括普通文本替换、正则表达式替换。

目的是简化 Axmath 生成的公式，同时如果你是 $\LaTeX$ 用户，还可以替换为你自定义的宏。例如 `\rightarrow` 将被替换为 `\to`。

该工具还支持导入、导出配置

目前笔者已经对其进行了重构，优化、修改了部分逻辑。使用了组件库 [NaiveUI](https://www.naiveui.com/)、增加了可配置项。

可以在此尝试：

<iframe src="https://zedo.gitee.io/untils" title="untils" width="100%" height="300" style="border: solid var(--theme-color); border-radius:6px"></iframe>

如果加载不出，可以点击 [这里](https://zedo.gitee.io/untils) 体验。

<br>

过程中使用了以下正则表达式工具：

- [正则表达式测试工具](https://tool.lu/regex/)
- [regular expressions 101](https://regex101.com/)

在此表示感谢。
