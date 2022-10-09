---
date: 2022-07-15
icon: vscode
---

# VS Code 使用

下载地址：<https://code.visualstudio.com/Download>

国内镜像下载地址：只需要把官网下载地址的域名更换为 `vscode.cdn.azure.cn/`，例如：

```diff
- https://az764295.vo.msecnd.net/stable/64bbfbf67ada9953918d72e1df2f4d8e537d340e/VSCodeUserSetup-x64-1.72.0.exe
+ https://vscode.cdn.azure.cn/stable/64bbfbf67ada9953918d72e1df2f4d8e537d340e/VSCodeUserSetup-x64-1.72.0.exe
```

Windows 系统下使用 vscode 内置终端可能会提示：

```none
无法加载文件 yarn.ps1，因为在此系统上禁止运行脚本。有关详细信息，请参阅 https:/go.microsoft.com/fwlink/?LinkID=135170 中的 about_Execution_Policies。
所在位置 行:1 字符: 1
```

这是由于 Windows PowerShell 自动阻止不信任的脚本执行 造成的，因此需要更改 Windows PowerShell 执行策略。

```ps1
# 查看当前的执行策略
Get-ExecutionPolicy
```

根据上面的 [链接](https:/go.microsoft.com/fwlink/?LinkID=135170) ，以**管理员身份**打开 PowerShell，然后执行：

```ps1
Set-ExecutionPolicy RemoteSigned
# 接下来输入 'Y' 确定即可
```
