---
icon: change
description: 利用 Web Speech API 实现文本转语音，以及介绍了一些可方便使用的接口
date: 2022-02-25
---

# 文本转语音

## Web Speech API

核心代码：

```ts
function speak(text: string) {
    let utter = new SpeechSynthesisUtterance();
    utter.text = text;
    utter.rate = 1.0;
    utter.pitch = 1.0;
    let voices = speechSynthesis.getVoices();
    if (voices.length > 0) {
        utter.voice = voices[0];
        utter.lang = utter.voice.lang;
    }
    speechSynthesis.speak(utter);
}
```

以下是一个文本转语音（Text to Speech, TTS）的实例，您可以做出以下调整：

- 选择一门语言；

- 选择一种音色（有些语言只有一种选择）；
- 修改语速；
- 修改音调；

<TTS/>

::: warning

TTS 仅支持以下浏览器：

- PC：Chrome, Edge, Firefox, Opera, Safari
- 移动设备：Chrome Android，Firefox Android，Safari on iOS，Samsung Internet

==不支持 WebView Android==。请查看：[SpeechSynthesis](https://developer.mozilla.org/zh-CN/docs/Web/API/SpeechSynthesis#浏览器兼容)。

音色的调整在移动设备可能无效。

:::

### 查询语音包

本地可用的语音包可以通过以下 `vbs` 脚本实现查询：

```vb
'显示语音库列表
dim vlist
Set VObj = CreateObject("SAPI.SpVoice")
For Each Voice In VObj.getvoices
    i = i + 1
    vlist = vlist & "   " & (i - 1) & " - " & Voice.GetDescription & vbcrlf
Next
msgbox vList,64,"List"
```

::: tip

复制以上代码到新建文本文档，然后将后缀 `.txt` 改为 `.vbs`，双击打开即可。

注意需要保存为 `utf-8` 格式才有效。

:::

打开后的结果如下：

::: center

![20220225090022.png](https://zedo.gitee.io/img/20220225090022.png)

:::

有些电脑可能只有两个语音包。

::: tip

微软的 Edge 浏览器自带了很多种不同语言的（在线）语音包，如 Windows 版本：

![Windows上的Edge浏览器语音包](https://zedo.gitee.io/img/image-20220313091116003.png)

:::

### 激活隐藏语音

Windows 10 默认安装了两个不同语言的 TTS 引擎，实际上会有一些已经安装的语音，但是并没有显示在以上[查询语音包](#查询语音包)的列表中显示，可以打开设置查看：

![image-20220225210747140](https://zedo.gitee.io/img/image-20220225210747140.png)

可以发现，这里比之前的列表多了几个：

- Microsoft Yaoyao
- Microsoft Kangkang
- Microsoft Mark

以下是激活隐藏语音库的方法。

::: details 查看激活方法

其实可以通过注册表来**激活**隐藏的语音库，但在此之前，需要在本地查询是否下载有相关语音库，路径如下：

```text
%WinDir%\Speech_OneCore\Engines\TTS\
```

比如我们的电脑应该会是 `zh-CN` 和 `en-US` 两个文件夹，里面的内容就是语音引擎。打开 `zh-CN` 目录查看是否存在 `Hongyu` 等语音：

![image-20220225221825312](https://zedo.gitee.io/img/image-20220225221825312.png)

由于实测发现需要增加的注册表项太多才能生效，因此以下仅给出`Hongyu`的代码（64 位浏览器）：

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
[HKEY_LOCAL_MACHINE\SOFTWARE\WOW6432Node\Microsoft\SPEECH\Voices\Tokens\TTS_MS_ZH-CN_HONGYU_11.0]
```

:::

实际上，还有更简单的方法（实际上也是修改注册表）：

[comment]: stackoverflow(https://stackoverflow.com/questions/47379725)：

```powershell
$sourcePath = 'HKLM:\software\Microsoft\Speech_OneCore\Voices\Tokens'
$destinationPath = 'HKLM:\SOFTWARE\Microsoft\Speech\Voices\Tokens'
$destinationPath2 = 'HKLM:\SOFTWARE\WOW6432Node\Microsoft\SPEECH\Voices\Tokens'
cd $destinationPath
$listVoices = Get-ChildItem $sourcePath
foreach($voice in $listVoices) {
    $source = $voice.PSPath
    copy -Path $source -Destination $destinationPath -Recurse
    copy -Path $source -Destination $destinationPath2 -Recurse
}
```

需要使用管理员身份运行以上 `PowerShell` 脚本，然后重启电脑即可生效（32、64 位浏览器）。

值得注意的是，运行上述脚本之后会有重复的语音，因为注册表目录的名称不一样。这时再次查询就会发现：

::: center

![image-20220226142839950](https://zedo.gitee.io/img/image-20220226142839950.png)

:::

上图可以看到多出来 6 个语音，其中三个是重复的，仅仅是名称不一样而已。

### 添加语音包

windows 10 系统可以通过：

“**时间和语言**” $\to$ “**语音**” $\to$ “**管理语音**” $\to$ “**添加语音**”

来增加语音包：

![image-20220225210541297](https://zedo.gitee.io/img/image-20220225210541297.png)

![image-20220225210630475](https://zedo.gitee.io/img/image-20220225210630475.png)

## 百度 TTS

来自百度翻译的语音朗读：

```text
https://fanyi.baidu.com/gettts?lan=zh&spd=5&source=web&text=文本
```

其中 spd 是速度，lan 是语言，text 是文本。需要注意，文本最好先用 `encodeURI` 函数转义。

但是实测无法直接使用 `audio` 调用：

::: normal-demo audio 标签演示

```html
<audio controls>
    <source
        src="https://fanyi.baidu.com/gettts?lan=zh&spd=5&source=web&text=%E7%99%BE%E5%BA%A6TTS%E6%B5%8B%E8%AF%95"
        type="audio/mpeg"
    />
    您的浏览器不支持audio元素。
</audio>
```

:::

可以发现，以上是无法直接播放的。如果我们直接打开这个[链接](https://fanyi.baidu.com/gettts?lan=zh&spd=5&source=web&text=%E7%99%BE%E5%BA%A6TTS%E6%B5%8B%E8%AF%95)，会发现它会让我们下载一个 `mp3` 文件，通过查看网络请求记录可以发现，它返回的 MIME 类型为 `text/html`，而手动打开时它才是下载 `mp3` 文件，导致 `audio` 无法播放。

针对这个问题，可以使用在[免费接口](/article/免费接口.md)中介绍的免费 api，这里直接给出：

- <http://api.weijieyue.cn/api/?id=46> 19 种音色
- <https://yuanxiapi.cn/api/voice/voice.php> 6 种音色
- <https://api.vvhan.com/song.html> 6 种音色
- <http://w20.cc/api/suo.php?nr=tts> 加载较慢
