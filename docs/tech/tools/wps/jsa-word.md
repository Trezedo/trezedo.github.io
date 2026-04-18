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

# WPS JSA：Word 篇

本文的宏多数根据 WPS 自带的录制功能所得代码进行修改，去除冗余、加上注释、修改为类型提示友好的代码风格。

如果你是第一次使用 JS 宏，建议先阅读 [WPS JSA 宏基础](./jsa-basic.md)。

## 布局设置

这里开始给出一些常用的代码片段。

一般来说，基于默认设置，修改页边距等只需要以下代码：

```js
/**
 * 功能：设置活动文档的页面布局为中文公文常用格式
 */
function 设置页面布局() {
    const ps = ActiveDocument.PageSetup; // 获取页面设置对象
    // 设置上下左右边距（厘米）
    ps.TopMargin = CentimetersToPoints(3.7);
    ps.BottomMargin = CentimetersToPoints(2.3);
    ps.LeftMargin = CentimetersToPoints(2.8);
    ps.RightMargin = CentimetersToPoints(2.3);
    // 页眉页脚
    ps.HeaderDistance = CentimetersToPoints(1.5); // 页眉距纸张顶端
    ps.FooterDistance = CentimetersToPoints(2.4); // 页脚距纸张底端
}
```

## 段落格式

段落相关的属性非常之多，可以参考引用 [^paragraph]。

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

    // 设置行距为固定值 29.3 磅
    pf.LineSpacingRule = wdLineSpaceExactly;
    pf.LineSpacing = 29.3;
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

## 简单公文排版

在日常公文写作中，调整格式通常繁琐且耗时。为此，我整理了一套基于 WPS/Word 宏的一键格式化脚本，支持以下核心功能：

- **全文统一格式**：中文仿宋\_GB 2312、西文 Times New Roman、三号字体、行间距 29.3 磅、首行缩进 2 字符，自动跳过表格内容。
- **智能标题与层级**：将首段视为标题并设为方正小标宋简体、二号居中；支持“一、”“（一）”“1.”等结构层次的字体加粗或楷体转换。
- **段旨句灵活加粗**：根据逗号数量和字数判断——短句整句加粗，长句仅加粗开头的“X 是”。
- **抬头与主送机关**：自动识别并应用楷体、顶格。
- **署名与成文日期**：自动查找文末的日期和署名，按公文规范右对齐并添加合适的空格。

> **适用范围说明**：这里的“简单”指公文不包含版头、版记或者是大量表格、分栏、文本框等非复杂元素，适用于**结构简单、层级清晰的常用公文**（如请示、报告等）。当然，去掉版头版记的“复杂”文种的正文部分也可以用该脚本排版，只是做不到“一键”。

只需运行 `一键格式化()` 宏，即可快速将草稿转化为符合要求的公文排版。下文详细列出了代码实现与使用注意事项。

### 效果展示

先看运行效果：

