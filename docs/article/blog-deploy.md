---
date: 2023-04-15
icon: blog
---

# 关于博客

使用 netlify 部署。

netlify 使用的 pnpm 版本默认是 7.x [^doc1]，但最新版已经是 8.x 了，如果本地进行了更新，那么和 netlify 服务器使用的 pnpm 版本不一致，从而 pnpm-lock.yml 可能不兼容，导致构建失败。

官网 [^doc2] 告诉我们指定 pnpm 版本的方式是在 `package.json` 文件中定义 `packageManager`：

```json
{
    "packageManager": "pnpm@8.0.0"
}
```

> pnpm 当前最新版本为 ![pnpm latest 版本](https://img.shields.io/npm/v/pnpm?label=pnpm)

这里的版本号是唯一确定的，否则构建时会报错：

```sh
Installing npm packages using pnpm version Usage Error: Invalid package manager specification in package.json; expected a semver version
```

[^doc1]: [Available software at build time](https://docs.netlify.com/configure-builds/available-software-at-build-time/#tools)
[^doc2]: [Manage build dependencies](https://docs.netlify.com/configure-builds/manage-dependencies/#pnpm)
