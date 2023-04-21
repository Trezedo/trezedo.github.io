---
date: 2023-01-21
---

# Redis 安装

## 介绍

Redis 是一款 key-value 存储结构的内存级 NoSQL 数据库

- 支持多种数据存储格式
- 支持持久化
- 支持集群

## 下载安装

相信大多数人使用的是 Windows 系统的电脑，而 [Redis 安装文档](https://redis.io/docs/getting-started/installation/) 没有提供 Windows 版本的安装包，不过我们可以选择第三方支持：

- <https://github.com/microsoftarchive/redis/releases> 已经归档且不再更新，停留在 ![ms version](https://img.shields.io/github/v/release/microsoftarchive/redis?label=%20)；
- <https://github.com/tporadowski/redis/releases> 目前最新版本是 ![win version](https://img.shields.io/github/v/release/tporadowski/redis?label=%20)，更新频率为一年 1-2 更。

> 尽管官方新版 Redis 已经 ![version](https://img.shields.io/github/v/release/redis/redis?label=%20) 了，但 ![win version](https://img.shields.io/github/v/release/tporadowski/redis?label=%20) 的旧版本并不影响学习和项目的使用。

![redis for windows github](https://zedo.gitee.io/img/redis-20230121133815.png)

下载 `.msi` 后缀的文件有安装界面，`.zip` 后缀的文件则要解压手动安装，这里选择前者。

![选择安装路径](https://zedo.gitee.io/img/redis-20230121134416.png)

根据个人喜好和习惯选择安装路径，为了方便可以勾选下方的添加环境变量。

![选择端口](https://zedo.gitee.io/img/redis-20230121134441.png)

学习阶段使用默认端口号即可，但在企业开发中是要修改的。

接着按下 Next 完成安装即可。

我们打开安装路径，按类型对文件排序：

![安装文件截图](https://zedo.gitee.io/img/redis-20230124144146.png)

我们主要看 `.conf` 和 `.exe` 这两种类型的文件。

首先有两个以 `.conf` 结尾的文件，它是 configuration 的缩写，即配置文件。`.exe` 结尾的则是可执行文件：

- redis-server.exe：服务端程序，Redis 服务器，供客户端连接；
- redis-cli.exe：命令行接口（command line interface），通过它连接 Redis 服务并进行操作；
- redis-check-dump.exe：RDB 文件修复工具；
- redis-check-aof.exe：AOF 文件修复工具；
- redis-benchmark.exe：性能测试工具，用以模拟同时由多个客户端发送多个查询；
- redis.windows.conf： 配置文件，将 Redis 作为普通软件使用的配置，命令行关闭则 Redis 关闭
- redis.windows-service.conf：配置文件，将 Redis 作为系统服务的配置

我们打开一个 cmd，尝试启动 Redis 服务（也可以双击打开）：

```sh
redis-server
```

![启动redis server失败](https://zedo.gitee.io/img/redis-20230124154819.png)

它提示我们“在一个非套接字上尝试了一个操作”，这可能是因为安装后默认启动了服务，可以按下 <kbd>Win</kbd>+<kbd>R</kbd> 输入 `services.msc` 查看是否有 `Redis`。

为了演示，先用 redis-cli 将 Redis 服务手动关掉：

```sh
redis-cli
127.0.0.1:6379> shutdown
not connected> exit
```

接着重新启动服务就成功了：

![成功启动 Redis 服务](https://zedo.gitee.io/img/redis-20230124155146.png)

## 在命令行使用

成功启动 Redis 后，我们可以用命令行接口使用。

> 下文将把 `host:ip`（如 `127.0.0.1:6379`）换成 `redis`


### ping

检测网络连接的 `ping` 命令：

```sh
redis> ping
PONG
```

### set & get

因为 Redis 是 key-value 存储结构的数据库，所以最简单的就是 `set`、`get` 命令。

例如，我们要设置 key 为 name 的值为 zedo：

```sh
redis> set name zedo
OK
redis> get name
"zedo"
```

若要修改值，只需要重新使用 `set` 命令即可。

若获取一个不存在的 key 的值，则会得到 `nil`，相当于我们熟知的 `null`：

```sh
redis> get Name
(nil)
```

同时可以看出 Redis 的 key 是区分大小写的。

对于字符串，我们还可以使用双引号来输入转义符：

```sh
set note "Hello\nWorld"
```

### keys

查询有哪些 key，用 `*` 表示通配符，例如：

```sh
keys * # 查询所有 key
keys n* # 查询所有以 n 开头的 key
keys *e # 查询所有以 e 结尾的 key
```

三者的输出均如下：

```text
1) "note"
2) "name"
```

### del

`del` 命令用来删除 Redis 中的 key-value：

```sh
redis> set somekey "test"
OK
redis> del somekey
(integer) 1
```

也可以一次性删除多个 key：

```sh
redis> del name note
(integer) 2
```

> 当命令行内容很多时，我们可以用 `clear` 命令清屏。

### 文档

所有的命令都可以在文档上找到：<https://redis.io/commands/>。

当我们输入命令时，命令行会提示它的用法，例如 `set` ：

![ping 命令及 set](https://zedo.gitee.io/img/redis-20230124160222.png)

```text
set key value [expiration EX seconds|PX milliseconds] [NX|XX]
```

- EX：设置指定的过期时间，以秒为单位。

- PX：设置指定的过期时间，以毫秒为单位。

- NX：仅当 key 不存在时设置。
- XX：仅当 key 存在时才设置。

如：

```sh
redis> set somekey "will expire in 10 seconds" ex 10
OK
redis> get somekey
"will expire in 10 seconds"
redis> get somekey # 10 秒钟后执行
(nil)
```

更多命令的用法可以在文档上找到：<https://redis.io/commands/set/>。

> 注意：新版的文档可能可使用的选项更多，或者有些选项被移除，这些都是正常的。

Redis 还支持许多其他的数据结构，例如列表、集合、Hash 表等等，请参考文档：<https://redis.io/docs/data-types/>。

在 B 站找到一个快速入门(1h 左右)的视频：[【Redis 入门记(完结)，Redis6 零基础快速入门教程 2022 版】](https://www.bilibili.com/video/BV1GY41187d5/)

<iframe
    src="https://player.bilibili.com/player.html?aid=253491033&bvid=BV1GY41187d5&cid=493391936&page=1" scrolling="no"
    width="100%"
    height="500"
    style="border:none"
    frameborder="no"
    framespacing="0"
    allowfullscreen="true">
</iframe>

## WSL

如果想在 Windows 上用新版 Redis，也可以使用 Windows 子系统：

- 使用虚拟机运行 linux 系统是最简单的同时运行两个系统的方式，但虚拟机耗费资源，吃配置，开关机慢；
- 对于双系统，两个系统各自都能运行很好，但是如果有使用两个系统的需求，来回切换非常麻烦。

微软的文档：[使用 WSL 在 Windows 上安装 Linux](https://learn.microsoft.com/zh-cn/windows/wsl/install)

![安装 WSL](https://zedo.gitee.io/img/redis-20230121122736.png)

我这里要科学上网才能进入安装，开始安装后就可以撤掉梯子。

安装完成后重启电脑，在开始菜单就可以找到了：

![位于开始菜单的子系统](https://zedo.gitee.io/img/redis-20230124172926.png)

或者在命令行里用 `wsl` 即可打开。

默认安装的是 Ubuntu，不过打开后没有图形界面，不过我们并不需要，有需要的可以参考[文章](https://blog.csdn.net/liyunxin_c_language/article/details/114107994)（未验证）。

之后按照官网的 linux Redis 安装方法即可。

## 在 Springboot 中使用

在建立 springboot 项目后，在 `pom.xml` 中添加：

```xml
<!-- https://mvnrepository.com/artifact/org.springframework.boot/spring-boot-starter-data-redis -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>
```

在 `application.yaml` 中添加：

```yaml
spring:
    redis:
        # 以下两个有默认值
        host: localhost
        port: 6379
```

> 如果没有 `application.yaml`，可将 `application.properties` 重命名，或者用 `spring.redis.port=6379` 的形式。

在 `src/test` 下的测试类进行测试：

```java
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;

import java.time.Duration;

@SpringBootTest
class RedisTests {

    @Autowired
    RedisTemplate<String, String> redisTemplate;

    @Test
    void set() {
        ValueOperations<String, String> ops = redisTemplate.opsForValue();
        ops.set("test1", "Hello，你好");
        ops.set("test2", "World，世界", Duration.ofSeconds(20));
    }

    @Test
    void get() {
        ValueOperations<String, String> ops = redisTemplate.opsForValue();
        System.out.println(ops.get("test1"));
        System.out.println(ops.get("test2"));
    }
}
```

Springboot 中使用 RedisTemplate 进行访问，`opsForValue()` 就是针对字符串的，类似的还有 `opsForList`、`opsForHash` 等，对应 Redis 的不同数据结构。以上 `set()` 方法等价于执行：

```sh
# 注意命令行输入中文可能不会正常显示
set test1 "Hello，你好"
set test2 "World，世界" ex 20
```

> 注意：
>
> - `RedisTemplate` 不建议使用 `@Resource` 注解注入，否则 key 的序列化可能会有乱码，例如 `"\xac\xed\x00\x05t\x00\x05test1"`。
> - `RedisTemplate<String, String>` 可以换为 `StringRedisTemplate` 类，且可以使用 `@Resource` 注解进行注入。

如果使用 IDEA，方法左边会有一个绿色按钮，点击即可测试。

我们也可以在命令行里使用 `keys *` 或者 `get` 命令查看是否设置成功。

但要注意的是，命令行不能直接显示中文，其一是因为 Redis 会将中文编码，例如上面的 `"World\xef\xbc\x8c\xe4\xb8\x96\xe7\x95\x8c"`，其二是因为 Windows 命令行默认使用 GBK 编码，因此要切换到 UTF-8 编码才能正常显示。可以通过以下方式显示中文：

```cmd
chcp 65001       # 切换到 UTF-8 编码
redis-cli --raw  # 连接Redis服务，字符串直接显示原文而非编码
```

![命令行显示中文](https://zedo.gitee.io/img/redis-20230124220742.png)
