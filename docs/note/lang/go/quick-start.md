---
date: 2023-01-13
category:
	- 编程语言
tag:
	- go
excerpt: 快速入门 go 语言
---

# Golang 快速上手

## go 介绍

[go 上手 基础语法](https://bytedance.feishu.cn/file/boxcnDQ57K0wtcZtA3Y26ORKwec)

go 语言是 google 出品的一门通用型的编程语言，具有以下特点：

1. 高性能、高并发

    go 语言有和 C++，Java 媲美的性能，go 语言还内置了对高并发的支持，还不像很多编程语言以库的形式支持，也就是说在 golang 里面你不需要像其他语言一样需要去寻找一些经过高度性能优化的第三方库来开发应用，只需要使用标准库或者任意基于标准库的第三方库，即可开发高并发应用程序。

2. 语法简单、学习曲线平缓

    go 的语法简单易懂，go 语言语法风格类似于 C 语言，并且在 C 语言的基础上进行了大幅度地简化，比如去掉了不需要的表达式括号，循环也只有 for 循环一种表示方法，就可以同时实现数值，键值等的各种遍历，因此 go 语言上手非常容易，学习曲线平滑，不像 C/C++这些语言，动辄需要 2~3 年的学习期，一个熟练的 go 开发者只需要短短一周时间就可以从学习阶段转到真正的开发阶段，并完成一个高并发的应用程序的开发。

3. 丰富的标准库

    标准库 go 和 Python 一样拥有极其丰富，功能完善，质量可靠的标准库，在很多情况下你不需要借助第三方库就可以完成大部分基础功能的开发，这大大降低了学习和使用成本，最关键的是标准库有很高的稳定性保障，这是第三方库所不具备的。

4. 完善的工具链

    go 在诞生之初就拥有丰富的工具链，编译，代码格式化，错误检查，帮助管道，包管理还有代码补充提示这些都有对应的工具。go 还内置了完整的单元测试框架，能够支持单元测试性能测试，代码覆盖率，数据竞争检测，性能优化，这些都是保障代码能够正确和稳定运行的必备利器。

5. 静态链接

    在 go 语言里面，所有的编译结果默认都是静态链接的，只需要拷贝编译之后的唯一一个可执行文件，不需要不加任何东西就能部署运行。在线上的容器环境下运行镜像体积可以控制得非常小，部署非常方便快捷。像常见的编程语言，比如 C++ 需要附加一点.so 才可以正确运行，不正确的话就会崩溃，Java 则需要附加一个庞大的 jre 才可以运行。

6. 快速编译

    go 拥有静态语言里面几乎最快的编译速度，在字节跳动，大量的微服务在线上部署之前的编译时间小于一分钟，在真正本地开发的时候，几乎任何时候修改完一行代码都能够在一秒钟左右增量编译，这个速度对于 c++开发者来说几乎不可想象。

7. 跨平台

    go 本身能够在常见的 linux，windows，MacOS 等操作系统下运行，也能够用来开发安卓 iOS 软件。go 还能在各种奇奇怪怪的设备上运，包括路由器，树莓派。go 还有很方便的交叉编译特性，就是你能够轻易的在你的笔记本上编译出来一个二进制，拷贝到路由器上运行，还能够配置交叉编译环境。

8. 垃圾回收

    go 是一门带垃圾回收的语言，和 Java 类似，写代码的时候，你无需考虑内存的分配释放，可以专注于业务逻辑。

go 语言到底有多么简单，下面可以下面通过实现一个简单的 HTTP 服务器了解一下：

```go
package main

import (
    "net/http"
)

func main() {
    http.Handle("/", http.FileServer(http.Dir(".")))
    http.ListenAndServe(":8088", nil)
}
```

我们可以看到这段代码总共 10 行，其实核心大码只有 2 行，第 8 行是用标准库的 http 包内建的路由，把斜杠这个路由指向一个静态文件处理的实现，第九行就是监听 8080 端口，并且启动服务器。只用了短短十行代码就实现了一个可以承载静态文件访问的支持高并发高性能的服务器。

> 字节跳动为什么全面拥抱 Go 语言？
>
> 1. 最初使用的 Python，由于性能问题换成了 Go
> 2. C++不太适合在线 Web 业务
> 3. 早期团队非 Java 背景
> 4. 性能比较好
> 5. 部署简单、学习成本低
> 6. 内部 RPC 和 HTTP 框架的推广

## 开发环境

### 安装 Golang

- <https://go.dev/> golang 官网，点击 download 按照提示安装即可；
- <https://studygolang.com/dl/> 国内镜像，如果官网打不开，可以在这下载。

安装完成后可使用命令行检测：

```sh
$ go version
go version go1.19.4 windows/amd64
```

第三方库镜像：

- <https://goproxy.cn/> 七牛云，打开后按提示操作，配置完成后加快下载第三方库的速度。
- <https://goproxy.io/> 另一个镜像站

配置镜像：

```sh
go env -w GOPROXY=https://goproxy.cn,direct
```

以上命令行的作用可以通过 `go help env` 查询：

```text
The -w flag requires one or more arguments of the
form NAME=VALUE and changes the default settings
of the named environment variables to the given values.

-w标志需要一个或多个 NAME=VALUE 形式的参数，并将命名环境变量的默认设置更改为给定值。
```

### 集成开发环境

- [vs code](https://code.visualstudio.com/) 免费，安装后需额外安装 [Go 插件](https://marketplace.visualstudio.com/items?itemName=golang.Go) 以支持 golang
- [goland](https://www.jetbrains.com/zh-cn/go/) JetBrains 出品，安装后直接可使用。但注意这是收费的，有 30 天免费试用期。

- 云平台：<https://gitpod.io/#github.com/wangkechun/go-by-example>

    短链接：<https://hi-hi.cn/gitpod>

    使用 github 等账号登陆即可使用。

#### VS Code 配置

这里的集成开非环境以 vscode 为例。在安装完 golang 以及**设置镜像**后，启动 vscode，按下<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd>，然后输入 `Go: Install/Update Tools` 并点开，全选上然后点击确定即可：

![vscode go配置](https://zedo.gitee.io/img/lang/go-20230113193448.png)

耐心等待终端安装（注意要设置镜像，否则可能失败）

![工具链安装日志](https://zedo.gitee.io/img/lang/go-20230113193744.png)

这样就完成了配置！

### 首个项目

先建立一个文件夹，用于存放项目及源码，然后用 vscode 打开此文件夹，按下 <kbd>Ctrl</kbd>+<kbd>`</kbd> 打开终端，创建模块：

```sh
go mod init 项目名
```

项目名是任取的，这里使用 `go-study`。

接着就可以看到创建了一个 `go.mod` 文件：

![go.mod 文件及目录](https://zedo.gitee.io/img/lang/go-20230113194832.png)

接着新建 `01-hello/main.go` 文件，其内容如下：

```go
package main

import "fmt"

func main() {
    fmt.Println("Hello World")
}
```

> 第 1 行代表这个文件属于 main 包的一部分，main 包也就是程序的入口包。
>
> 第 3 行导入了标准库里面的 fmt 包，这个包主要是用来往屏幕输入输出字符串、格式化字符串。
>
> 第 5-7 行定义了 main 函数，里面调用了 `fmt.Println` 输出 Hello World

可使用以下命令来运行代码：

```sh
go run ./01-hello/main.go
```

![运行成功截图](https://zedo.gitee.io/img/lang/go-20230113195248.png)

成功地在终端打印了 `Hello World` ！

## 基础语法

### 变量

go 语言是一门强类型语言，每一个变量都有它自己的变量类型，常见的变量类型包括字符串、整数、浮点型、布尔型等。

go 语言中字符串是内置类型，可以直接通过加号去拼接，参考第 15 行代码；也能够直接用等于号去比较两个字符。在 go 语言里面，大部分运算符的使用和优先级都和 C/C++ 类似。

在 go 语言里面变量的声明有两种方式

1. `var 变量名 变量类型 = 值` 。用这种方式来声明变量时，可以省略变量类型，编译器会自动推导变量的类型。

2. `变量名 := 值`。

如果要申明常量，把 var 改成 const 即可。值在一提的是 go 语言中的常量没有确定的类型，会根据使用的上下文来自动确定类型。

```go
package main

import (
    "fmt"
    "math"
)

func main() {
    // 变量
    var a = "initial"   // 自动推导类型
    var b, c int = 1, 2 // 显式定义类型
    var d = true
    var e float64
    f := float32(e)
    g := a + "foo"

    fmt.Println(a, b, c, d, e, f) // initial 1 2 true 0 0
    fmt.Println(g)                // initialfoo

    // 常量，将 var 改为 const
    const s string = "constant"
    const h = 500000000
    const i = 3e20 / h
    fmt.Println(s, h, i, math.Sin(h), math.Sin(i))
    // constant 500000000 6e+11 -0.28470407323754404 0.7591864109375384
}
```

### 条件判断

go 里面的条件判断和 C 语言类似，不同点在于不需要 if 之后的小括号：

```go
package main

import "fmt"

func main() {
    if 7%2 == 0 {
        fmt.Println("7 is even")
    } else {
        fmt.Println("7 is odd")
    }

    if 8%4 == 0 {
        fmt.Println("8 is divisible by 4")
    }

    if num := 9; num < 0 {
        fmt.Println(num, "is negative")
    } else if num < 10 {
        fmt.Println(num, "has 1 digit")
    } else {
        fmt.Println(num, "has multiple digits")
    }
}
```

如果写了括号，保存后编辑器会自动格式化并去掉括号。

值得注意的是，不同于 C/C++等，go 要求 if 语句紧跟大括号，且条件语句不能与 if 同行，例如：

```go
if 1 == 2 fmt.Println("123")   // 错误
if 1 == 2 {fmt.Println("123")} // 正确，但保存后会格式化
```

### 循环

go 语言中没有 `while` 、`do-while` 循环，只有 `for` 循环。

“三段式”循环及其变体：

```go
i := 1
for i <= 3 {
    fmt.Println(i)
    i = i + 1
} // 1 2 3

for j := 7; j < 9; j++ {
    fmt.Println(j)
} // 7 8
```

死循环，相当于 C/C++ 的 `while` 循环，使用 `break` 语句中断：

```go
for {
    fmt.Println("loop")
    break
} // loop
```

go 语言同样也有 `continue` 关键字：

```go
for n := 0; n < 5; n++ {
    if n%2 == 0 {
        continue
    }
    fmt.Println(n)
} // 1 3
```

### 分支结构

go 中的分支结构和 C/C++同样类似，但在 go 中，每个分支不需要 break 语句，而 C/C++如果没有 break 语句就会执行所有分支。

```go
a := 2
switch a {
case 1:
    fmt.Println("one")
case 2:
    fmt.Println("two")
case 3:
    fmt.Println("three")
case 4, 5:
    fmt.Println("four or five")
default:
    fmt.Println("other")
} // two
```

go 中的 `switch` 更加强大，可以使用任意的变量类型，如字符串、结构体。甚至可以用来取代 `if-else` 语句，只需要去掉 `switch` 后的变量，在 `case` 中写条件分支：

```go
// import "time"
t := time.Now()
switch {
case t.Hour() < 12:
    fmt.Println("It's before noon")
default:
    fmt.Println("It's after noon")
}
```

### 数组

go 中的数组和 C/C++ 的数组同样是类似的，只是语法稍有不同，请参考以下代码：

```go
package main

import "fmt"

func main() {
    var a [5]int // 存放 5 个 int 类型元素的数组
    a[4] = 100   // 访问、修改元素

    // 整型数组元素默认是 0
    fmt.Println("get:", a[2]) // get: 0
    // 获取数组长度
    fmt.Println("len:", len(a)) // len: 5

    // 定长数组
    b := [5]int{1, 2, 3}
    fmt.Println(b) // [1 2 3 0 0]

    // 不定长数组
    c, d := [...]int{1, 2, 3}, []int{4, 5, 6}
    fmt.Println(c, d) // [1 2 3] [4 5 6]

    // 二维数组
    var twoD [2][3]int
    for i := 0; i < 2; i++ {
        for j := 0; j < 3; j++ {
            twoD[i][j] = i + j
        }
    }
    fmt.Println(twoD) // [[0 1 2] [1 2 3]]
}
```

### 切片

实际业务中，更多地是使用切片（类似 python 中的），可将它看做动态长度的数组
