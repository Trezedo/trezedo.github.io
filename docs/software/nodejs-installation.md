---
date: 2022-02-04
icon: logos:nodejs-icon
tag:
    - nodejs
    - 环境配置
---

# Node.js 安装及使用指南

## 安装 Node.js

访问 Node.js 官网下载适合你系统的安装包：
<https://nodejs.org/zh-cn/download/>

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

### 验证安装

安装完成后，打开命令行工具验证：

```sh
node -v  # 查看 Node.js 版本
npm -v   # 查看 npm 版本
```

## 配置 npm

Node.js 安装后，npm 的默认配置如下：

| 配置项     | 默认值                        | 查看命令                    |
| ---------- | ----------------------------- | --------------------------- |
| prefix     | `AppData/Roaming/npm`         | `npm config get prefix`     |
| cache      | `AppData/Local/npm-cache`     | `npm config get cache`      |
| registry   | `https://registry.npmjs.org/` | `npm config get registry`   |
| userconfig | `%UserProfile%/.npmrc`        | `npm config get userconfig` |

### 优化配置

建议修改默认配置以提升体验：

```sh
# 设置全局包安装目录和缓存目录
npm config set prefix "E:/envs/node_pkg/node_global"
npm config set cache "E:/envs/node_pkg/node_cache"

# 设置国内镜像源，加速下载
npm config set registry "https://registry.npmmirror.com/"
```

::: danger 重要提醒
Node.js 安装路径与依赖路径应分开：

- Node.js 安装路径：`E:/envs/nodejs`
- Node.js 依赖路径：`E:/envs/node_pkg`

混合使用可能导致权限问题。
:::

### 验证配置

```sh
npm config get cache
npm config get prefix
npm config get registry
```

## 解决常见问题

## 使用 pnpm（推荐）

pnpm 是更快速、更高效的包管理工具：

