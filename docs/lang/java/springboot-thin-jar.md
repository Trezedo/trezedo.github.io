---
icon: java
date: 2023-04-22
category:
    - Java
tag:
    - springboot
    - maven
---

# SpringBoot 项目 JAR 包瘦身

所谓瘦身，也就是打包时分离 jar 包的依赖。

## 基础配置

首先在 `pom.xml` 为 `spring-boot-maven-plugin` 添加配置：

```xml
<build>
  <plugins>
      <plugin>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-maven-plugin</artifactId>
        <configuration>
          <layout>ZIP</layout>
          <includes>
              <!-- 先去除所有的 jar 包 -->
              <include>
                <groupId>nothing</groupId>
                <artifactId>nothing</artifactId>
              </include>
              <!-- 将需要的 jar 包保留，这里我不需要 -->
              <!--<include>
                <groupId> </groupId>
                <artifactId> </artifactId>
              </include>-->
          </includes>
        </configuration>
      </plugin>
  </plugins>
</build>
```

然后用 maven 命令复制依赖，将项目依赖的 jar 包复制到 `target/lib`：

```sh
mvn dependency:copy-dependencies -DincludeScope=runtime -DoutputDirectory=target/lib
```

::: tip

使用 IDEA 执行 Maven 命令的方式：

![重新加载Maven项目 | center](./img/springboot/重新加载Maven项目.png)

:::

执行 `package` 打包命令后，运行方式修改为：

```sh
java -Dloader.path=./lib -jar demo.jar
# 下面的是不行的
# java -jar demo.jar --loader.path=./lib
```

或者用环境变量(windows)：

```batch
set LOADER_PATH=./lib
java -jar demo.jar
pause
```

> 参考：[Launching Executable Jars](https://docs.spring.io/spring-boot/docs/3.0.6/reference/htmlsingle/#appendix.executable-jar.launching)

以上配置实现了只把项目本身源码编译产物和 Springboot Loader 相关的打进 jar 包，且运行 jar 包时可以从外部加载依赖类库。

## 进一步配置(可选)

如果还想要不把 resources 目录打进jar包、自动复制依赖到 lib 目录、自动确定 `-Dloader.path`，则可以继续该小结的内容。

首先需要在以上配置的基础上，添加 `executions`：

```xml
<plugin>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-maven-plugin</artifactId>

    <!-- 此处省略 configuration -->

    <executions>
        <execution>
        <goals>
            <goal>repackage</goal>
        </goals>
        </execution>
    </executions>
</plugin>
```

下面的配置用来自动复制依赖到 `lib`，复制 `resources`，同时不把 `resources` 下的部分文件进 jar 包：

```xml
<!-- 复制依赖 -->
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-dependency-plugin</artifactId>
    <executions>
        <execution>
            <id>copy-dependencies</id>
            <phase>package</phase>
            <goals>
                <goal>copy-dependencies</goal>
            </goals>
            <configuration>
                <includeScope>runtime</includeScope>
                <outputDirectory>
                    ${project.build.directory}/lib/
                </outputDirectory>
            </configuration>
        </execution>
    </executions>
</plugin>

<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-resources-plugin</artifactId>
    <executions>
        <execution>
            <id>copy-resources</id>
            <phase>package</phase>
            <goals>
                <goal>copy-resources</goal>
            </goals>
            <!-- configuration 必须放在 executions 里，否则无法运行项目 -->
            <configuration>
                <!-- 资源文件输出目录 -->
                <outputDirectory>${project.build.directory}/resources</outputDirectory>
                <!-- yml 的 @..@ 占位符 -->
                <delimiters>
                    <delimiter>${*}</delimiter>
                    <delimiter>@</delimiter>
                </delimiters>
                <useDefaultDelimiters>false</useDefaultDelimiters>
                <resources>
                    <resource>
                        <directory>src/main/resources</directory>
                        <!-- 用来支持 yml 中的 @...@ 占位符 -->
                        <filtering>true</filtering>
                    </resource>
                </resources>
            </configuration>
        </execution>
    </executions>
</plugin>
```

下面的配置与打包最终生成的 jar 文件相关：

```xml
<!-- 决定哪些打进 jar 包 -->
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-jar-plugin</artifactId>
    <configuration>
        <outputDirectory>${project.build.directory}</outputDirectory>
        <!-- 不要打包的文件，位于编译后的 classes 目录 -->
        <excludes>
            <exclude>*.**</exclude>
            <exclude>static/**</exclude>
            <exclude>mapper/*.xml</exclude>
        </excludes>
        <archive>
            <manifest>
                <addClasspath>true</addClasspath>
                <!-- MANIFEST.MF 中 Class-Path 加入前缀 -->
                <classpathPrefix>lib/</classpathPrefix>
                <!-- jar 包不包含唯一版本标识 -->
                <useUniqueVersions>false</useUniqueVersions>
            </manifest>
            <manifestEntries>
                <!-- MANIFEST.MF 中 Class-Path 加入资源文件目录 -->
                <Class-Path>./resources/</Class-Path>
            </manifestEntries>
        </archive>
    </configuration>
</plugin>
```

此时只需要正常的使用以下命令即可运行，不需要 `loader.path` 等参数：

```java
java -jar demo.jar
```

如果想要打包时跳过集成测试，配置如下插件：

```xml
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-surefire-plugin</artifactId>
    <configuration>
        <!-- 跳过测试 -->
        <skipTests>true</skipTests>
    </configuration>
</plugin>
```

> 参考：[Spring Boot 打包，分离依赖 jar，配置文件](https://www.jianshu.com/p/dbdece9062b3)
>
> 我还试了使用插件 [springboot thin launcher](https://github.com/spring-projects-experimental/spring-boot-thin-launcher)，但打包后没能跑起来。

<!-- https://www.jianshu.com/p/fdeb5e249379 -->
