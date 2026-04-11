---
icon: icon-park-solid:comments
date: 2026-03-29
category:
    - vuepress
tag:
    - giscus
    - vuepress
---

# 文档路径变更后如何恢复 Giscus 评论

如果你使用 Giscus 作为博客的评论系统，当使用 `mapping: "pathname"` （默认）时，Giscus 在创建每个 Discussion 时，会在正文开头自动插入一行类似这样的注释：

```html
<!-- sha1: 原始路径的哈希值 -->
```

例如，原始路径是 `/old/path.html`，Giscus 会计算其 SHA1 哈希并插入注释。

当页面加载时，Giscus 会先用当前页面的新路径去 GitHub 搜索同名 Discussion，如果找不到（因为路径变了），它会转而搜索正文中包含旧路径哈希的 Discussion。

> 如果启用了 `data-strict="1"`，Giscus 在找到正文包含旧哈希的 Discussion 后，会自动认为这就是匹配项，从而加载评论。
> 因此，如果你一开始就开启了 `strict` 模式，路径变化后无需任何额外操作，评论会自动恢复。

如果没有开启 `strict`，或者想手动让新的路径匹配，就需要修改 GitHub 上对应 Discussion 的正文内容。

以下是如何手动修改 GitHub 仓库中的 Discussion 来适配新路径的方法。

## 找到对应的 Discussion

在你的 GitHub 仓库中，进入 Discussions 页面，找到与旧文章关联的讨论帖（通常标题就是原来的文章标题或路径）。

## 编辑 Discussion 的正文

点击讨论帖右上角的 … 按钮，选择 Edit。

在正文编辑器中，你会看到 Giscus 自动插入的类似下面的注释：

```html
<!-- sha1: 5d41402abc4b2a76b9719d911017c592 -->
```

现在，你需要做的是将该注释中的哈希值改为新路径的哈希值。

## 计算新路径的哈希值

你可以使用任意 SHA1 哈希生成工具。

### JavaScript

你可以在浏览器控制台执行以下代码（将 `/new/path.html` 替换为你的新路径）：

```javascript
let path = "/new/path.html";
await crypto.subtle.digest("SHA-1", new TextEncoder().encode(path)).then((hash) => {
    const hashArray = Array.from(new Uint8Array(hash));
    const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
    console.log(hashHex);
});
```

### Linux/Mac 命令行

可以用以下命令：

```bash
echo -n "/new/path.html" | sha1sum | cut -d ' ' -f1
```

### PowerShell

假设你使用 windows 系统，如果有大量文章都要修改，也可以使用 Powershell：

```powershell
function sha1 {
    param(
        [Parameter(Mandatory = $true, ValueFromPipeline = $true)]
        [string] $Path
    )
    process {
        $bytes = [System.Text.Encoding]::UTF8.GetBytes($Path)
        $sha1 = [System.Security.Cryptography.SHA1]::Create()
        $hashBytes = $sha1.ComputeHash($bytes)
        $hashHex = -join ($hashBytes | ForEach-Object { $_.ToString("x2") })
        [PSCustomObject]@{ Path = $Path; Hash = $hashHex; }
    }
}
```

函数使用方法：

```powershell
"/your/path/to/file1.html", "/another/file2.html", "/file3.html" | sha1
```

你将会得到：

```sh
Path                     Hash
----                     ----
/your/path/to/file1.html c35781ddeadda6767839c6690a3fac32a29a5da1
/another/file2.html      ee2b6f3e08fae99216d728a3d98834f373d9a234
/file3.html              4cbb9726c7ee35b433a64d2cc856986add1de3cd
```

得到哈希值后，替换 Discussion 正文中原有的注释。

## 保存 Discussion

点击 Save discussion 之后，当你的页面以新的 pathname 加载 Giscus 时，Giscus 就能通过这个新的哈希注释找到该 Discussion。
