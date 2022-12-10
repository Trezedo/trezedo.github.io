---
icon: function
date: 2022-09-20
star: true
category:
    - 高等数学
    - 积分
tag:
    - 积分
---

# 几种基本形式的积分

在计算积分时通常会出现以下几种形式的积分：

$$
\begin{darray}{lll}
    I_1=\int{\frac{\d x}{a^2x^2+b^2}}&
    I_2=\int{\frac{\d x}{a^2x^2-b^2}}
    \\[1em]
    I_3=\int{\frac{\d x}{\sqrt{a^2x^2\pm b^2}}}&
    I_4=\int{\frac{\d x}{\sqrt{b^2-a^2x^2}}}
    \\[1em]
    I_5=\int{\sqrt{a^2x^2\pm b^2}\d x}&
    I_6=\int{\sqrt{b^2-a^2x^2}\d x}
\end{darray}
$$

本文将对这几种积分的结果进行推导。

<!-- more -->

## 逐个求解

先来看最简单的 $I_1$ 和 $I_2$：

$$
\begin{aligned}
    I_1&=\int{\frac{\d x}{a^2x^2+b^2}}=\int{\frac{\frac{b}{a}\d \left( \frac{ax}{b} \right)}{b^2\left( 1+\left( \frac{ax}{b} \right) ^2 \right)}}=\frac{1}{ab}\arctan \frac{ax}{b}+C
    \\
    I_2&=\int{\frac{\d x}{a^2x^2-b^2}}=\int{\frac{1}{2b}\left( \frac{1}{ax-b}-\frac{1}{ax+b} \right) \d x}\\
    &=\frac{1}{2b}\left[ \frac{1}{a}\ln \left| ax-b \right|-\frac{1}{a}\ln \left| ax+b \right| \right]\\
    &=\frac{1}{2ab}\ln \left| \frac{ax-b}{ax+b} \right|+C
\end{aligned}
$$

这两个积分均不需要换元就能积出。

对于 $\ds I_3=\int{\frac{\d x}{\sqrt{a^2x^2\pm b^2}}}$，我们应该分两种情况考虑：

$$
\begin{aligned}
    I_3^+&=\int{\frac{\d x}{\sqrt{a^2x^2+b^2}}}\xlongequal{x=\frac{b}{a}\sinh t}\int{\frac{\frac{b}{a}\cosh t\d t}{b\cosh t}}=\frac{t}{a}=\frac{1}{a}\sinh ^{-1}\frac{ax}{b}\\
    &=\frac{1}{a}\ln \left( \frac{ax}{b}+\sqrt{\left( \frac{ax}{b} \right) ^2+1} \right) =\frac{1}{a}\ln \left( ax+\sqrt{ax^2+b^2} \right) -\frac{1}{a}\ln b\\
    &=\frac{1}{a}\ln \left( ax+\sqrt{ax^2+b^2} \right) +C
\\
    I_3^-&=\int{\frac{\d x}{\sqrt{a^2x^2-b^2}}}\xlongequal{x=\frac{b}{a}\cosh t}\int{\frac{\frac{b}{a}\sinh t\d t}{b\sinh t}}=\frac{t}{a}=\frac{1}{a}\cosh ^{-1}\frac{ax}{b}\\
    &=\frac{1}{a}\ln \left( ax+\sqrt{a^2x^2-b^2} \right) +C
\end{aligned}
$$

于是

$$
I_3=\frac{1}{a}\ln \left( ax+\sqrt{a^2x^2\pm b^2} \right) +C
$$

::: tip 反双曲函数

因为

$$
\begin{aligned}
y&=\sinh x=\frac{\e ^x-\e ^{-x}}{2}\\
\Rightarrow x&=\sinh ^{-1}y
\end{aligned}
$$

满足

$$
\e ^{2x}-2y\e ^x-1=0
$$

用求根公式（舍负值）解得

$$
\e ^x=\frac{2y\pm \sqrt{4y^2+4}}{2}=y+\sqrt{y^2+1}
$$

取对数，$x=\ln \left( y+\sqrt{y^2+1} \right)$ ，即

$$
\sinh ^{-1}y=\ln \left( y+\sqrt{y^2+1} \right)
$$

同理有 $\cosh ^{-1}y=\ln \left( y+\sqrt{y^2-1} \right)$

:::

::: tip 三角换元

如果不熟悉双曲函数也可以用三角函数：

