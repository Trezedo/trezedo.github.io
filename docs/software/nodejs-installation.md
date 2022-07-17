---
icon: nodeJS
date: 2022-02-04
title: NodeJs安装及使用
tag:
    - nodejs
    - 环境配置
---

在官网选择合适系统的安装包并下载，官网地址：<https://nodejs.org/zh-cn/download/>

推荐下载**偶数**版本，且是**长期维护版(LTS)**。

::: tip

如果官网下载比较慢，也可以在国内镜像找到对应的版本：

- 淘宝镜像 [https://npm.taobao.org/mirrors/node/](https://registry.npmmirror.com/binary.html?path=node/)
- 华为镜像 <https://repo.huaweicloud.com/nodejs/>
- 清华镜像 <https://mirrors.tuna.tsinghua.edu.cn/nodejs-release/>
- 北外镜像 <https://mirrors.bfsu.edu.cn/nodejs-release/>

注意：淘宝镜像的域名已经从 `npm.taobao.org` 重定向至 `npmmirror.com` 了。

:::

下载 msi 安装包后，按默认的配置继续即可（可调整安装路径），这里选择的路径是 `E:\Envs\nodejs`。

nodejs 默认的包管理工具是 npm，安装完成后可以使用以下命令检测是否成功：

```bash
node -v # 查看 nodejs 版本
npm -v  # 查看 npm 版本
```

## 默认配置

安装 nodejs 后 npm 默认的相关设置如下：

| 名称       | 默认值                        | 查看方法                    |
| :--------- | :---------------------------- | --------------------------- |
| prefix     | `AppData\Roaming\npm`         | `npm config get prefix`     |
| cache      | `AppData\Local\npm-cache`     | `npm config get cache`      |
| registry   | `https://registry.npmjs.org/` | `npm config get registry`   |
| userconfig | `%UserProfile%\.npmrc`        | `npm config get userconfig` |

下面修改以上的默认值：

```bash
npm config set prefix "E:/Envs/node/node_global"
npm config set cache "E:/Envs/node/node_cache"
# 设置国内淘宝镜像，可不加引号
npm config set registry "https://registry.npmmirror.com/"
```

::: danger

不要和 nodejs 安装路径在同一个目录，后续可能会出问题，例如权限不够等。

本文中：

nodejs 安装路径：`E:\envs\nodejs`

nodejs 环境路径：`E:\envs\node`

:::

### 检验

```bash
npm config get cache
npm config get prefix
npm config get registry
```

::: details 使用 npm 命令后有警告的解决方法
在安装 node v16 后使用 `npm -v` 后警告：

```ps1
npm WARN config global `--global`, `--local` are deprecated. Use `--location=global` instead.
```

直接 `npm i -g npm` 升级是不行的，因为它并没有更改 nodejs 安装目录下的 npm ，可以使用 [`npm-windows-upgrade`](https://www.npmjs.com/package/npm-windows-upgrade) 来升级：

首先需要以管理员权限运行 powershell，然后执行：

```ps1
Set-ExecutionPolicy Unrestricted -Scope CurrentUser -Force
```

> 如果不执行，可能会提示
>
> ```ps1
> npm-windows-upgrade v6.0.1
>
> Scripts cannot be executed on this system.
> To fix, run the command below as Administrator in > PowerShell and try again:
> Set-ExecutionPolicy Unrestricted -Scope CurrentUser -Force
> ```
>
> 然后执行 `npm-windows-upgrade` 就可以升级了。

:::

<br/>

## 使用 yarn

### 下载

使用 npm 全局安装

```bash
npm install --global yarn
```

### 配置环境变量

由于新的包管理工具 yarn 在 `E:\envs\node\node_global` 下，直接在命令行使用 `yarn` 会提示**不是内部或外部命令**，需要配置环境变量。

::: tip

快速打开环境变量设置界面的方法，按下快捷键 `win`+`R`，输入 `SystemPropertiesAdvanced` 后回车，然后在最下方选择`环境变量`即可。

:::

在**用户变量**下，点击**新建**， 变量名为 `node_global` ，变量值为 `E:\Envs\node\node_global`，

然后找到并双击 `Path`，点击**新建**，输入 `%node_global%`，然后确定即可。

在命令行验证：

```bash
yarn -v # 或者 yarn --version
```

查看全局变量

```bash
yarn global dir
```

它的默认位置是 `%UserProfile%\AppData\Local\Yarn\Data\global`

```bash
yarn config -h # 查看帮助
```

可以看到有 `global-folder`、`cache-folder` 两个项，获取它们得到的是 `undefined`，现修改其默认值：

```bash
yarn config set global-folder "E:/Envs/node/yarn_global"
yarn config set cache-folder "E:/Envs/node/yarn_cache"
```

在修改 `global-folder` 后，可以发现使用 `yarn global dir` 也随之更改了。

::: info

yarn_global 等文件路径可能需要和 nodejs 路径在同一盘符，参看[创建 vite 错误](https://blog.csdn.net/weixin_43824526/article/details/121319955)。

:::

### 添加环境变量

为了全局使用 yarn 安装的某些库，例如 `typescript` 的编译命令 `tsc`，这里选用它进行测试。

```bash
$ yarn global add typescript
success Installed "typescript@4.5.5" with binaries:
      - tsc
      - tsserver
Done in 3.19s.
```

接着使用 `tsc`，会发现它提示 **'tsc' 不是内部或外部命令**。

查看 yarn 的全局安装包路径：

```bash
$ yarn global bin
E:\Envs\node\node_global\bin # 实际上也是 %node_global%\bin
```

然后将以上路径添加到系统环境变量即可：打开配置环境变量页面，在 `path` 中添加 `%node_global%\bin`。

然后重新在命令行中输入 `tsc`，给出了 `tsc` 命令用法，就是已经能正常使用了。

### 常用命令

```bash
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

### 参考

[Node.js 安装及环境配置之 Windows 篇](https://www.cnblogs.com/zhouyu2017/p/6485265.html)

[yarn 和 npm 的区别、--save 和--save-dev 的区别](https://www.jianshu.com/p/467182102e43)

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

![image-20220509190222090](https://zedo.gitee.io/img/image-20220509190222090.png#s-67)

然后用 npm 更新即可：

```sh
npm install
```

::: tip

yarn 提供了一个命令来选择性升级依赖：

```sh
yarn upgrade-interactive
```

使用空格选择即可：

![image-20220509191023391](https://zedo.gitee.io/img/image-20220509191023391.png)

但是它不会修改 `package.json` ，如有需要，可以使用 [yarn-upgrade-all](https://github.com/tylerlong/yarn-upgrade-all)。

:::

> 参考
>
> <https://stackoverflow.com/questions/16073603/>
>
> <https://stackoverflow.com/questions/62650640/>

## 小技巧

当想要安装某个依赖，并想手动选择某个版本时，只需要：

```sh
yarn add package-name@^
```

其中 `package-name` 是包名。

我们都知道可以用 `@` 来指定版本，当我们指定的版本不存在时，就会让用户自行选择版本。

## 直接运行 ts 文件

通常情况下，ts 文件需要用 tsc 编译成 js 文件再运行，这里通过使用 `ts-node`，直接运行 ts 文件，省去了手动编译的过程。

### 安装

全局安装 `typescript` 和 `ts-node`

```bash
npm install -g typescript
# npm install -g typescript-node # 由于typescript-node不支持更高版本的ts
npm install -g ts-node # typescript@>=2.7
```

```powershell
yarn global add typescript
yarn global add @types/node --dev
yarn global add ts-node
```

安装完成后就可以不用手动去编译成 js 文件，可以直接运行 ts 文件

```js
// foo.ts
let foo = {
    baz: {
        a: 1,
    },
};
console.log(foo);
```

### 执行命令 `ts-node xxx.ts`

```powershell
ts-node foo.ts
```

参考：[ts-node 直接运行 typescript 文件](https://www.jianshu.com/p/8b893b37276b)

### 清空 npm 缓存

```bash
npm cache clean -f
```

## 卸载 NodeJS

按照正常方式卸载 nodejs 后，系统盘中还会存在一些残留的数据，还需要删除 `AppData\Roaming` 下的配置文件和临时文件：

1. 按下 `win`+`R`，输入 `%AppData%`；
2. 找到并删除 `npm`、`npm-cache` 两个文件夹。
3. 检查环境变量确保没有 `Nodejs` 相关值存在：`echo %PATH% | findstr "node"`

在系统盘，当前用户名的目录下（如 `C:\Users\Trezedo`），还存在如 `.npmrc`，`.yarnrc` 之类的文件，用记事本打开可以发现它里面包含了我们使用 `npm config` 设置的配置，如果下次安装不需要这些配置，则可以手动删除。
