---
icon: vscode-icons:file-type-powershell
date: 2026-03-21
created: 2022-07-19
modified: 2026-03-23
category:
    - powershell
tag:
    - batch
    - cmd
    - powershell
    - windows
---

# PowerShell & CMD

文中这些 CMD 命令，大部分是我中小学时期从网络上陆续搜集来的。后来数量渐多，文件也分散各处，便想着整理成一份汇总，方便查阅，那些零散的小文件也就没有再保留的必要了。其实较早的那批至今还没整理完，不过在后续的工作和学习中，又陆陆续续补充了一些内容。

<!-- more -->

由于命令提示符的延迟变量扩展等特性在命令行中直接使用较为不便（通常需要写入批处理文件才能正确执行），为了让读者能够直接运行并看到效果，便借助 AI 为部分脚本提供了功能等价的 PowerShell 版本。

学习脚本可参考下列文档（win10 自带的 PowerShell 版本通常是 `5.1`，可以通过 `$PSVersionTable` 查看），但更建议借助 AI 进行学习：

- [PowerShell 文档 - 微软 Learn](https://learn.microsoft.com/zh-cn/powershell/)
- [cmd 命令 - 微软 Learn](https://docs.microsoft.com/zh-cn/windows-server/administration/windows-commands/cmd)
- [PowerShell 向导（全英文） - TutorialsPoint](https://www.tutorialspoint.com/powershell/index.htm)

::: danger 注意

如上所述，本文中的 PowerShell 命令可以直接在 PowerShell 窗口中粘贴运行。

而 CMD 命令如果包含多行逻辑、循环、条件判断或延迟变量扩展，通常需要保存为 `.bat` 或 `.cmd` 文件后再执行。此外，为了保证中文字符正常显示且命令正确执行，建议将批处理文件保存为 **ANSI** 编码。

:::

## 相关概念

- **命令提示符**：Windows 中那个黑色命令行窗口的正式名称，其可执行文件为 `cmd.exe`，因此常被简称为 **CMD**。它是一个传统的命令行解释器，适合执行 `ping`、`ipconfig` 等简单命令。
- **批处理（Batch）**：是一种脚本形式，指将多条命令按顺序写入一个文本文件，让系统自动依次执行。这类文件的扩展名通常为 **`.bat`**（或 `.cmd`），语法与 CMD 命令一致，适合实现简单的自动化任务。
- **PowerShell**：是微软开发的一种跨平台任务自动化解决方案，集命令行 Shell、脚本语言和配置管理框架于一体。它与传统 CMD 最大的不同在于：输入输出都是 .NET 对象，而非纯文本，这让数据处理更精准高效。

简单来说：**CMD** 是旧式命令行，**批处理**是其脚本形式，而 **PowerShell** 是功能更强大的新一代工具。

## 环境变量

这里介绍一些 Windows 系统的环境变量（以本机为例）：

| 变量名             | 示例路径                               | 说明                                       |
| ------------------ | -------------------------------------- | ------------------------------------------ |
| UserProfile        | C:\Users\zedo                          | 当前用户的个人目录（主目录）               |
| AppData            | C:\Users\zedo\AppData\Roaming          | 当前用户的漫游应用程序数据目录             |
| LocalAppData       | C:\Users\zedo\AppData\Local            | 当前用户的本地应用程序数据目录（不可漫游） |
| SystemRoot         | C:\Windows                             | Windows 系统根目录                         |
| ProgramFiles       | C:\Program Files                       | 64 位程序默认安装目录（64 位系统）         |
| ProgramFiles(x86)  | C:\Program Files (x86)                 | 32 位程序默认安装目录（仅 64 位系统）      |
| Temp / Tmp         | C:\Users\zedo\AppData\Local\Temp       | 当前用户的临时文件目录                     |
| Path               | 多个路径（如 C:\Windows\system32;...） | 系统搜索可执行文件的路径列表               |
| WinDir             | C:\Windows                             | 与 SystemRoot 相同，系统目录               |
| SystemDrive        | C:                                     | 系统盘符（通常为 C:）                      |
| HomeDrive          | C:                                     | 用户主目录所在的驱动器                     |
| HomePath           | \Users\zedo                            | 用户主目录的路径（不含盘符）               |
| AllUsersProfile    | C:\ProgramData                         | 所有用户共享的程序数据目录                 |
| UserName           | zedo                                   | 当前登录的用户名                           |
| UserDomain         | DESKTOP-ABTC7SE                        | 当前用户的域或计算机名                     |
| Public             | C:\Users\Public                        | 公共用户目录                               |
| CommonProgramFiles | C:\Program Files\Common Files          | 程序共用组件目录                           |
| PathExt            | .COM;.EXE;.BAT;.CMD;...                | 可执行文件的扩展名列表                     |

- 在 CMD 中，可用 `echo %变量名%` 查看值，例如 `%AppData%`；
- 在 PowerShell 中，可用 `$env:变量名` 查看值，例如 `$env:AppData`；
- 在 Windows 系统中，**环境变量名不区分大小写**，无论是 CMD 还是 PowerShell 都遵循这一规则。

你可以通过 PowerShell 查看以上各变量的值：

```powershell
$vars = "UserProfile", "AppData", "LocalAppData", "SystemRoot",
 "ProgramFiles", "ProgramFiles(x86)", "Temp", "Tmp",
 "WinDir", "SystemDrive", "HomeDrive", "HomePath",
 "AllUsersProfile", "UserName", "UserDomain", "Public",
 "CommonProgramFiles", "PathExt", "Path"
$vars | ForEach-Object {
    $value = (Get-Item env:$_ -ErrorAction SilentlyContinue).Value
    [PSCustomObject]@{
        变量名 = $_
        值 = if ($value) { $value } else { '未定义' }
    }
} | Format-Table -AutoSize -Wrap
```

## BAT 的一些技巧

### 关闭命令回显

在批处理中，每一条命令在执行前都会先被打印到屏幕上。

- `@` 的作用是**禁止本条命令本身在屏幕上回显**：`@` 放在某条命令前面，可以单独让这条命令“隐身”。
- `echo off` 的作用是**关闭后续所有命令的回显**：从 `echo off` 这一行之后，命令本身不再显示在屏幕上，但 `echo off` 本身依然会显示。
- `@echo off` 组合： `@` 让 `echo off` 这条命令本身也不显示，就隐藏了所有的命令回显。

因此 `@echo off` 几乎总是批处理脚本的第一行，用于让整个脚本安静运行，只保留必要的输出。

::: details 举个例子

没有 `@echo off` 时，运行一个简单的脚本：

```batch
dir
pause
```

屏幕输出会是：

```text
C:\>dir
...（目录列表）...
C:\>pause
请按任意键继续. . .
```

加上 `@echo off` 后：

```batch
@echo off
dir
pause
```

屏幕输出变为：

```text
...（目录列表）...
请按任意键继续. . .
```

命令本身不再出现，界面清爽许多。
:::

### 黑窗后台运行

这段代码常见于批处理脚本的开头，作用是让脚本在后台最小化运行，避免弹出黑窗口。

```batch
if not "%~1"=="p" start /min cmd.exe /c %0 p & exit
```

- `%~1`：获取第一个命令行参数，并去除可能存在的引号。
- 如果第一个参数不等于 `"p"`（即不是自调用标记），则执行 `start /min cmd.exe /c %0 p & exit`
- 参数 `p` 只是一个约定标记，可以换成任意字符，只要保证与自调用时传递的一致即可。
    - `start /min`：以最小化窗口方式启动一个新进程。
    - `cmd.exe /c %0 p`：启动一个新的 cmd 实例，执行当前脚本文件（`%0`），并传递参数 `p`。
    - `& exit`：当前脚本进程退出（即原窗口关闭）。
- 如果第一个参数等于 `"p"`，说明脚本已经被上述自调用启动，则**跳过**这段，继续执行后面的脚本主体。

用户双击运行该批处理时，会瞬间看到一个窗口闪一下（其实是第一个 cmd 窗口打开、判断、启动新进程、退出），最终在任务栏会有一个最小化的 cmd 窗口默默执行脚本内容，没有可见的黑色窗口干扰。这是一种常见技巧，用于让批处理“静默运行”或“后台运行”。

## 系统相关

### 获取系统信息

:::code-tabs

@tab powershell

```powershell
$os = Get-CimInstance -ClassName Win32_OperatingSystem
$version = $os.Version
$product = $os.Caption
$bit = if ([Environment]::Is64BitOperatingSystem) { "x64" } else { "x86" }
Write-Host "您的系统版本：$product $bit"
```

@tab cmd

```batch
@echo off
color 3f
mode con cols=60 lines=20
title 系统版本获取

:: 开始获取系统版本
if /i not "%os%"=="Windows_NT" (set TheOS=非Windows系统&set TheBit=) else (
ver | find "4.0" > nul && set TheOS=Windows 95
ver | find "4.10"> nul && set TheOS=Windows 98
ver | find "4.90"> nul && set TheOS=Windows me
ver | find "3.51"> nul && set TheOS=Windows NT35
ver | find "5.0" > nul && set TheOS=Windows 2000
ver | find "5.1" > nul && set TheOS=Windows XP
ver | find "5.2" > nul && set TheOS=Windows 2003
ver | find "6.0" > nul && set TheOS=Windows Vista
ver | find "6.1" > nul && set TheOS=Windows 7
ver | find "6.2" > nul && set TheOS=Windows 8
ver | find "10.0"> nul && set TheOS=Windows 10
set TheBit=x%PROCESSOR_ARCHITECTURE:~-2%
)

:: 完成获取
echo 您的系统版本：%TheOS% %TheBit%
pause
exit

rem https://blog.csdn.net/fxziyu/article/details/85119225
```

:::

### 重启 explorer

当文件资源管理器、任务栏、桌面图标等区域出现冻结、响应缓慢；或者任务栏或桌面图标异常，重启 explorer 可以快速恢复界面响应，而无需注销或重启系统。

:::code-tabs

@tab powershell

```powershell
Stop-Process -Name explorer -Force
Start-Sleep -Seconds 1
Start-Process explorer
```

@tab cmd

```batch
@echo off
taskkill /im explorer.exe /f
ping -n 2 127.0.0.1 > nul ::这里相当于延时 1 秒再运行以下指令
start explorer.exe
```

:::

### 关闭打开应用时的安全警告弹窗

如果打开应用是经常触发提示“你要允许 XXX 应用对你的设备进行更改吗？”

主要是**打开用户账户控制设置**界面，按下 <kbd>Win</kbd>+<kbd>R</kbd> 输入 `UserAccountControlSettings` 回车即可。

:::code-tabs

@tab powershell

```powershell
# 显示提示消息框
Start-Process mshta -ArgumentList 'vbscript:msgbox("在新弹窗中请将滑块拉至底部（从不通知），单击“确定”；"&vbCrLf&"最后在系统弹出的窗口中选择“是”即可完成。",64,"提示")(window.close)' -Wait
# 打开 UAC 设置界面
Start-Process "$env:windir\system32\UserAccountControlSettings.exe"
```

@tab cmd

```batch
@echo off
mshta vbscript:msgbox("在接下来弹出的窗口中，请将滑块拉至底部，单击“确定”；"^&vbCrLf^&"最后在系统弹出的窗口中选择“是”即可完成",64,"提示")(window.close)
start %winDir%\system32\UserAccountControlSettings.exe
```

:::

### RunDll32 相关

打开声音面板

```batch
rundll32.exe shell32.dll,Control_RunDLL mmsys.cpl
```

立即锁住电脑（相当于按下 Win+L）

```sh
rundll32.exe user32.dll,LockWorkStation
```

### 查看连接过的 WiFi 密码

:::code-tabs

@tab Powershell

```powershell
netsh wlan show profiles | Select-String "所有用户配置文件" | ForEach-Object {
    $name = $_.ToString().Split(':')[1].Trim()
    $passwordLine = netsh wlan show profile name="$name" key=clear | Select-String "关键内容"
    $password = if ($passwordLine) { $passwordLine.ToString().Split(':')[1].Trim() } else { $null }
    [PSCustomObject]@{
        WiFi   = $name
        密码   = $password
    }
} | Format-Table -AutoSize
```

@tab cmd

```batch
@echo off
title 本机连接过的WIFI及密码
echo *************************************
for /f "tokens=3*" %%i in ('netsh wlan show profiles ^| findstr "所有用户配置文件"') do (
    call :GetPass %%i %%j
)
echo.
pause

:GetPass
echo WiFi: %*
for /f "delims=: tokens=2-3" %%a in ('netsh wlan show profile name^="%*" key^=clear ^| findstr "关键内容"') do (
    echo 密码: %%a
)
echo -------------------------------------
```

:::

### 清理 C 盘（以前 XP 系统常用）

```batch
@echo off
color 0a
title C盘垃圾清理
echo 正在清除系统垃圾文件，请稍等......
del /f /s /q %SystemDrive%\*.tmp  %删除系统盘目录下临时文件%
del /f /s /q %SystemDrive%\*._mp  %删除系统盘目录下临时文件%
del /f /s /q %SystemDrive%\*.log  %删除系统盘目录下日志文件%
del /f /s /q %SystemDrive%\*.pf  %删除系统盘目录下预读文件%
del /f /s /q %SystemDrive%\*.gid  %删除系统盘目录下GID文件%
del /f /s /q %SystemDrive%\*.chk  %删除系统目录下scan disk(磁盘扫描)留下的无用文件%
del /f /s /q %SystemDrive%\*.old  %删除系统目录下old文件(Windows更新备份文件)%
del /f /s /q %SystemDrive%\recycled\*.*  %删除回收站的无用文件%
del /f /s /q %WinDir%\*.bak  %删除系统目录下备份文件%
del /f /s /q %WinDir%\prefetch\*.*  %删除应用程序临时文件
rd /s /q %WinDir%\temp & md %WinDir%\temp  %删除系统维护等操作产生的临时文件%
del /f /q %UserProfile%\cookies\*.*  %删除当前用户的COOKIE(IE)%
del /f /s /q "%UserProfile%\Local Settings\Temporary Internet Files\*.*"  %删除internet临时文件%
del /f /s /q "%UserProfile%\Local Settings\Temp\*.*"  %删除当前用户日常操作临时文件%
del /f /s /q "%UserProfile%\recent\*.*"  %删除访问记录(开始菜单中的文档里面的东西)%
echo 清除系统垃圾完成！
echo. & pause
```

### 修改文件属性

有些时候我们想要修改一些属性，例如创建时间、修改时间、访问时间等，通过 PowerShell 可以实现这个需求，不需要下载其他小工具：

```powershell
# 将 修改时间 和 访问时间 修改为 2023-01-05 11:30:00
Set-ItemProperty -Name LastWriteTime -Value "2023-01-05 11:30:00" -Path D:\test.docx
Set-ItemProperty -Name LastAccessTime -Value "2023-01-05 11:30:00" -Path D:\test.docx
# 设置文件为非只读
Set-ItemProperty -Name IsReadOnly -Value False  -Path D:\test.docx
```

常用的属性列举如下：

- `Name`：文件名
- `Extension`：后缀，如 `.docx`
- `IsReadOnly`：是否只读
- `CreationTime`：创建时间
- `LastWriteTime`：修改时间
- `LastAccessTime`：访问时间

我们也可以通过 `Get-ItemProperty` 函数查看文件属性：

```powershell
Get-ItemProperty -Path E:\test.docx | Format-list -Property * -Force
```

> 参考：[Set-ItemProperty - 微软 Learn](https://learn.microsoft.com/zh-cn/powershell/module/Microsoft.PowerShell.Management/Set-ItemProperty?view=powershell-5.1)

<!-- Attribute Changer https://www.petges.lu/download/ -->

如果想要修改只读、隐藏、是否为系统文件等属性，可以用 `attrib` 命令，参考 `help attrib`。

> [attrib - 微软 Learn](https://learn.microsoft.com/zh-cn/windows-server/administration/windows-commands/attrib)

### 查看回收站大小

单独查看 D 盘回收站：

```powershell
$sum = (Get-ChildItem -Path 'D:\$Recycle.bin' -Recurse -File -Force -ErrorAction SilentlyContinue | Measure-Object -Property Length -Sum).Sum; if (!$sum) { $sum = 0 }; '{0:N2} MB' -f ($sum / 1MB)
```

整个回收站的大小：

```powershell
$recycle = (New-Object -ComObject Shell.Application).NameSpace(10)  # 10 代表回收站
$totalSize = 0; $recycle.Items() | ForEach-Object { $totalSize += $_.Size }
'{0:N2} MB' -f ($totalSize /1MB)
```

## LaTeX 相关

清理辅助文件

```batch
@echo off
del /q *.aux *.bbl *.blg *.log *.out *.toc *.bcf *.xml *.synctex *.nlo *.nls *.bak *.ind *.idx *.ilg *.lof *.lot *.ent-x *.tmp *.ltx *.los *.lol *.loc *.listing *.gz *.userbak *.nav *.snm *.vrb *.synctex(busy)

del /q *.nav *.snm *.vrb *.fls *.xdv *.fdb_latexmk
```

查看本机安装的字体（安装 MiKTeX 等后才有 `fc-list` 工具）

```batch
@echo off
::fc-list :lang=zh >font.txt
fc-list -f "%%{family}\n" :lang=zh >d:zh-font.txt
start d:zh-font.txt
ping -n 2 127.1>nul
del d:zh-font.txt
```

## 玩具类

### 将文件“藏”进图片

有时某些平台只允许上传图片文件，可以将其他格式文件隐藏后即可作为图片上传，接收后修改后缀名即可还原原始文件。

:::code-tabs

@tab powershell

```powershell
Clear-Host

# 获取图片路径
$pic = (Read-Host "`n拖入图片到此，然后回车`n").Trim('"')
# 获取非图片文件路径
$file = (Read-Host "`n拖入任意文件（非图片）到此，然后回车`n").Trim('"')

# 提取文件名和扩展名
$picFileName = [System.IO.Path]::GetFileNameWithoutExtension($pic)
$picExtension = [System.IO.Path]::GetExtension($pic)

# 按二进制合并文件
$output = Join-Path (Split-Path $pic) "$picFileName`_new$picExtension"
$picBytes = [System.IO.File]::ReadAllBytes($pic)
$fileBytes = [System.IO.File]::ReadAllBytes($file)
$combined = $picBytes + $fileBytes
[System.IO.File]::WriteAllBytes($output, $combined)

Set-Clipboard -Value $output
Write-Host "`n完成！新文件已生成，其路径已复制到剪切板：`n" -ForegroundColor Green
Write-Host $output -ForegroundColor Cyan
```

@tab cmd

```batch
@echo off
mode con lines=15 cols=60
title Pic Blender

echo 拖入图片到此，然后回车&set /p pic=&cls
echo 拖入压缩包到此，然后回车&set /p zip=&cls
:: 图片和压缩包路径

set bat=%temp%\temp.bat
echo %pic%>%bat%

for /f "delims==" %%i in (%bat%) do (
set pn=%%~ni
set pt=%%~xi
)
:: 保留图片文件名和后缀

copy %pic%/b+%zip%/b=%pn%_new%pt%>nul
:: 核心所在

echo @echo off>%bat%
echo %%1 start /min cmd.exe /c %%0 :^&exit>>%bat%
echo mshta vbscript:msgbox^("完成！新文件已生成至原图所在文件夹",64,"完成"^)^(window.close^)>>%bat%
echo del /f /q %%0>>%bat%
:: 生成提示框的bat

call %bat%

:: choice /t 5 /d y /n >nul
```

:::
