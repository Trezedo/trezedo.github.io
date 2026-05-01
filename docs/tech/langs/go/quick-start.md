---
icon: grommet-icons:golang
date: 2023-01-13
modified: 2026-03-23
excerpt: 快速入门 Go 语言
category:
    - golang
tag:
    - golang
---

# Golang 快速上手

## Go 介绍

Go 语言是 Google 出品的一门通用型的编程语言，具有以下特点：

1. 高性能、高并发

    Go 语言有和 C++，Java 媲美的性能，Go 语言还内置了对高并发的支持，还不像很多编程语言以库的形式支持，也就是说在 Golang 里面你不需要像其他语言一样需要去寻找一些经过高度性能优化的第三方库来开发应用，只需要使用标准库或者任意基于标准库的第三方库，即可开发高并发应用程序。

2. 语法简单、学习曲线平缓

    Go 的语法简单易懂，Go 语言语法风格类似于 C 语言，并且在 C 语言的基础上进行了大幅度地简化，比如去掉了不需要的表达式括号，循环也只有 for 循环一种表示方法，就可以同时实现数值，键值等的各种遍历，因此 Go 语言上手非常容易，学习曲线平滑，不像 C/C++ 这些语言，动辄需要 2~3 年的学习期，一个熟练的 Go 开发者只需要短短一周时间就可以从学习阶段转到真正的开发阶段，并完成一个高并发的应用程序的开发。

3. 丰富的标准库

    标准库 Go 和 Python 一样拥有极其丰富，功能完善，质量可靠的标准库，在很多情况下你不需要借助第三方库就可以完成大部分基础功能的开发，这大大降低了学习和使用成本，最关键的是标准库有很高的稳定性保障，这是第三方库所不具备的。

4. 完善的工具链

    Go 在诞生之初就拥有丰富的工具链，编译，代码格式化，错误检查，帮助管道，包管理还有代码补充提示这些都有对应的工具。Go 还内置了完整的单元测试框架，能够支持单元测试性能测试，代码覆盖率，数据竞争检测，性能优化，这些都是保障代码能够正确和稳定运行的必备利器。

5. 静态链接

    在 Go 语言里面，所有的编译结果默认都是静态链接的，只需要拷贝编译之后的唯一一个可执行文件，不需要不加任何东西就能部署运行。在线上的容器环境下运行镜像体积可以控制得非常小，部署非常方便快捷。像常见的编程语言，比如 C++ 需要附加 .so 文件才可以正确运行，不正确的话就会崩溃，Java 则需要附加一个庞大的 JRE（Java 运行时）才可以运行。

6. 快速编译

    Go 拥有静态语言里面几乎最快的编译速度。在真正本地开发的时候，几乎任何时候修改完一行代码都能够在一秒钟左右增量编译。

7. 跨平台

    Go 本身能够在常见的 Linux、Windows、MacOS 等操作系统下运行，也能够用来开发安卓 iOS 软件。Go 还能在各种奇奇怪怪的设备上运，包括路由器、树莓派。Go 还有很方便的交叉编译特性，就是你能够轻易的在你的笔记本上编译出来一个二进制，拷贝到路由器上运行，还能够配置交叉编译环境。

8. 垃圾回收

    Go 是一门带垃圾回收的语言，和 Java 类似，无需考虑内存的分配释放，可以专注于业务逻辑。

## 开发环境

### 安装 Golang

- <https://go.dev/> Golang 官网，点击 download 按照提示安装即可；
- <https://studygolang.com/dl> 国内镜像，如果官网打不开，可以在这下载。

安装完成后可使用命令行检测：

```sh
$ go version
go version go1.20.6 windows/amd64
```

第三方库镜像：

- <https://goproxy.cn/> 七牛云，打开后按提示操作，配置完成后加快下载第三方库的速度。
- <https://goproxy.io/> 另一个镜像站

配置镜像：

```sh
go env -w GO111MODULE=on
go env -w GOPROXY=https://goproxy.cn,direct
```

以上命令行的作用可以通过 `go help env` 查询：

```text
The -w flag requires one or more arguments of the
form NAME=VALUE and changes the default settings
of the named environment variables to the given values.

-w 标志需要一个或多个 NAME=VALUE 形式的参数，并将命名环境变量的默认设置更改为给定值。
```

