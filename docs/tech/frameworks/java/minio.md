---
icon: simple-icons:minio
date: 2023-04-17
modified: 2026-03-23
category:
    - java
tag:
    - minio
    - springboot
---

# SpringBoot 引入 MinIO 对象存储

## 介绍

MinIO 是一个对象存储解决方案，基于 GNU AGPL v3 协议开源。它兼容亚马逊 S3 云存储服务的 API，并支持其所有核心功能。

对象存储中的“对象”是指“**二进制大对象**”(Binary Large Object)，也常用 **blob** 表示，它通常是非结构化的数据，且大小是任意的，可以从几个字节到几 TB 不等。

MinIO 非常适用于存储，如图像、音频文件、电子表格和二进制可执行代码等，并提供了专用工具和功能，使用标准的 S3 兼容 API 来存储、列出和检索这些对象。

MinIO 对象存储使用 [桶](https://min.io/docs/minio/windows/administration/object-management.html#buckets) 来组织对象。桶类似于文件系统中的文件夹或目录，其中每个桶可以容纳任意数量的对象。MinIO 存储桶提供与 AWS S3 存储桶相同的功能。

官方 Java API 文档参考：[Java Client API Reference](https://min.io/docs/minio/linux/developers/java/API.html)

## 下载及使用

下载地址：<https://min.io/download>。

我们只需要下载 MINIO SERVER，本文是 Windows 版本，exe 大小大概有 96.5MB（官网介绍的是不超过 100MB）。

将下载域名修改为 `dl.minio.org.cn` 即可使用国内镜像，例如：

```diff
- https://dl.min.io/server/minio/release/windows-amd64/minio.exe
+ https://dl.minio.org.cn/server/minio/release/windows-amd64/minio.exe
```

[点我开始下载](https://dl.minio.org.cn/server/minio/release/windows-amd64/minio.exe)

下载完成后不要直接双击打开，在下载文件的所在目录打开命令行执行：

```batch
minio.exe server minio-data
```

其中 `minio-data` 是文件实际存储的文件夹名称。随后我们可以得到以下信息：
<a name="p1"></a>

![命令运行结果](https://zedo-img.netlify.app/img/minio/20230417232903.png)

我们可以在浏览器打开 Console 那行的地址：`http://127.0.0.1:49775`，以默认的 `minioadmin` 为账号密码登录。

首先我们要创建“桶”，点击“Create a Bucket”，在界面中填写名称然后点击“Create Bucket”：

![创建桶](https://zedo-img.netlify.app/img/minio/20230417233504.png)

为了在 SpringBoot 中使用，需要创建密钥。左侧点击“Access Keys”，然后再右侧找到“Create access key”即可创建：

![创建密钥](https://zedo-img.netlify.app/img/minio/20230417233805.png)

注意保存，secret key 只会显示一次，当然我们也可以重新生成密钥。

侧边栏的“Object Browser”可以管理我们创建的桶以及文件，可以自行体验。

> 这里有一份比较完整的中文教程（代码不一定适用于最新版）：[MinIO 教程 - 人人编程网](https://www.hxstrive.com/subject/minio/572.htm)

## 修改默认项（可选）

### 控制台端口号

MinIO 提供了 Web 控制台，但每次启动 server 时它的端口是随机的，如果我们想固定端口号，可以加上 `--console-address` 参数：

```batch
minio.exe server minio-data --console-address ":30125"
```

我们可以通过以下命令知道为什么这样做：

```batch
> minio.exe server -h

FLAGS:
 --address value          bind to a specific ADDRESS:PORT, ADDRESS can be an IP or hostname (default: ":9000") [%MINIO_ADDRESS%]
 --console-address value  bind to a specific ADDRESS:PORT for embedded Console UI, ADDRESS can be an IP or hostname [%MINIO_CONSOLE_ADDRESS%]
```

其中域名可以省略，也可以填 `localhost`。

### 用户名和密码

MinIO 通过环境变量来使用自定义的用户名和密码，我们可以创建一个 `start-minio.bat`：

```batch
@set MINIO_ROOT_USER=zedo
@set MINIO_ROOT_PASSWORD=12345678
cmd /k minio.exe server minio-data --console-address ":30125"
```

::: tip

1. MinIO 要求密码长度必须大于等于 8 位。
2. `cmd /k` 表示执行完 bat 命令后保留窗口。

:::

这样可以消除启动 ([截图](#p1)) 中的 <span style="color:red">WARNING</span>。

## 在 SpringBoot 中引入

pom.xml 中添加依赖：

```xml
<dependency>
    <groupId>io.minio</groupId>
    <artifactId>minio</artifactId>
    <version>版本号</version>
</dependency>
```

当前最新版本为：[![minio version](https://img.shields.io/maven-central/v/io.minio/minio?label=minio)](https://mvnrepository.com/artifact/io.minio/minio)

application.yml 中配置 MinIO：

```yml
minio:
    url: http://localhost:9000 # 或者分成 endpoint [, port]
    access-key: 在 MinIO 控制台创建
    secret-key: 在 MinIO 控制台生成
    bucket-name: 桶名
```

创建 MinIO 配置类

```java
import io.minio.MinioClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MinioConfig {

    @Value("${minio.url}")
    private String url;

    @Value("${minio.access-key}")
    private String accessKey;

    @Value("${minio.secret-key}")
    private String secretKey;

    public static String BUCKET_NAME;

    @Value("${minio.bucket-name}")
    public void setBucketName(String value) {
        // 注入该类时修改静态变量
        BUCKET_NAME = value;
    }

    @Bean
    public MinioClient minioClient() {
        return MinioClient.builder().endpoint(url)
                .credentials(accessKey, secretKey)
                .build();
    }
}
```

至此，引入工作已完成。

## 常用封装

由于 MinIO 的文件列表在序列化之后字段“缺失”，因此定义 `FileVO` 类：

```java
/**
 * MinIO 文件
 */
@Getter
@Builder
@ToString
public class FileVO {
    /**
     * 文件名
     */
    String name;
    /**
     * 文件显示大小
     */
    String size;
    /**
     * 文件实际大小
     */
    Long bitSize;
    /**
     * 是否为目录
     */
    Boolean dir;
    /**
     * 更新时间
     */
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    LocalDateTime updateTime;
}
```

以下是 `MinioService` 类，包括了基本的文件上传、列表、下载功能：

```java
import io.minio.*;
import io.minio.http.Method;
import io.minio.messages.Item;
import jakarta.annotation.Nonnull;
import jakarta.annotation.Resource;
import jakarta.servlet.ServletOutputStream;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.InputStream;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

/**
 * MinIO 对象存储服务
 *
 * @author zedo
 */
@Service
@Slf4j
public class MinioService {
    @Resource
    MinioClient minioClient;

    static String LocalPath = System.getProperty("user.dir");

    /**
     * @see MinioService#upload(String, MultipartFile, String)
     */
    public Optional<ObjectWriteResponse> upload(String bucketName, MultipartFile file) {
        return upload(bucketName, file, "");
    }

    /**
     * 上传文件到指定文件夹
     *
     * @param bucketName 桶名
     * @param file       文件
     * @param targetPath 目标文件夹
     */
    public Optional<ObjectWriteResponse> upload(String bucketName, MultipartFile file, String targetPath) {
        BucketExistsArgs bucketArgs = BucketExistsArgs.builder()
                .bucket(bucketName).build();
        try {
            // 检查 bucket 是否存在
            boolean found = minioClient.bucketExists(bucketArgs);
            if (!found) {
                log.info("桶 '{}' 不存在", bucketName);
                return Optional.empty();
            }
            PutObjectArgs args = PutObjectArgs.builder()
                    .bucket(bucketName)
                    .object(targetPath + "/" + file.getOriginalFilename())
                    .contentType(file.getContentType())
                    .stream(file.getInputStream(), file.getSize(), -1)
                    .build();
            ObjectWriteResponse objectWriteResponse = minioClient.putObject(args);
            return Optional.of(objectWriteResponse);
        } catch (Exception e) {
            log.error("minio 文件上传异常", e);
            return Optional.empty();
        }
    }

    /**
     * 查看文件对象
     *
     * @param bucketName 桶名
     * @param prefix     查找路径
     * @param recursive  递归查找
     * @return 存储 bucket 内文件对象信息
     */
    @SneakyThrows
    public List<FileVO> listObjects(String bucketName, String prefix, Boolean recursive) {
        // prefix 以 "/" 结尾，避免对查询结果有影响
        prefix = prefix.endsWith("/") ? prefix : prefix + "/";
        // recursive 默认为 false
        Iterable<Result<Item>> results = minioClient.listObjects(
                ListObjectsArgs.builder()
                        .bucket(bucketName)
                        .prefix(prefix)
                        .recursive(recursive != null && recursive)
                        .build()
        );
        List<FileVO> files = new ArrayList<>();
        for (Result<Item> result : results) {
            Item e = result.get();
            FileVO.FileVOBuilder file = FileVO.builder()
                    .name(e.objectName())
                    .bitSize(e.size())
                    .size(formatSize(e.size()))
                    .dir(e.isDir());
            // 文件夹没有修改时间
            if (!e.isDir()) {
                // 加上 8 小时
                file.updateTime(e.lastModified().plusHours(8).toLocalDateTime());
            }
            // e.isDeleteMarker() 不必，因为 minio 不是软删
            files.add(file.build());
        }
        return files;
    }

    /**
     * 根据指定的文件名获取下载链接
     *
     * @param bucketName 桶名
     * @param filename   文件名
     * @return 下载链接
     **/
    @Nonnull
    public String downloadUrl(String bucketName, String filename) {
        // minio 不会校验文件是否存在，都会产生 url，只是打开后会显示资源不存在
        if (isFileNotExist(bucketName, filename)) {
            return "";
        }
        GetPresignedObjectUrlArgs args = GetPresignedObjectUrlArgs.builder()
                .bucket(bucketName)
                .object(filename)
                .method(Method.GET)
                .build();
        try {
            return minioClient.getPresignedObjectUrl(args);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    /**
     * 下载文件到服务器
     *
     * @param bucketName 桶名
     * @param filename   文件名
     */
    public File downloadAtServer(String bucketName, String filename) {
        File localFile = new File(LocalPath + "/" + filename);
        if (localFile.exists()) {
            boolean deleted = localFile.delete();
            log.info("文件 '{}' 删除{}", localFile.getAbsolutePath(), deleted ? "成功" : "失败");
        }
        DownloadObjectArgs args = DownloadObjectArgs.builder()
                .bucket(bucketName)
                .filename(filename)
                .object(filename)
                .build();
        try {
            // 以下方法首次会下载到项目根目录，之后就会抛异常：file already exists，因此上面先删文件
            minioClient.downloadObject(args);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return localFile;
    }

    /**
     * 下载/查看 文件
     *
     * @param bucketName 桶名
     * @param filename   文件路径
     * @param response   响应体
     */
    public void download(String bucketName, String filename, HttpServletResponse response) {
        Optional<StatObjectResponse> statOpt = statFile(bucketName, filename);
        // 文件不存在，这里相当于 isFileNotExist，但后续还需要用到 stat
        if (statOpt.isEmpty()) {
            log.info("下载的文件 '{}' 不存在", filename);
            return;
        }
        StatObjectResponse stat = statOpt.get();
        GetObjectArgs args = GetObjectArgs.builder()
                .bucket(bucketName)
                .object(filename)
                .build();

        response.setCharacterEncoding("UTF-8");
        response.setContentType(stat.contentType());

        if (Objects.equals(stat.etag(), request.getHeader("If-None-Match"))) {
            response.setStatus(HttpServletResponse.SC_NOT_MODIFIED);
            response.setContentLength(0);
            return;
        }
        response.setHeader(
            HttpHeaders.CONTENT_DISPOSITION,
            "attachment;filename="+ URLEncoder.encode(filename, StandardCharsets.UTF_8)
        );
        try (InputStream inputStream = minioClient.getObject(args)) {
            // Content-Length 非必要
            response.setHeader(HttpHeaders.CONTENT_LENGTH, String.valueOf(stat.size()));

            ServletOutputStream outputStream = response.getOutputStream();
            byte[] buffer = new byte[1024];
            int len;

            // 从输入流中读取定量的字节，并存储在缓冲区字节数组中，读到末尾返回 -1
            while ((len = inputStream.read(buffer)) != -1) {
                outputStream.write(buffer, 0, len);
            }
            // try-with-resource 不需要手动关闭 inputStream
        } catch (Exception e) {
            log.error("下载文件出错", e);
        }
    }

    /**
     * 检查文件是否存在
     *
     * @param bucketName 桶名
     * @param filename   文件名
     */
    public boolean isFileNotExist(String bucketName, String filename) {
        return statFile(bucketName, filename).isEmpty();
    }

    /**
     * 获取文件 stat 信息
     *
     * @param bucketName 桶名
     * @param filename   文件名
     */
    public Optional<StatObjectResponse> statFile(String bucketName, String filename) {
        try {
            StatObjectResponse stat = minioClient.statObject(StatObjectArgs.builder()
                    .bucket(bucketName)
                    .object(filename).build());
            return Optional.of(stat);
        } catch (Exception e) {
            return Optional.empty();
        }
    }

    /**
     * 格式化文件显示大小
     *
     * @param size 文件实际大小
     * @return String
     */
    public static String formatSize(long size) {
        int i = 0;
        String[] powerLabels = {"B", "KB", "MB", "GB"};
        double s = (double) size;
        /// Math.pow(2, 10);
        final double pow = 1024D;
        while (s > pow) {
            s /= pow;
            i++;
        }
        return String.format("%.2f %s", s, powerLabels[i]);
    }
}
```

::: warning

如果你在使用的 jdk 版本不支持 `jakarta`，请换成 `javax`。

:::

`MinioService` 的方法入参足够简单，只要传入控制层的参数即可，下面给出上传、下载文件的代码参考：

```java
import io.minio.ObjectWriteResponse;
import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.lang.Nullable;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.*;
import java.util.regex.Pattern;

/**
 * 文件上传接口
 *
 * @author zedo
 */
@RestController
@RequestMapping("/files")
public class MinioController {
    @Resource
    MinioService minioService;

    /**
     * 非法文件名包含的字符
     */
    public static Pattern INVALID_PATTERN = Pattern.compile("[\\\\:*?\"<>|]");

    /**
     * 上传文件
     *
     * @param file 文件
     * @param path 上传到指定文件夹
     */
    @PostMapping("/upload")
    public Result<?> uploadFile(
        @RequestPart MultipartFile file, @RequestParam(required = false) String path
    ) {
        Optional<ObjectWriteResponse> upload = minioService.upload(MinioConfig.BUCKET_NAME, file, path);
        boolean success = upload.isPresent();
        if (success) {
            ObjectWriteResponse stat = upload.get();
            Map<String, String> map = new HashMap<>();
            // 注意 file.getName() 获取的是 MultipartFile 的变量名，此处得到 "file"
            String filename = file.getOriginalFilename();
            map.put("name", filename);
            map.put("etag", stat.etag());
            map.put("contentType", file.getContentType());
            map.put("size", MinioService.formatSize(file.getSize()));
            map.put("path", path + "/" + filename);
            return succeed(map);
        }
        return failed("上传失败");
    }

    /**
     * 获取文件列表
     *
     * @param recursive 是否递归
     */
    @GetMapping("/list/**")
    public Result<List<FileVO>> listFiles(
        HttpServletRequest req,
        @Nullable @RequestParam(value = "r", required = false) Boolean recursive
    ) {
        String path = req.getRequestURI().replace("/files/list", "");
        logger.debug("获取文件列表，path = {}", path);
        // matches 会匹配整个字符串，find 检测是否包含
        if (INVALID_PATTERN.matcher(path).find()) {
            return failed("文件名包含非法字符");
        }
        List<FileVO> list = minioService.listObjects(MinioConfig.BUCKET_NAME, path, recursive);
        if (list.size() == 0) {
            return failed("目录为空或不存在");
        }
        return succeed(list);
    }

    /**
     * 直接下载文件
     *
     * @param filename 文件名
     */
    @GetMapping("download")
    public void download(@RequestParam("name") String filename, HttpServletResponse response) {
        // 下载前检查文件是否存在
        if (!minioService.isFileNotExist(MinioConfig.BUCKET_NAME, filename)) {
            minioService.download(MinioConfig.BUCKET_NAME, filename, response);
            return;
        }
        // 可以自定义 Exception
        throw new RuntimeException(String.format("文件 '%s' 不存在", filename));
    }
}
```
