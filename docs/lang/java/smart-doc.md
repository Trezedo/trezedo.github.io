---
icon: gravity-ui:abbr-api
date: 2023-03-18
modified: 2026-03-23
category:
    - java
tag:
    - maven
    - springboot
---

# 使用 Smart Doc 生成接口文档

我们在开发时可能使用 Swagger 来测试接口，但它是侵入式的，即需要对类和函数添加注解。

Smart Doc 是非侵入式的，它基于注释生成文档，这里不做过多介绍，请看 [官方文档](https://smart-doc-group.github.io/#/zh-cn/)。

最新版本：![smart-doc](https://img.shields.io/maven-central/v/com.github.shalousun/smart-doc)

这里以 Maven 项目为例，在 `pom.xml` 中配置插件：

```xml
<build>
  <plugins>
      <plugin>
        <groupId>com.github.shalousun</groupId>
        <artifactId>smart-doc-maven-plugin</artifactId>
        <!-- 最新版本号看官网或者 maven 仓库 -->
        <version>2.6.6</version>
        <configuration>
          <!-- 指定生成文档的配置文件 -->
          <configFile>./src/main/resources/smart-doc.json</configFile>
          <includes>
              <!-- 使用了 mybatis-plus 的 Page 分页需要 include 所使用的源码包 -->
              <include>com.baomidou:mybatis-plus-extension</include>
          </includes>
        </configuration>
        <executions>
          <execution>
              <!-- 执行编译时启动 smart-doc，不需要则注释掉 -->
              <!-- <phase>compile</phase> -->
              <goals>
                <!-- 提供 html, openapi, markdown 等 goal，可按需配置 -->
                <goal>html</goal>
                <goal>markdown</goal>
                <goal>openapi</goal>
              </goals>
          </execution>
        </executions>
      </plugin>
  </plugins>
</build>
```

在 `src/main/resources/smart-doc.json` 配置 SmartDoc：

```json
{
    "outPath": "./src/main/resources/static/doc",
    "projectName": "API 文档",
    "allInOne": true,
    "allInOneDocFileName": "index.html",
    "coverOld": true,
    "createDebugPage": true
}
```

在 IDEA 右侧 Maven 栏目中找到 `插件`->`smart-doc`，根据你所需要的执行，如 `smart-doc:openapi`，它会在 `src/main/resources/static/doc`（这是配置文件指定的）输出一个 `openapi.json` 文件，可以用支持 OpenApi3 的平台或工具（如 Apifox） 打开。

下面配置静态资源路径，以允许访问 `openapi.json` 文件。

```java
@Configuration
public class WebConfig implements WebMvcConfigurer {
    /**
     * 开放静态文件路径
     *
     * @param registry 注册表
     */
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // 通过 /static/** 访问静态资源
        registry.addResourceHandler("static/**")
                .addResourceLocations("classpath:/resources/")
                .addResourceLocations("classpath:/static/");
    }
}
```
