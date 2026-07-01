---
icon: ix:operating-system
date: 2026-05-16
category:
    - linux
tag:
    - 银河麒麟
---

# 银河麒麟系统使用笔记

在 Linux 系统中，每个文件实际上有三个时间戳，修改权限或内容会影响不同的时间戳 [-5](https://www.hostinger.com/ng/tutorials/linux-touch-command)：

- **修改时间 (Modification Time, mtime)**：文件 **内容** 最后被修改的时间。这就是我们主要修改的对象。
- **访问时间 (Access Time, atime)**：文件 **内容** 最后被读取（访问）的时间。
- **状态更改时间 (Change Time, ctime)**：文件的 **元数据**（如所有者、权限、文件名或链接数）最后被更改的时间 -。

一个非常重要的限制是：**ctime 无法被 `touch` 命令修改**。当你用 `touch` 命令修改 atime 或 mtime 时，内核会自动将 ctime 更新为当前时间。ctime 是一种系统强制记录的时间戳。

### 使用 `cp -p` 一次性复制并保留属性 (推荐)

这个方法最简单直接，可以一步到位。如果是在文档编辑软件中“另存为”了一个新文件，想用原 `.wps` 文件的属性覆盖它，只需在终端执行：

```sh
cp -p " 原文件.wps" " 新文件.docx"
```

此命令会将所有属性（时间戳、权限、所有者等）一并复制

### 使用 `touch -r` 仅同步时间戳 (专为当前场景设计)

只更改文档的时间戳，而不影响文件内容。

```sh
touch -r "原文件.wps" "新文件.docx"
```

这条命令会把 `.wps` 文件的访问时间（atime）和修改时间（mtime）完全复制给 `.docx` 文件

- **使用 `stat` 命令**：这会显示文件/目录所有相关信息，包括访问时间（Access，即 atime）、修改时间（Modify，即 mtime）和状态更改时间（Change，即 ctime）[-25](https://developer.aliyun.com/article/1566961)。

    ```sh
    stat <文件名>
    ```

- **设置为特定时间**
  有两种常用方法可设置精确日期：
    - **使用 `-t` 选项**：格式为 `[[CC]YY]MMDDhhmm[.ss]`，其中 `CC` 是世纪，`YY` 是年份，`MM` 是月份，`DD` 是日期，`hh` 是小时，`mm` 是分钟，`ss` 是秒（可选）
    - **使用 `-d` 选项**：支持更灵活的描述，如 "yesterday" 或 "2 weeks ago"，使用起来更直观。

        ```sh
        touch -d "2025-12-01 12:30:45" <文件名>  # 设置指定日期
        touch -d "yesterday" <文件名>            # 设置为昨天
        ```

- **使用参考文件**
  如果想将文件的时间设置为与另一个文件相同，可以使用 `-r` 选项，`-r` 指的是 "reference"。

    ```sh
    touch -r <参考文件> <目标文件>
    ```

    该命令会将 `<目标文件>` 的访问和修改时间更新成和 `<参考文件>` 的一样。

`dpkg -S` 命令可以查找一个文件属于哪个已安装的软件包。

在终端执行：

```bash
dpkg -S $(which 7 z)
```

**预期结果**：如果 `7z` 是通过 `apt` 安装的，你会看到类似以下的输出：

```text
    p7zip-full: /usr/bin/7 z
```

这表示 `7z` 命令属于 `p7zip-full` 这个软件包。
