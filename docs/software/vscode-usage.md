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

```powershell
# 查看当前的执行策略
Get-ExecutionPolicy
```

根据上面的 [链接](https:/go.microsoft.com/fwlink/?LinkID=135170) ，以**管理员身份**打开 PowerShell，然后执行：

```powershell
Set-ExecutionPolicy RemoteSigned
# 接下来输入 'Y' 确定即可
```

## LaTeX 写作

### SumatraPDF 反向搜索

单独打开 SumatraPDF 进程，左上角菜单 — 设置 — 选项 — 设置反向搜索命令行，输入：

```text
"D:\path to\VS Code\Code.exe" -g "%f:%l"
```

前面是 Vscode 的安装路径，至于后面的参数，通过 `code -h` 我们得知：

```text
 -g --goto <file:line[:character]>          Open a file at the path on the
                                            specified line and character
                                            position.
```

即用 vscode 打开并跳转到对应文件(`%f`)的行(`%l` )。

> 还可以用其他编辑器打开：
>
> - 记事本：`notepad "%f"` （无法跳转到行）
> - TexStudio：`"D:\path to\texstudio.exe" %f -line %l`

如果双击之后没有任何反应，可能需要检查高级选项（即 SumatraPDF-settings.txt 文件）中是否启用了 `EnableTeXEnhancements`：

```ini
InverseSearchCmdLine = "D:\path to\VS Code\Code.exe" -g "%f:%l"
EnableTeXEnhancements = true
```
