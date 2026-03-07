---
date: 2023-04-16
icon: logos:java
category:
    - Java
tag:
    - 文件传输
    - springboot
---

# SpringBoot 文件上传下载

## 文件上传

以下给出 Spring Boot 上传文件的常见方式。

### 使用 `@RequestParam` 注解

后端代码：

```java
@PostMapping("/upload")
public Result<?> upload1(@RequestParam("file") MultipartFile file) {
    // 处理上传的文件
    return "上传成功";
}
```

Web 前端需要定义 `input` 标签

```html
<input type="file" id="fileInput" />
```

上传时将文件加到 [`FormData`](https://developer.mozilla.org/zh-CN/docs/Web/API/FormData) 对象：

```ts
const fileInput = document.querySelector<HTMLInputElement>("#fileInput");

function handleFileUpload() {
    const file = fileInput?.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    fetch("/upload", {
        method: "POST",
        body: formData,
    }).then((response) => {
        console.log(response);
    });
}

fileInput?.addEventListener("change", handleFileUpload);
```

> 一般组件库上传组件的 FormData 存放文件的 key 为 `"file"` ，可以在调试网络面板中查看实际请求并做修改。

### 从请求中获取

使用 Spring 的 `MultipartHttpServletRequest` 类来处理上传的文件。

```java
@PostMapping("/upload")
public String handleFileUpload(HttpServletRequest request) {
    // 检查文件是否为空
    MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;
    MultipartFile file = multipartRequest.getFile("file");
    if (file.isEmpty()) {
        return "上传失败，请选择文件";
    }

    // 保存文件到服务器
    try {
        byte[] bytes = file.getBytes();
        Path path = Paths.get("/path/to/save/file/" + file.getOriginalFilename());
        Files.write(path, bytes);
    } catch (IOException e) {
        e.printStackTrace();
        return "上传失败：" + e.getMessage();
    }
    return "上传成功";
}
```

在此示例中，`@PostMapping` 注解表示此方法将处理 HTTP POST 请求，并将请求映射到 `/upload` 路径。我们首先将 `HttpServletRequest` 转换为 `MultipartHttpServletRequest`，然后使用 `getFile("file")` 方法获取要上传的文件。您可以根据需要更改这些值。

在方法主体中，我们首先检查文件是否为空，然后使用 `getBytes()` 方法获取文件内容并将其保存到服务器。请注意，此示例假定您的服务器上已经有一个名为 `/path/to/save/file/` 的目录，需要根据实际情况更改此路径。

保存文件也可以使用 `File.transferTo` 方法：

```java
String savePath = "/path/to/save/file/" + file.getOriginalFilename();
try {
    file.transferTo(new File(savePath));
} catch (IOException e) {
    e.printStackTrace();
}
```

### 使用 `@RequestPart` 注解

后端代码：

```java
@PostMapping("/upload")
public  Result<?> upload2(@RequestPart("file") MultipartFile file, @RequestPart("name") String name) {
    // 处理上传的文件和其他参数
    // 处理 URL 编码（主要针对中文）
    name = URLDecoder.decode(path, StandardCharsets.UTF_8);
    return "上传成功";
}
```

这里的参数除了 `file` 还有另一个 `name`，注意如果 `name` 包含中文，需要用 [`encodeURIComponent`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent) 进行编码，否则后端得到的是乱码。

> java 中的 `URLDecoder.decode(s, StandardCharsets.UTF_8)` 对应于 js 中的 `decodeURIComponent()` 方法。

前端代码：

```typescript
const fileInput = document.querySelector<HTMLInputElement>("#fileInput");

function handleFileUpload() {
    const file = fileInput?.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", encodeURIComponent("中文" + file.name));
    fetch("/upload", {
        method: "POST",
        body: formData,
    })
        .then((response) => {
            console.log(response);
        })
        .catch((err) => {
            console.error(err);
        });
}

fileInput.addEventListener("change", handleFileUpload);
```

## 文件下载

```java
@RestController
@RequestMapping("/files")
public class MinioController extends BaseController {
    @GetMapping("/download/**")
    public void download(HttpServletRequest request, HttpServletResponse response) {
        String path = request.getRequestURI().replace("/files/download", "");
        File file = new File(path);
        // todo 检查文件名合法性
        if (!file.exists()) {
            System.out.println("文件不存在");
            return;
        }
        String realFilename = file.getName();

        response.setCharacterEncoding("UTF-8");
        response.setHeader(
                HttpHeaders.CONTENT_DISPOSITION,
                "attachment;filename=" + URLEncoder.encode(realFilename, StandardCharsets.UTF_8)
        );
        // 可设置缓存策略：etag、lastModified 等
        try (InputStream inputStream = new FileInputStream(file)) {
            // 通用 MIME 类型
            response.setHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_OCTET_STREAM_VALUE);

            ServletOutputStream outputStream = response.getOutputStream();
            byte[] buffer = new byte[1024];
            int len;

            // 从输入流中读取定量的字节，并存储在缓冲区字节数组中，读到末尾返回 -1
            while ((len = inputStream.read(buffer)) != -1) {
                outputStream.write(buffer, 0, len);
            }
            // try-with-resource 不需要手动关闭 inputStream
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```

`response.setContentType` 也可替换为 `response.setHeader(HttpHeaders.CONTENT_TYPE, xxx)`

在 HTTP 响应头中，Content-Disposition 有两个可选值：

- `"inline"` 表示将文件内容直接嵌入到浏览器中，通常用于显示图片、视频或 PDF 等文件。
- `"attachment"` 表示将文件作为附件下载，通常用于下载文件，而不是在浏览器中打开它。

当 Content-Disposition 设置为 `"inline"` 时，浏览器将尝试在页面中显示文件，如果浏览器支持该文件类型和插件，则文件将直接嵌入到页面中；否则，浏览器将提示用户下载该文件。

当 Content-Disposition 设置为 `"attachment"` 时，浏览器将始终提示用户下载该文件。

后面的 `filename` 指定了下载文件的名称，不过这个响应头只是一种约定，不是 HTTP 标准规范中定义的标头。

前端代码：

```ts
// 下载保存文件
function saveFile(blob: Blob, filename: string) {
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
    // 释放内存中的 blob
    URL.revokeObjectURL(link.href);
}
```

如果使用 `axios`：

```ts
function downloadApi(filepath: string) {
    axios
        .get("/api/files/download/" + filepath, {
            responseType: "blob",
        })
        .then(({ headers, data }) => {
            const cd: string = headers["content-disposition"];
            const type = headers["content-type"].split(";")[0];
            const blob = new Blob([data] /*, { type } */);
            const filename = decodeURI(cd.replace("attachment;filename=", ""));
            saveFile(blob, filename);
        });
}
```

如果使用 `fetch`：

```ts
function downloadApi(filepath: string) {
    fetch("/api/files/download/" + filepath, {
        headers: {},
    })
        .then(async (response) => ({
            name:
                response.headers
                    .get("content-disposition") // 可以大写
                    ?.replace("attachment;filename=", "") || "filename",
            blob: await response.blob(),
        }))
        .then(({ blob, name }) => {
            saveFile(blob, name);
        });
}
```

<!-- todo 大文件、视频断点续传 https://www.cnblogs.com/yanch01/p/14585297.html -->
