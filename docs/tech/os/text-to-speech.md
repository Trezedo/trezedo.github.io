---
icon: material-symbols:text-to-speech
date: 2026-03-22
created: 2022-02-25
modified: 2026-03-23
excerpt: 介绍 Web Speech API 的基本用法，讲解 Windows 平台下 SAPI 与 OneCore 语音引擎的区别，提供查询、激活本地语音包的脚本及手动配置方法。
category:
    - javascript
    - windows
tag:
    - 语音合成
    - 注册表
    - powershell
---

# Web 语音合成与 Windows 语音包配置

## Web Speech API

**Web Speech API** 是浏览器提供的一组 JavaScript 接口，让网页能够实现**语音合成**（文本转语音，Text To Speech，缩写为 TTS）和**语音识别**（语音转文字），无需安装额外插件。它由 W3C 制定，是现代浏览器（Chrome、Edge、Firefox、Safari 等）普遍支持的标准。

你可以打开控制台尝试以下示例：

```js
function speak(text) {
    let utter = new SpeechSynthesisUtterance(); // 创建实例
    utter.text = text; // 要朗读的文本
    utter.rate = 1.0; // 语速（0.1~10）
    utter.pitch = 1.0; // 音调（0~2）

    // 获取可用语音列表，建议异步加载
    let voices = speechSynthesis.getVoices();
    if (voices.length > 0) {
        utter.voice = voices[0];
        utter.lang = utter.voice.lang;
    }
    speechSynthesis.speak(utter);
}

speak("你好，我是 OneCore 语音引擎");
```

以下是一个 TTS 实例，您可以做出以下调整：

- 选择发音语言；
- 选择音色（有些语言只有一种选择）；
- 修改语速；
- 修改音调；

<TTS />

::: warning

TTS 仅支持以下浏览器：

- PC：Chrome, Edge, Firefox, Opera, Safari
- 移动设备：Chrome Android，Firefox Android，Safari on iOS，Samsung Internet

