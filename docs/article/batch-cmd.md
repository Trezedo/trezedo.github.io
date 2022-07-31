---
date: 2022-07-19
category:
    - 批处理
tag:
    - batch
    - cmd
    - windows
---

# BAT 命令整理

## 系统相关

### 判断系统位数

```batch
@echo off

rem 判断64位系统和32位系统

if /i %PROCESSOR_IDENTIFIER:~0,3%==x86 (
    echo 32位操作系统
) else (
    echo 64位操作系统
)
pause

rem https://blog.csdn.net/yhcad/article/details/90199086
```

### 获取系统信息

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
::del /f /s /q %SystemDrive%\*.gid  %删除系统盘目录下GID文件(属于临时文件，具体作用不详)%
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

### 查看连接过的 WiFi 密码

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

### 打开声音面板

```batch
@echo off
if not "%~1"=="p" start /min cmd.exe /c %0 p&exit
rundll32.exe shell32.dll,Control_RunDLL mmsys.cpl
```

立即锁住电脑（相当于 Win+L）

```batch
rundll32.exe user32.dll,LockWorkStation
```

## LaTeX 常用

### 清理辅助文件

```batch
@echo off
del /q *.aux *.bbl *.blg *.log *.out *.toc *.bcf *.xml *.synctex *.nlo *.nls *.bak *.ind *.idx *.ilg *.lof *.lot *.ent-x *.tmp *.ltx *.los *.lol *.loc *.listing *.gz *.userbak *.nav *.snm *.vrb *.synctex(busy)

del /q *.nav *.snm *.vrb *.fls *.xdv *.fdb_latexmk
```

### 查看本机安装的字体

```batch
@echo off
::fc-list :lang=zh >font.txt
fc-list -f "%%{family}\n" :lang=zh >d:zh-font.txt
start d:zh-font.txt
ping -n 2 127.1>nul
del d:zh-font.txt
```

### 重启 explorer

```batch
@echo off
taskkill /im explorer.exe /f
ping -n 2 127.0.0.1 > nul ::这里相当于延时 1 秒再运行以下指令
start explorer.exe
```

## 小玩意儿

### 将压缩包”藏“进图片

合并后将后缀名改为 `.zip` 可以正常解压

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
echo mshta vbscript:msgbox^("完成，生成的图片在原图片所在文件夹",64,"完成"^)^(window.close^)>>%bat%
echo del /f /q %%0>>%bat%
:: 生成提示框的bat

call %bat%

:: choice /t 5 /d y /n >nul
```

### 关闭打开应用时的安全警告弹窗

```batch
@echo off
if not "%~1"=="p" start /min cmd.exe /c %0 p&exit
mshta vbscript:msgbox("在接下来弹出的窗口中，将控制按钮滑至最底格，单击“确定”；"^&vbcrlf^&"最后在系统弹出的窗口中选择“是”即可完成",64,"提示")(window.close)
start %WinDir%\system32\UserAccountControlSettings.exe
```

$\boxed{d}$