$$
\begin{aligned}
    I_3^+&=\int{\frac{\d x}{\sqrt{a^2x^2+b^2}}}\xlongequal{x=\frac{b}{a}\tan t}\int{\frac{\frac{b}{a}\sec ^2t\d t}{b\sec t}}=\frac{1}{a}\int{\sec t\d t}\\
    &=\frac{1}{a}\ln \left| \sec t+\tan t \right|=\frac{1}{a}\ln \left| \sqrt{1+\left( \frac{ax}{b} \right) ^2}+\frac{ax}{b} \right|\\
    &=\frac{1}{a}\ln \left( ax+\sqrt{a^2x^2+b^2} \right) +C
\end{aligned}
$$

$$
\begin{aligned}
    I_3^-&=\int{\frac{\d x}{\sqrt{a^2x^2-b^2}}}\xlongequal{x=\frac{b}{a}\sec t}\int{\frac{\frac{b}{a}\sec t\tan t\d t}{b\tan t}}=\frac{1}{a}\int{\sec t\d t}\\
    &=\frac{1}{a}\ln \left| \sec t+\tan t \right|=\frac{1}{a}\ln \left| \frac{ax}{b}+\sqrt{\left( \frac{ax}{b} \right) ^2-1} \right|\\
    &=\frac{1}{a}\ln \left( ax+\sqrt{a^2x^2-b^2} \right) +C
\end{aligned}
$$

:::

$I_4$ 也比较简单，凑微分可得

$$
I_4=\int{\frac{\d x}{\sqrt{b^2-a^2x^2}}}=\int{\frac{\frac{b}{a}\d \left( \frac{ax}{b} \right)}{b\sqrt{1-\left( \frac{ax}{b} \right) ^2}}}=\frac{1}{a}\arcsin \frac{ax}{b}+C
$$

最后两个，用分部积分法可化为之前求过的积分：

$$
\begin{aligned}
    I_5&=\int{\sqrt{a^2x^2\pm b^2}\d x}=x\sqrt{a^2x^2\pm b^2}-\int{\frac{2a^2x^2}{2\sqrt{a^2x^2\pm b^2}}\d x}\\
    &=x\sqrt{a^2x^2\pm b^2}-\int{\frac{a^2x^2\pm b^2\mp b^2}{\sqrt{a^2x^2\pm b^2}}\d x}\\
    &=x\sqrt{a^2x^2\pm b^2}-I_5\pm b^2I_3\\
    &=\frac{x}{2}\sqrt{a^2x^2\pm b^2}\pm \frac{b^2}{2a}\ln \left( ax+\sqrt{a^2x^2\pm b^2} \right) +C
\end{aligned}
$$

$$
\begin{aligned}
    I_6&=\int{\sqrt{b^2-a^2x^2}\d x}=x\sqrt{b^2-a^2x^2}-\int{\frac{-2a^2x^2}{2\sqrt{b^2-a^2x^2}}\d x}\\
    &=x\sqrt{b^2-a^2x^2}-\int{\frac{\left( b^2-a^2x^2 \right) -b^2}{\sqrt{b^2-a^2x^2}}\d x}\\
    &=x\sqrt{b^2-a^2x^2}-I_6+b^2I_4\\
    &=\frac{x}{2}\sqrt{b^2-a^2x^2}+\frac{b^2}{2a}\arcsin \frac{ax}{b}+C
\end{aligned}
$$

## 总结

以下 8 个积分（6 个公式）可直接使用：

$$
\begin{aligned}
    \int{\frac{\d x}{a^2x^2+b^2}}&=\frac{1}{ab}\arctan \frac{ax}{b}+C\\
    \int{\frac{\d x}{a^2x^2-b^2}}&=\frac{1}{2ab}\ln \left| \frac{ax-b}{ax+b} \right|+C
\end{aligned}
$$

$$
\begin{aligned}
    \int{\frac{\d x}{\sqrt{a^2x^2\pm b^2}}}&=\frac{1}{a}\ln \left( ax+\sqrt{a^2x^2\pm b^2} \right) +C\\
    \int{\frac{\d x}{\sqrt{b^2-a^2x^2}}}&=\frac{1}{a}\arcsin \frac{ax}{b}+C
\end{aligned}
$$

$$
\begin{aligned}
    \int{\sqrt{a^2x^2\pm b^2}\d x}&=\frac{x}{2}\sqrt{a^2x^2\pm b^2}\pm \frac{b^2}{2a}\ln \left( ax+\sqrt{a^2x^2\pm b^2} \right) +C\\
\int{\sqrt{b^2-a^2x^2}\d x}&=\frac{x}{2}\sqrt{b^2-a^2x^2}+\frac{b^2}{2a}\arcsin \frac{ax}{b}+C
\end{aligned}
$$