![格式化运行效果展示](https://zedo-img.netlify.app/img/2026-04/15223045-格式化演示.gif)

以下是测试用例，注意标题需要手动 Shift+Enter 换行：

```text
关于公文结构测试用例的说明
标题用Shift+Enter换行  确保属于相同段落
本文件仅用于演示格式化功能

（抬头称谓）所有浏览此文章的读者：
发文事由（或者“导语”）。请注意，以下格式混乱，仅作测试之用：
一、一级标题，可能包含句号，也可以没有
（一）二级标题
这里是正文主体下的内容。内容无特殊标记，此处二级标题后直接换行。
（二）含句号的二级标题。
这里比起上面多了个句号。
（三）不换行的二级标题。此处标题包含句号且与内容紧连着。这里是正文主体下的内容，没有换行，直接跟着标题。
二、第二个一级标题，或者说第二大点。
（一）第二大点比第一大点多了个句号。
1.三级标题。一般情况下不用加粗，这里加粗是为了演示。该层级与一级标题比较类似，只是把中文改成了阿拉伯数字，但其正则表达式实际上是修改二级标题的得到的。
2.换行的三级标题
这一风格和二级标题的判断比较像——三级标题后换行，只要放在开头就不会被误认为正文。注意：本文档默认匹配全角标点。
此处为无标题的段落插入：直接一段文字，这里应该不会有任何不同于正文的格式。
（二）另一些常用的？
测试常用的“一是、二是”这种段旨句：
一是直接加粗“一是”，这种句子可能非常长，且包含2个及以上逗号或者字数超过一行（这里认为一行28个字，减去缩进2字符，即26个字，不考虑西文）。二是内容较短的直接整句加粗。这种不包含逗号，加粗就完事了。三是内容比较长，但是只有一个逗号或者不超过1行的。这种通常也会被认为是“对仗”的小标题，整句加粗。
四是这段文字长度刚好二十六字的结构应该整句都被加粗。
五是这段文字长度超过二十六字的结构不应该整句都被加粗。
六是测试，包含两个逗号的，不应该整句都被加粗。
三、署名、成文日期和印章
默认公文加盖印章：成文日期右空四字编排（这里用8个半角空格），署名以成文日期为准居中编排（大差不差就行了）。


Trezedo
2026年4月XX日
```

格式化效果静态展示：

![16000628.png](https://zedo-img.netlify.app/img/2026-04/16000628.png)

### 代码部分

为了方便，定义清空格式的函数：

```js
function 清除格式() {
    Selection.WholeStory();
    Selection.ClearFormatting();
    Selection.SetRange(0, 0);
}
```

因为基于通配符的查找替换实现二级标题的格式化比较粗略（见下文 [查找替换](#查找替换)）。这里就是要解决通配符不够“强大”的问题，使用正则表达式来查找并处理：

```js
/*
 * regexp 是正则表达式，应带有 "g" 标志
 * callback 是回调函数，如 (range) => {...}
 */
function 正则查找处理(regexp, callback) {
    const doc = Application.ActiveDocument;
    const paras = doc.Paragraphs;
    // 确保有 g 标志
    const globalRegex = new RegExp(
        regexp.source,
        regexp.flags.includes("g") ? regexp.flags : regexp.flags + "g",
    );
    for (let i = 1; i <= paras.Count; i++) {
        const para = paras.Item(i);
        const paraRange = para.Range;
        const paraText = paraRange.Text;
        // 国产电脑用不了 matchAll，使用 exec 代替
        // const matches = [...paraText.matchAll(globalRegex)];
        // for (const match of matches) {
        let match;
        while ((match = globalRegex.exec(paraText)) !== null) {
            const startPos = paraRange.Start + match.index;
            const endPos = startPos + match[0].length;
            const matchedRange = doc.Range(startPos, endPos);
            callback(matchedRange);
        }
    }
}
```

按公文习惯设置：

```js {42-43,65-67,89-90}
/**
 * 全文仿宋_GB2312，三号字体，行间距 29.3 磅，首行缩进 2 字符
 */
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
        pf.Style = ActiveDocument.Styles(wdStyleNormal); // 应用“正文”样式
        pf.LineSpacingRule = wdLineSpaceExactly;
        pf.LineSpacing = 29.3;
        pf.CharacterUnitFirstLineIndent = 2; // 首行缩进（单位：字符），需要写在 FirstLineIndent 前面
        pf.FirstLineIndent = 0;
        pf.CharacterUnitLeftIndent = 0; // 左右缩进
        pf.CharacterUnitRightIndent = 0;
        pf.LeftIndent = 0;
        pf.RightIndent = 0;
        pf.Alignment = wdAlignParagraphJustify; // 两端对齐
        pf.AddSpaceBetweenFarEastAndAlpha = -1; // 中文、英文之间添加间距
        pf.AddSpaceBetweenFarEastAndDigit = -1; // 中文、数字之间添加间距
    }
}

/**
 * 根据段旨句内容决定加粗方式。
 * 多于 2 个逗号或者超过一行 26 个字的不会被整句加粗。
 */
function 段旨句加粗(range) {
    let r = Selection.Range; // 用于取得代码类型提示
    r = range;
    const text = r.Text; // 匹配的整句文本
    const commaCount = (text.match(/，/g) || []).length; // 中文逗号个数

    if (commaCount < 2 && text.length <= 26) {
        // 整句加粗
        r.Font.Bold = true;
    } else {
        // 只加粗开头的“X是”
        const prefixMatch = text.match(/^[一二三四五六七八九十]是/);
        if (prefixMatch) {
            const prefix = prefixMatch[0];
            const prefixRange = r.Parent.Range(r.Start, r.Start + prefix.length);
            prefixRange.Font.Bold = true;
        }
    }
}

/**
 * 标题为方正小标宋简体，二号字体，居中对齐
 */
function 格式化标题(para) {
    let titlePara = ActiveDocument.Paragraphs.Item(1); // 默认将第一段视为标题
    if (para) titlePara = para;
    let range = titlePara.Range;

    const font = range.Font;
    font.NameFarEast = "方正小标宋简体";
    font.NameAscii = "Times New Roman";
    font.Size = 22; // 22 表示二号，16 表示三号，

    const pf = range.ParagraphFormat;
    pf.Alignment = wdAlignParagraphCenter; // 居中对齐
    pf.CharacterUnitFirstLineIndent = 0;
    pf.FirstLineIndent = 0;
}

/**
 * 楷体、顶格（无首行缩进）
 * 主送机关就是公文抬头
 * 返回 false 表示没处理任何段落。
 */
function 处理抬头(range) {
    // 全文仅处理一次，避免后续误判。若不需要可以注释改行。
    if (Application.SalutationHandled) return false;

    let r = Selection.Range; // 用于取得代码类型提示
    r = range;
    // 其上一段必须是空行
    let previousPara = r.Paragraphs(1).Previous(1);
    if (!previousPara || previousPara.Range.Text.trim() !== "") return false;
    r.Font.NameFarEast = "楷体_GB2312";
    r.Paragraphs(1).CharacterUnitFirstLineIndent = 0;
    r.Paragraphs(1).FirstLineIndent = 0;
    Application.SalutationHandled = true;
    return true;
}

function 格式化层级标题(_) {
    // 抬头（或主送机关）
    正则查找处理(/^[^：]*、[^：]*：\r/g, (r) => {
        Application.SalutationHandled = 处理抬头(r);
    });
    // 抬头不含顿号的情况
    if (!Application.SalutationHandled) 正则查找处理(/^[^：]*：\r/g, 处理抬头);

    // 一级标题
    正则查找处理(/^[一二三四五六七八九十]、.*?\r/g, (r) => {
        r.Font.NameFarEast = "黑体";
    });

    // 二级标题
    正则查找处理(/^（[一二三四五六七八九十]）.*?(?:。|\r)/g, (r) => {
        r.Font.NameFarEast = "楷体_GB2312";
    });

    // 三级标题（一般不用加粗）
    正则查找处理(/^[0-9]{1,2}\..*?(?:。|\r)/g, (r) => {
        r.Font.Bold = true;
    });

    // 段旨句
    正则查找处理(/(?<=^|[。？！])[一二三四五六七八九十]是.*?。/g, 段旨句加粗);
}

/**
 * 署名（发文机关）、成文日期
 */
function 格式化署名日期(_) {
    const doc = Application.ActiveDocument;
    let datePara = null,
        unitPara = null;
    const reg = /^[0-9X]{4}年[0-9X]{1,2}月[0-9X]{1,2}日\s*\r/;
    // 从后往前查找日期段落
    for (let i = doc.Paragraphs.Count; i >= 1; i--) {
        const p = doc.Paragraphs.Item(i);
        if (reg.test(p.Range.Text)) {
            datePara = p;
            unitPara = datePara.Previous();
            break;
        }
    }
    if (!datePara || !unitPara) return MsgBox("未找到成文日期或署名。");

    // 去除段落首位空白字符，使得多次运行的效果仍保持一致
    let unitText = unitPara.Range.Text.trim();
    let dateText = datePara.Range.Text.trim();
    // 等效长度：中文=2，半角（英文/数字/空格）=1
    const eqLen = (s) =>
        [...s].reduce((sum, cur) => sum + (/[\u0000-\u00ff]/.test(cur) ? 1 : 2), 0);
    const processPara = (para, text) => {
        if (!para || para.Range.Text.trim().length < 1) return;
        para.Range.Text = text;
        para.Alignment = wdAlignParagraphRight; // 右对齐
        para.WordWrap = 0; // 避免段落末尾空格不占空间
    };

    const unitLen = eqLen(unitText);
    const dateLen = eqLen(dateText);

    const diff = Math.round(dateLen / 2 + 4 * 2 + 5 / 4 - unitLen / 2); // 中西文之间的间距约为 1/2 半角空格，总共5个
    if (diff >= 0) {
        unitText = unitText + " ".repeat(diff) + "\r";
        dateText = dateText + " ".repeat(8) + "\r";
    } else {
        unitText = unitText + "\r";
        dateText = dateText + " ".repeat(8 - diff) + "\r";
    }
    processPara(unitPara, unitText);
    datePara = unitPara.Next(1); // 更新引用，因为手动添加了 "\r" 导致原引用失效
    processPara(datePara, dateText);
}

function 一键格式化() {
    Application.ScreenUpdating = false; // 不像 Excel，提升不大
    Application.EnableEvents = false;
    全文字体段落设置();
    格式化标题();
    格式化层级标题();
    格式化署名日期();
    Application.ScreenUpdating = true;
    Application.EnableEvents = true;
}
```

### 相关说明

1. `wdWithInTable` 常量用于判断所选内容是否位于表格中 [^table]。
2. 匹配二级标题的正则表达式： `/^（[一二三四五六七八九十]）.*?(?:。|\r)/g`，在 WPS/Word 中每个段落默认以 `\r` 结尾，这里实际上就是按每段匹配，所以也可以改写为 `/^（[一二三四五六七八九十]）.*?(?:。|$)/gm`，其中 `$` 就是字符串的末尾（不含 `\r`、`\n` 这些换行符）[^正则边界断言]。
3. 为了方便，这里 `格式化标题` 默认把第一段视为标题，所以只适用于简单公文文种，不适用于函、呈批件等格式。另外，如果你的标题很长，建议用**软回车（Shift+Enter）换行**，而不是直接回车。

## 图片

### 批量调整尺寸

如果同时插入的图片比较多（$\geq 10$ 张），调整大小是比较头疼的，这段函数可以快速调整为统一的尺寸：

```js
function 批量改图片尺寸() {
    let prompt = `请输入高*宽(cm)，0或省略表示自动比例\n例如 0*12.5 或 *12.5 表示\n保持当前比例将宽度设为 12.5cm`;
    let size = InputBox(prompt, "修改嵌入型图片尺寸");
    if (size == "") return;
    let [h, w] = size.split("*").map((e) => +e.trim());
    let [hpt, wpt] = [h, w].map((n) => n * (72 / 2.54));
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

### 格式化嵌入型图片

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

### 压缩图片

此处调用内置的压缩图片功能：
[Application.CommandBars](https://open.wps.cn/documents/app-integration-dev/wps365/client/wpsoffice/jsapi/wps/Application/member/CommandBars) 、[文字 idMso 参考](https://open.wps.cn/documents/app-integration-dev/wps365/client/wpsoffice/jsapi/idmso-list/wps-idmso-reference)

```js
function 压缩图片() {
    Application.CommandBars.ExecuteMso("PicturesCompress");
}
```

### 导出图片

不用把 `doc(x)` 改成 `zip` 后缀，再进压缩包找图片资源了：

```js
function 导出所有图片() {
    let saveRootPath = Env.GetDesktopPath() + "/压缩图片/";
    try {
        // 默认导出到桌面
        MkDir(saveRootPath);
    } catch (e) {}
    let saveName;
    for (let i = 1; i <= ActiveDocument.InlineShapes.Count; i++) {
        let p = ActiveDocument.InlineShapes.Item(i);
        // 图片导入时的原始名称
        let imgPath = (p.LinkFormat && p.LinkFormat.SourceFullName) || p.AlternativeText;
        saveName = imgPath + "_compressed.png";
        p.SaveAsPicture(saveRootPath + saveName);
    }
    MsgBox("已保存到文件夹：" + saveRootPath + "\n" + saveName);
}
```

> 如果办公环境有水印系统，改后缀的方式得到的压缩包一般是打不开的。该函数导出的图片通常不带水印。

## 域

### 自动编号

有些时候自动编号会有些烦人，这个函数可以将动态的自动编号转为静态的：

```js
/**
 * 将选中部分的动态编号列表转为静态
 * 不选中内容则全文转换
 */
function 自动编号转静态() {
    let range = Selection.Type === wdSelectionIP ? ActiveDocument.Content : Selection.Range;
    range.ListFormat.ConvertNumbersToText();
}
```

左侧是动态编号选中的效果，右边是静态编号选中的效果：

:::center

![动态编号选中的效果](https://zedo-img.netlify.app/img/2026-04/12195814.png#s-48) ![静态编号选中的效果](https://zedo-img.netlify.app/img/2026-04/12195948.png#s-48)

:::

## 查找替换

以下是函数形式的查找替换：

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

> 查找替换这一部分强烈推荐观看 up 主“一闪流溢“”的合集 [^查找替换视频合集]。

最初 [简单公文排版](#简单公文排版) 其实是用通配符查找替换实现的。

但对于二级标题的格式化，使用通配符匹配健壮性不强，因为 WPS 的通配符太弱了：

1. 既不像正则表达式那样强大，又不像 MS Word 那样支持 `[。^13]` 语法（MS Word 中的 `^13` 相当于 WPS 中的 `^p`），`[。^p]` 会直接提示错误。
2. 通配符的 `*` 匹配默认是贪婪的。
3. 有的二级标题喜欢单独成段，有时又以句号结尾紧连着后文，使用通配符做不到两者兼顾。

较粗略的格式化层级标题功能实现：

```js
function 格式化层级标题() {
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
```

## 页码

高亮的 `textRange` 部分参考了 [^页码]：

```js {22,29-31}
function 添加页码() {
    const footers = ActiveDocument.Sections.Item(1).Footers;
    footers.Item(wdHeaderFooterPrimary).Range.ShapeRange.Delete(); // 删除footer
    footers.Item(wdHeaderFooterEvenPages).Range.ShapeRange.Delete(); // 删除双数页脚

    let footer = ActiveDocument.Sections.Item(1).Footers.Item(wdHeaderFooterPrimary);
    footer.Shapes.AddTextbox(msoTextOrientationHorizontal, 0, 0, 144, 144, footer.Range);
    const shape = footer.Shapes.Item(1);
    shape.Fill.Visible = msoFalse;
    shape.Line.Visible = msoFalse;

    const textFrame = shape.TextFrame;
    textFrame.AutoSize = 1;
    textFrame.WordWrap = 0;
    textFrame.MarginLeft = 0;
    textFrame.MarginRight = 0;
    textFrame.MarginTop = 0;
    textFrame.MarginBottom = 0;
    textFrame.Orientation = msoTextOrientationHorizontal;

    shape.RelativeHorizontalPosition = wdRelativeHorizontalPositionMargin;
    shape.Left = -999993;
    shape.RelativeVerticalPosition = wdRelativeVerticalPositionParagraph;
    shape.Top = 0;
    shape.WrapFormat.Type = wdWrapNone;

    const textRange = shape.TextFrame.TextRange;
    textRange.Text = "— X —";
    // textRange.Characters.Item(3) 就是页码 "X"；
    // 保留横线和空格的前提下，只把中间的占位符“X”替换成真正的页码数字
    textRange.Fields.Add(textRange.Characters.Item(3), wdFieldPage, "", true);
    textRange.Font.Name = "宋体";
    textRange.Font.Size = 14;
    footer.PageNumbers.NumberStyle = wdPageNumberStyleArabic;
}
```

`shape.Left = -999993` 这里并不是所有负值都可以的，我尝试了其他值，结合无意间翻到的文档 [^shapePostion]，整理如下：

|   值    | 对应位置选项           | 文档枚举名称   | 文档说明     |
| :-----: | ---------------------- | -------------- | ------------ |
| -999993 | 双面打印 1（奇右偶左） | wdShapeOutside | 所选区域外部 |
| -999994 | 双面打印 2（奇左偶右） | wdShapeInside  | 所选区域内部 |
| -999995 | 居中                   | wdShapeCenter  | 中央         |
| -999996 | 右侧                   | wdShapeRight   | 右侧         |
| -999998 | 左侧                   | wdShapeLeft    | 左侧         |

## 未完待续

其实还有很多功能，等遇到需求了、代码成熟了再记录一下。尤其是 Word 表格处理、（反向）邮件合并、题目排版相关的。

## 参考

有一些帖子写的挺好的，有时间再~~参考一下~~（doge）

[【效率提升】在VSCODE里写JS宏代码 - WPS 社区](https://bbs.wps.cn/topic/49738)

<!-- https://forum.wps.cn/topic/62814 -->
<!-- https://forum.wps.cn/topic/65963 -->

[^paragraph]: [ParagraphFormat - WPS开放平台](https://open.wps.cn/documents/app-integration-dev/wps365/client/wpsoffice/jsapi/wps/ParagraphFormat/obj)

[^table]: [WdInformation 枚举参考 - WPS开放平台](https://open.wps.cn/documents/app-integration-dev/wps365/client/wpsoffice/jsapi/wps/enum/WdInformation)

[^正则边界断言]: [输入边界断言：^、$ - MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Regular_expressions/Input_boundary_assertion)

[^查找替换视频合集]: [《通配符查找替换》入门教程 - 哔哩哔哩](https://space.bilibili.com/89039806/lists/952022/)

[^页码]: [wps js 宏之插入页码 | 非常超 - 博客园](https://www.cnblogs.com/lcxdc/p/17010213.html)
