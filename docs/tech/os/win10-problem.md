---
icon: fa-brands:windows
date: 2026-03-29
category:
    - windows
tag:
    - windows
---

# Win10 系统问题及解决记录

这里有不少是大学时期遇到的 windows 电脑问题，做一个记录，但由于有些内容当时没注意保留来源，所以没有相应的链接。

<!-- more -->

## 桌面、任务栏图标异常（白图标修复）

需要保存为 `xxx.bat` 并以管理员身份运行：

```bat
taskkill /f /im explorer.exe
del /f /q "%LocalAppdata%\IconCache.db"
del /f /q "%LocalAppdata%\Microsoft\Windows\Explorer\iconcache_*.db"
start explorer.exe
```

或者 Win+R 输入 `cmd`，按下 Ctrl+Shift+Enter 以管理员身份打开命令提示符再粘贴运行：

```bat
taskkill /f /im explorer.exe && del /f /q /a "%LocalAppdata%\IconCache.db" && del /f /q "%LocalAppdata%\Microsoft\Windows\Explorer\iconcache_*.db" && start explorer.exe
```

## 剪切板异常、无法复制粘贴

这个问题遇到了好几次，莫名其妙就不能复制粘贴，每次解决的方式都不一样，不清楚具体原因，这里做个记录。

也是先在网上搜了一些方案：[^复制粘贴]

1. 重启 `explorer.exe`，Ctrl+Shift+ESC 打开任务管理器，在“Windows 资源管理器”上右键重启即可。
2. Win+R，输入 `rdpclip.exe`（某一次有效）
3. 输入 `cmd.exe /c "echo off | clip"` 来清空剪切板，然后查看问题能否解决（其实根本清不掉😓）。

**最终办法（实测有效）**：关闭输入法进程，尤其是搜狗、手心输入法（在用）的所有进程。

## 蓝牙开关消失不见

关机，拔掉所有电源，等半分钟，然后再插电源开机，蓝牙就回来了。[^蓝牙]

## 应用无法固定到任务栏

> 打开程序后，右键任务栏上的程序图标只有“关闭窗口”一个选项，原本的“固定到任务栏”等选项不见了。把应用拖到任务栏时会显示禁止图标，无法固定；在桌面右键应用选择“固定到任务栏”后，选项会变成“从任务栏取消固定”

分别按顺序在运行复制粘贴下面三行，会弹出几个窗口，三个都按顺序输完后再关。[^固定任务栏]

```bat
cmd /k reg add "HKEY_CLASSES_ROOT\piffile" /v IsShortcut /f
cmd /k reg add "HKEY_CLASSES_ROOT\lnkfile" /v IsShortcut /f
cmd /k taskkill /f /im explorer.exe & explorer.exe
```

## 字体模糊

### 系统字体模糊

1. 按 win+R 键，输入 cttune，回车，打开“Clear Type 文本调谐器”；
2. 在弹出的界面中选择“启用 "ClearType"”，单击下一步；
3. 按照提示进行操作，最后点击“完成”即可。

### 个别软件字体模糊

1. 选中显示模糊的软件图标（可以是桌面快捷方式或者软件根目录），右键，点击属性；
2. 点击兼容性，找到并点击“更改 DPI 设置”；
3. 在弹出的界面下方，勾选“替代高 DPI 缩放行为”，选择“应用程序”；
4. 最后点击“确定”即可。

## 找不到 gpedit.msc

保存并以管理员身份运行（忘记来源了，但是现在网上都能搜到）

```bat
@echo off
pushd "%~dp0"
dir /b %SystemRoot%\Windows\servicing\Packages\Microsoft-Windows-GroupPolicy-ClientExtensions-Package~3*.mum >gp.txt
dir /b  %SystemRoot%\servicing\Packages\Microsoft-Windows-GroupPolicy-ClientTools-Package~3*.mum >>gp.txt
for /f %%i in ('findstr /i . gp.txt 2^>nul') do dism /online /norestart /add-package:"%SystemRoot%\servicing\Packages\%%i"
del "%~dp0gp.txt" /f /q
pause
```

## Dell 专区

这里专门搞了个标题，因为问题可能只和电脑厂商有关，不具有通用性。

### 电脑有杂音

这个声音有可能和设置有关系，开启 C-States 模式也会有一定的声音，可以试下这个操作看下声音有没有改善：

1. 重启电脑开机在 dell 界面反复按 F2 进入 bios
2. 展开 Performance，找到 C-States Control 选项，
3. 把这个勾去掉，点 apply 然后点 exit 退出 bios
4. 进入系统正常使用再观察

### 系统更新卡住

系统更新卡住是比较常见的系统更新问题

如果后续无法直接进入系统功能，可以试下安全模式能否进入

开机 dell 界面反复按 F12 然后选择 support assist os recovery 进入

> 现在 Win10 已经停止更新了，这个问题应该不会有了（憋笑）

## 隐藏或恢复“此电脑”里的系统文件夹

隐藏资源管理器左侧“此电脑”的“3D 对象”，保存为 `.reg` 文件，双击执行：[^隐藏系统文件夹]

```ini
Windows Registry Editor Version 5.00
[-HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\MyComputer\NameSpace\{0DB7E03F-FC29-4DC6-9020-FF41B59E513A}]
```

想要恢复，只需要把 `-HKEY` 前面的减号 `-` 删掉再运行就好了。

这里 `{0DB7E03F-FC29-4DC6-9020-FF41B59E513A}` 是 3D 对象的 CLSID，下面是其他文件夹的：

```text :no-line-numbers
视频：{f86fa3ab-70d2-4fc7-9c99-fcbf05467f3a}
图片：{24ad3ad4-a569-4530-98e1-ab02f9417aa8}
文档：{d3162b92-9365-467a-956b-92703aca08af}
下载：{088e3905-0323-4b02-9826-5d99428e115f}
音乐：{3dfdf296-dbec-4fb4-81d1-6a3438bcf4de}
桌面：{B4BFCC3A-DB2C-424C-B029-7FE99A87C641}
```

> 一般只隐藏 3D 对象就行，其他的作为快捷方式还是挺方便的。

## 家庭中文版没有 Hyper-V

这个应该是大学时期安装 docker 跑 postgresql 需要用到，这里只贴出当时有效解决的链接：

- [win10 家庭中文版没有Hyper-V，这样安装一步搞定 - CSDN](https://blog.csdn.net/weixin_37695006/article/details/91589895)
- [解决win10没有Hyper-V - CSDN](https://blog.csdn.net/weixin_44338712/article/details/109249414)
- [win10家庭版安装Docker - CSDN](https://blog.csdn.net/tidu2chengfo/article/details/84892915)
- [win10家庭版安装Docker - CSDN](https://blog.csdn.net/weixin_45089791/article/details/109291834)

---

[^复制粘贴]: [小技能： Windows10突然不能复制粘贴谁搞鬼 - 知乎](https://zhuanlan.zhihu.com/p/287959073)

[^蓝牙]: [win10蓝牙开关不见了怎么办 - 知乎](https://zhuanlan.zhihu.com/p/455663914)

[^固定任务栏]: [老哥们求助，我应用无法固定到任务栏了 - 贴吧](https://tieba.baidu.com/p/6034731599#124930496146l)

[^隐藏系统文件夹]: [Win10 隐藏硬盘上面额外的6个文件夹+3D 对象 - 知乎](https://zhuanlan.zhihu.com/p/25942015)