==不支持 WebView Android==。请查看：[SpeechSynthesis - MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/SpeechSynthesis#浏览器兼容性)。

音色的调整在移动设备可能无效。

:::

::: tip

微软的 Edge 浏览器自带了很多种不同语言的（在线）语音包，如 Windows 版本：

![Windows 上的 Edge 浏览器语音包](https://zedo-img.netlify.app/img/2022-03/13091116.png)

:::

## SAPI 与 OneCore

**SAPI**（Speech API）主要用于**传统桌面应用程序**的语音合成与识别，典型场景包括：

- **桌面朗读软件**：如文本转语音工具、电子书朗读、辅助功能（讲述人）。
- **语音控制**：需要语音识别的桌面应用（如语音命令、听写）。
- **办公软件**：如 Word 的朗读功能，早期依靠 SAPI。
- **浏览器降级方案**：在 Windows 上，**Firefox** 使用 SAPI 作为 Web Speech API 的后端（而 Chrome/Edge 则使用 OneCore 语音）。

以前 Win 7 甚至是 XP 时期，你可能见过如下调用 SAPI 的 vbs 脚本：

```vb
Dim text, spk
text = "你好，我是 Speech API"
Set speech = CreateObject("SAPI.SpVoice")    ' 实际上不区分大小写
Set speech.Voice = speech.GetVoices.Item(0)  ' 音色序号，见下文
speech.Rate = 1.0   ' 速率
speech.Speak text   ' 朗读
```

> 需要保存为 `ANSI` 编码的 `.vbs` 后缀文件，双击运行。
> 如果是 `UTF-8` 编码，读出来可能是“乱码”（发音类似“换柴分身剁团 Speech API”）。

或者，你可以直接粘贴到 PowerShell 体验类似的效果：

```powershell
$text = "你好，我是 Speech API"  # 要朗读的文本
$speech = New-Object -ComObject SAPI.SpVoice  # 创建 SpVoice 对象
$speech.Voice = $speech.GetVoices().Item(0)   # 设置音色（第一个语音）
$speech.Rate = 1       # 设置语速（范围 -10 到 10，默认 0）
$speech.Speak($text)   # 朗读
```

说明：

- `GetVoices().Item(0)` 获取第一个可用语音（索引从 `0` 开始）。
- `Rate` 和 `Volume` 的取值与 VBScript 中一致。
- 直接调用 `Speak` 方法即可朗读文本。

## 查询本地语音包

如果你想查看 Windows 系统有哪些可用语音，可以执行：

::: tabs

@tab PowerShell

```powershell
$i = 0;
$voice = New-Object -ComObject SAPI.SpVoice
$voice.GetVoices() | % { "{0,3}: {1}`n" -f $i++, $_.GetDescription() }
```

@tab VB Script

```vb
'显示语音库列表
dim vList
Set VObj = CreateObject("SAPI.SpVoice")
For Each Voice In VObj.GetVoices
    i = i + 1
    vList = vList & "   " & (i - 1) & " - " & Voice.GetDescription & vbcrlf
Next
msgbox vList, 64, "List"
```

复制以上代码保存为 `.vbs` 文件，双击运行。打开后的结果如下，有些电脑可能只有两个语音包：

![当前语音列表](https://zedo-img.netlify.app/img/2022-02/25090022.png)

:::

下面是按注册表读取所有语音列表的脚本：

```powershell
# 函数：从指定注册表路径读取语音列表
function Get-VoicesFromRegistry {
    param(
        [string]$RegistryPath,
        [string]$Title = "语音列表"
    )
    $voices = Get-ChildItem $RegistryPath -ErrorAction SilentlyContinue
    if (-not $voices) {
        Write-Host "$Title：无" -ForegroundColor Yellow
        return
    }
    $index = 0
 foreach ($voice in $voices) {
        # 获取该注册表项的所有属性
        $props = Get-ItemProperty -Path $voice.PSPath
        # 按优先级获取描述：默认值 > Lang > 项名
        $desc = $props.'(default)'
        if (-not $desc) { $desc = $props.Lang }
        if (-not $desc) { $desc = $voice.PSChildName }
        Write-Host ("{0,3}: {1}" -f $index, $desc)
        $index++
    }
}

# 1. SAPI 语音（64 位）
Write-Host "`n【SAPI 语音（64 位应用）】" -ForegroundColor Cyan
Get-VoicesFromRegistry -RegistryPath "HKLM:\SOFTWARE\Microsoft\Speech\Voices\Tokens"

# 2. SAPI 语音（32 位，WOW6432Node）
Write-Host "`n【SAPI 语音（32 位应用）】" -ForegroundColor Cyan
Get-VoicesFromRegistry -RegistryPath "HKLM:\SOFTWARE\WOW6432Node\Microsoft\SPEECH\Voices\Tokens"

# 3. OneCore 语音
Write-Host "`n【OneCore 语音（UWP 应用）】" -ForegroundColor Cyan
Get-VoicesFromRegistry -RegistryPath "HKLM:\SOFTWARE\Microsoft\Speech_OneCore\Voices\Tokens"

Write-Host "`n按回车键继续..." -ForegroundColor Gray;Read-Host
```

输出如下：

```text
【SAPI 语音（64 位应用）】
  0: Microsoft Zira Desktop - English (United States)
  1: Microsoft Huihui Desktop - Chinese (Simplified)

【SAPI 语音（32 位应用）】
  0: Microsoft Zira Desktop - English (United States)
  1: Microsoft Huihui Desktop - Chinese (Simplified)

【OneCore 语音（UWP 应用）】
  0: Microsoft Huihui - Chinese (Simplified, PRC)
  1: Microsoft Kangkang - Chinese (Simplified, PRC)
  2: Microsoft Yaoyao - Chinese (Simplified, PRC)
```

## 激活语音包

Windows 10 默认安装了多个 TTS 语音引擎，但部分语音可能不会出现在 SAPI 语音列表（即上方 [查询本地语音包](#查询本地语音包) 的结果）中。这些语音通常属于 **OneCore** 语音引擎，被 Edge 浏览器等 UWP 应用使用，它们通常位于：

```text
%WinDir%\Speech_OneCore\Engines\TTS\
```

比如我们的电脑应该会是 `zh-CN` 和 `en-US` 两个文件夹，里面的内容就是语音引擎。打开 `zh-CN` 目录查看是否存在 `Hongyu` 等语音：

![Hongyu 语音包文件](https://zedo-img.netlify.app/img/2022-02/25221825.png)

可以打开设置查看还有那些语音库：

![语音列表](https://zedo-img.netlify.app/img/2022-02/25210747.png)

可以发现，这里比之前的列表多了几个：

- Microsoft Yaoyao
- Microsoft Kangkang
- Microsoft Mark

### 方法一：使用 脚本批量激活（推荐）

以下脚本将 **OneCore 语音引擎**的注册表项复制到 **经典 SAPI 语音** （如 `SAPI.SpVoice`）的注册表位置，使这些语音能够被传统的桌面应用程序（如语音合成工具、屏幕阅读器等）识别和使用：

```powershell
$src = 'HKLM:\software\Microsoft\Speech_OneCore\Voices\Tokens'        # OneCore
$dst64 = 'HKLM:\SOFTWARE\Microsoft\Speech\Voices\Tokens'              # 64位 SAPI
$dst32 = 'HKLM:\SOFTWARE\WOW6432Node\Microsoft\SPEECH\Voices\Tokens'  # 32位 SAPI

$voices = Get-ChildItem $src
$voices | ForEach-Object {
    copy -Path $_.PSPath -Destination $dst64 -Recurse
    copy -Path $_.PSPath -Destination $dst32 -Recurse
}
```

> 需要以管理员身份运行，可能需要重启电脑才生效。
>
> 脚本修改自：[How do I add a voice / language to speechSynthesis? - StackOverflow](https://stackoverflow.com/questions/47379725/how-do-i-add-a-voice-language-to-speechsynthesis)

值得注意的是，运行上述脚本之后会有重复的语音，因为注册表目录的名称不一样。这时再次查询就会发现：

![本地可用语音列表](https://zedo-img.netlify.app/img/2022-02/26142839.png)

上图可以看到多出来 6 个语音，其中三个是重复的，仅仅是名称不一样而已。

### 方法二：手动添加注册表项

若只需添加特定语音（如 `Microsoft Hongyu`），可参考以下 `.reg` 文件内容（适用于 64 位系统，32 位程序需修改路径）。但此方法较繁琐，推荐使用方法一。

由于实测发现需要增加的注册表项太多才能生效，因此以下仅给出 `Hongyu` 的代码（64 位浏览器）：

```ini
Windows Registry Editor Version 5.00

[HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\SPEECH\Voices\Tokens\TTS_MS_ZH-CN_HONGYU_11.0]
@="Microsoft Hongyu Mobile - Chinese (Simplified)"
"LangDataPath"="%WinDir%\\Speech_OneCore\\Engines\\TTS\\zh-CN\\MSTTSLoczhCN.dat"
"VoicePath"="%WinDir%\\Speech_OneCore\\Engines\\TTS\\zh-CN\\M2052Hongyu"
"804"="Microsoft Hongyu Mobile - Chinese (Simplified)"
"CLSID"="{179F3D56-1B0B-42B2-A962-59B7EF59FE1B}"

[HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\SPEECH\Voices\Tokens\TTS_MS_ZH-CN_HONGYU_11.0\Attributes]
"Version"="11.0"
"Language"="804"
"Gender"="Female"
"Age"="Adult"
"SharedPronunciation"=""
"Name"="Microsoft Hongyu Mobile"
"Vendor"="Microsoft"
"SampleText"="您已选择 %1 作为默认语音"
```

对于 32 位浏览器，需在方括号中的 `SOFTWARE\Microsoft` 之间增加一个 `WOW6432Node`。例如：

```diff
  [HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\SPEECH\Voices\Tokens\TTS_MS_ZH-CN_HONGYU_11.0]
+ [HKEY_LOCAL_MACHINE\SOFTWARE\WOW6432Node\Microsoft\SPEECH\Voices\Tokens\TTS_MS_ZH-CN_HONGYU_11.0]
```

## 添加语音包

windows 10 系统可以依次打开下列设置项来增加语音包：

“**时间和语言**” $\to$ “**语音**” $\to$ “**管理语音**” $\to$ “**添加语音**”

![管理语音](https://zedo-img.netlify.app/img/2022-02/25210541.png)

![选择语音包](https://zedo-img.netlify.app/img/2022-02/25210630.png)

## 百度 TTS

来自百度翻译的语音朗读：

```text
https://fanyi.baidu.com/gettts?lan=zh&spd=5&source=web&text=文本
```

其中 `spd` 是速度，`lan` 是语言，`text` 是文本。需要注意，文本最好先用 `encodeURI` 函数转义。

但是实测无法在 Web 浏览器中通过 `audio` 标签播放（而 Obsidian、Typora 等 markdown 编辑器当中可以）：

<audio controls>
    <source
        src="https://fanyi.baidu.com/gettts?lan=zh&spd=5&source=web&text=%E7%99%BE%E5%BA%A6TTS%E6%B5%8B%E8%AF%95"
        type="audio/mpeg"
    />
    您的浏览器不支持 audio 元素。
</audio>

可以发现，以上是无法直接播放的。如果我们直接打开这个 [链接](https://fanyi.baidu.com/gettts?lan=zh&spd=5&source=web&text=%E7%99%BE%E5%BA%A6TTS%E6%B5%8B%E8%AF%95)，会发现它会让我们下载一个 `mp3` 文件，通过查看网络请求记录可以发现，它返回的 MIME 类型为 `text/html`，而手动打开时它才是下载 `mp3` 文件，导致 `audio` 无法播放。

针对这个问题，可以使用在 [免费接口](../../blog/free-api.md) 中介绍的免费 api，这里直接给出：

- <http://api.weijieyue.cn/api/?id=46> 19 种音色
- <https://yuanxiapi.cn/api/voice/voice.php> 6 种音色
- <https://api.vvhan.com/song.html> 6 种音色
- <http://w20.cc/api/suo.php?nr=tts> 加载较慢
