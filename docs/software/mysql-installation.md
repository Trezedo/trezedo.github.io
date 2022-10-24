---
date: 2022-10-24
tag:
    - MySQL
---

# MySQL 安装

> 最近做课设需要用到 MySQL~~(虽然我更喜欢 PostgreSQL)~~，于是就记录下安装过程。

安装步骤总览：<https://dev.mysql.com/doc/refman/8.0/en/windows-install-archive.html>

## 下载并安装

- 社区版下载：<https://dev.mysql.com/downloads/mysql/>
- 历史版本：<https://downloads.mysql.com/archives/community/>

选择你的操作系统，然后下载压缩包即可：

![下载操作](./img/mysql/1666607842953.png)

应该是国内有 CDN，下载速度还挺快的。

因为这里我们选择了非“安装”版（安装版会默认安装到 `C:\Program Files\MySQL`），需要手动配置。下面的内容参考了[官网指南](https://dev.mysql.com/doc/refman/8.0/en/windows-install-archive.html)。

先解压刚才下载的压缩包到你喜欢的路径，我选择了 `E:\db\mysql-8.0.28-x64`。

## 创建可选的配置文件

> 这部分可以看官网：[Creating an Option File](https://dev.mysql.com/doc/refman/8.0/en/windows-create-option-file.html)，不想看的话就跟着下面的操作执行吧。

大致意思就是可以在 MySQL 的安装目录建一个 `my.ini`，这个后缀是 windows 常见的配置文件类型。其内容如下：

```ini
[mysqld]
# 设置 basedir 为你的安装路径
basedir=E:/db/mysql-8.0.28-x64
# 设置 datadir数据目录的位置（不要求在 mysql 目录下）
datadir=E:/db/mysql-8.0.28-x64/data
```

不过要注意，Windows 路径名在配置文件中应使用（正）斜杠而不是反斜杠。如果的确要用反斜杠，则应输两遍，或者加上双引号，可参见 [Option File Syntax](https://dev.mysql.com/doc/refman/8.0/en/option-files.html#option-file-syntax)：

```ini
[mysqld]
basedir=E:\\db\\mysql-8.0.28-x64
datadir="E:\db\mysql-8.0.28-x64\data"
```

## 初始化 MySQL

为了后续操作正常进行，我们配置一下环境变量：

添加新变量，名为 `mysql`，其值为：

```text
E:\db\mysql-8.0.28-x64;E:\db\mysql-8.0.28-x64\bin
```

然后在 Path 变量里引用该变量：`%mysql%`

![配置环境变量示意图](./img/mysql/1666610578065.png)

然后根据[文档](https://dev.mysql.com/doc/refman/8.0/en/data-directory-initialization.html)，初始化 MySQL：

```sh
$ mysqld --initialize --console
2022-10-24T11:25:35.484575Z 0 [System] [MY-013169] [Server] E:\db\mysql-8.0.28-x64\bin\mysqld.exe (mysqld 8.0.28) initializing of server in progress as process 28724
2022-10-24T11:25:35.505005Z 1 [System] [MY-013576] [InnoDB] InnoDB initialization has started.
2022-10-24T11:25:35.905114Z 1 [System] [MY-013577] [InnoDB] InnoDB initialization has ended.
2022-10-24T11:25:37.068436Z 6 [Note] [MY-010454] [Server] A temporary password is generated for root@localhost: cgyf_w.pu3gK
```

注意上面的最后一行，`cgyf_w.pu3gK` 是 mysql 为用户 `root@localhost` 创建的临时密码，需要先记住这个密码，后续登录和修改密码需要用到！

## 安装 MySQL Server 服务

> [Starting MySQL as a Windows Service](https://dev.mysql.com/doc/refman/8.0/en/windows-start-service.html)

这里我们跳过了在命令行启动 MySQL 的步骤，因为一般都是用 DataGrip，Navicat 等工具连接对吧。同时为了能够用这些工具连接 MySQL “服务器”，需要注册 Windows 服务。

> 在 Windows 上，运行 MySQL 的推荐方法是将其作为 Windows 服务安装，这样，当 Windows 启动和停止时，MySQL 会自动启动和停止。作为服务安装的 MySQL 服务器也可以使用 NET 命令或图形服务实用程序从命令行进行控制。通常，要将 MySQL 安装为 Windows 服务，您应该使用具有管理员权限的帐户登录。

使用命令：

```sh
mysqld --install  # 可加 [服务名]，默认是 mysql
```

出现 `Service successfully installed.` 则代表安装成功。如果出现 `Install/Remove of the Service Denied!`，可改用管理员身份执行。

还有一种情况，就是之前安装过 mysql 但没卸载干净，就会出现类似：

```text
The service already exists!
The current server installed: E:\db\mysql-8.0.28-x64\bin\mysqld.exe MySQL
```

这时可用以下命令删除服务（可能要用 cmd 而非 powershell）：

```sh
$ sc delete mysql
[SC] DeleteService 成功
```

## 启动 MySQL

服务安装成功之后通过命令，注意要和安装命令的 `[服务名]` 一样（可能需要管理员身份）:

```sh
$ net start mysql
MySQL 服务正在启动 .
MySQL 服务已经启动成功。
```

接着登陆 mysql：

```sh
mysql -u root -p
# 输入密码时要手打！
```

![1666612527556](img/mysql/1666612527556.png)

先不要着急关闭或退出，先修改密码：

```sql
alter user root@localhost identified by '123456';
-- 或者用下面的
alter user 'root'@'localhost' identified by '123456';
```

这里 `123456` 就是新密码，当然可以用别的，只要你记得住。最后输入 `quit` 即可退出。

不放心密码是否修改成功的，可以重新用上面的命令连接，登陆测试一下。

下面我用的是 IDEA 内置的数据库工具连接，用户名填 `root` 就可以了，端口默认是 `3306`，数据库名可以不填：

![1666613984187](img/mysql/1666613984187.png)

连接成功！至此，我们已经完成了 MySQL 的安装。
