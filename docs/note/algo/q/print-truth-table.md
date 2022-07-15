---
date: 2022-03-21
title: 命题公式真值表
category:
    - 离散数学
tag:
    - 真值表
    - C
    - Java
    - Kotlin
---

::: info 题目

已知命题公式 $A=\lnot (p\lor q) \land (( p\lor r) \lor s)$ ，用 Java 或 C/C++ 语言编写程序构造该命题公式的真值表，真值表输出样式自己设计（变量值可以不手工输入）。

:::

<!-- more -->

## 思路

我们不妨先对 $A$ 化简：

$$
\begin{aligned}
A&=\lnot \left( p\lor q \right) \land \left( \left( p\lor r \right) \lor s \right)\\
&=\lnot p\land \lnot q\land \left( p\lor \left( r\lor s \right) \right)\\
&=\lnot q\land \left( \left( \lnot p\land p \right) \lor \left( \lnot p\land \left( r\lor s \right) \right) \right)\\
&=\lnot p\land \lnot q\land \left( r\lor s \right)\\
\end{aligned}
$$

可以得知，当且仅当 $p,q$ 为假， $r$ 或 $s$ 为真时，$A$ 为真，即：

::: center

|  p  |  q  |  r  |  s  |  A  |
| :-: | :-: | :-: | :-: | :-: |
|  0  |  0  |  0  |  0  |  0  |
|  0  |  0  |  0  |  1  |  1  |
|  0  |  0  |  1  |  0  |  1  |
|  0  |  0  |  1  |  1  |  1  |
|  0  |  1  |  0  |  0  |  0  |
|  0  |  1  |  0  |  1  |  0  |
|  0  |  1  |  1  |  0  |  0  |
|  0  |  1  |  1  |  1  |  0  |
|  1  |  0  |  0  |  0  |  0  |
|  1  |  0  |  0  |  1  |  0  |
|  1  |  0  |  1  |  0  |  0  |
|  1  |  0  |  1  |  1  |  0  |
|  1  |  1  |  0  |  0  |  0  |
|  1  |  1  |  0  |  1  |  0  |
|  1  |  1  |  1  |  0  |  0  |
|  1  |  1  |  1  |  1  |  0  |

:::

### C 实现

直接对这 4 个变元循环也是可以的：

```c {10}
#include "stdio.h"

int main() {
    int p, q, r, s, A;
    printf("p q r s A\n");
    for (p = 0; p < 2; p++) {
        for (q = 0; q < 2; q++) {
            for (r = 0; r < 2; r++) {
                for (s = 0; s < 2; s++) {
                    A = (!(p + q) * (p + r + s)) ? 1 : 0;
                    printf("%d %d %d %d %d\n", p, q, r, s, A);
                }
            }
        }
    }
    return 0;
}
```

::: details 运行结果

```text
p q r s A
0 0 0 0 0
0 0 0 1 1
0 0 1 0 1
0 0 1 1 1
0 1 0 0 0
0 1 0 1 0
0 1 1 0 0
0 1 1 1 0
1 0 0 0 0
1 0 0 1 0
1 0 1 0 0
1 0 1 1 0
1 1 0 0 0
1 1 0 1 0
1 1 1 0 0
1 1 1 1 0
```

:::

还是挺容易的吧，不过需要注意的是 `!(p + q) * (p + r + s)` 可能大于 1，所以用三目运算符将其限定在 0-1 之间。

### Java 实现

这里我们不再用以上直接循环的思路，而是实现一个**可扩展**的功能。

完整的 Java 代码如下：

```java
import java.util.logging.Level;
import java.util.logging.Logger;

public class Table {
    int cols, rows;
    String[] argNames;
    Handler handler;

    static Logger logger = Logger.getLogger(Table.class.getName());

    interface Handler {
        /**
         * 运算式，用于计算 一行真值表 的值
         *
         * @param rowArgs 行元素
         * @return 表达式的值，"0" 或 "1"
         */
        String getResult(Boolean... rowArgs);
    }

    public Table(int argsCount, Handler handler, String... argNames) {
        cols = argsCount;
        rows = (int) Math.pow(2, cols);
        this.handler = handler;
        this.argNames = argNames;
    }

    /**
     * 填充真值表的数据（按列生成）
     */
    public Boolean[][] fillTableValue() {
        // 每列元素对应的周期，依次是 2^(col - 1) 到 2^0
        int[] period = new int[cols];
        period[cols - 1] = 1;
        for (int i = cols - 1; i > 0; i--) {
            period[i - 1] = period[i] * 2;
        }

        Boolean[][] table = new Boolean[rows][cols];
        // 除以周期，根据商取值，偶数为 false ，奇数为 true
        for (int row = 0; row < rows; row++) {
            for (int col = 0; col < cols; col++) {
                table[row][col] = (row / period[col]) % 2 != 0;
            }
        }
        return table;
    }

    /**
     * 真值表的标题
     *
     * @return 标题
     */
    public String getTitle() {
        StringBuilder title = new StringBuilder();
        for (int i = 0; i < cols; i++) {
            title.append(i < argNames.length ? argNames[i] : i + 1).append("\t");
        }
        title.append(argNames.length > cols ? argNames[cols] : "");
        return title.toString();
    }

    public String getBody() {
        Boolean[][] table = fillTableValue();
        StringBuilder body = new StringBuilder();
        for (int i = 0; i < rows; i++) {
            StringBuilder row = new StringBuilder("\n");
            for (int j = 0; j < cols; j++) {
                row.append(table[i][j] ? 1 : 0).append("\t");
            }
            try {
                row.append(handler.getResult(table[i]));
            } catch (ArrayIndexOutOfBoundsException e) {
                e.printStackTrace();
                logger.log(Level.SEVERE, "handler 下标超出指定变元个数范围");
            }
            body.append(row);
        }
        return body.toString();
    }

    public void print() {
        System.out.println(getTitle());
        System.out.println(getBody());
    }

    public static void main(String[] args) {
        new Table(4,
                row -> !(row[0] || row[1]) && ((row[0] || row[2]) || row[3]) ? "1" : "0",
                "p", "q", "r", "s", "A").print();
    }
}
```

