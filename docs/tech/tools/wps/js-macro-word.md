---
icon: vscode-icons:file-type-word
date: 2026-04-08
category:
    - jsa
    - wps
tag:
    - javascript
    - word
---

# WPS JS 宏：常用 Word 宏片段速查

本文的宏多数根据 WPS 自带的录制功能所得代码进行修改，去除冗余、加上注释、修改为类型提示友好的代码风格。

可参考的文档：

- [WPS 开放平台（wps365）](https://open.wps.cn/documents/app-integration-dev/wps365/client/wpsoffice/jsapi/wps/Application/obj)：比较全面，链接能具体到某个 API 参考对象。
- [WPS 开放平台（加载项）](https://open.wps.cn/previous/docs/client/wpsLoad)：多层 iframe 嵌套的 [文档](https://qn.cache.wpscdn.cn/encs/doc/office_v19/index.htm) ……分享链接不方便。
- [WPS WebOffice 开放平台](https://solution.wps.cn/docs/client/api/Word/Document.html)：WebOffice 的可能不一定和 WPS JSA 的 API 完全一样。

## 为什么不是 VBA？

我认为主要有两个原因：

1. 跨平台与国产环境
   VBA 依赖 Windows COM 组件，在国产电脑（麒麟、UOS 等）上运行比较困难。而 WPS 原生支持的 JSA（JavaScript 宏）可在这些平台上直接运行，真正实现“一次编写，到处使用”。
2. 语法与调试体验更好
   JavaScript 语法上比 VB 灵活太多——正则表达式用 `/.../g` 直接写；回调函数可作为参数轻松传入；数组支持 `map` / `filter` 等高阶函数，代码简洁；随便打开浏览器按下 F12 就能调试 JS，比 VBA 那个老旧的编辑器高效数倍。

当然，尽管现在有很多 VBA 能做的功能 JSA 尚且做不到，但对于绝大多数日常自动化、文本处理、跨平台场景，JSA 已经完全够用。

## 添加到自定义功能的方法

### 编写宏

首先任意打开一个 Word 文件，上方依次点开“工具”——“开发工具”——“WPS 宏编辑器”：

![WPS宏编辑器](https://zedo-img.netlify.app/img/2026-04/12201926.png)

如果用的是 VBA，还需要手动切换到 JS 环境：![切换到JS环境按钮](https://zedo-img.netlify.app/img/2026-04/12201804.png)

在编辑器窗口中找到到 `Normal.dotm` 的代码部分，右键新建模块，然后在右侧编写、粘贴代码就行了：

![添加宏示意](https://zedo-img.netlify.app/img/2026-04/12201609.png)

### 快捷运行宏

每次都要打开宏编辑器执行函数是比较麻烦的，好在 WPS 支持添加自定义功能。以下是添加步骤：

依次点击左上角的“文件”——“选项”，打开选项面板，按下图提示操作即可：

![自定义功能区演示](https://zedo-img.netlify.app/img/2026-04/12200807.png)

然后就可以在上方选项卡看到我们自定义的函数，只需要鼠标单击就能运行：

![自定义功能示意](https://zedo-img.netlify.app/img/2026-04/12202614.png)

## 布局设置

这里开始给出一些常用的代码片段。

一般来说，基于默认设置，修改页边距等只需要以下代码：

```js
/**
 * 功能：设置活动文档的页面布局为中文公文常用格式
 */
function 设置页面布局() {
    const ps = ActiveDocument.PageSetup; // 获取页面设置对象
    ps.TopMargin = CentimetersToPoints(3.7); // 上边距 3.7cm
    ps.BottomMargin = CentimetersToPoints(3.5); // 下边距 3.5cm
    ps.LeftMargin = CentimetersToPoints(2.8); // 左边距 2.8cm
    ps.RightMargin = CentimetersToPoints(2.6); // 右边距 2.6cm
    ps.HeaderDistance = CentimetersToPoints(1.5); // 页眉距纸张顶端 1.5cm
    ps.FooterDistance = CentimetersToPoints(2.4); // 页脚距纸张底端 2.4cm
}
```

有的 WPS 版本可能用不了 `CentimetersToPoints`，可以这样定义：

```js
/**
 * 厘米转磅值
 * 1 磅 (pt） = 1/72 英寸 (inch)，而 1 英寸 = 2.54 厘米（精确值）
 */
function CentimetersToPoints(cm) {
    return cm * (72 / 2.54);
}
```

## 段落格式

段落相关的属性非常之多，可以参考：[WPS开放平台 - ParagraphFormat](https://open.wps.cn/documents/app-integration-dev/wps365/client/wpsoffice/jsapi/wps/ParagraphFormat/obj)

这里只给出个别比较常用的作为演示：

```js
/**
 * 设置选中段落的格式
 */
function 修改段落格式() {
    const pf = Selection.Range.ParagraphFormat; // Selection 表示鼠标选中范围

    // 设置首行缩进
    pf.CharacterUnitFirstLineIndent = 2; // 首行缩进2字符
    pf.FirstLineIndent = 0; // 清除磅值缩进

    // 设置单倍行距
    pf.LineSpacingRule = wdLineSpaceSingle;

    // 设置行距为固定值 28.95 磅
    pf.LineSpacingRule = wdLineSpaceExactly;
    pf.LineSpacing = 28.95;
}

// 使用示例：
function test() {
    Selection.WholeStory(); // 选中全文手，也可以手动选中
    修改段落格式();
}
```

::: warning 注意

1. `FirstLineIndent = 0` 虽然是默认值，但这里设置它是为了确保覆盖任何可能存在的磅值缩进（当使用字符单位缩进时，磅值缩进应清零），这是一种防御性写法。
2. 行距不能同时为“单倍行距”或者“固定值”，代码中居后者生效。

:::

## 公文字体及段落格式

这部分的函数可以复制粘贴到你自己的 `Normal.dotm` 中。

如果经常从 DeepSeek 之类的 AI 中复制粘贴，这里的函数可以帮你减少手动调格式的工作量以及节省时间。

### 查找替换

这里 `replaceWithFormat` 实际上就是执行查找替换，只不过写成函数了：

```js {21,22}
/**
 * 不传入参数时，如果未选中内容则返回全文范围，否则返回选中范围
 */
function getSearchRange(range) {
    if (range) return range; // 如果显式传入了 range，直接使用
    // IP 是 Insertion Point，插入点（即未选中任何内容）
    return Selection.Type === wdSelectionIP ? ActiveDocument.Content : Selection.Range;
}

/**
 * 查找替换，可设置字体格式
 * @param {string} pattern         - 查找内容（支持通配符）
 * @param {string} replacement     - 替换内容（空字符串表示保持原文本不变）
 * @param {boolean} matchWildcards - 是否启用通配符
 * @param {Object} fonts           - 字体配置，结构：{ find: {...}, replace: {...} }
 *                                   find 和 replace 中的属性均为 WPS Font API 属性
 *                                   （如 NameFarEast, NameAscii, Bold, Size 等）
 * @param {Object} [paragraphs]    - 段落配置，同上（如 CharacterUnitFirstLineIndent, Alignment 等）
 */
function replaceWithFormat(pattern, replacement, matchWildcards, fonts, paragraphs, scope) {
    let searchRange = Selection.Range; // 仅用于代码提示
    searchRange = getSearchRange(scope);

    const find = searchRange.Find; // Selection.Find 默认是全文而不是选中部分
    find.ClearFormatting(); // find.Font.Reset();
    find.Replacement.ClearFormatting();

    // 查找文本与选项
    find.Text = pattern;
    find.Replacement.Text = replacement;
    find.MatchWildcards = !!matchWildcards;
    find.Wrap = wdFindContinue; // 继续搜索至全文结束

    // 查找字体条件
    if (fonts && fonts.find) {
        Object.assign(find.Font, fonts.find);
    }
    // 替换字体格式
    if (fonts && fonts.replace) {
        Object.assign(find.Replacement.Font, fonts.replace);
    }
    // 查找段落条件
    if (paragraphs && paragraphs.find) {
        Object.assign(find.ParagraphFormat, paragraphs.find);
    }
    // 替换段落格式
    if (paragraphs && paragraphs.replace) {
        Object.assign(find.Replacement.ParagraphFormat, paragraphs.replace);
    }
    // 清除样式和高亮（避免继承原样式）
    find.Replacement.Style = "";
    find.Replacement.Highlight = wdUndefined;

    // 执行全部替换（忽略下面的注释）
    // prettier-ignore
    find.Execute(
        undefined, undefined, undefined, undefined, undefined,
        undefined, undefined, undefined, undefined, undefined,
        wdReplaceAll,
    );
}
```

> 查找替换这一部分强烈推荐观看 up 主“一闪流溢“”的合集：[《通配符查找替换》入门教程](https://space.bilibili.com/89039806/lists/952022/)

::: info

WPS 编辑器的类型提示不够完善，对 jsdoc 类型支持不够友好，所以这里 `replaceWithFormat` 函数用了一个冗余的定义（`Selection.Range`）来得到代码提示：

```js
let searchRange = Selection.Range; // 仅用于代码提示
searchRange = getSearchRange(scope);
```

:::

### 段落和字体格式

按公文习惯设置：

```js
function 全文字体段落设置(_) {
    // 可以直接修改 ActiveDocument.Content.ParagraphFormat，但此处需要跳过表格
    const paras = ActiveDocument.Paragraphs;
    for (let i = 1; i <= paras.Count; i++) {
        const para = paras(i);
        // wdWithInTable = 12，判断是否在表格内；返回 0 表示不在表格中
        // 页眉页脚、文本框默认不会包含在段落中，只需另外处理嵌入型图片
        if (para.Range.Information(wdWithInTable) != 0) continue; // 在表格内，跳过该段落

        // 字体
        const font = para.Range.Font;
        font.NameFarEast = "仿宋_GB2312";
        font.NameAscii = "Times New Roman";
        font.Size = 16;
        font.Bold = false;

        // 段落
        const pf = para.Range.ParagraphFormat;
        pf.Style = ActiveDocument.Styles(wdStyleNormal);
        pf.LineSpacingRule = wdLineSpaceExactly;
        pf.LineSpacing = 29.3;
        pf.CharacterUnitFirstLineIndent = 2;
        pf.FirstLineIndent = 0;
        pf.Alignment = wdAlignParagraphJustify;
        pf.AddSpaceBetweenFarEastAndAlpha = -1;
        pf.AddSpaceBetweenFarEastAndDigit = -1;
    }
}

function 格式化层级标题(_) {
    // 1.一级标题：一、……
    replaceWithFormat(
        "^p[一二三四五六七八九十]{1,2}、*^p",
        "",
        true, // 也可以用数字 1 代替 true
        { replace: { NameFarEast: "黑体" } },
    );

    // 2.二级标题：（一）……，比较粗略
    replaceWithFormat(
        "^p（[一二三四五六七八九十]）*^p",
        // 这里需要根据行文风格适当修改，看是喜欢单独成段还是和后文合并一段，后者需要把末尾的 ^p 改为句号：
        // "^p（[一二三四五六七八九十]）*。",
        "",
        1,
        { replace: { NameFarEast: "楷体_GB2312" } },
    );

    // 3.第三层级加粗：一是、二是……
    replaceWithFormat("[一二三四五六七八九十]是", "", 1, { replace: { Bold: true } });
}

function 格式化标题(_) {
    let range = Selection.Range; // 可删除，仅用于代码提示
    range = ActiveDocument.Paragraphs(1).Range; // 将第一段视为标题
    const font = range.Font;
    font.NameFarEast = "方正小标宋简体";
    font.NameAscii = "Times New Roman";
    font.Size = 22; // 22 表示二号，16 表示三号，

    const pf = range.ParagraphFormat; // 段落格式对象
    pf.Alignment = wdAlignParagraphCenter; // 居中对齐
    pf.CharacterUnitLeftIndent = 0;
    pf.CharacterUnitFirstLineIndent = 0; // 首行缩进（单位：字符），需要写在 FirstLineIndent 前面，否则会有 1.1cm 首行缩进
    pf.FirstLineIndent = 0; //  首行缩进（单位：磅）
    pf.LeftIndent = 0; // 左右缩进
    pf.RightIndent = 0;
}

function 一键格式化() {
    Application.ScreenUpdating = false; // 不像 Excel，提升不大
    Application.EnableEvents = false;
    全文字体段落设置();
    格式化层级标题();
    格式化标题(); // 特定的修改应放在通用的修改之后
    Application.ScreenUpdating = true;
    Application.EnableEvents = true;
}

function 清除格式() {
    Selection.WholeStory();
    Selection.ClearFormatting();
    Selection.SetRange(0, 0);
}
```

默认可运行的是不带参数的函数。这里给部分函数加了一个未使用的参数 `_`，例如 `格式化标题(_)`，是为了在点击“运行宏”的时候不出现在宏名列表中。

`wdWithInTable` 常量用于判断所选内容是否位于表格中，参考文档：[WdInformation 枚举参考](https://open.wps.cn/documents/app-integration-dev/wps365/client/wpsoffice/jsapi/wps/enum/WdInformation)

这里二级标题的格式化之所以说比较粗略，是因为 WPS 的通配符还是太弱了：

1. 既不像正则表达式那样强大，又不像 MS Word 那样支持 `[。^13]` 和 `?` 语法（MS Word 中的 `^13` 相当于 WPS 中的 `^p`），`[。^p]` 会直接提示错误。
2. WPS 的 `*` 匹配默认是贪婪的（MS Word 的通配符 `?` 是非贪婪的）。
3. 有的二级标题喜欢单独成段，有时又以句号结尾紧连着后文，在 WPS 中使用通配符就做不到两者兼顾。

为了方便，这里 `格式化标题` 默认把第一段视为标题，所以只适用于简单的报告、请示等文体，不适用于函、呈批件等格式。另外，如果你的标题很长，建议用**软回车（Shift+Enter）换行**，而不是直接回车。

## 嵌入式图片

如果同时插入的图片比较多（$\geq 10$ 张），调整大小是比较头疼的，这段函数可以快速调整为统一的尺寸：

```js
function 批量改图片尺寸() {
    let prompt = `请输入高*宽(cm)，0或省略表示自动比例\n例如 0*12.5 或 *12.5 表示\n保持当前比例将宽度设为 12.5cm`;
    let size = InputBox(prompt, "修改嵌入型图片尺寸");
    if (size == "") return;
    let [h, w] = size.split("*").map((e) => +e.trim());
    let [hpt, wpt] = [h, w].map((n) => (n * 72) / 2.54);
    let count = ActiveDocument.InlineShapes.Count;
    for (let i = 1; i <= count; i++) {
        let shp = ActiveDocument.InlineShapes.Item(i);
        if (h == 0 && w == 0) continue;
        shp.LockAspectRatio = h == 0 || w == 0 ? -1 : 0; // 取消锁定比例
        if (h) shp.Height = hpt;
        if (w) shp.Width = wpt;
    }
    MsgBox("共修改" + count + "张图片");
}
```

当我们手动设置全文的行间距为固定值时，需要把图片还原为单倍行距，否则图片会显示不全：

```js
/**
 * 图片单独成段时（即不与文字混排），取消缩进并居中对齐
 */
function 格式化嵌入型图片() {
    let count = ActiveDocument.InlineShapes.Count;
    for (let i = 1; i <= count; i++) {
        // ActiveDocument.Shapes 包含插入的形状、浮动的图片
        let shp = ActiveDocument.InlineShapes.Item(i);
        const pf = shp.Range.ParagraphFormat;
        pf.Space1(); // 单倍行距
        // 以下用于判断段落中是否有其他文字
        // 如果不是纯图片则跳过居中设置，其中 "/" 是图片占位符
        if (shp.Range.Paragraphs(1).Range.Text.trim() != "/") continue;

        pf.Alignment = wdAlignParagraphCenter;
        pf.CharacterUnitFirstLineIndent = 0;
        pf.FirstLineIndent = 0;
    }
}
```

几点说明：

1. 技术限制：WPS/Word 中，**嵌入型图片**视为段落中的特殊字符，其位置与行高由段落行距决定，无法单独设置行距而不影响同段文字，也就是说：无法单独为一张嵌入型图片设置行距而不影响同一段落中的其他文字字符。
2. 其内部用斜杠 `/` 作为图片的位置标记，`Range.Text` 属性返回的是该区域的纯文本内容，遇到图片标记符时，就会显示为这个字符。
3. `InlineShapes` 不会包含文本框、设置为文字环绕的浮动图片。
4. 你也可以把这段函数的调用加在 `function 一键格式化()` 里面。

## 自动编号

有些时候自动编号会有些烦人，这个函数可以将动态的自动编号转为静态的：

```js
function 自动编号转静态() {
    let range = Selection.Type === wdSelectionIP ? ActiveDocument.Content : Selection.Range;
    range.ListFormat.ConvertNumbersToText();
}
```

左侧是动态编号选中的效果，右边是静态编号选中的效果：

:::center

![动态编号选中的效果](https://zedo-img.netlify.app/img/2026-04/12195814.png#s-45) ![静态编号选中的效果](https://zedo-img.netlify.app/img/2026-04/12195948.png#s-45)

:::

## 下步计划

有一些帖子写的挺好的，有时间再~~参考一下~~（doge）

[【效率提升】在VSCODE里写JS宏代码 - WPS 社区](https://bbs.wps.cn/topic/49738)

<!-- https://forum.wps.cn/topic/62814 -->
<!-- https://forum.wps.cn/topic/65963 -->
