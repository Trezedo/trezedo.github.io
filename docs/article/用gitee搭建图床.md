---
icon: gitee
date: 2022-01-27
tag:
  - gitee
  - 图床
permalink: /article/gitee-image-hosting.html
---

# 使用gitee搭建图床

![20220127215621.png](https://trezedo.gitee.io/img/20220127215621.png)

填写`repo`，`branch`，`token` 即可，`origin`选择`gitee`.

### token获取方法

![20220127215053.png](https://trezedo.gitee.io/img/20220127215053.png)



### 注意事项

由于`gitee`文件大小有 `1mb` 限制, 所以超过 `1mb` 的文件无法通过外链获取。

[PicGo官网](https://picgo.github.io/PicGo-Doc/zh/guide/)

[插件GitHub链接](https://github.com/zWingz/picgo-plugin-github-plus)

最近似乎不能直接用 `img src` 引用了，会重定向至 <https://assets.gitee.com/favicon.ico> 并且返回 `403` ：

```
GET https://assets.gitee.com/favicon.ico 403
```

发现已经部署在 gitee pages 的博客能正常使用图床，而本地开发的浏览器环境中无法显示。不过没事，只需要开启 gitee pages ，之后修改图片链接即可。例如：

```
https://trezedo.gitee.io/img/20220127215053.png
```

修改成：

```
https://trezedo.gitee.io/img/20220127215053.png
```







