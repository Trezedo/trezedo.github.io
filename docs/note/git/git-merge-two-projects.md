---
date: 2023-06-03
icon: skill-icons:git
---

# Git 合并两个项目

假设有两个项目：

- 项目 1 名为 server，git 地址为 `https://github.com/server.git`
- 项目 2 名为 web，git 地址为 `https://github.com/web.git`

目的是将 web 的内容合并到 server 中，并且不能丢失两个项目的历史提交记录。

> 前后端开发时是分在两个 git 仓库的，现需要合并

## 克隆项目 1

```sh
git clone https://github.com/server.git
```

进入 server 文件夹，将除 `.git` 文件夹外的所有文件移入新建的 `server/server` 文件夹

```sh
cd server
mkdir server
```

提交所有变更

```sh
git add .
git commit -m "refactor: 将 server 项目移至 server 文件夹"
git push origin "master"
```

## 获取新项目内容

```sh
git remote add web https://github.com/web.git
git fetch web
```

git 会拉取到 `web/master` 分支，接着合并 web 的 master 分支到 server 的 master 分支

```sh
git merge web/master --allow-unrelated-histories
```

> 后面的参数用于允许不相关历史合并，避免报错 fatal: refusing to merge unrelated histories

最后将 web 项目的文件移动到 web 文件夹，提交更改即可（类似第二步）：

```sh
git add .
git commit -m "merge web to server"
git push origin "master"
```
