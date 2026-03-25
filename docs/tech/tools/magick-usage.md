---
icon: streamline:magic-wand-2-solid
date: 2022-08-15
modified: 2026-03-23
category:
    - 图像处理
tag:
    - image-magick
---

# 使用 Image Magick 处理图片

## 转换格式

这里主要是转换 svg 格式的图片。最初的目的是转换由 graphviz 输出的 svg。

网上的在线转换 svg 图片工具都比较模糊，当然也有比较清晰的，例如 [ConvertIO](https://convertio.co/zh/svg-png/)，但是从上传到下载，花了不少时间，而且中文文字容易丢失。

然后就在 [stackoverflow](https://stackoverflow.com/questions/14784405/how-to-set-the-output-size-in-graphviz-for-the-dot-format) 上搜到了 Image Magick 这个东西，进一步搜索，于是有了这篇文章。

magick 转换 svg 为 png 格式的图片十分简单：

```sh
magick in.svg out.png
```

使用 density 选项可以更加清晰，图片体积也会些许增大：

```sh
magick -density 200 in.svg out.png
```

density 的取值越高输出的图片越清晰，建议取值的范围是 $[200, 400]$ ，取到 400 时已经十分清晰了。

> 从这看到的：[convert svg to png using imagemagick](https://stackoverflow.com/questions/9530524/convert-svg-to-transparent-png-with-antialiasing-using-imagemagick)。
>
> 从 [官方文档](https://imagemagick.org/script/command-line-tools.php) 看来，`magick` 相当于 `magick convert` 的缩写。

如果还想对输出的图片进行缩放，可以用 resize 选项：

```sh
magick -density 200 in.svg -resize 200% out.png
```

但是从我本人的使用经验来看，svg 图片不建议用 `resize` 缩放，因为会增大图片体积，并且只要不是 `100%` 就会增大！

部分特殊字符在转换后可能不符合预期（），目前我发现的有下标 n：`ₙ`，以它为例，可以在 svg 中用 [`tspan`](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Element/tspan) 标签代替这个特殊字符：

```xml
<tspan font-size="10" dx="0" dy="0">n</tspan>
```

。其中 dx,dy 是偏移量。

> 从 [这](https://stackoverflow.com/questions/12332448/subscripts-and-superscripts-in-svg) 找到的。了解更多：[svg 教程 - 中文翻译版](https://svg.brucewar.cn/)。

magick 转换 svg 时对字体处理得不是很好，它改变了设定的字体，且不能通过 `-font` 选项修改字体。虽然 [这个问题](https://stackoverflow.com/questions/9836998/converting-svg-with-custom-fonts-to-png-using-imagemagick) 很早之前 (2012 年) 就提出了，但是目前仍存在。

::: info

[inkscape](https://inkscape.org/) 是专门处理 svg 的，安装包 95.7MB，magick 安装包 38.0MB。

有评论说 inkscape 没有这个问题，我下载使用之后发现它确实没有 magick 的字体问题，基本上所见 (svg) 即所得 (png)，不过输出体积会大一些：

```sh
inkscape -d 240 in.svg -o out.png
```

其中 `-d` 代表调整 DPI（与 density 作用类似），`-o` 是 `--export-filename` 的简写。

使用 `-?` 或 `--help` 可查看帮助，更多请看对应的文档，此处不再介绍。

:::

## 添加水印

### 图片水印

假设水印图片名为“wm.png”，将 in.png 加水印得到 out.png 的操作是：

```sh
magick in.png -draw "image over 0,0 0,0 wm.png" out.png
```

如果想要覆盖原文件，可以使用 [mogrify](https://imagemagick.org/script/mogrify.php) 会覆盖原文件（除非修改后缀名），

```sh
magick mogrify -draw "image over 0,0 0,0 wm.png" in_out.png
```

可以结合其他选项使用，例如直接转换 svg 并添加水印：

```sh
magick -density 200 in.svg -draw "image over 0,0 0,0 wm.png" out.png
```

draw 选项的 image 语法为 `operator x0,y0 w,h filename`，x0，y0 代表偏移量，w，h 代表图形的宽高（图像大小）。可以使用 0,0 作为图像大小，这意味着使用图像标题中的实际尺寸，否则，它会缩放到给定的尺寸。filename 代表图片名，如果 filename 以数字开头就必须用引号包裹如 `'123.png'`。

> draw 参数参考：<https://imagemagick.org/script/command-line-options.php#draw>

over 表示源图片将在目标文件上方合成，以 'src-\*' 开头的方法省略 'src-' ，例如，默认的 'src-over' 可以简写为“over”。

> 详情请看：<https://imagemagick.org/script/compose.php>

上面的水印位置在左上角，如果要到其他位置，可以用 gravity：

```sh
magick in.png -draw "gravity SouthEast image over 0,0 0,0 water.png" out.png
# 也可在 draw 之外使用
magick in.png -gravity SouthEast -draw "image over 0,0 0,0 water.png" out.png
```

它可以通过 `-list gravity` 获取完整列表：

```sh
$ magick -list gravity
None
Center
East
Forget
NorthEast
North
NorthWest
SouthEast
South
SouthWest
West
```

> 最初是从这里得到该语句：<https://legacy.imagemagick.org/discourse-server/viewtopic.php?t=36765>

### 文字水印

如果是对 svg 加文字“水印”，可以加上一行：

```xml
<text x="0" y="0" fill="red" transform="rotate(30)">文字</text>
```

例如：

```xml
<svg width="400" height="400" style="background:#ffe;">
    <text x="10" y="10" fill="#1cc" transform="rotate(30)">文字</text>
</svg>
```

上面 [添加图片水印](#图片水印) 的 draw 参数其实也可以用来添加文字水印：

```sh
magick in.png -draw "fill red text 10,40 'Trezedo'" out.png
# 等价于
magick in.png -fill red -draw "text 10,40 'Trezedo'" out.png
```

text 后面的数字分别是 x、y 轴偏移量。fill 选项除了颜色名称，还支持 rgba 颜色，如 `rgba(0,120,255,0.5)`。

同样地，可以用 gravity 调整文字的位置，这里就不贴代码了，请看上文。

我们同样可以用 magick 生成一张纯文字的图片：

```sh
magick -background none -font SimHei -size 320x90 -fill "#1ac" label:文字 out.png
```

注意需要修改字体，否则不能正确显示中文。查看可用字体：

::: code-tabs
@tab linux

```sh
magick -list font | grep Font
```

@tab windows

```sh
:: chcp 65001 => 正确显示中文名称的字体，如方正字体
magick -list font | findstr Font
```

:::

> 对于含有特殊符号的字体，要用双引号包裹，例如微软雅黑：
>
> ```text
> -font "Microsoft-YaHei-&-Microsoft-YaHei-UI"
> ```

#### 复杂文字水印

下面的指令会添加较多水印，本人没做太多研究，出处：

<https://legacy.imagemagick.org/discourse-server/viewtopic.php?t=33189>

<https://stackoverflow.com/questions/69255234/add-watermark-like-this-image>

```sh
magick convert in.png ( -background none -pointsize 20 -fill rgba(0,120,215,0.1) label:"中文Trezedo" -rotate -20 -write mpr:tile +delete ) ( +clone -tile mpr:tile -draw "color 100,100 reset" ) -compose over -composite out.png

# 调整了字体
magick convert in.png ^
( -background none -rotate -20 ^
 -pointsize 48 -font Times-New-Roman -fill rgba(0,120,215,0.1) ^
label:"Trezedo" -write mpr:tile +delete ) ^
( +clone -tile mpr:tile -draw "color 100,100 reset" ) -compose over -composite out.png

# 水印比较稀疏
magick convert in.png ^
( -background none -rotate -20 -size 440x420 ^
 -pointsize 48 -font Times-New-Roman -fill rgba(0,120,215,0.1) ^
label:"Trezedo" -write mpr:tile +delete ) ^
( +clone -tile mpr:tile -resize 200% -draw "color 100,100 reset"  -chop 50%x50% ) -compose over -composite out.png
```

这些是可提供帮助的文档：

- [geometry](https://imagemagick.org/script/command-line-processing.php#geometry)
- mpr 是 Memory Program Register（内存程序寄存器），会把图片缓存到内存中：[Canvas Usage](https://imagemagick.org/Usage/canvas#tile_mpr)。
- [repeat or tile an image](https://stackoverflow.com/questions/8182801/using-imagemagick-to-repeat-or-tile-an-image)

转换 svg 和加水印不建议同时进行，因为文字水印也会受 density 选项影响，导致输出的图片体积增大。

### PDF 水印

本人未经过测试，但是看到了所以记录一下。

<https://github.com/ImageMagick/ImageMagick/discussions/2770>
