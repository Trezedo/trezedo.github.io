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

## 布局设置

```js
/**
 * 功能：设置活动文档的页面布局为中文公文常用格式（A4纵向，上3.7cm，下2.3cm，左2.8cm，右2.3cm）
 *       同时将全局度量单位改为厘米并启用字符单位。
 */
function 设置页面布局() {
    // 全局选项设置（不在页面设置对象内）
    Options.MeasurementUnit = wdCentimeters; // 界面中的标尺单位改为厘米
    Options.UseCharacterUnit = true; // 启用字符单位（如首行缩进2字符）

    // 获取页面设置对象
    const ps = ActiveDocument.PageSetup;

    // 1. 页边距对称设置
    ps.MirrorMargins = 0; // 0 = 关闭镜像边距（不区分奇偶页）

    // 2. 分栏设置（操作 TextColumns 子对象）
    ps.TextColumns.SetCount(1); // 设置为单栏
    ps.TextColumns.EvenlySpaced = -1; // -1 (True) = 栏宽等距
    ps.TextColumns.LineBetween = 0; // 0 (False) = 栏间无分隔线
    ps.TextColumns.Spacing = 0; // 栏间距为0磅（单栏时无效，但保留无影响）

    // 3. 页面方向与装订线位置
    ps.Orientation = wdOrientPortrait; // 纵向
    ps.GutterPos = wdGutterPosLeft; // 装订线位于左侧

    // 4. 页边距（使用厘米转换，比直接写磅值更易读）
    ps.TopMargin = CentimetersToPoints(3.7); // 上边距 3.7cm
    ps.BottomMargin = CentimetersToPoints(2.3); // 下边距 2.3cm
    ps.LeftMargin = CentimetersToPoints(2.8); // 左边距 2.8cm
    ps.RightMargin = CentimetersToPoints(2.3); // 右边距 2.3cm

    // 5. 页眉页脚区域距离
    ps.HeaderDistance = CentimetersToPoints(1.5); // 页眉距纸张顶端 1.5cm
    ps.FooterDistance = CentimetersToPoints(2.4); // 页脚距纸张底端 2.4cm

    // 6. 装订线宽度（0 表示无额外装订线空间）
    ps.Gutter = 0;

    // 7. 打印机纸盒设置（使用默认纸盒，通常不需要设置）
    ps.FirstPageTray = wdPrinterDefaultBin;
    ps.OtherPagesTray = wdPrinterDefaultBin;

    // 8. 页眉页脚独立设置
    ps.OddAndEvenPagesHeaderFooter = 0; // 0 = 不区分奇偶页页眉页脚
    ps.DifferentFirstPageHeaderFooter = 0; // 0 = 首页不单独设置

    // 9. 版式模式
    ps.LayoutMode = wdLayoutModeGrid; // 网格模式（常用于中文排版）
}
```

一般来说，只是设置页边距之类的不需要这么复杂，只需要以下代码，其余用默认设置即可：

```js
function 设置页面布局() {
    const ps = ActiveDocument.PageSetup; // 获取页面设置对象
    ps.TopMargin = CentimetersToPoints(3.7); // 上边距 3.7cm
    ps.BottomMargin = CentimetersToPoints(2.3); // 下边距 2.3cm
    ps.LeftMargin = CentimetersToPoints(2.8); // 左边距 2.8cm
    ps.RightMargin = CentimetersToPoints(2.3); // 右边距 2.3cm
    ps.HeaderDistance = CentimetersToPoints(1.5); // 页眉距纸张顶端 1.5cm
    ps.FooterDistance = CentimetersToPoints(2.4); // 页脚距纸张底端 2.4cm
}
```

```js
/**
 * 设置全文段落的基础格式（缩进、中文排版、分页控制等）
 * @param {Range} range - 段落范围对象
 */
function applyBaseParagraphFormat(range) {
    let _ = Selection.Range;
    ((_ = range), (range = _)); // trick: 用于得到类型提示，WPS 编辑器对 jsdoc 支持不够友好

    pf = range.ParagraphFormat;
    // ----- 缩进 -----
    pf.CharacterUnitFirstLineIndent = 2; // 首行缩进2字符
    pf.FirstLineIndent = 0; // 清除磅值缩进

    // ----- 网格与右缩进 -----
    pf.DisableLineHeightGrid = false; // false = 启用行高网格（对齐到网格）
    pf.AutoAdjustRightIndent = true; // 根据网格自动调整右缩进

    // ----- 阅读顺序 -----
    pf.ReadingOrder = wdReadingOrderLtr; // 从左到右

    // ----- 分页控制（全部关闭）-----
    pf.KeepWithNext = false;
    pf.KeepTogether = false;
    pf.PageBreakBefore = false;
    pf.WidowControl = false; // 孤行控制关闭

    // ----- 换行与标点 -----
    pf.FarEastLineBreakControl = true; // 防止标点出现在行首
    pf.HangingPunctuation = true; // 允许标点悬挂
    pf.HalfWidthPunctuationOnTopOfLine = false; // 半角标点不强制置首
    pf.WordWrap = true; // 自动换行

    // ----- 中英文/数字间距 -----
    pf.AddSpaceBetweenFarEastAndAlpha = true; // 中英文间加空格
    pf.AddSpaceBetweenFarEastAndDigit = true; // 中文与数字间加空格

    // ----- 基线对齐 -----
    pf.BaseLineAlignment = wdBaselineAlignAuto;
}

// 使用示例：
function test() {
    Selection.WholeStory(); // 手动选中或者选择全文
    applyBaseParagraphFormat(Selection);
}
```

## 设置行间距

