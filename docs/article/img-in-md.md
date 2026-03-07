---
date: 2022-07-15
icon: bxs:image
category:
    - Markdown
    - 小技巧
tag:
    - markdown
    - css
    - javascript
---

# Markdown 中的图片

这里并不是 markdown 图片的基本语法。

<!-- more -->

## 缩放图片

> 如果你使用 OSS 、图床等，通常会提供 `query` 来对图片大小进行操作，例如 [图片缩放 - 阿里云 OSS](https://help.aliyun.com/document_detail/44688.html)，那么此部分可能对你帮助不大。

### CSS 属性的行为差异

例如在 markdown 中使用这张图片：

```markdown
![图片demo](https://zedo-img.netlify.app/img/2022-05/09190222.png)
```

得到如下结果：

![图片demo](https://zedo-img.netlify.app/img/2022-05/09190222.png)

在电脑上看起来是不是有点大？

如果你用过 Typora，就会知道它缩放图片的做法是使用原生 HTML 语法：

```markdown
<img src="https://zedo-img.netlify.app/img/2022-05/09190222.png" alt="图片demo" style="zoom: 67%;" />
```

注意 `style` 使用了 `zoom` 属性，它不是标准 CSS 属性，但目前除了火狐浏览器，绝大部分浏览器都支持使用 [^zoom]。

`zoom` 可以基于原始大小缩放，并改变图片在文档流中的大小。

`transform:scale` 也能做到缩放，但它是通过改变坐标空间，不影响正常文档流的情况下改变作用内容的大小。

请看以下对比：

::: normal-demo zoom 和 transform:scale 对比

```html
<p>这是 zoom：</p>
<img
    src="https://zedo-img.netlify.app/img/2022-05/09190222.png"
    style="zoom: 40%;"
/>

<p>这是 transform: scale：</p>
<img
    src="https://zedo-img.netlify.app/img/2022-05/09190222.png"
    style="transform: scale(0.4);"
/>
<p>文字段落</p>
```

:::

不难发现，使用 `zoom` 的行为符合我们的预期。而使用 `transform:scale` 虽然图片大小确实缩放了，但会保留很多空白（这里并不解释这一现象），这显然不是我们想要的。

::: tip

[这里](https://medium.com/@sai_prasanna/simulating-css-zoom-with-css3-transform-scale-461d1b9762d6) 给出了用 `transform:scale` 模拟 `zoom` 的方法。其中第二种方法对于宽高度不确定的图片而言，纯 CSS 实现起来并不容易。

:::

那么，我们接下来考虑使用 `width` 属性，然后观察它们的差异：

::: normal-demo zoom 和 width 对比

```html
<p>这是 zoom：</p>
<img
    src="https://zedo-img.netlify.app/img/2022-05/09190222.png"
    style="zoom: 40%;"
/>

<p>这是 width：</p>
<img
    src="https://zedo-img.netlify.app/img/2022-05/09190222.png"
    style="width: 40%;"
/>
<p>文字段落</p>
```

:::

通过观察以上例子，似乎 `width` 的行为和 `zoom` 差别不算太大。

这时，我们再拿一张宽高比较小的图片来试试：

::: normal-demo zoom 和 width 对比 (2)

```html
<p>这是 zoom：</p>
<img
    src="https://zedo-img.netlify.app/img/2022-06/29092339.png"
    style="zoom: 66%;"
/>

<p>这是 width：</p>
<img
    src="https://zedo-img.netlify.app/img/2022-06/29092339.png"
    style="width: 66%;"
/>
<p>文字段落</p>
```

:::

发现了吗？第一张图片的大小看上去恰好合适，而第二张图片看起来太大了。

这是因为 `zoom` 是根据图片原始大小进行缩放，而 `width` 设置百分比是由图片的父容器宽度决定的，当图片的宽高比越小时，它们的行为差异越大！

<br>

CSS 中除了 `width` 属性之外，还有一个与宽度相关的属性——`max-width`。

来看下它们三者的差异：

::: normal-demo zoom、width 和 max-width 对比

```html
<p>这是 zoom：</p>
<img
    src="https://zedo-img.netlify.app/img/2022-06/29092339.png"
    style="zoom: 66%;"
/>

<p>这是 max-width：</p>
<img
    src="https://zedo-img.netlify.app/img/2022-06/29092339.png"
    style="max-width: 66%;"
/>

<p>这是 width：</p>
<img
    src="https://zedo-img.netlify.app/img/2022-06/29092339.png"
    style="width: 66%;"
/>

<p>文字段落</p>
```

:::

### 较好的解决方案

前面说了这么多，主要目的就是为了找到某种方法，在不影响 markdown 图片语法兼容性的情况下，实现图片的缩放。而之所以拿 `zoom` 来做对比，是因为它能达到我们想要的效果，虽然目前几乎只有 Firefox 浏览器不支持它，但它不属于任何标准，因此我们最好找到一种“代替”方法。

> 例如我常使用的是 Typora，VuePress

从以上对比可以看出，在没有 JavaScript 的情况下，较好的方案是使用 `max-width`。

为了不破坏 markdown 既有的图片语法：

```markdown
![图片alt](图片链接 "图片title")

<!-- 对应的 HTML 代码-->
<img src="图片链接" alt="图片alt" title="图片title">
```

又想要实现对图片大小的控制，我们可以从 `图片alt` 和 `图片链接` 下手。

这里以 `图片链接` 为例，因为链接的格式具有更多的“限制”[^uri]。

根据 URI 的格式，我们可以用 URI 中的 `fragment` 片段实现对图片大小的缩放。至于为什么不用 `query`，因为它可能会有别的作用。

例如，我们想“缩放”图片的比例为 66%，markdown 这样写：

```markdown
![](/example.png#s-66)
```

那么它对应的 HTML 代码如下：

```html
<img src="/example.png#s-66" alt="" />
```

要能够让 CSS 控制它，首先得有 [选择器](https://www.w3school.com.cn/cssref/css_selectors.asp) 吧？可以这样选到这类元素：

```js
// 链接中包含 "#s" 的图片元素
document.querySelectorAll('img[src*="#s"]');
```

然后列出一些你可能常用的比例：

```css
/* 这里仅给出 2 个作为示例 */
img[src*="#s-66"] {
    max-width: 66%;
}

img[src*="#s-80"] {
    max-width: 80%;
}
```

更方便地，使用样式预处理器 scss：

```scss
//  兼容处理
img[src*="#s"] {
    width: auto;
    height: auto;
}

@mixin image-size($size: 80) {
    img[src*="#s-#{$size}"] {
        // zoom: #{$size + "%"};
        max-width: #{$size + "%"};
    }
}

// 5, 10, 15, ..., 100, 66, 67
@for $i from 5 through 100 {
    @if ($i % 5==0 or $i==66 or $i==67) {
        @include image-size($i);
    }
}
```

然后使用 [在线工具](http://www.wetools.com/sass-to-css) 或 [VS Code 插件](https://marketplace.visualstudio.com/items?itemName=spook.easysass) 编译，在你所使用的 markdown 编辑器（引擎）引入即可。

> Typora 可以在其安装目录下的 `resources/app/window.html` 中引入。
>
> 此外，Typora 可以使用 `zoom`。

使用 CSS 的好处是不需要监听 JavaScript 事件，通过 `#s-size` 修改比例可以实时看到结果，缺点则是~~要写 CSS~~，而且有部分样式可能永远不会被使用。

JavaScript 处理起来更加灵活，可以直接设置 `width`，但需要监听事件才能做到实时修改、预览。

```js
function initImageSize() {
    const images = document.querySelectorAll('img[src*="#s-"]');
    const reg = /#s-(\d+)(px|%)?/;
    for (const img of images) {
        const exec = reg.exec(img.src);
        const width = exec?.[1];
        const unit = exec?.[2];
        img.style.width = unit == "px" ? width : (width + unit ?? "%");
    }
}
```

以上代码可以通过以下语法来缩放图片：

```markdown
![alt](/example.png#s-200px) --> 宽度为 200px
![alt](/example.png#s-60%)   --> 宽度为原来的 60%
![alt](/example.png#s-60)    --> 宽度为原来的 60%
```

[^zoom]: [can I use zoom ?](https://caniuse.com/?search=zoom)
[^uri]: 见维基百科：[Uniform Resource Identifier](https://en.wikipedia.org/wiki/Uniform_Resource_Identifier#Syntax)
