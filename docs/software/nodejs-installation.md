---
icon: logos:nodejs-icon
date: 2026-03-21
created: 2022-02-04
modified: 2026-03-21
category:
    - JavaScript
    - Nodejs
tag:
    - javascript
    - nodejs
    - pnpm
---

# Node.js 安装及使用指南

## 安装 Node.js

访问 Node.js 官网下载适合你系统的安装包：

<https://nodejs.org/zh-cn/download/>

<!-- more -->

**版本选择建议：**

- 推荐下载 **长期维护版（LTS）**
- 偶数版本仍然是更稳定的选择

::: tip 国内镜像加速下载

如果官网下载速度较慢，可以使用以下国内镜像：

- 淘宝镜像：<https://registry.npmmirror.com/binary.html?path=node/>
- 华为镜像：<https://repo.huaweicloud.com/nodejs/>
- 清华镜像：<https://mirrors.tuna.tsinghua.edu.cn/nodejs-release/>
- 北外镜像：<https://mirrors.bfsu.edu.cn/nodejs-release/>

注意：淘宝镜像域名已从 `npm.taobao.org` 完全迁移至 `npmmirror.com`
:::

### 安装步骤

1. 下载 Windows Installer (.msi) 安装包
2. 运行安装程序，可按需调整安装路径（示例路径：`E:/envs/nodejs`）
3. 按默认配置完成安装

个性化设置选项解释：

- Node.js runtime：安装核心 Node.js 运行时（node.exe）
- corepack manager：安装 corepack，Node.js 的通用包管理器
- npm package manager：安装 npm，推荐的 Node.js 包管理器
- Online documentation shortcuts：在开始菜单中添加 Node.js 在线文档和 Node.js 网站链接
- Add to PATH：将 Node.js、npm 以及通过 npm 全局安装的模块添加到 PATH 环境变量中。

::: tip

安装后，

- `E:/envs/nodejs/` 会被添加到系统变量的 `PATH` 中
- `%AppData%/npm` （见下文）会被添加到用户变量的 `PATH` 中

:::

### 验证安装

安装完成后，打开命令行工具验证：

```sh
node -v      # 查看 Node.js 版本
npm -v       # 查看 npm 版本
corepack -v  # 查看 corepack 版本
```

### 配置 npm

Node.js 安装后，可用 `npm config ls -l` 查看完整的 npm 默认配置，我们重点查看以下几项：

```sh
npm config get registry prefix cache userconfig
```

```text
registry=https://registry.npmjs.org/
prefix=C:\Users\zedo\AppData\Roaming\npm
cache=C:\Users\zedo\AppData\Local\npm-cache
userconfig=C:\Users\zedo\.npmrc
```

|   配置项   | 默认值                        | 说明                                                                                                                                |
| :--------: | ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
|  registry  | `https://registry.npmjs.org/` | npm 包仓库的地址，默认是官方的公共仓库。为了加快下载速度，我们通常会改为淘宝等国内镜像。                                            |
|   prefix   | `%AppData%/npm`               | 指定 npm 全局安装包时的安装目录，也决定了全局可执行命令（如 `npm` 或其他通过 `npm install -g` 安装的工具）的存放路径。              |
|   cache    | `%LocalAppData%/npm-cache`    | npm 的缓存目录。当你执行 `npm install` 时，下载的包会先存放到这里，下次再安装相同版本时可以直接从缓存读取，避免重复下载，提高速度。 |
| userconfig | `%UserProfile%/.npmrc`        | 当前用户的 npm 配置文件路径，通常用于存放用户级别的配置。                                                                           |

:::tip

