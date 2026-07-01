---
icon: picon:js
date: 2026-05-14
category:
    - javascript
    - wps
tag:
    - javascript
    - wps
---

# WPS 加载项开发

```xml
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<jsplugins>
  <jsplugin name="test" type="wps" version="1.0.0" url="file:///C:/Users/zedo/AppData/Roaming/kingsoft/wps/jsaddons/test_1.0.0" />
</jsplugins>
```

windows： `%AppData%\kingsoft\wps\jsaddons`
Linux（银河麒麟）： `$HOME/.local/share/Kingsoft/wps/jsaddons/`

windows: `publish.xml`
linux：`jsplugins.xml`

内容参考如下：

```xml
<jsplugins>
  <jsplugin type="wps" name="zdoc" version="1.0.0" url="file:///C:/Users/你的用户名/AppData/Roaming/kingsoft/wps/jsaddons/zdoc_1.0.0" />
</jsplugins>
```

如果是 linux：

```xml
<jsplugins>
  <jsplugin name="zdoc" type="wps" url="file:///home/你的用户名/.local/share/Kingsoft/wps/jsaddons/zdoc_1.0.0/" version="1.0.0" />
</jsplugins>
```

type：可选 wps、et、wpp
大多数 WPS 版本要求 `url` 指向**解压后的文件夹路径**，而不是压缩包（官网介绍的方式）。

[WPS加载项老是有个报错Main resource content verificat，有没有影响？](https://bbs.wps.cn/topic/80583#comment)
[关于加载项开发中枚举的使用方法](https://bbs.wps.cn/topic/55944#comment)
[如何使用wdAlignPageNumberCenter常量？](https://bbs.wps.cn/topic/42280)
[WPS加载项 中 文字API中没有Inputbox，用替代方法没？](https://bbs.wps.cn/topic/41051)

解压（自动覆盖旧版）：

```sh
7z x ./zdoc.7z -o$HOME/.local/share/Kingsoft/wps/jsaddons -aoa
```

实测银河麒麟 V 10 桌面版使用的是 `jsplugins.xml`，编辑器打开：

```sh
pluma ~/.local/share/Kingsoft/wps/jsaddons/jsplugins.xml
```

打开 WPS 后提示“是否信任”，且开发工具 -WPS 加载项中也启用了，但是没有选项卡（即 CustomUI）

```sh
# 完全退出 WPS（所有组件）
killall wps wpp et 2>/dev/null

# 删除 WPS 的临时配置缓存
rm -rf ~/.config/Kingsoft/wps/jsaddons/cache
rm -rf ~/.local/share/Kingsoft/wps/jsaddons/.cache
```

C:\Users\zedo\AppData\Roaming\kingsoft\office6\cache
C:\Users\zedo\AppData\Roaming\kingsoft\wps\addons\data\win-i 386\cef\1.25\jsapi\cache
C:\Users\zedo\AppData\Roaming\kingsoft\wps\addons\data\win-i 386\cef\1.25\kweboptioncenter
C:\Users\zedo\AppData\Roaming\kingsoft\wps\addons\data\win-i 386\cef\1.25\docers

** `writeFileString` 是一个“比较老”的 API**，它**不能接受完整的文件路径**，只能接受**文件名**，文件最终会被写入浏览器的缓存路径中，因此常与 `readFileString` 配合使用，会报错：

```text
path cannot contains "/" or "\"
```

[加载项 API 中的 FileSystem.writeFileString 错误](https://bbs.wps.cn/topic/44109)
并且

```js
Application.FileSystem.writeFileString("data.json", JSON.stringify(data));
/* 
在以下路径找到该文件，且该文件以 ANSI 编码保存：

C:\Users\zedo\AppData\Roaming\kingsoft\wps\addons\data\
win-i386\cef\globalcache\jsapi\filesystem\data.json
*/
```

[FileSystem.WriteFile](https://open.wps.cn/documents/app-integration-dev/wps365/client/wpsoffice/jsapi/addin-api/FileSystem/member/WriteFile) 文档中 `WriteFile` 函数描述有错误，实际上有两个参数（和 `writeFileString` 一致），文档中仅有一个参数。

只设置 `Font.NameFarEast` 和 `Font.NameAscii`，不设置 `Font.Name`，可能会导致部分中文符号比如全角双引号 `“”` 显示“英文宽度的中文引号”（半角宽，但形状是弯的中文引号）。这 3 个属性的设置入口分别对应【按下 Ctrl+D 之后的“中文字体”、“西文字体“】以及【“开始”菜单下的字体】。
有两种解决方式，一个是设置 `Font.Name` 与 `Font.NameFarEast` 一致，另一个则是设置 `CharacterWidth = wdWidthFullWidth`（该常量值为 `7`）

[揭秘 WPS JS API 底层机制：深入宿主环境与运行时上下文的 5 个关键原理](https://wenku.csdn.net/column/5u5ywjpdi9)

[分享一个老毛子编的好东东 RibbonXMLEditor_9.4.3](https://club.excelhome.net/thread-1707592-2-1.html)

[WPS表格加载项之CustomUI](https://blog.csdn.net/2301_76975923/article/details/149756803)

[WPS 图标 imageMso 简单汇总（520 个）](https://club.excelhome.net/thread-1712707-1-1.html)
[让 WPS 个人版完美显示公文排版助手图标](https://xkonglong.com/posts/wps-icon/)
[Qt Resource Compiler and Decompiler](https://github.com/zedxxx/rccextended/releases)

```batch
rcc --reverse your_file.rcc > nul 2>&1
```
