---
title: VS Code 使用
---

下载地址：<https://code.visualstudio.com/Download>

Windows 系统下使用 vscode 内置终端可能会提示：

```none
无法加载文件 yarn.ps1，因为在此系统上禁止运行脚本。有关详细信息，请参阅 https:/go.microsoft.com/fwlink/?LinkID=135170 中的 about_Execution_Policies。
所在位置 行:1 字符: 1
```

根据上面的 [链接](https:/go.microsoft.com/fwlink/?LinkID=135170) ，以**管理员身份**打开 powershell，然后执行：

```ps1
Set-ExecutionPolicy RemoteSigned
# 接下来输入 'Y' 确定即可
```
