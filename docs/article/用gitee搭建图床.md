---
date: 2022-01-27
icon: solar:gallery-send-bold
tag:
    - gitee
    - 图床
permalink: /article/gitee-image-hosting.html
---

# 使用 gitee 搭建图床

> [!caution]
>
> 2024 年 5 月起 Gitee Pages 服务已关闭，因此本文内容已失效。

先安装 [PicGo](https://picgo.github.io/PicGo-Doc/zh/guide/#下载安装)，在 github release 中找到 [最新稳定版](https://github.com/Molunerfinn/PicGo/releases/latest).

安装完成后打开 PicGo 界面，找到“插件设置”，搜索 “github plus” 然后安装。

接下来在“图传设置”中找到 githubPlus，填写内容，例如：

![27215621.png](https://zedo-img.netlify.app/img/2022-01/27215621.png)

填写 `repo`，`branch`，`token` 即可，`origin` 选择 `gitee`.

其中 repo 是你的用户名 + 仓库名，仓库默认的分支是 “master”。

## Token 获取方法

PicGo 中要填写的 token 是 gitee 中的私人令牌。

打开 gitee [私人令牌](https://gitee.com/profile/personal_access_tokens) 页面，右上角点击“生成新令牌”，修改权限如下：

![27215053.png](https://zedo-img.netlify.app/img/2022-01/27215053.png)

提交后按提示操作即可。

![27215514](https://zedo-img.netlify.app/img/2022-01/27215514.png#s-60)

注意复制生成的令牌。

### 注意事项

由于 `gitee` 文件大小有 `1mb` 限制, 所以超过 `1mb` 的文件无法通过外链获取（开启 gitee pages 后未测试）。

[PicGo 官网](https://picgo.github.io/PicGo-Doc/zh/guide/)

[插件 GitHub 链接](https://github.com/zWingz/picgo-plugin-github-plus)

最近（2022-03-27）似乎不能直接用 `img src` 引用了，会重定向至 <https://assets.gitee.com/favicon.ico> 并且返回 `403` ：

```text
GET https://assets.gitee.com/favicon.ico 403
```

发现已经部署在 gitee pages 的博客能正常使用图床，而本地开发的浏览器环境中无法显示。

不过解决这个问题也很简单，只需要开启 gitee pages ，修改图片链接即可。例如：

```diff
- https://gitee.com/zedo/img/raw/master/20220127215053.png
+ https://zedo-img.netlify.app/img/20220127215053.png
```
