---
icon: vscode-icons:file-type-light-tex
date: 2022-10-27
modified: 2026-03-23
category:
    - latex
    - python
tag:
    - latex
---

# LaTeX 使用 minted 代码高亮

首先建议先大致看一下文档的 Introduction 部分：

```sh
texdoc minted
```

minted 依赖 python 的 Pygments 库，因此需要先安装：

```sh
pip install Pygments
```

> 文档说的是 python2，但实际上 python3 也没啥问题。此处我的 python 版本为 3.10.7。

编译时需要加上 `-shell-escape` 参数（这部分看文档就行），下面以 texstudio 为例

在 `选项`-`设置TeXstudio`-`命令`，找到你所使用的编译器（我的是 XeLaTeX），加上 `-shell-escape` 参数，即：

```diff
- xelatex.exe -synctex=1 -interaction=nonstopmode %.tex
+ xelatex.exe -synctex=1 -interaction=nonstopmode -shell-escape %.tex
```

![texstudio 设置](https://zedo-img.netlify.app/img/texstudio-config.png)

下面给出一个 demo 示例：

```tex
\documentclass{article}
\usepackage[UTF8]{ctex}
\usepackage[a6paper]{geometry}
\usepackage{minted}

\begin{document}

基本用法：
\begin{minted}{c}
int main() {
    printf("hello, world");
    return 0;
}
\end{minted}

\begin{minted}{python}
def boring(args = None):
    pass
\end{minted}

这是上述完整命令的快捷书写方式：
\mint{python}|import re|

这是一个行内的书写 X\mintinline{python}{print(x**2)}X

显示行号：
\begin{minted}[linenos=true]{c++}
#include <iostream>
int main() {
    std::cout << "Hello "
    << "world"
    << std::endl;
}
\end{minted}

注释带公式：
\begin{minted}[linenos,mathescape]{ts}
// ts 或 typescript 都可
// 返回 $\sum_{i=1}^{n}i$
function sum(n: number): number {
    let s = 0;
    for (let i = 1; i <= n; i++) {
        s += i;
    }
    return s;
}
\end{minted}

\end{document}
```

demo 预览（如果无法预览就打开<a href="/minted_demo.pdf" target="_blank">链接</a>）：

<!-- https://www.tutorialswebsite.com/embed-pdf-file-html-web-pages/ -->
<!-- embed 在链接末尾加上 ?#toolbar=0 可隐藏工具栏 -->
<embed type="application/pdf" width="100%" height="400" src="/minted_demo.pdf?#view=FitH"/>
