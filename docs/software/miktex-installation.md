---
icon: tex
date: 2022-02-04
category:
    - MiKTeX
    - LaTeX
tag:
    - latex
    - miktex
    - 环境配置
---

# MiKTeX 安装及使用

为了使用 `LaTeX`，需要 `TeX` 系统例如 `TeXLive`、`MiKTeX`、`MacTeX` 等等。通常 `TeXLive` 每年更新一次，兼容性强，并且保持跨操作系统的一致性。集成了几乎所有宏包，安装后即可直接使用，对新手还是非常友好的。然而正是因为它默认带有大量宏包，导致体积太大（超过 4G），本人才考虑使用 `MikTeX`，几乎所有宏包只有在使用时才会安装。这里给出国内的 `TeXLive` 镜像：

- [中科大镜像](https://mirrors.ustc.edu.cn/CTAN/systems/texlive/Images/)
- [清华镜像](https://mirrors.tuna.tsinghua.edu.cn/CTAN/systems/texlive/Images/)
- [阿里云镜像](https://mirrors.aliyun.com/CTAN/systems/texlive/Images/)
- [华为云镜像](https://repo.huaweicloud.com/CTAN/systems/texlive/Images/)。

## 下载

`MiKTeX` 下载不需要镜像，可在官网下载，下载地址：[https://miktex.org/download](https://miktex.org/download)。这里选择 windows 版本，直接下载即可。

![image-20220204160250377](https://zedo.gitee.io/img/20220204160414.png)

## 安装

下载完成后直接打开，按默认设置安装（可调整安装目录），

![image-20220204162706517 center](https://zedo.gitee.io/img/image-20220204162706517.png#s-75)

这个页面可以使用默认的，也可以将 **"Ask me first"** 改为 **"Yes"**，这样每当我们的文档需要安装宏包时，它会自己直接安装，而不是每次都询问。我们输出的`pdf` 通常是 `A4` 纸的页面大小，这里不做更改。接下来等待它安装完成即可。

安装完成后打开 `MiKTeX Console`，windows 系统可在**开始菜单**中的**最近添加**找到，或者在安装时所选的安装目录下：`miktex\bin\x64\miktex-console.exe`。

首次打开可能会提示存在问题，这只需要检查更新即可：

![image-20220204164300728 center](https://zedo.gitee.io/img/image-20220204164300728.png#s-80)

检查到更新后，点击左侧**更新**，然后**立即更新**即可。

![image-20220204164626595 center](https://zedo.gitee.io/img/image-20220204164626595.png#s-80)

更新完成后会提示重启：

![image-20220204164811386 center](https://zedo.gitee.io/img/image-20220204164811386.png#s-80)

## 使用

重新打开这个控制台，在界面中选择**启动 TexWorks 前端**：

![image-20220204165351295 center](https://zedo.gitee.io/img/image-20220204165351295.png#s-80)

打开后，输入以下基本的`latex`文档结构：

```latex
\documentclass{article}
\usepackage{ctex}

\begin{document}

\section{Hello World}

你好世界

\end{document}
```

上方选择 `pdfLaTeX`，然后点击**绿色**三角形按钮编译：

![image-20220204170446723 center](https://zedo.gitee.io/img/image-20220204170446723.png#s-60)

首先该编辑器会让你保存文件，保存后再次点击绿色按钮，`MiKTeX` 可能会询问是否安装一些宏包（因为使用了 `ctex` 宏包，用于支持中文），编译完成会打开一个 `pdf`，这就是编译输出的产物：

![image-20220204170854221 center](https://zedo.gitee.io/img/image-20220204170854221.png#s-60)

至此，我们已经完成了 latex 写作的最重要的一步。

### 说在后面

这里只是刚刚能够使用 latex，还没有涉及到很多 latex 语法、公式、宏包、tex 命令行等等。而实际上 latex 也有其专门的 IDE：[TexStudio](http://texstudio.sourceforge.net/)、winedt（收费）等，同样提供了很多开箱即用的功能，以及常用的宏命令提示等等，当然，插件颇为丰富的 Visual Studio Code 也有对应的用于 latex 写作的插件：`LaTeX Workshop`，可定制性高，例如可以配置 snippet，但有时遇到编译错误它不能很好的对错误定位和提示，关于这点还是比较推荐 TexStudio。

当文档比较长的时候，pdf 到 tex 源码和 tex 到 pdf 的双向定位也是比较重要的，这里再推荐一个轻量的 pdf 阅读器：[SumatraPDF](https://www.sumatrapdfreader.org/)，它和 winedt、vscode 都能很好的配合，当然 TexStudio 也可以，但是它自带 pdf 阅读器。

学习 latex 更多的还是看手册，看宏包的使用说明文档，比较推荐的入门书就是 [lshort-zh-cn](https://mirrors.tuna.tsinghua.edu.cn/CTAN/info/lshort/chinese/lshort-zh-cn.pdf)，这个文档译名是《一份（不太）简短的 LaTeX2e 介绍》或《112 分钟了解 LaTeX2e》，这里还有国内外各一个论坛，遇到的问题可以上来搜索和询问：[Stack Exchange](tex.stackexchange.com)、[LaTeX 工作室](https://www.latexstudio.net/)，提问也有其对应的要求，例如一个最小工作示例（MWE），要学习的内容还算挺多，慢慢来吧。