::: details 运行结果

```text
p q r s A

0 0 0 0 0
0 0 0 1 1
0 0 1 0 1
0 0 1 1 1
0 1 0 0 0
0 1 0 1 0
0 1 1 0 0
0 1 1 1 0
1 0 0 0 0
1 0 0 1 0
1 0 1 0 0
1 0 1 1 0
1 1 0 0 0
1 1 0 1 0
1 1 1 0 0
1 1 1 1 0
```

:::

以上代码中，我的思路是先构造出含有各个变元的表格（数据部分），再对每行数据执行命题公式 $A$ 的运算。

观察在开始的表格可以发现规律：

- 变元 $p$ 每 8 行改变一次数值；
- 变元 $q$ 每 4 行改变一次数值；
- 变元 $r$ 每 2 行改变一次数值；
- 变元 $s$ 每 1 行改变一次数值。

利用这个**周期性**就可以填满整个表的变元数据部分。

`Table` 类的构造方法中用了一个接口 `Handler` 对真值表运算的逻辑表达式“赋值”，实现了可扩展性，可以不限制对变元的逻辑操作，但换来的是较高的时间复杂度，为 $O(n\cdot 2^n)$​ 。

这里的代码实现也不会限制变元的个数，完全取决于用户的输入：

```java
Table(int argsCount, Handler handler, String... argNames);
```

打印数据分为两部分，即 `Title` 和 `Body` ， `Title` 由构造方法中的 `argNames` 控制，而 `Body` 是对由 `fillTableValue` 方法填充的二维 `Boolean` 数组执行 `Handler` 中的逻辑运算，并拼接而成的字符串。

### Kotlin 版本

```kotlin
import java.util.logging.Level
import java.util.logging.Logger
import kotlin.math.pow

class Table(argsCount: Int, var handler: (args: Array<Boolean>) -> String, vararg argNames: String) {
    private var cols: Int
    private var rows: Int
    private var argNames: Array<out String>

    init {
        cols = argsCount
        rows = 2.0.pow(cols.toDouble()).toInt()
        this.argNames = argNames
    }

    /**
     * 填充真值表的数据（按列生成）
     */
    private fun fillTableValue(): Array<Array<Boolean>> {
        // 每列元素对应的周期，依次是 2^(cols - 1) 到 2^0
        val period = IntArray(cols) { 2.0.pow(cols - it - 1).toInt() }
        // 除以周期，根据商取值，偶数为 false ，奇数为 true
        return Array(rows) { row ->
            Array(cols) { col ->
                row / period[col] % 2 != 0
            }
        }
    }

    /**
     * 真值表的标题
     *
     * @return 标题
     */
    private val title: String
        get() {
            val title = StringBuilder()
            for (i in 0 until cols) {
                title.append("${if (i < argNames.size) argNames[i] else i + 1}\t")
            }
            title.append(if (argNames.size > cols) argNames[cols] else "")
            return title.toString()
        }

    private val body: String
        get() {
            val table = fillTableValue()
            val body = StringBuilder()
            table.forEach { row ->
                val sb = StringBuilder("\n")
                row.forEach { col ->
                    sb.append("${if (col) 1 else 0}\t")
                }
                try {
                    sb.append(handler(row))
                } catch (e: ArrayIndexOutOfBoundsException) {
                    e.printStackTrace()
                    logger.log(Level.SEVERE, "handler 下标超出指定变元个数范围")
                }
                body.append(sb)
            }
            return body.toString()
        }

    fun print() {
        println(title)
        println(body)
    }

    companion object {
        var logger: Logger = Logger.getLogger(Table::javaClass.name)

        @JvmStatic
        fun main(args: Array<String>) = Table(4,
            { if (!(it[0] || it[1]) && (it[0] || it[2] || it[3])) "1" else "0" },
            "p", "q", "r", "s", "A"
        ).print()
    }
}
```

> 这里给出 kotlin 版本的代码纯粹为笔者个人的练习 :slightly_smiling_face: 。

因为 kotlin 自身就支持类似 `callback` 的类型（高阶函数），所以没有使用 Java 版本的 `Handler` 接口也能实现形如 `lambda` 表达式的参数。
