---
icon: fa-brands:windows
date: 2023-06-23
modified: 2026-03-23
category:
    - windows
tag:
    - windows
---

# Windows 10 设置空密码

1. 按下 <kbd>Win</kbd>+<kbd>R</kbd>，输入 `gpedit.msc` 并运行；
2. 依次打开 计算机配置——Windows 设置——安全设置——本地策略——安全选项；
3. 找到 “账户：使用空密码的本地账户只允许进行控制台登录”，将其设置为“已禁用”

![安全策略截图](https://zedo-img.netlify.app/img/2023-06/24091520.png)