- [官网](https://pnpm.io/zh/)
- [中文文档](https://www.pnpm.cn/)

### 安装 pnpm

```sh
npm install -g pnpm
```

### 配置环境变量

pnpm 安装在自定义目录后，需要配置环境变量：

:::: tabs

@tab:active Powershell（推荐）

打开 powershell，执行：

```powershell
# 设置 node_global 环境变量
[Environment]::SetEnvironmentVariable("node_global", "E:\envs\node_pkg\node_global", "User")

# 将 node_global 添加到用户 PATH 变量中
$path = [Environment]::GetEnvironmentVariable("Path", "User")
if ($path -notlike "*%node_global%*") {
    [Environment]::SetEnvironmentVariable("Path", "$path;%node_global%", "User")
}
```

验证：

```powershell
# 验证 node_global 变量
echo $env:node_global
```

@tab 手动配置

1. 打开环境变量设置界面：
    - 按下 <kbd>Win</kbd>+<kbd>R</kbd>
    - 输入 `rundll32 sysdm.cpl,EditEnvironmentVariables`
    - 或输入 `SystemPropertiesAdvanced` 后点击“环境变量”

2. 在**用户变量**中：
    - 点击“新建”，变量名 `node_global`，变量值 `E:\envs\node_pkg\node_global`
    - 找到 `Path` 变量，双击后点击“新建”，输入 `%node_global%`

::::

### 解决 PowerShell 执行策略问题

在 PowerShell 中运行 pnpm 时可能遇到脚本执行被阻止：

```powershell
pnpm : 无法加载文件 E:\envs\node_pkg\node_global\pnpm.ps1，因为在此系统上禁止运行脚本。
```

**解决方案：**

以管理员身份运行 PowerShell，执行：

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

完成后在 cmd 中验证：

```cmd
pnpm -v
```

---

**更新说明：**

- 更新了镜像源信息，确保链接有效
- 简化了过时的警告处理方法
- 优化了配置步骤，使其更清晰易懂
- 强调了当前推荐的 Node.js 版本选择

### 相关命令

pnpm 大部分命令和 npm 是一致的。如果 npm 配置过镜像，pnpm 则不需要重新配置。

查看帮助：

```sh
pnpm -h
pnpm <command> -h
```

配置相关：

```sh
pnpm config set <key> <value>
pnpm config get <key>
pnpm config delete <key>
pnpm config list
```

可以用 `i` 代替 `install` 或 `add` ；添加包，同时下载它的依赖：

```sh
pnpm i <name>
pnpm i <name>@<tag>
pnpm i <name>@<version>
pnpm i vue@next
```

它有额外的参数，常用的是 `-D` 和 `-g`：

```sh
pnpm i -D <name>  # -D 参数写入 devDependencies，默认写入 dependencies
pnpm i -g <name>  # -g 参数表示全局安装
```

## 使用 yarn

### 下载

使用 npm 全局安装

```sh
npm install --global yarn
```

在命令行验证：

```sh
yarn -v  # 或者 yarn --version
```

查看全局变量

```sh
yarn global dir
```

它的默认位置是 `%UserProfile%/AppData/Local/Yarn/Data/global`

```sh
yarn config -h # 查看帮助
```

可以看到有 `global-folder`、`cache-folder` 两个项，获取它们得到的是 `undefined`，现修改其默认值：

```sh
yarn config set global-folder "E:/envs/node/yarn_global"
yarn config set cache-folder "E:/envs/node/yarn_cache"
```

在修改 `global-folder` 后，可以发现使用 `yarn global dir` 也随之更改了。

::: info

yarn_global 等文件路径可能需要和 nodejs 路径在同一盘符，参看 [创建 vite 错误](https://blog.csdn.net/weixin_43824526/article/details/121319955)。

:::

### 添加环境变量

为了全局使用 yarn 安装的某些库，例如 `typescript` 的编译命令 `tsc`，这里选用它进行测试。

```sh
$ yarn global add typescript
success Installed "typescript@4.5.5" with binaries:
      - tsc
      - tsserver
Done in 3.19s.
```

接着使用 `tsc`，会发现它提示 **'tsc' 不是内部或外部命令**。

查看 yarn 的全局安装包路径：

```sh
$ yarn global bin
E:/envs/node_pkg/node_global/bin  # 实际上也是 %node_global%/bin
```

然后将以上路径添加到系统环境变量即可：打开配置环境变量页面，在 `path` 中添加 `%node_global%/bin`。

然后重新在命令行中输入 `tsc`，给出了 `tsc` 命令用法，就是已经能正常使用了。

### 常用命令

```sh
yarn          # 安装所有包
yarn install  # 安装所有包
yarn init     # 初始化一个项目

yarn add package-name        # 装包
yarn add package-name --dev  # 装包，作为开发依赖

yarn upgrade package-name    # 更新包
yarn remove package-name     # 删除包

yarn publish   # 发布包

yarn cache list      # 查看包的缓存列表
yarn global add xxx  # 全局安装，相当于 npm install -g xxx
yarn global remove   # 全局卸载包

yarn upgrade-interactive --latest # 检查项目依赖更新
```

> 参考
>
> [Node.js 安装及环境配置之 Windows 篇](https://www.cnblogs.com/zhouyu2017/p/6485265.html)
>
> [yarn 和 npm 的区别、--save 和--save-dev 的区别](https://www.jianshu.com/p/467182102e43)

## 更新依赖版本并保存 {#dependency}

安装 `npm-check-updates`

```sh
npm install -g npm-check-updates
```

在项目中检查更新：

```sh
ncu -u  # ncu 是 npm-check-updates 简写
```

终端会展示可更新的依赖：

![可更新依赖列表](https://zedo-img.netlify.app/img/2022-05/09190222.png#s-67)

然后用 npm 更新即可：

```sh
npm install
```

<!-- -->

yarn 提供了一个命令来选择性升级依赖：

```sh
yarn upgrade-interactive
```

使用空格选择即可：

![可交互升级界面截图](https://zedo-img.netlify.app/img/2022-05/09191023.png)

但是它不会修改 `package.json` 中的版本号，如有需要，可以：

```sh
yarn add package-name@^
```

其中 `package-name` 是包名。

::: tip

我们都知道可以用 `@` 来指定版本，当我们指定的版本不存在时，就会让用户选择版本来确定。

除了使用上面的方法外，还可以考虑 [yarn-upgrade-all](https://www.npmjs.com/package/yarn-upgrade-all)。

> 参考
>
> <https://stackoverflow.com/questions/16073603/>
>
> <https://stackoverflow.com/questions/62650640/>

:::

## 直接运行 ts 文件

通常情况下，ts 文件需要用 tsc 编译成 js 文件再运行，这里通过使用 `ts-node`，直接运行 ts 文件，省去了手动编译的过程。

### 安装

全局安装 `typescript` 和 `ts-node`

```sh
npm install -g typescript
# npm install -g typescript-node # 由于typescript-node不支持更高版本的ts
npm install -g ts-node # typescript@>=2.7
```

```sh
yarn global add typescript
yarn global add @types/node --dev
yarn global add ts-node
```

安装完成后就可以不用手动去编译成 js 文件，可以直接运行 ts 文件

```ts
// foo.ts
let foo = {
    baz: {
        a: 1,
    },
};
console.log(foo);
```

### 执行命令 `ts-node xxx.ts`

```sh
ts-node foo.ts
```

参考：[ts-node 直接运行 typescript 文件](https://www.jianshu.com/p/8b893b37276b)

### 清空 npm 缓存

```sh
npm cache clean -f
```

## 卸载 NodeJS

按照正常方式卸载 nodejs 后，系统盘中还会存在一些残留的数据，还需要删除 `AppData/Roaming` 下的配置文件和临时文件：

1. 按下 `win`+`R`，输入 `%AppData%`；
2. 找到并删除 `npm`、`npm-cache` 两个文件夹。
3. 检查环境变量确保没有 `Nodejs` 相关值存在：`echo %PATH% | findstr "node"`

在系统盘，当前用户名的目录下（如 `C:/Users/Trezedo`），还存在如 `.npmrc`，`.yarnrc` 之类的文件，用记事本打开可以发现它里面包含了我们使用 `npm config` 设置的配置，如果下次安装不需要这些配置，则可以手动删除。