这里展开说一下 Windows 下的一些环境变量，可参考 [PowerShell & CMD](../article/powershell-and-cmd.md#windows-环境变量)：

| 变量名         | 扩展后路径                    |
| -------------- | ----------------------------- |
| %UserProfile%  | C:\Users\zedo                 |
| %LocalAppData% | C:\Users\zedo\AppData\Local   |
| %AppData%      | C:\Users\zedo\AppData\Roaming |

:::

建议修改默认配置以提升体验：

```sh
# 设置国内镜像源，加速下载
npm config set registry "https://registry.npmmirror.com/"

# 设置全局包安装目录和缓存目录
npm config set prefix "E:/envs/node_pkg/node_global"
npm config set cache "E:/envs/node_pkg/node_cache"
```

::: danger 重要提醒
Node.js 安装路径与依赖路径应分开：

- Node.js 安装路径：`E:/envs/nodejs`
- Node.js 依赖路径：`E:/envs/node_pkg`

混合使用可能导致权限问题。
:::

重新查看并验证配置

```sh
npm config get registry prefix cache
```

## 使用 pnpm（推荐）

pnpm 是更快速、更高效的包管理工具：

- 官网：<https://pnpm.io/zh/>
- 中文网：<https://www.pnpm.cn/>

> `pnpm` 代表 performant（高性能的） npm。 [@rstacruz](https://github.com/rstacruz/) 想出了这个名字

### 安装 pnpm

使用 npm 全局安装：

```sh
npm install -g pnpm
```

:::tip

本文所安装版本为 ![pnpm 安装版本](https://img.shields.io/badge/pnpm-v10.32.1-blue)，当前最新版本为 ![pnpm latest 版本](https://img.shields.io/npm/v/pnpm?label=pnpm)

:::

### 环境变量及配置

此时 pnpm 已经被安装到 `npm config set prefix` 设置的目录了，但是系统的环境变量并没有被同步修改，需要手动配置环境变量：

:::: tabs

@tab Powershell（推荐）

按下 <kbd>Win</kbd>+<kbd>R</kbd> 键入 `powershell` 打开会话窗口，执行：

```powershell
# 获取 npm prefix 路径
$prefix = & npm config get prefix

# 将 prefix 添加到用户变量的 Path 中
$path = [Environment]::GetEnvironmentVariable("Path", "User")
if ($path -notlike "*$prefix*") {
    [Environment]::SetEnvironmentVariable("Path", "$path;$prefix", "User")
}
```

@tab 手动配置

1. 打开环境变量设置界面：
    - 按下 <kbd>Win</kbd>+<kbd>R</kbd>，以下方式二选一：
    - 键入 `rundll32 sysdm.cpl,EditEnvironmentVariables`
    - 键入 `SystemPropertiesAdvanced` 后点击“环境变量”

2. 在**用户变量**中找到 `Path` 变量，双击后点击“新建”，输入 `E:\envs\node_pkg\node_global`

::::

打开**新的** PowerShell/CMD 会话窗口验证：

```powershell
pnpm -v
```

### 修改 PowerShell 执行策略

新安装的 Windows 系统中，PowerShell 的默认执行策略通常是 `Restricted`，不允许任何脚本运行。

在 PowerShell 中运行 pnpm 时可能会遇到脚本执行被阻止的问题（Vscode 终端使用的就是 PowerShell）：

```powershell
pnpm : 无法加载文件 E:\envs\node_pkg\node_global\pnpm.ps1，因为在此系统上禁止运行脚本。
```

**解决方案：**

以管理员身份运行 PowerShell，执行以下命令：

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

推荐使用 `RemoteSigned` 策略，允许运行本地未签名脚本，但从互联网下载的脚本需要由可信发布者签名，在安全性和便利性之间取得了较好的平衡。

参考：

- [Set-ExecutionPolicy](https://learn.microsoft.com/zh-cn/powershell/module/microsoft.powershell.security/set-executionpolicy?view=powershell-5.1)
- [about_Execution_Policies](https://learn.microsoft.com/zh-cn/powershell/module/microsoft.powershell.core/about/about_execution_policies?view=powershell-5.1)

### 配置相关路径

根据 [pnpm FAQ](https://pnpm.io/zh/faq#存储路径未指定)：

> 如果未设置存储路径，则会创建多个存储库（每个驱动器或文件系统对应一个）。
> 若在磁盘 A 上执行安装操作，存储库会在 A 盘文件系统根目录下的 `.pnpm-store` 中创建。如果之后在磁盘 B 上再次执行安装，会在 B 盘的 `.pnpm-store` 位置创建一个独立的存储库。相关项目仍可保留 pnpm 的优势，但各个驱动器可能会存在重复的软件包。

这里我们的 `.pnpm-store` 在 E 盘根目录。

### 相关命令

pnpm 大部分命令和 npm 是一致的。

```sh
# 安装项目所有依赖
pnpm install          # 安装 package.json 中声明的依赖

# 添加依赖
pnpm add <pkg>        # 保存到 dependencies
pnpm add -D <pkg>     # 保存到 devDependencies
pnpm add -g <pkg>     # 全局安装

# 更新依赖
pnpm update           # 更新所有依赖
pnpm update <pkg>     # 更新指定包

# 移除依赖
pnpm remove <pkg>     # 从 dependencies / devDependencies 移除
pnpm remove -g <pkg>  # 移除全局包

# 列出已安装的包
pnpm list             # 当前项目的依赖树
pnpm list -g          # 全局安装的包

# 运行脚本（packages.json 中的 scripts）
pnpm run <script>     # 可简写为 pnpm <script>

# 配置相关
pnpm config set <key> <value> # 设置一个配置项
pnpm config get <key>         # 获取指定配置项的值
pnpm config delete <key>      # 从配置文件中移除该键
pnpm config list              # 列出所有当前生效的配置项
```

pnpm 提供了一些与 npm 一致的简写，方便记忆：

| 完整命令       | 别名                          | 说明                         |
| -------------- | ----------------------------- | ---------------------------- |
| `pnpm install` | `pnpm i`                      | 安装 `package.json` 中的依赖 |
| `pnpm remove`  | `pnpm rm`<br>`pnpm uninstall` | 移除依赖                     |
| `pnpm run`     | `pnpm` + 脚本名               | 运行脚本，例如 `pnpm dev`    |
| `pnpm list`    | `pnpm ls`                     | 列出已安装的包               |
| `pnpm update`  | `pnpm up`                     | 更新依赖                     |

### 包名的多种形式

安装或添加依赖时，包名 `<pkg>` 可以有以下几种写法：

```sh
# 1. 仅包名（自动安装最新版本，受 package.json 中版本范围约束）
pnpm add vue

# 2. 指定版本号
pnpm add vue@3.4.0

# 3. 指定版本范围（使用 ^、~ 等符号）
pnpm add vue@^3.4.0           # 兼容 3.x.x 的最新版本（不包含 4.0.0）
pnpm add vue@~3.4.0           # 兼容 3.4.x 的最新版本（不包含 3.5.0）
pnpm add vue@">=3.4.0 <4.0.0" # 完整范围语法

# 4. 使用标签（如 next, latest）
pnpm add vue@next          # 安装下一个主要版本的预发布版
pnpm add vue@latest      # 安装最新稳定版
```

在 `pnpm add <pkg>@<version-range>` 中，`<version-range>` 支持 npm 的语义化版本范围语法，常用符号说明如下：

| 符号/语法     | 示例                   | 含义                                                                                                                   |
| ------------- | ---------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `@`           | `vue@3.4.0`            | 分隔符，后面跟具体的版本号、标签或范围。                                                                               |
| `^`           | `vue@^3.4.0`           | **兼容更新**：允许更新到不改变最左边非零数字的版本。<br>例如：`^3.4.0` 可以安装 `3.4.1`、`3.5.0`，但不能安装 `4.0.0`。 |
| `~`           | `vue@~3.4.0`           | **补丁更新**：只允许更新到最后一位（补丁号）的版本。<br>例如：`~3.4.0` 可以安装 `3.4.1`、`3.4.5`，但不能安装 `3.5.0`。 |
| `>=`、`<=` 等 | `vue@">=3.4.0 <4.0.0"` | 使用比较运算符精确控制版本范围。                                                                                       |
| `*` 或 `x`    | `vue@*`                | 任意版本（不推荐，可能导致不可控更新）。                                                                               |
| `latest`      | `vue@latest`           | 安装最新的稳定版（等同于不指定版本）。                                                                                 |
| `next`        | `vue@next`             | 安装下一个主要版本的预发布版（通常用于尝鲜）。                                                                         |

**实际场景举例**：

```sh
# 只希望 Vue 的补丁更新（如修复 bug），不升级次版本
pnpm add vue@~3.4.0

# 希望获得 Vue 3 的所有功能更新，但不升级到 Vue 4
pnpm add vue@^3.4.0

# 安装 Vue Router 4 的最新版本（不限制具体次版本）
pnpm add vue-router@^4.0.0

# 固定一个精确版本，避免任何意外升级
pnpm add --save-exact vue@3.4.0
```

## 卸载 Node.js

按照正常方式卸载 nodejs 后，系统盘中还会存在一些残留的数据，还需要删除 `AppData/Roaming` 下的配置文件和临时文件：

1. 按下 `win`+`R`，输入 `%AppData%`；
2. 找到并删除 `npm`、`npm-cache` 两个文件夹。
3. 检查环境变量确保没有 `Nodejs` 相关值存在：`echo %PATH% | findstr "node"`

在系统盘，当前用户名的目录下（如 `C:/Users/Trezedo`），还存在如 `.npmrc`，`.yarnrc` 之类的文件，用记事本打开可以发现它里面包含了我们使用 `npm config` 设置的配置，如果下次安装不需要这些配置，则可以手动删除。