```js
/**
 * 设置单倍行距
 */
function setSingleLineSpacing(range) {
    range.ParagraphFormat.LineSpacingRule = wdLineSpaceSingle;
}

/**
 * 设置固定行距（默认 28.95 磅）
 */
function setLineSpacing(range, points = 28.95) {
    range.ParagraphFormat.LineSpacingRule = wdLineSpaceExactly;
    range.ParagraphFormat.LineSpacing = points;
}

// 使用示例
function test() {
    Selection.WholeStory();
    setLineSpacing(Selection, 29.3);
}
```

## 公文格式化

可以保存到 `Normal.dotm`，然后添加到自定义功能区：

```js
/**
 * 不传入参数时，如果未选中内容则返回全文范围，否则返回选中范围
 */
function getSearchRange(range) {
    if (range) return range; // 如果显式传入了 scope，直接使用
    const isInsertionPoint = Selection.Type === wdSelectionIP; // 判断当前是否为插入点（即未选中任何内容）
    return isInsertionPoint ? ActiveDocument.Content : Selection.Range;
}

/**
 * 查找替换，可设置字体格式
 * @param {string} pattern         - 查找内容（支持通配符）
 * @param {string} replacement     - 替换内容（空字符串表示保持原文本不变）
 * @param {boolean} matchWildcards - 是否启用通配符
 * @param {Object} fonts           - 字体配置，结构：{ find: {...}, replace: {...} }
 *                                   find 和 replace 中的属性均为 WPS Font API 属性
 *                                   （如 NameFarEast, NameAscii, Bold, Size 等）
 */
function replaceWithFont(pattern, replacement, matchWildcards, fonts, scope) {
    const searchRange = getSearchRange(scope);

    const find = searchRange.Find; // Selection.Find 默认是全文而不是选中部分
    find.ClearFormatting();
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
    // 清除样式和高亮（避免继承原样式）
    find.Replacement.Style = "";
    find.Replacement.Highlight = wdUndefined;

    // 执行全部替换（忽略下面的注释）
    // prettier-ignore
    find.Execute(
        undefined, undefined, undefined, undefined, undefined,
        undefined, undefined, undefined, undefined, undefined,
        wdReplaceAll, undefined, undefined, undefined, undefined,
    );
}

function 全文字体修改(_) {
    // 可以直接修改 ActiveDocument.Content.Font，但此处需要跳过表格
    // 遍历所有段落，仅对不在表格内的段落设置字体
    const paras = ActiveDocument.Paragraphs;
    const wdInTable = 12; // WPS/Word 常量：判断是否在表格内
    for (let i = 1; i <= paras.Count; i++) {
        const para = paras(i);
        // Information(wdInTable) 返回 0 表示不在表格中，返回 -1 表示在表格内
        if (para.Range.Information(wdInTable) == 0) {
            const font = para.Range.Font;
            font.NameFarEast = "仿宋_GB2312";
            font.NameAscii = "Times New Roman";
            font.Size = 16;
            font.Bold = false;
        }
    }
}

function 格式化标题和层级(_) {
    // 2.一级标题：一、……
    replaceWithFont(
        "^p[一二三四五六七八九十]{1,2}、*^p",
        "",
        true,
        // Size: 16 表示三号，22 表示二号
        { replace: { NameFarEast: "黑体" } },
    );

    // 3.二级标题：（一）……
    replaceWithFont(
        "^p（[一二三四五六七八九十]）*^p",
        "",
        1, // 也可以用数字 1 代替 true
        { replace: { NameFarEast: "楷体_GB2312" } },
    );

    // 4.第三层级加粗：一是、二是……
    replaceWithFont("[一二三四五六七八九十]是", "", 1, {
        replace: { Bold: true },
    });
}

function 格式化标题(_) {
    let range = Selection.Range; // 可删除，仅用于代码提示
    range = ActiveDocument.Paragraphs(1).Range; // 将第一段视为标题
    replaceWithFont(
        "*",
        "",
        true,
        { replace: { NameFarEast: "方正小标宋简体", NameAscii: "Times New Roman", Size: 22 } },
        range,
    );
    const pf = range.ParagraphFormat; // 段落格式对象
    pf.Alignment = wdAlignParagraphCenter; // 居中对齐

    pf.CharacterUnitLeftIndent = 0;
    pf.CharacterUnitFirstLineIndent = 0; // 首行缩进（单位：字符），需要写在 FirstLineIndent 前面，否则会有 1.1cm 首行缩进
    pf.FirstLineIndent = 0; //  首行缩进（单位：磅），1英寸 = 2.54 厘米
    pf.LeftIndent = 0; // 左右缩进
    pf.RightIndent = 0;
}

function 全文段落设置(_) {
    // 可以直接修改 ActiveDocument.Content.ParagraphFormat，但此处需要跳过表格
    const paras = ActiveDocument.Paragraphs;
    for (let i = 1; i <= paras.Count; i++) {
        const para = paras(i);
        // wdInTable = 12，判断是否在表格内；返回 0 表示不在表格中
        if (para.Range.Information(12) == 0) {
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
}

function 一键格式化() {
    Application.ScreenUpdating = false; // 不像 Excel，提升不大
    Application.EnableEvents = false;
    全文段落设置();
    全文字体修改();
    格式化标题和层级();
    格式化标题();
    Application.ScreenUpdating = true;
    Application.EnableEvents = true;
}

function 清除格式() {
    Selection.WholeStory();
    Selection.ClearFormatting();
    Selection.SetRange(0, 0);
}
```

这里给部分函数加了一个未使用的参数 `_`，例如 `格式化标题(_)`，是为了在点击“运行宏”的时候不出现在宏名列表中，默认可运行的是不带参数的函数。
