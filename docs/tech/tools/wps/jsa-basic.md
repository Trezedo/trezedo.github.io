---
icon: hugeicons:wps-office
date: 2026-04-18
category:
    - jsa
    - wps
tag:
    - excel
    - javascript
    - word
---

# WPS JSA：宏基础

本来不打算写这篇文章的，因为“基础”的东西要讲的特别多。写代码的都知道去翻文档，但是 WPS 官方文档的内容确实太多太杂了，作为“小白”大概率不知道从何下手。我在写文章时，习惯把用到的“知识”补上相关链接，但是内容越补越多，占了挺大篇幅，于是就拆分出来了。因此这里也并不是完整教学（至少不是从“零”开始），只是用来告诉读者、记录自己如何使用 JavaScript 宏，以及编写宏时需要知道的一些 WPS JS API 的知识。

可参考的文档：

- [WPS 开放平台（wps365）](https://open.wps.cn/documents/app-integration-dev/wps365/client/wpsoffice/jsapi/wps/Application/obj)：比较全面，链接能具体到某个 API 参考对象。
- [WPS 开放平台（加载项）](https://open.wps.cn/previous/docs/client/wpsLoad)：多层 iframe 嵌套的 [文档](https://qn.cache.wpscdn.cn/encs/doc/office_v19/index.htm) ……分享链接不方便。
- [WPS WebOffice 开放平台](https://solution.wps.cn/docs/client/api/Word/Document.html)：WebOffice 的可能不一定和 WPS JSA 的 API 完全一样。

<!-- more -->

## 什么是 JSA？

**JSA** 全称 **JavaScript for Application**，是 WPS Office 从 2021 版本开始原生支持的宏语言，采用 JavaScript 作为脚本语言来实现办公自动化。WPS 集成了一个 V8 引擎的 JavaScript 运行时，支持大部分 ES6 语法，因此宏编辑器支持 JavaScript 标准内置对象 [^1]。

::: warning 注意

JS 内置对象和浏览器的内置对象是不同的，WPS 宏编辑器集成的是 JavaScript 运行时，而不是浏览器，因此 WPS 宏编辑器不支持浏览器的内置对象。

:::

## 为什么不是 VBA？

VBA （Visual Basic for Application）经过长期发展，功能非常强大，能够调用 ActiveX 对象和 Windows API，能够实现系统级自动化。但其缺点同样突出：

1. **安全性风险**：强大的功能也带来了安全隐患，许多宏病毒和木马正是利用 VBA 的底层能力进行传播和破坏。
2. **兼容性不佳**：VBA 对运行环境依赖较强，换一台电脑或更换 Microsoft Office 版本后，原先写好的宏常常因组件版本差异或权限问题而无法正常运行。

> 我曾经用过两台同样是 win7、Office 2007 的电脑，有一台硬是不支持 VBA，两台电脑的 WPS 都不支持 VBA、不兼容 Office 2010 及以上版本。

但是切换到 JSA，我认为主要有两个原因：

1. 跨平台与国产环境
   VBA 依赖 Windows COM 组件，在国产电脑（麒麟、UOS 等）上运行比较困难。而 WPS 原生支持的 JSA 可在这些平台上直接运行。
2. 语法与调试体验更好
   JavaScript 语法上比 VB 灵活太多——正则表达式用 `/.../g` 直接写；回调函数可作为参数传入；数组支持 `map` / `filter` 等高阶函数；随便打开浏览器按下 <kbd>F12</kbd> 就能调试 JS，比 VBA 那个老旧的编辑器高效数倍。

当然，尽管现在有很多 VBA 能做的功能 JSA 尚且做不到，但对于绝大多数日常自动化、文本处理、跨平台场景，JSA 已经完全够用。

如果你以前使用过 VBA，转到 JSA 可以参考官方这篇文档：[从Visual Basic 转到 JavaScript](https://open.wps.cn/documents/app-integration-dev/wps365/client/wpsoffice/jsapi/go-to-js-from-vb)

---

现在，正式进入话题。

## Word 部分

### 打开宏编辑器

首先任意打开一个 Word 文件，上方依次点开“**工具**”——“**开发工具**”——“**WPS 宏编辑器**”：

![WPS宏编辑器](https://zedo-img.netlify.app/img/2026-04/12201926.png)

默认情况下用的是 VBA，还需要手动切换到 JS 环境： ![切换到JS环境按钮](https://zedo-img.netlify.app/img/2026-04/12201804.png)

在编辑器窗口中找到 `Normal.dotm` 的代码部分，右键新建模块，然后在右侧编写、粘贴代码就行了：

![添加宏示意](https://zedo-img.netlify.app/img/2026-04/12201609.png)

> 这里有一个专栏作为入门也挺不错的，有兴趣可以看看：[Office 自动化（VBA 与 JSA）| nutix - 博客园](https://www.cnblogs.com/nutix/category/615735.html)。

### 快捷运行宏

每次都要打开宏编辑器执行函数是比较麻烦的，好在 WPS 支持添加自定义功能。以下是添加步骤：

依次点击左上角的“**文件**”——“**选项**”，打开选项面板。

把写好的函数（`function`）按下图提示操作添加即可：

![自定义功能区演示](https://zedo-img.netlify.app/img/2026-04/15221909.png)

然后就可以在上方选项卡看到我们自定义的函数，只需要鼠标单击就能运行：

![自定义功能示意](https://zedo-img.netlify.app/img/2026-04/15221818.png)

::: warning 注意

默认可通过 WPS 宏编辑器直接运行的是**不带参数**的函数。

以下代码的功能时弹出窗口，显示当前编辑的文件名：

```js
function test1() {
    MsgBox(ActiveDocument.Name);
}

function test2(s) {
    if (!s) s = ActiveDocument.Name;
    MsgBox(s);
}

function test3() {
    test2();
}
```

1. 当鼠标停在定义 `test` 函数的任何某一行的范围内时，点击宏编辑器的“运行宏”按钮或者按下<kbd>F5</kbd>就可以运行对应函数。
1. 鼠标停在 $1-3$ 行时会运行 `test1`、停在 $10-12$ 行时会运行 `test3`。
1. 当函数具有参数、或者鼠标停在函数定义以外的空行时，会弹出“宏”窗口，让你选择宏再执行。
1. 鼠标停在 $4-9$ 行时都会弹出窗口，而不是执行函数。

为了在点击“运行宏”的时候避免宏数量太多产生干扰，我就会给部分函数加了一个未使用的参数 `_`，例如 [简单公文排版](jsa-word.md#代码部分) 中的 `全文字体段落设置(_)`。

:::

## 代码提示

## 弹窗、输出调试

- `MsgBox()` 可以产生一个弹窗，有多种弹窗，详见文档
- `Console.log()` 输出到 “立即窗口” 中，小写的 `console` 好像用不了
- `InputBox()` 可以允许用户输入内容的对话框

当然，更建议打断点调试，因为支持“快速监视”变量。

## ActiveDocument 与 Selection

> 此部分包含 AI 生成内容。

在 WPS JSA（以及 VBA）中，`ActiveDocument` 和 `Selection` 是两个最基础、最常用的对象。理解它们的区别和联系，是编写自动化脚本的关键。

### ActiveDocument：文档对象

`ActiveDocument` 代表当前 WPS 中**处于活动状态的文档**（即当前获得焦点的那个文档窗口）。

- 它是一个 **文档级别的对象**，可以访问整个文档的全部内容、属性（如页边距、样式）、集合（如段落、表格、图片）等。
- 无论光标在哪里，`ActiveDocument` 始终指向当前正在操作的文档。

常用属性和方法：

| 属性/方法           | 说明                               | 示例                                        |
| ------------------- | ---------------------------------- | ------------------------------------------- |
| `Content`           | 返回文档的全文范围（`Range` 对象） | `ActiveDocument.Content.Font.Size = 12`     |
| `Paragraphs`        | 文档中的所有段落集合               | `ActiveDocument.Paragraphs.Count`           |
| `Sections`          | 文档中的所有节集合                 | `ActiveDocument.Sections.Item(1).PageSetup` |
| `InlineShapes`      | 嵌入型图片集合                     | `ActiveDocument.InlineShapes.Count`         |
| `Save()`            | 保存文档                           | `ActiveDocument.Save()`                     |
| `Close()`           | 关闭文档                           | `ActiveDocument.Close()`                    |
| `Range(start, end)` | 按位置创建范围                     | `ActiveDocument.Range(0, 100)`              |

修改全文字体的示例：

```js
function 全文设置为仿宋() {
    const doc = ActiveDocument;
    doc.Content.Font.NameFarEast = "仿宋_GB2312";
    doc.Content.Font.Size = 16; // 三号 = 16磅
}
```

### Selection：选区对象

`Selection` 代表当前文档中**被选中的区域**（如果什么都没选，则代表**光标插入点**的位置）。

- 它是一个 **用户交互层面的对象**，反映用户当前高亮或光标所在的位置。
- 可以获取或设置选中的文本、格式，也可以移动、扩展选区。

常用属性和方法：

| 属性/方法       | 说明                                                                        | 示例                                           |
| --------------- | --------------------------------------------------------------------------- | ---------------------------------------------- |
| `Range`         | 返回选区对应的 `Range` 对象                                                 | `Selection.Range`                              |
| `Text`          | 选中的文本内容（可读写）                                                    | `Selection.Text = "Hello"`                     |
| `Start` / `End` | 选区起始/结束位置（字符索引）                                               | `let len = Selection.End - Selection.Start`    |
| `Type`          | 选区类型（如 `wdSelectionIP` 表示光标，`wdSelectionNormal` 表示有选中内容） | `if (Selection.Type == wdSelectionIP) { ... }` |
| `WholeStory()`  | 选中整个故事（通常为全文）                                                  | `Selection.WholeStory()`                       |

示例：获取用户选中的文本并加粗

```js
function 加粗选中文字() {
    if (Selection.Type === wdSelectionNormal) {
        Selection.Range.Font.Bold = true;
    } else {
        MsgBox("请先选中一些文字");
    }
}
```

### 两者的联系与配合

- **从 `Selection` 获取文档**：`Selection.Range.Parent` 或直接用 `ActiveDocument`（因为 `Selection` 一定属于 `ActiveDocument`）。
- **用 `Range` 对象桥梁**：`Selection.Range` 返回一个 `Range` 对象，可以基于它做精细操作；`ActiveDocument.Range()` 创建的新范围与 `Selection` 无关。

将光标所在段落设置为正文样式的示例：

```js
function 光标所在段落设为标题() {
    const para = Selection.Paragraphs.Item(1); // 当前光标所在的段落
    para.Range.Style = ActiveDocument.Styles("正文");
}
```

> 注意：`Selection.Paragraphs.Item(1)` 返回光标所在的整个段落（即使光标只在该段中的某个字符上）。

## Range：范围对象

### 什么是 Range？

如果说 `ActiveDocument` 是“整本书”，`Selection` 是“读者高亮的那一行”，那么 `Range` 就是可以随心裁剪、粘贴、改写的那张“纸片”， 它是 WPS 文档自动化中最强大、最灵活的对象。

`Range` 代表文档中一段**连续的、有起点和终点**的区域。它**不依赖于用户界面**——即使文档没有被选中任何内容，你依然可以创建、修改、删除任意范围的 `Range` 对象。

- `Range` 有自己的起始位置（`Start`）和结束位置（`End`），单位是**字符索引**（从 0 开始计数）。
- `Range` 可以小到一个光标点（`Start == End`），大到整个文档（`Start=0, End=文档总字符数`）。
- `Range` 可以独立存在，不影响用户的 `Selection`，也不会被用户的鼠标点击改变（除非你主动同步）。

> **类比**：`Selection` 是“你用手指在纸上划出的高亮区域”，而 `Range` 是“你心中计划要剪下来的那块区域”——不一定高亮显示，但你可以随时操作它。

---

如何创建 Range？

从 ActiveDocument 创建：

```js
// 创建从第 10 个字符到第 20 个字符的区域（不包含第 20 个字符）
let rng = ActiveDocument.Range(10, 20);

// 创建全文范围
let fullRange = ActiveDocument.Content; // 等价于 ActiveDocument.Range(0, 文档总长度)

// 创建光标当前位置的范围（长度为 0）
let insertionRange = ActiveDocument.Range(Selection.Start, Selection.Start);
```

从 Selection 获取：

```js
let selectedRange = Selection.Range; // 返回当前选中的区域（若未选中，长度为 0）
```

从 Paragraph 获取：

```js
let rng = ActiveDocument.Paragraphs.Item(1).Range; // 获取第一段的范围
```

通过复制已有 Range 创建

```js
let newRange = oldRange.Duplicate; // 复制一份，独立修改
```

---

### Range 的常用属性和方法

| 属性/方法                          | 说明                              | 示例                                       |
| ---------------------------------- | --------------------------------- | ------------------------------------------ |
| `Start` / `End`                    | 起始和结束位置（字符索引）        | `rng.Start = 100;`                         |
| `Text`                             | 区域内的纯文本（可读写）          | `let txt = rng.Text; rng.Text = "新内容";` |
| `Font` / `ParagraphFormat`         | 字体、段落格式对象                | `rng.Font.Bold = true;`                    |
| `Style`                            | 样式                              | `rng.Style = "标题1";`                     |
| `Select()`                         | 让此 Range 成为用户可见的选中区域 | `rng.Select();`                            |
| `InsertBefore()` / `InsertAfter()` | 在区域前/后插入文本               | `rng.InsertBefore("前缀 ");`               |

### Range 与 Selection 的区别

| 特性         | Selection                      | Range                         |
| ------------ | ------------------------------ | ----------------------------- |
| **可见性**   | 用户可见（高亮或光标闪烁）     | 不可见（除非调用 `Select()`） |
| **稳定性**   | 随用户点击、键盘操作实时变化   | 一旦创建，不随用户操作改变    |
| **操作速度** | 每次读写可能触发界面刷新，稍慢 | 纯内存操作，速度快            |
| **典型用途** | 需要用户交互、录制宏、定位光标 | 批量处理、后台修改、精细定位  |

> **最佳实践**：优先使用 `Range` 而非 `Selection` 进行文档内容修改，除非你的目的就是模拟用户操作或让用户看到过程。

---

### 常用示例

示例 1：将文档中所有的“WPS”替换为“金山办公”

```js
function 替换文本() {
    let rng = ActiveDocument.Content;
    rng.Find.Execute("WPS", true, 1, false, false, false, true, 1, true, "金山办公", 2);
    // 参数说明：查找文本、区分大小写、全字匹配、通配符、同音、同形、查找方向、段落区分、格式匹配、替换文本、替换个数(2=全部)
}
```

示例 2：获取第 3 段的文本并加粗

```js
function 加粗第三段() {
    let paraRange = ActiveDocument.Paragraphs.Item(3).Range;
    MsgBox(paraRange.Text);
    paraRange.Font.Bold = true;
}
```

示例 3：删除文档中所有空段落（只包含回车符的段落）

```js
function 删除空段落() {
    let rng = ActiveDocument.Content;
    // 查找连续两个段落标记（表示空行）
    rng.Find.ClearFormatting();
    rng.Find.Replacement.ClearFormatting();
    rng.Find.Execute("^p^p", true, 1, false, false, false, true, 1, false, "^p", 2);
}
```

示例 4：将光标所在的句子改为红色

```js
function 红字当前句() {
    let sentenceRange = Selection.Range.Sentences.Item(1);
    sentenceRange.Font.Color = wdColorRed;
}
```

> `Sentences` 集合是 `Range` 对象的属性，可以按句子边界操作。

示例 5：在两个书签之间插入内容

```js
function 在书签间插入() {
    let startBookmark = ActiveDocument.Bookmarks("开始位置").Range.End;
    let endBookmark = ActiveDocument.Bookmarks("结束位置").Range.Start;
    let insertRange = ActiveDocument.Range(startBookmark, endBookmark);
    insertRange.Text = "这是新插入的内容";
}
```

### Range 的边界陷阱与注意事项

字符索引的计数规则

- 每个**可见字符**（汉字、字母、数字、标点）算 1 个位置。
- 段落标记 `\r` （回车符）也占 1 个位置。
- 嵌入型图片、域代码、公式等也各占 1 个位置（通常显示为特殊占位符）。

```js
let doc = ActiveDocument;
let fullText = doc.Content.Text;
MsgBox("文档总字符数（含段落标记）：" + fullText.length);
```

修改 `Range` 内容后，原位置可能失效

```js
let rng = ActiveDocument.Range(10, 20);
rng.Text = "新文本"; // 长度改变
// 此时 rng 的 Start/End 会自动调整，但最好重新获取
let newStart = rng.Start; // 可能不再是 10
```

使用 `Duplicate` 保留副本

```js
let rng = ActiveDocument.Range(100, 200);
let copyRng = rng.Duplicate; // 独立副本
rng.Text = "改变原范围";
copyRng.Font.Bold = true; // 不影响原范围
```

越界安全

- 当 `Start` 或 `End` 超过文档长度时，WPS 会自动钳制到文档末尾。
- 建议创建范围前先检查文档长度。

```js
let docLen = ActiveDocument.Content.End;
let safeStart = Math.min(100, docLen);
let safeEnd = Math.min(200, docLen);
let rng = ActiveDocument.Range(safeStart, safeEnd);
```

## 长度单位转换

官网 `CentimetersToPoints` [^2] 的定义是：将度量单位由厘米转换为磅数（$1$ 厘米= $28.35$ 磅）。

实际上，国际标准：

- $1$ 磅 (pt) = $1/72$ 英寸 (in)
- $1$ 英寸 = $2.54$ 厘米（精确值）
  所以 $\rm 1cm =\frac{1}{2.54}\times 72pt=28.346456\cdots pt\approx 28.35pt$

有的 WPS 版本（多为 Linux 版）可能用不了 `CentimetersToPoints`，可以自己定义：

```js
/**
 * 厘米转磅值
 * 不想打这么长的函数名也可以用：cm2pt
 */
function CentimetersToPoints(cm) {
    return cm * (72 / 2.54); // 或者直接 cm * 28.35
}
```

## 三态布尔值

这里主要讲一下 `True` 和 `MsoTrue`：

- `true` 是 JavaScript 语言本身的**布尔值**。
- `msoTrue` 是 WPS/Word 宏中的一个常量，且 `msoTrue = -1`，`msoFalse = 0`。很多录制出来的代码中会大量出现 `-1` 这个值，其实就是 `msoTrue`。

普通的 `true` / `false` 只能表示“是”或“否”两种状态。而 `MsoTriState` 是一个 **三态布尔值**，除了 `msoTrue` 和 `msoFalse`，还有 `msoTriStateMixed` 这种表示“混合”状态的取值：

| MsoTriState 名称 | 值  |
| ---------------- | --- |
| msoTrue          | -1  |
| msoFalse         | 0   |
| msoTriStateMixed | -2  |

在 MS Office VBA 和 WPS JSA 的文档中都能找到：

- [VBA MsoTriState 枚举 (Office) - 微软 Learn](https://learn.microsoft.com/zh-cn/office/vba/api/office.msotristate)
- [JSA MsoTriState 枚举 - WPS 开放平台](https://open.wps.cn/documents/app-integration-dev/wps365/client/wpsoffice/jsapi/kso/enum/MsoTriState)

::: info

虽然没找到专门解释三态布尔值的文档，但是文档 [表格API - Shape.Child](https://open.wps.cn/documents/app-integration-dev/wps365/client/wpsoffice/jsapi/et/Shape/member/Child#说明) 提到：

- 如果选择的形状是子形状，则为 `msoTrue` 。
- 如果选择的形状不是子形状，则为 `msoFalse` 。
- 如果只有一些选择的形状是子形状，则为 `msoTriStateMixed`。

:::

那么我们可以推断：段落中的文字既有加粗（`msoTrue`）又有非加粗的（`msoFalse`），所以整个段落的加粗属性是混合的（ `msoTriStateMixed`）。实际上， `Font.Bold` 确实可以用 `msoTrue` 和 `true` 两种赋值来加粗。

类似地，因为段落中是否添加间距的属性可以是混合的，所以录制段落操作的代码中出现了如下赋值为 `-1`（`msoTrue`）的语句：

```js
obj.AddSpaceBetweenFarEastAndAlpha = -1; // 中文、英文之间添加间距
obj.AddSpaceBetweenFarEastAndDigit = -1; // 中文、数字之间添加间距
```

一些全局对象：

- `Application` word 应用本身
- `Documents` 当前打开的所有文件
- `ActiveDocument` 活跃文档
- `ActiveWindow` 活跃窗口
- `Selection` 用户选中内容

---

[^1]: [JavaScript 运行时说明](https://open.wps.cn/documents/app-integration-dev/wps365/client/wpsoffice/jsapi/macro-editor-api/javascript-runtime-instructions)

[^2]: [Application.CentimetersToPoints](https://open.wps.cn/documents/app-integration-dev/wps365/client/wpsoffice/jsapi/wps/Application/member/CentimetersToPoints)