### 集成开发环境

- [vs code](https://code.visualstudio.com/) 免费，安装后需额外安装 [Go 插件](https://marketplace.visualstudio.com/items?itemName=golang.Go) 以支持 Golang
- [goland](https://www.jetbrains.com/zh-cn/go/) JetBrains 出品，安装后直接可使用。但注意这是收费的，有 30 天免费试用期。
- 云平台：<https://gitpod.io/#github.com/wangkechun/go-by-example>

    短链接：<https://hi-hi.cn/gitpod>

    使用 GitHub 等账号登陆即可使用。

#### VS Code 配置

这里的集成开非环境以 vscode 为例。在安装完 Golang 以及**设置镜像**后，启动 vscode，按下<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd>，然后输入 `Go: Install/Update Tools` 并点开，全选上然后点击确定即可：

![vscode Go 配置](https://zedo-img.netlify.app/img/lang/go-20230113193448.png)

耐心等待终端安装（注意要设置镜像，否则可能失败）

![工具链安装日志](https://zedo-img.netlify.app/img/lang/go-20230113193744.png)

这样就完成了配置！

### 首个项目

先建立一个文件夹，用于存放项目及源码，然后用 vscode 打开此文件夹，按下 <kbd>Ctrl</kbd>+<kbd>`</kbd> 打开终端，创建模块：

```sh
go mod init 项目名
```

项目名是任取的，这里使用 `go-study`。

接着就可以看到创建了一个 `go.mod` 文件：

![go.mod 文件及目录](https://zedo-img.netlify.app/img/lang/go-20230113194832.png)

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

![运行成功截图](https://zedo-img.netlify.app/img/lang/go-20230113195248.png)

成功地在终端打印了 `Hello World` ！

- `package` 关键字声明了代码所属的包。
- Go 语言里所有的代码都被分为不同的包。
    - Go 提供了一个标准库，它由 fmt、math、time 等 package 组成，每个 package 都能做一类工作。
- `import` 关键字指明了代码所需要使用的 package。
    - 每个 package 里面都包含很多函数（function）。
- `func` 关键字声明了一个函数。
    - 函数体需要使用 `{ }` 括起来，这样的话 Go 就知道函数的开始和结束位置了。
- `main` 这个标识符很特殊：
    - 当你运行 Go 语言编写的程序时，会从 main package 的 main function 开始执行。
    - 没有 main，那么 Go 编译器就会报错，因为它不知道程序应该从哪开始。
- 想要打印一行文字，你就可以使用 `Println` 这个函数（ln 就是 line 的简写）
    - `Println` 的前面使用了 `fmt` 和一个点，这是因为 `Println` 是由 fmt 这个 package 提供的函数。
    - 除了标准库提供的 `fmt.Println`，go 语言还内置了 `println`。
- Go 对 `{ }` 的位置很挑剔，在上面的代码中，左大括号 `{` 与 `func` 关键字位于同一行，而右大括号 `}` 单独成行，这是唯一一种允许的样式。

## 基础语法

### 基本运算

Golang 提供了 `+`、`-`、`*`、`/`、`%` 来做加减乘除和取余的算术运算

```go
func main() {
 fmt.Println(196+223, 45-83, 3.4*5) // 419 -38 17
 fmt.Println(19.6*22.3, 45/5.0)     // 437.08 9
 fmt.Print(34 % 5)                  // 4
}
```

上述例子使用了 `Print`，`Println` 函数：

- 可以传递若干个参数，之间用逗号分开。
- 参数可以是数字、数学表达式、字符串等等。

### 格式化打印

```go
fmt.Printf("一年 %v 个月 %v 天\n", 12, 365)
// 一年 12 个月 365 天
```

可以使用 `Printf` 来控制打印的输出结果：

- 与 `Print` 和 `Println` 不同，`Printf` 的第一个参数必须是字符串。
- 这个字符串里包含了像 `%v` 这样的格式化动词，它的值由第二个参数的值所代替。
- 如果指定了多个格式化动词，那么它们的值由后边的参数值按其顺序进行替换。

### 常量和变量

Go 语言是一门强类型语言，每一个变量都有它自己的变量类型，常见的变量类型包括字符串、整数、浮点型、布尔型等。

- `const` 关键字用来声明常量，常量的值不可以改变。
- `var` 关键字用来声明变量，想要使用变量首先需要进行声明。

在 Go 语言里面变量的声明有两种方式：

1. `var 变量名 变量类型 = 值`
    - 该方式来声明变量可以省略变量类型，编译器会自动推导变量的类型。
    - 例如：`var name = "张三"`，变量 `name` 的类型会推导为 `string`
2. `变量名 := 值`
    - 这种叫海象操作符

> 如果要声明常量，把 `var` 改成 `const` 即可。

Go 语言中字符串是内置类型，可以直接通过加号去拼接，参考第 15 行代码；也能够直接用等于号去比较两个字符。在 Go 语言里面，大部分运算符的使用和优先级都和 C/C++ 类似。

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

Go 里面的条件判断和 C 语言类似，不同点在于不需要 if 之后的小括号：

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

值得注意的是，不同于 C/C++ 等，Go 要求 if 语句紧跟大括号，且条件语句不能与 if 同行，例如：

```go
if 1 == 2 fmt.Println("123")   // 错误
if 1 == 2 {fmt.Println("123")} // 正确，但保存后会格式化
```

### 循环

Go 语言中没有 `while` 、`do-while` 循环，只有唯一的 `for` 循环。

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

最简单的 for 循环就是在 for 后面什么都不写，代表一个死循环，相当于 C/C++ 的 `while` 循环，并且可使用 `break` 语句中断：

```go
for {
    fmt.Println("loop")
    break
} // loop
```

Go 语言同样也有 `continue` 关键字，用于跳过本次循环的后续操作，进行下一次循环：

```go
for n := 0; n < 5; n++ {
    if n%2 == 0 {
        continue
    }
    fmt.Println(n)
} // 1 3
```

### 分支结构

Go 中的分支结构和 C/C++ 同样类似。同样地，在 `switch` 后的那个变量不需要括号。一个很大的不同点是，在 C/C++ 中如果没有 `break` 语句就会执行所有剩下的 `case`，而在 Go 中 `case` 不需要加 `break`。

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

Go 中的 `switch` 更加强大，可以使用任意的变量类型，如字符串、结构体。它甚至可以用来取代 `if-else` 语句，只需要去掉 `switch` 后的变量，在 `case` 中写条件分支：

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

Go 中的数组和 C/C++ 的数组同样是类似的，只是语法稍有不同，请参考以下代码：

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

切片 (slice) 不同于数组，它可以任意更改长度，并且拥有更多的操作。

我们可以用 `make` 来创建一个切片，可以像数组一样取值：

```go
s := make([]string, 3)
s[0] = "a"
s[1] = "b"
s[2] = "c"
fmt.Println("get:", s[2])   // get: c
fmt.Println("len:", len(s)) // len: 3
```

使用 `append` 来追加元素：

```go
s = append(s, "d")
s = append(s, "e", "f")
fmt.Println(s) // [a b c d e f]
```

注意 `append` 的用法必须把 `append` 的结果赋值给原数组，
因为切片实际上存储了长度、容量和一个指向一个数组的指针，如果在执行 `append` 操作时容量不够，会扩容并返回新的切片。

切片初始化时可以指定长度，同时可以使用 `copy` 对切片进行拷贝：

```go
c := make([]string, len(s))
copy(c, s)
fmt.Println(c) // [a b c d e f]
```

Go 的切片拥有像 python 一样的切片操作：

```go
fmt.Println(s[2:5]) // [c d e]，第 2 个到第 5 个位置的元素，不包括第 5 个元素
fmt.Println(s[:5])  // [a b c d e]，从头到第 5 个位置的元素，不包括第 5 个元素
fmt.Println(s[2:])  // [c d e f]，从第 2 个到最后一个元素，不包括第 2 个元素
```

这里的“位置”其实就是元素的“索引”范围，不同于 python，Go 不支持负数索引。

### Map

### Range

### 函数

### 指针

### 结构体

### 结构体方法

### 错误处理

### 字符串操作

### JSON 处理

### 时间处理

### 数字解析

### 进程信息

## 参考

- [Go 上手 基础语法](https://bytedance.feishu.cn/file/boxcnDQ57K0wtcZtA3Y26ORKwec)
