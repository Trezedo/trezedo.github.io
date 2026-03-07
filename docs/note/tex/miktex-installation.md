---
date: 2022-02-04
icon: devicon:tex
category:
    - MiKTeX
    - LaTeX
tag:
    - latex
    - miktex
    - 环境配置
---

# MiKTeX 安装及使用

为了使用 `LaTeX`，需要 `TeX` 系统例如 `TeXLive`、`MiKTeX`、`MacTeX` 等等。通常 `TeXLive` 每年更新一次，兼容性强，并且保持跨操作系统的一致性。集成了几乎所有宏包，安装后即可直接使用，对新手还是非常友好的。然而正是因为它默认带有大量宏包，导致体积太大（超过 4G），本人才考虑使用 `MikTeX`，几乎所有宏包只有在使用时才会安装。

这里给出国内的 `TeXLive` 镜像：

- [北外镜像](https://mirrors.bfsu.edu.cn/CTAN/systems/texlive/Images/)
- [中科大镜像](https://mirrors.ustc.edu.cn/CTAN/systems/texlive/Images/)；
- [清华镜像](https://mirrors.tuna.tsinghua.edu.cn/CTAN/systems/texlive/Images/)；
- [南京大学镜像](https://mirrors.nju.edu.cn/CTAN/systems/texlive/Images/)；
- [阿里云镜像](https://mirrors.aliyun.com/CTAN/systems/texlive/Images/)；
- [华为云镜像](https://repo.huaweicloud.com/CTAN/systems/texlive/Images/)。

## MiKTeX 下载

`MiKTeX` 下载不需要镜像，可在官网下载，下载地址：[https://miktex.org/download](https://miktex.org/download)。这里选择 windows 版本，直接下载即可。

![官网下载](https://zedo-img.netlify.app/img/2022-02/04160414.png)

## 安装

官网也是有简易教程的，可以先看去一下 [Install MiKTeX on Windows](https://miktex.org/howto/install-miktex)。

下载完成后直接打开，按默认设置安装（可调整安装目录），

![安装界面 center](https://zedo-img.netlify.app/img/2022-02/04162706.png#s-75)

这个页面可以使用默认的，也可以将 **"Ask me first"** 改为 **"Yes"**，这样每当我们的文档需要安装宏包时，它会自己直接安装，而不是每次都询问。我们输出的 `pdf` 通常是 `A4` 纸的页面大小，这里不做更改。接下来等待它安装完成即可。

安装完成后打开 `MiKTeX Console`，windows 系统可在**开始菜单**中的**最近添加**找到，或者在安装时所选的安装目录下：`miktex\bin\x64\miktex-console.exe`。

首次打开可能会提示存在问题，这只需要检查更新即可：

![检查更新 center](https://zedo-img.netlify.app/img/2022-02/04164300.png#s-80)

检查到更新后，点击左侧**更新**，然后**立即更新**即可。

![更新依赖 center](https://zedo-img.netlify.app/img/2022-02/04164626.png#s-80)

更新完成后会提示重启：

![更新完毕 center](https://zedo-img.netlify.app/img/2022-02/04164811.png#s-80)

## 使用

重新打开这个控制台，在界面中选择**启动 TexWorks 前端**：

![使用TexWorks center](https://zedo-img.netlify.app/img/2022-02/04165351.png#s-80)

打开后，输入以下基本的 `LaTeX` 文档结构：

```latex
\documentclass{article}
\usepackage{ctex}

\begin{document}

\section{Hello World}

你好世界

\end{document}
```

上方选择 `pdfLaTeX`，然后点击**绿色**三角形按钮编译：

![选择编译器 center](https://zedo-img.netlify.app/img/2022-02/04170446.png#s-60)

首先该编辑器会让你保存文件，保存后再次点击绿色按钮，`MiKTeX` 可能会询问是否安装一些宏包（因为使用了 `ctex` 宏包，用于支持中文），编译完成会打开一个 `pdf`，这就是编译输出的产物：

![预览pdf center](https://zedo-img.netlify.app/img/2022-02/04170854.png#s-60)

至此，我们已经完成了 LaTeX 写作的最重要的一步。

### 设置镜像（无效果）

> 提示：此处的操作并没有解决问题。如果实在需要安装好吧，建议在国内镜像下载 TexLive 并安装（见本文开头）。

~~最近 (2022-10-23) 发现下载不了宏包，似乎是被墙了，连 MiKTeX 官网都访问不了（很多非国内网站都是如此，后来发现是校园网的锅）。~~

日志报错是

```log
Timeout was reached
Data: code="28", url="https://api2.miktex.org/hello"
```

使用 mpm 命令（MiKTeX Package Manager）查看可用源，或者打开官网 <https://miktex.org/repositories>，任选一个 Country 为 China 的都可：

```sh
mpm --list-repositories
# 注意，这个选项已经被标记为 deprecated
```

设置镜像（以北外镜像为例）：

```sh
mpm --set-repository=https://mirrors.bfsu.edu.cn/CTAN/systems/win32/miktex/tm/packages/
```

新版 MiKTeX 推荐用以下命令自动选择并设置镜像：

```sh
mpm --pick-repository-url
```

这里列举部分 MiKTeX 的国内镜像：

- 北京外国语大学 <https://mirrors.bfsu.edu.cn/CTAN/systems/win32/miktex/tm/packages/>
- 清华大学 <https://mirrors.tuna.tsinghua.edu.cn/CTAN/systems/win32/miktex/tm/packages/>
- 北京交通大学 <https://mirror.bjtu.edu.cn/CTAN/systems/win32/miktex/tm/packages/>
- 中国科学技术大学 <https://mirrors.ustc.edu.cn/CTAN/systems/win32/miktex/tm/packages/>
- 华为云 <https://repo.huaweicloud.com/CTAN/systems/win32/miktex/tm/packages/>

### 说在后面

这里只是刚刚能够使用 LaTeX，还没有涉及到很多 LaTeX 语法、公式、宏包、TeX 命令行等等。而实际上 LaTeX 也有其专门的 IDE：[TexStudio](http://texstudio.sourceforge.net/)、WinEdt（收费）等，同样提供了很多开箱即用的功能，以及常用的宏命令提示等等，当然，插件颇为丰富的 **VS Code** 也有对应的用于 LaTeX 写作的插件：`LaTeX Workshop`，可定制性高，例如可以配置 snippet，但有时遇到编译错误它不能很好的对错误定位和提示，关于这点还是比较推荐 TexStudio。

当文档比较长的时候，pdf 到 TeX 源码和 TeX 到 pdf 的双向定位也是比较重要的，这里再推荐一个轻量的 pdf 阅读器：[SumatraPDF](https://www.sumatrapdfreader.org/)，它和 winedt、vscode 都能很好的配合，当然 TexStudio 也可以，但是它自带 pdf 阅读器。

学习 LaTeX 更多的还是看手册，看宏包的使用说明文档，比较推荐的入门书就是 [lshort-zh-cn](https://mirrors.tuna.tsinghua.edu.cn/CTAN/info/lshort/chinese/lshort-zh-cn.pdf)，这个文档译名是《一份（不太）简短的 LaTeX2e 介绍》或《112 分钟了解 LaTeX2e》，这里还有国内外各一个论坛，遇到的问题可以上来搜索和询问：[Stack Exchange](https://tex.stackexchange.com)、[LaTeX 工作室](https://www.latexstudio.net/)，提问也有其对应的要求，例如一个最小工作示例（MWE），要学习的内容还算挺多，慢慢来吧。

<!-- https://www.cnblogs.com/xjtu-blacksmith/p/easymcm.html 一个简洁、易用的美赛 LaTeX 模板: easymcm

https://blog.csdn.net/hebtu666/article/details/103438056

latex教程详细笔记
https://blog.csdn.net/mr_cat123/article/details/80215341

LaTeX公式手册(全网最全)
https://www.cnblogs.com/1024th/p/11623258.html

%新的平行且等于
\newcommand*\pxdy{%
\mathrel{\hspace{.03555em}\text{\tikz[baseline]
\draw (.1em,0ex) -- (.9em,0ex)
(.1em,.3ex) -- (.9em,.3ex)
(.375em,.4ex) -- (.675em,1.8ex)
(.55em,.4ex) -- (.85em,1.8ex);}\hspace{.03555em}}}
%相似
\newcommand*\xiangsi{%
\mathrel{\text{%
\tikz \draw[baseline] (-.25em,1.15ex) .. controls (-.55em,1.15ex) and (-.51em,.23ex) .. (-.275em,.23ex) .. controls (0,.23ex) and (0,1.15ex) .. (.275em,1.15ex) .. controls (.51em,1.15ex) and (.55em,.23ex) .. (.25em,.23ex);%
}}}
%全等
\newcommand*\quand{%
\mathrel{\text{%\small%
\tikz \draw[baseline] (-.2em,1.35ex) .. controls (-.46em,1.6ex) and (-.54em,.65ex) .. (-.25em,.65ex) .. controls (-.06em,.65ex) and (.06em,1.35ex) .. (.25em,1.35ex) .. controls (.54em,1.35ex) and (.46em,.4ex) .. (.2em,.65ex) (-.46em,.4ex) -- (.46em,.4ex) (-.46em,0ex) -- (.46em,0ex);% -->
