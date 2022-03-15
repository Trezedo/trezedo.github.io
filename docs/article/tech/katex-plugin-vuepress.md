---
icon: tex
date: 2022-01-26
title: KaTeX插件配置
category:
  - VuePress
tag:
  - LaTeX
  - KaTeX
  - VuePress
---

::: warning 提示

本文内容基于`vuepress2`的默认主题。

:::

<!-- more -->

## 基本使用

在[vuepress@v2](https://v2.vuepress.vuejs.org/zh/)中，如果想要内置的 **markdown-it** 支持数学公式的显示，只需要使用 mathjax、katex等对应的插件即可，katex相比mathjax，公式渲染速度要快很多，因此这里选择使用katex插件。

### 安装markdown-it-katex

这里的katex插件指的是 [markdown-it-katex](https://github.com/waylonflinn/markdown-it-katex)，其安装方式很简单，只需要在项目中使用yarn、npm之类的包管理工具就行了

```bash
yarn add markdown-it-katex
```

#### 配置

很快就能完成，接下来在`config.ts`中配置：

```ts
import {defineUserConfig, DefaultThemeOptions} from 'vuepress';
import markdownItKatex from 'markdown-it-katex';

export default defineUserConfig<DefaultThemeOptions>({
    // ...
    extendsMarkdown: md => {
        md.use(markdownItKatex);
    }
})
```

:::  tip 提示 

配置文件`config.ts` 或者 `config.js` 在 `docs/.vuepress`目录下，两者配置方式有部分不同，详见官网的[说明](https://v2.vuepress.vuejs.org/zh/guide/configuration.html#配置文件)，本人倾向于使用`typescript`，因为它有更好的类型提示，本文之后也是使用`ts`格式的配置文件。

:::

已经成功引入的katex插件，除此之外，还需要引入css文件，同样在配置文件中加入:

```ts
head: [
    // something else ...
    ['link', {rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css'}],
]
```

此外，如果你是用的是默认的markdown-it解析器，作者还推荐使用 [github stylesheet](https://github.com/sindresorhus/github-markdown-css)：

```ts
['link', {
    rel: 'stylesheet', 
    href: 'https://cdn.jsdelivr.net/github-markdown-css/2.2.1/github-markdown.css'
}]
```

#### 使用

至此，已经可以在md文件中使用公式并渲染了。

输入：

```latex
$\sin \theta \cos \theta =\frac 1 2 \sin 2\theta$

$$\lim_{x\to 0} \frac 1x \int_0^x f(t) \mathrm{d} t$$
```

输出：
::: details 查看结果

$\sin \theta \cos \theta =\frac 1 2 \sin 2\theta$ 

$$ \lim_{x\to 0} \frac 1x \int_0^x f(t) \mathrm{d} t$$

:::

更多支持的符号可以查看 [katex官网说明](https://katex.org/docs/supported.html).

## 注意事项

在dev模式下，会发现控制台有一些警告，例如：

::: warning [Vue warn]:

Failed to resolve component: math

If this is a native custom element, make sure to exclude it from component resolution via compilerOptions.isCustomElement.

:::

查看[官网的文档](https://v2.vuepress.vuejs.org/zh/guide/markdown.html#注意事项)，了解到是因为Katex在HTML中渲染这些公式会使用非标准标签。

> 非标准的 HTML 标签不会被 Vue 模板编译器识别成原生 HTML 标签。相反，Vue 会尝试将这些标签解析为 Vue 组件，而显然这些组件通常是不存在的。 例如：
>
> - 已废弃的 HTML 标签，比如 [\<center>](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/center) 和 [\<font>](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/font) 等。
> - [MathML 标签](https://developer.mozilla.org/zh-CN/docs/Web/MathML)，它们可能会被一些 markdown-it 的 LaTeX 插件用到。
>
> 如果你无论如何都要使用这些标签的话，可以尝试下面两种方法之一：
>
> - 添加一个 [v-pre](https://v3.cn.vuejs.org/api/directives.html#v-pre) 指令来跳过这个元素和它的子元素的编译过程。注意所有的模板语法也都会失效。
> - 设置 [compilerOptions.isCustomElement](https://v3.vuejs.org/api/application-config.html#compileroptions) 来告诉 Vue 模板编译器不要尝试作为组件来解析它们。
>   - 对于 `@bundler-webpack` ，设置 [vue.compilerOptions](https://v2.vuepress.vuejs.org/zh/reference/bundler/webpack.html#vue)
>   - 对于 `@bundler-vite` ，设置 [vuePluginOptions.template.compilerOptions](https://v2.vuepress.vuejs.org/zh/reference/bundler/vite.html#vuepluginoptions)

显然选择第二种方式更好。本人使用的是`vite`，以下也是基于`vite`的配置.

```ts
// config.ts
import {defineUserConfig} from 'vuepress'
import type {DefaultThemeOptions, ViteBundlerOptions} from 'vuepress'

export default defineUserConfig<DefaultThemeOptions, ViteBundlerOptions>({
    bundlerConfig: {
        vuePluginOptions: {
            template: {
                compilerOptions: {
                    isCustomElement: tag => customElement.includes(tag)
                }
            }
        }
    }
})

const customElement = [
    "math", "annotation", "semantics",
    "mtext", "mn", "mo", "mi", "mspace",
    "mover", "munder", "munderover", "msup", "msub", "msubsup",
    "mfrac", "mroot", "msqrt",
    "mtable", "mtr", "mtd", "mlabeledtr",
    "mrow", "menclose",
    "mstyle", "mpadded", "mphantom", "mglyph"
];
```

其中`customElement`中的元素可以通过查看[Katex源码](https://github.com/KaTeX/KaTeX/blob/main/src/mathMLTree.js)找到。

::: tip 

实际使用时发现以上`customElement`数组并不完全包括Katex所使用的标签，还有`"eq"`, `"eqn"`等标签。

:::

至此，在`markdown-it`中引入katex的工作已经基本完毕。

> 参考：
>
> 1. [KaTeX Options](https://katex.org/docs/options.html)
>
> 1. [vuepress-next issues](https://github.com/vuepress/vuepress-next/issues/328#issuecomment-1004117836)
>

## 响应式公式块

当屏幕比较小时，比较长的公式可能显示怪异，此问题可以通过`css`解决，以下设置当公式长度超过屏幕宽度时，会通过左右滑动显示：

```css
/* 浏览器可视区域宽度 < 825px */
@media screen and (max-width: 825px) {
    .katex-display > .katex {
        max-width: 100%;
    }

    .katex-display > .katex > .katex-html {
        max-width: 100%;
        overflow-x: auto;
        overflow-y: hidden;
    }

    /* 滚动条样式 */
    .katex ::-webkit-scrollbar {
        width: 4px;
        height: 4px;
    }

    .katex ::-webkit-scrollbar-track {
        background-color: #E4E5E6E7;
        border-radius: 2px;
    }

    .katex ::-webkit-scrollbar-thumb {
        background-color: #778899FF;
        border-radius: 2px;
    }

    /* 滚动条向下偏移 */
    .katex .base {
        margin-bottom: 4px;
    }
}
```

>  参考 [KaTeX issues: 327](https://github.com/KaTeX/KaTeX/issues/327)



## 宏相关配置

::: warning 提示

如果你不需要宏相关的配置，这块内容可以忽略。

:::

### 更换插件

如果需要使用自定义宏（macro），需要Katex版本在[0.7.0](https://github.com/KaTeX/KaTeX/releases/tag/v0.7.0)以上，而现在的[markdown-it-katex](https://github.com/waylonflinn/markdown-it-katex)使用的katex版本为0.5.1。本人在[npmjs](https://www.npmjs.com/search?q=markdown-it%20katex)上搜索了一番，浏览之后发现以下库应该都是可用的：

- [markdown-it-texmath](https://www.npmjs.com/package/markdown-it-texmath) 需要先安装katex，因此新版katex都是可以的，版本更新较频繁
- [@littlefattie/markdown-it-katex](https://www.npmjs.com/package/@littlefattie/markdown-it-katex) 对原有同名插件的改善，使用 `katex@0.15.1`，支持 TypeScript
- [@iktakahiro/markdown-it-katex](https://www.npmjs.com/package/@iktakahiro/markdown-it-katex) 使用 `katex@0.11.1`

这里我选择了 texmath，直接安装即可

```bash
yarn add katex markdown-it-texmath
```

安装完成后，在`config.ts`中加入：

```ts
import {defineUserConfig, DefaultThemeOptions} from 'vuepress'
import markdownItTex from 'markdown-it-texmath';

export default defineUserConfig<DefaultThemeOptions>({
    head: [
        // somthing else...
        ['link', {rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/katex/dist/katex.min.css'}]
    ],
    extendsMarkdown: md => {
        md.use(markdownItTex, {
            // katexOptions: {...} macros配置可以不放在里面
            macros: {
                "\\ds": "\\displaystyle",
                "\\ts": "\\textstyle",
            }
        });
    }
})
```

::: info

官方的说明还推荐引入 [texmath.min.css](https://cdn.jsdelivr.net/npm/markdown-it-texmath/css/texmath.min.css)，但是实测发现引入后样式异常。

:::

### 引用和跳转

`katex`本身是不支持`\label`和`\ref`等命令的（见 [support table](https://katex.org/docs/support_table.html#l)），这个问题可以通过自定义宏结合`html`得以实现。

> 该小节参考 [Support \eqref and \label](https://github.com/KaTeX/KaTeX/issues/2003#issuecomment-843991794)。

添加 `katex options`：

```json
katexOptions: {
    macros: {
        "\\eqref": "\\href{##tag#1}{(\\text{#1})}",
        "\\ref": "\\href{##tag#1}{\\text{#1}}",
        "\\label": "\\htmlId{tag#1}{}"
    },
    trust: (context) => ['\\htmlId', '\\href'].includes(context.command)
}
```

在`markdown`中使用：

```markdown
$$
I_1=\int_0^p{\frac{\arctan x}{x^2+p(C+1)x+C}\text{d}x} \label{I1}
$$
$$
\arctan x+\arctan \frac{p-x}{1+px}=\arctan p \tag{1}\label{1}
$$
利用换元 $x\mapsto\frac{p-x}{1+px}$ 以及 $\eqref{1}$ 式可知，形如 [$I_1$](#tagI1) 的式子可化为
$$
\frac{\arctan p}{2}\int_0^p{\frac{1}{x^2+Bx+C}\text{d}x}
$$
```

::: details 查看效果
$$
I_1=\int_0^p{\frac{\arctan x}{x^2+p(C+1)x+C}\text{d}x} \label{I1}
$$
$$
\arctan x+\arctan \frac{p-x}{1+px}=\arctan p \tag{1}\label{1}
$$
利用换元 $x\mapsto\frac{p-x}{1+px}$ 以及 $\eqref{1}$ 式可知，形如 [$I_1$](#tagI1) 的式子可化为
$$
\frac{\arctan p}{2}\int_0^p{\frac{1}{x^2+Bx+C}\text{d}x}
$$
:::

需要注意的是，跳转之后的内容可能会被默认主题的`header`挡住，此问题可以通过`css`解决：

```css
/* 调整引用公式跳转后的顶部距离 */

/* 浏览器可视区域宽度 < 825px */
@media screen and (max-width: 825px) {
    .base > span.enclosing {
        padding-top: 4em;
        margin-top: -4em;
    }
}

/* 浏览器可视区域宽度 >= 826px */
@media (min-width: 826px) {
    /* PC 浏览器可通过 scroll-margin-top 属性修改 */
    .base > span.enclosing {
        scroll-margin-top: 4em;
    }
}
```

其中`4em`需要和`header`的高度相近。

