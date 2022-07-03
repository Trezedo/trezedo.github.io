---
icon: git
date: 2022-01-27
tag:
  - git
---

# Git的使用

## 安装

下载安装包

打开后按默认设置继续下去就可以了

## git初始化

这里假设目前所使用的git仓库都是同一个账号（全局）

```bash
git config --global user.email "注册时的邮箱"
git config --global user.name "你的用户名"
```

可以通过以下指令查询配置是否成功：

```bash
git config --list
```

### ssh公钥

```bash
ssh-keygen -t rsa -C "注册时的邮箱"
```

之后连续回车直至结束即可，结果类似以下内容：

```bash
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

在本地Git仓库和gitHub仓库建立连接，创建SSH 时，可以输入**passphrase**（可以默认不输入）。如果在一开始没有输入的话，后面就不好整了，需要重新进行连接，输入**passphrase**

在生成SSH Key时，如果不小心设置了passphrase，使用SSH协议克隆远程仓库时，在每次git pull和git push时都会提示`Enter passphrase for key ‘/Users/zhangxiaoxue/.ssh/id_rsa‘`，每次都要手动输入密码才能继续操作，可以在命令行输入`sh-keygen -p`进行重新设置，直接回车输入为空，就没有密码了。

![](https://zedo.gitee.io/img/20220128193519.png)

![](https://zedo.gitee.io/img/20220128193543.png)

点击确定，输入密码

```bash
ssh -T git@gitee.com
The authenticity of host 'gitee.com (212.64.62.183)' can't be established.
ECDSA key fingerprint is SHA256:FQGC9Kn/eye1W8icdBgrQp+KkGYoFgbVr17bmjey0Wc.
Are you sure you want to continue connecting (yes/no/[fingerprint])? yes
Warning: Permanently added 'gitee.com,212.64.62.183' (ECDSA) to the list of known hosts.
Enter passphrase for key 'C:\Users\Trezedo/.ssh/id_rsa':
Hi ?[36;01mTrezedo?[0m! You've ?[32msuccessfully?[0m authenticated, but GITEE.COM does not provide shell access.
```



在项目中添加gitee远程仓库地址

```bash
git remote add gitee git@gitee.com:zedo/zedo.git
```

**git remote -v** 查看远程库信息

删除已有的 GitHub 远程库：

```bash
git remote rm gitee
```



```bash
git config --global credential.helper store # 长期存储密码，似乎没用
```

https://blog.csdn.net/yywan1314520/article/details/51566924

https://segmentfault.com/q/1010000012086638

> git pull --rebase origin master
>
> 获取远程库与本地同步合并（如果远程库不为空必须做这一步，否则后面的提交会失败）

## 分支管理

### 列出分支

列出分支基本命令：

```sh
git branch
```

没有参数时，`git branch` 会列出你在本地的分支：

```
* master
```

此例的意思就是，我们有一个叫做 `master` 的分支，并且该分支是当前分支。

当执行 `git init` 的时候，默认情况下 Git 就会为我们创建 `master` 分支。

### 创建分支

如果我们要手动创建一个分支。执行以下命令即可：

```sh
 git branch branchname
```

其中 **branchname** 是分支名。

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
git checkout branchname
```

也可以使用以下命令来创建新分支并立即切换到该分支下：

```sh
git checkout -b branchname
```

### 删除分支

删除分支的命令如下：

```sh
git branch -d branchname
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

将名为 branchname 的分支合并到 master 分支：

```sh
# 先切换到主分支
git checkout master
git merge branchname
```



### 重命名分支

本地分支重命名(还没有推送到远程)

```sh
# 将 oldName 分支重命名为 newName
git branch -m oldName newName
```

远程分支重命名

> 重命名的分支不能是默认分支

```sh
# 先重命名本地分支
git branch -m oldName newName

# 删除远程分支
git push --delete origin oldName

# 上传到新分支
git push origin newName

# 关联修改后的本地分支与远程分支
git branch --set-upstream-to origin/newName
```



## 查看提交历史

简洁版：

```sh
git log --oneline
```



放弃本地修改，全部使用远端代码：

```sh
# 拉取所有更新，不同步
git fetch --all

# 本地代码同步远端最新版本（覆盖本地所有与远程仓库上同名的文件）
# git reset 指令把 HEAD 指向 master 最新版本
git reset --hard origin/mastergit pull

# 再更新一次（其实也可以不用，第二步命令做过了）
git pull
```

git强制覆盖本地命令(单条执行)∶

```sh
git fetch --all && git reset --hard origin/master && git pull
```



## 问题总结

[fatal: refusing to merge unrelated histories](https://blog.csdn.net/weixin_44708045/article/details/121592567)

[error: failed to push some refs to 'git@gitee.com:xxx/xxx.git'](https://www.cnblogs.com/makalochen/p/12652239.html)

