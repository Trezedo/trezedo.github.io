---
date: 2022-01-27
icon: skill-icons:git
tag:
    - git
---

# Git 的使用

本文适用于 windows 系统。

## 安装

下载安装包，这里给出一些国内镜像：

- 华为镜像 <https://repo.huaweicloud.com/git-for-windows/>
- 淘宝镜像 [git-for-windows](https://registry.npmmirror.com/binary.html?path=git-for-windows/)
- 清华镜像 [git-for-windows](https://mirrors.tuna.tsinghua.edu.cn/github-release/git-for-windows/git/)

下载 `.exe` 文件（例如 `Git-2.37.1-64-bit.exe`）后打开，按默认设置继续下去就可以了。

## git 初始化

这里假设目前所使用的 git 仓库都是同一个账号（全局）：

```sh
git config --global user.email "注册时的邮箱"
git config --global user.name "你的用户名"
```

可以通过以下指令查询配置是否成功：

```sh
git config --list
```

### 添加 ssh 公钥

```sh
ssh-keygen -t rsa -C "注册时的邮箱"
```

之后连续回车直至结束即可，结果类似以下内容：

```text
$ ssh-keygen -t rsa -C "1962234583@qq.com"
Generating public/private rsa key pair.
Enter file in which to save the key (C:\Users\Trezedo/.ssh/id_rsa):
Created directory 'C:\Users\Trezedo/.ssh'.
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
Your identification has been saved in C:\Users\Trezedo/.ssh/id_rsa.
Your public key has been saved in C:\Users\Trezedo/.ssh/id_rsa.pub.
The key fingerprint is:
SHA256:OPk4c769YNYRcDoyw3Z20HoVZRYKLc9/zKQ1s+brSMA 1962234583@qq.com
The key's randomart image is:
+---[RSA 3072]----+
|        o.o..o=. |
|     .   =o.o+   |
|      * =.o=.    |
|     . O.oo.o  oo|
|      + S..E . *+|
|       + . .. oo+|
|      + * .  .o. |
|       B o  . .. |
|        o.o. ..o.|
+----[SHA256]-----+
```

在生成 SSH Key 时，如果设置了 passphrase，使用 SSH 协议克隆远程仓库时，在每次 git pull 和 git push 时都会提示 `Enter passphrase for key '/Users/Trezedo/.ssh/id_rsa'`，每次都要手动输入密码才能继续操作，可以在命令行输入 `sh-keygen -p` 进行重新设置，直接回车输入为空，就没有密码了。

接下来在码云上添加 SSH 公钥。右上角打开设置，

![28193519.png](https://zedo-img.netlify.app/img/2022-01/28193519.png)

找到 SSH 公钥

![28193543.png](https://zedo-img.netlify.app/img/2022-01/28193543.png)

粘贴 `id_rsa.pub`  中的内容到以上文本框，点击确定，输入密码即可。

在项目中添加 gitee 远程仓库地址

```sh
git remote add gitee git@gitee.com:zedo/zedo.git
```

`git remote -v` 查看远程库信息

删除已有的远程库地址：

```sh
git remote rm gitee
```

[解决 git 每次都要输入用户名和密码问题](https://blog.csdn.net/yywan1314520/article/details/51566924)

[git 如何 add 全部而又忽略部分文件](https://segmentfault.com/q/1010000012086638)

> ```sh
> git pull --rebase origin master
> ```
>
> 获取远程库与本地同步合并（如果远程库不为空必须做这一步，否则后面的提交会失败）

## git 命令

### 列出分支

列出本地分支命令：

```sh
git branch
```

没有参数时，`git branch` 会列出你在本地的分支：

```text
* master
```

此例的意思就是，我们有一个叫做 `master` 的分支，并且该分支是当前分支。

当执行 `git init` 的时候，默认情况下 git 就会为我们创建 `master` 分支。

列出远程源命令：

```sh
git remote
```

通常情况下，远程源的名称是 origin：

```text
* origin
```

### 创建分支

如果我们要手动创建一个分支。执行以下命令即可：

```sh
git branch branch-name
```

其中 **branch-name** 是分支名。

```sh
$ git branch testing
$ git branch
* master
  testing
```

现在我们可以看到，有了一个新分支 **testing**。

### 切换分支

如果要切换到我们要修改的分支，使用 `checkout`：

```sh
git checkout branch-name
```

也可以使用以下命令来创建新分支并立即切换到该分支下：

```sh
git checkout -b branch-name
```

### 删除分支

删除分支的命令如下：

```sh
git branch -d branch-name
```

例如我们要删除 testing 分支：

```sh
$ git branch
* master
  testing
$ git branch -d testing
Deleted branch testing (was 2a35462).
$ git branch
* master
```

### 合并分支

将名为 branch-name 的分支合并到 master 分支：

```sh
# 先切换到主分支
git checkout master
git merge branch-name
```

### 重命名分支

#### 本地分支

如果重命名当前分支：

```sh
git branch -m new_name
```

如果重命名任意本地分支：

```sh
# 将 old_name 分支重命名为 new_name
git branch -m old_name new_name
```

#### 远程分支

> 注意：重命名的远程分支不能是默认分支，如要修改默认分支的名称，可以先设置其他分支为默认分支。

假设远程分支与本地分支的名称一致。

```sh
# 先重命名本地分支
git branch -m old_name new_name

# 删除远程分支
git push --delete origin old_name

# 上传到新分支
git push origin new_name

# 关联修改后的本地分支与远程分支
git branch --set-upstream-to origin/new_name
```

### 查看提交历史

`git log` 可以查看提交历史。

查看简洁版的记录可以使用：

```sh
git log --oneline
```

如果有多条提交，命令行终端不会完全展示，这时按回车键可以继续往下查看，按 `Q` 键可以退出。

#### 回退到某个版本

```sh
git reset --hard HEAD^ # 回退到上一版
git reset --hard HEAD^^ # 回退到倒数第二版
git rest --hard dc3dc8b # 回退到 commit id 为 dc3dc8b 的版本
```

commit id 可以通过以下命令查看：

```sh
git log --oneline
git reflog
```

soft、mixed 和 hard 的区别：

- soft：撤销 commit 的提交，但不撤销该提交包含的更改，保留工作区未提交的更改；
- mixed：撤销暂存区的提交，工作区的更改同样也保留。
- hard：彻底回退。工作区、暂存区、commit 提交都变为某个版本的内容。

#### 放弃本地修改

全部使用远端代码的方法如下：

```sh
# 拉取所有更新，不同步
git fetch --all

# 本地代码同步远端最新版本（覆盖本地所有与远程仓库上同名的文件）
# git reset 指令把 HEAD 指向 master 最新版本
git reset --hard origin/master git pull

# 再更新一次（其实也可以不用，第二步命令做过了）
git pull
```

git 强制覆盖本地命令(单条执行)∶

```sh
git fetch --all && git reset --hard origin/master && git pull
```

[.gitignore 规则](https://blog.csdn.net/zh854663752/article/details/83352285)

## 问题总结

[fatal: refusing to merge unrelated histories](https://blog.csdn.net/weixin_44708045/article/details/121592567)

[error: failed to push some refs to 'git@gitee.com:xxx/xxx.git'](https://www.cnblogs.com/makalochen/p/12652239.html)
