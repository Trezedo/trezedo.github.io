---
icon: skill-icons:git
date: 2026-03-28
category:
    - git
tag:
    - git
---

# Reset 和 Rebase

## Reset

如果只是上一次提交漏了文件或者要修改提交信息：

```sh
git reset --soft HEAD^
```

## 交互式变基（rebase）

### 问题场景

假设你的 Git 历史如下：

```sh
$ git log --oneline

cb5df14 (HEAD -> main) docs: 维护项目根目录下的 `README.md`
00b0f5a chore: 移除依赖 `katex`，改用 `@vuepress/plugin-markdown-math`
73be10a docs: 正文中代码、公式风格优化
0cf4860 format: 使用 oxfmt 格式化代码
ee3c898 refactor: 移除 dot 及 svg 文件，改用 dot 代码块形式
94af86a chore: 启用 ocx 进行格式化，保留 prettier 对 markdown 的格式化功能
```

你发现 `94af86a` 这个提交遗漏了几个文件（比如某些图片、配置文件），你希望把漏掉的文件补进 `94af86a`，同时保持后续提交的内容不变，并且所有操作都还没有推送到远程仓库，可以安全地改写历史。

### 解决方案及步骤

使用 **交互式变基（`git rebase -i`）**，将目标提交标记为 `edit`，然后在该提交处添加漏掉的文件并修改（`git commit --amend`），最后继续变基，让后续提交重新应用。整个过程需要解决可能的冲突，并确保工作区干净。

在改写历史前，建议先创建一个备份分支，以防操作失误：

```sh
git branch backup-main
```

启动交互式变基之前，需要处理尚未提交的更改，把它们暂存（stash）起来（等变基完成后可以恢复）：

```sh
git stash push -m "临时保存未提交的更改"
```

::: tip

Git 不允许在未提交的状态下进行变基（rebase），以免在重写历史时意外丢失这些更改。如果你的工作区还有未暂存（或未提交）的修改，直接 `rebase` 会产生错误：

```sh
cannot rebase: You have unstaged changes. error: Please commit or stash them.
```

:::
然后执行变基：

```sh
git rebase -i 94af86a^  # 注意末尾有个脱字符
```

此时会打开一个编辑器，显示类似以下内容：

```sh
pick 94af86a # chore: 启用 ocx 进行格式化，保留 prettier 对 markdown 的格式化功能
pick ee3c898 # refactor: 移除 dot 及 svg 文件，改用 dot 代码块形式
pick 0cf4860 # format: 使用 oxfmt 格式化代码
pick 73be10a # docs: 正文中代码、公式风格优化
pick 00b0f5a # chore: 移除依赖 `katex`，改用 `@vuepress/plugin-markdown-math`
pick cb5df14 # docs: 维护项目根目录下的 `README.md`

# Rebase aed6b71..cb5df14 onto aed6b71 (6 commands)
#
# Commands:
# p, pick <commit> = use commit
# r, reword <commit> = use commit, but edit the commit message
# e, edit <commit> = use commit, but stop for amending
# s, squash <commit> = use commit, but meld into previous commit
# f, fixup [-C | -c] <commit> = like "squash" but keep only the previous
.git/rebase-merge/git-rebase-todo [unix] (17:32 28/03/2026)
```

将目标提交（第一行）的 `pick` 改为 `edit`（或简写为 `e`）：

```sh
edit 94af86a # chore: 启用 ocx 进行格式化，保留 prettier 对 markdown 的格式化功能
pick ee3c898 # refactor: 移除 dot 及 svg 文件，改用 dot 代码块形式
pick 0cf4860 # format: 使用 oxfmt 格式化代码
```

:::tip
按下字母 <kbd>I</kbd> 或 <kbd>insert</kbd> 键便可以进入编辑状态；按下 <kbd>ESC</kbd> 后输入 `:wq` 可保存退出。
:::
保存并关闭编辑器。Git 会停在 `94af86a` 提交处，并提示：

```sh
Stopped at 94af86a...  # chore: 启用 ocx 进行格式化，保留 prettier 对 markdown 的格式化功能
You can amend the commit now, with

  git commit --amend

Once you are satisfied with your changes, run

  git rebase --continue
```

这时再把刚刚暂存的提交 pop 出来：

```sh
git stash pop
```

这时再把漏掉的文件 `add` 进来，然后提交：

```sh
# 添加漏掉的文件
git add 漏掉的文件1 漏掉的文件2

# 将这些文件合并到当前提交，不修改提交信息
git commit --amend --no-edit
```

如果这时还有其他未暂存的文件：

```sh
git stash push -m "变基过程中暂存的更改"
```

我们可以完成变基：

```sh
git rebase --continue
```

提示如下信息即为成功：

```sh
Successfully rebased and updated refs/heads/main.
```

这时再把没有处理好的文件 pop 出来：

```sh
git stash pop
```

这样我们就完成了一次改写历史的变基。

### 处理冲突

暂时没遇到，遇到了再补充🤣！
