---
icon: arcticons:math-wiki
date: 2022-09-26
modified: 2026-03-23
category:
    - 高等数学
tag:
    - 三角函数
---

# 高次幂三角函数及其计算

介绍如何将 $\sin^n x$ 和 $\cos^n x$ 用 $\sin kx$ 和 $\cos kx$ 线性表示，以及计算如下积分的方法

$$
\int {\sin ^n x\d x},\quad \int {\cos ^n x\d x}
$$

<!-- more -->

## 降幂公式 {#power-reduction}

### 二项式定理

$$
(x+y)^n=\sum_{k=0}^n{\binom{n}{k}x^{n-k}y^k}=\sum_{k=0}^n{\binom{n}{k}x^ky^{n-k}}
$$

其中 $\ds\binom{n}{k}$ 是二项式系数，在中学时我们用的记号为 ${\rm C}_{n}^{k}$。

它满足等式

$$
\binom{n}{k}=\binom{n}{n-k}
$$

### 欧拉公式

$$
\cos x=\frac{\e ^{\i x}+\e ^{-\i x}}{2}
$$

其中 $\rm i$ 是虚数单位。

### 余弦降幂公式

由欧拉公式

$$
\cos ^nx=\frac{(\e^{\i x}+\e ^{-\i x})^n}{2^n}
$$

由二项式定理

$$
\begin{aligned}
    S&=(\e ^{\i x}+\e ^{-\i x})^n=\sum_{k=0}^n{\binom{n}{k}(\e ^{\i x})^k(\e ^{-\i x})^{n-k}}=\sum_{k=0}^n{\binom{n}{k}\e ^{\i (2k-n)x}}\\
    &=\sum_{k=0}^n{\binom{n}{k}(\e ^{\i x})^{n-k}(\e ^{-\i x})^k}=\sum_{k=0}^n{\binom{n}{k}\e ^{\i (n-2k)x}}\\
    &=\sum_{k=0}^n{\binom{n}{k}\frac{\e ^{\i (2k-n)x}+\e ^{\i (n-2k)x}}{2}}\\
    &=\sum_{k=0}^n{\binom{n}{k}\cos (n-2k)x}
\end{aligned}
$$

若 $n$ 为偶数，则将合式 $S$ 分为三部分

$$
\begin{aligned}
    S&=\sum_{k=0}^{\frac{n}{2}-1}{\binom{n}{k}\cos (n-2k)x}+\binom{n}{n/2}+\sum_{k=\frac{n}{2}+1}^n{\binom{n}{k}\cos (n-2k)x}\\
    &=S_1+\binom{n}{n/2}+\sum_{j=\frac{n}{2}-1}^0{\binom{n}{n-j}\cos (n-2\left( n-j)\right) x}\\
    &=S_1+\binom{n}{n/2}+\sum_{j=0}^{\frac{n}{2}-1}{\binom{n}{k}\cos (n-2j)x}\\
    &=2\sum_{j=0}^{\frac{n}{2}-1}{\binom{n}{k}\cos (n-2j)x}+\binom{n}{n/2}
\end{aligned}
$$

这里记号 $\ds\sum_{j=\frac{n}{2}-1}^0{}$ 表示倒序求和，并注意到 $\cos x$ 是偶函数。

故

$$
\cos ^nx=\frac{S}{2^n}=\frac{1}{2^{n-1}}\sum_{j=0}^{\frac{n}{2}-1}{\binom{n}{k}\cos (n-2j)x}+\frac{1}{2^n}\binom{n}{n/2}
$$

若 $n$ 为奇数，则可将 $S$ 均分为两部分，根据 $n$ 为偶数的情况可推知

$$
\cos ^nx=\frac{1}{2^{n-1}}\sum_{j=0}^{\frac{n-1}{2}}{\binom{n}{k}\cos (n-2j)x}
$$

综合有

$$
\cos ^nx=\begin{dcases}
    \frac{1}{2^{n-1}}\sum_{k=0}^{\frac{n-1}{2}}{\binom{n}{k}\cos (n-2k)x}&        ,n\text{为奇数}\\
    \frac{1}{2^{n-1}}\sum_{k=0}^{\frac{n}{2}-1}{\binom{n}{k}\cos (n-2k)x}+\frac{1}{2^n}\binom{n}{n/2}&        ,n\text{为偶数}\\
\end{dcases}
$$

又因为

$$
\lfloor \frac{n-1}{2} \rfloor =\begin{cases}
    \frac{n-1}{2}&        ,n\text{为奇数}\\
    \frac{n}{2}-1&        ,n\text{为偶数}\\
\end{cases}
$$

以及

$$
n\mod 2=\begin{cases}
    1&        ,n\text{为奇数}\\
    0&        ,n\text{为偶数}\\
\end{cases}
$$

则

$$
\cos ^nx=\frac{1}{2^{n-1}}\sum_{k=0}^{\lfloor \frac{n-1}{2} \rfloor}{\binom{n}{k}\cos (n-2k)x}+\frac{1-(n\mod 2)}{2^n}\binom{n}{n/2}
$$

### 正弦降幂公式

由关系 $\sin x=\cos (\frac{\pi}{2}-x)$ 得

$$
\cos (n-2k)(\frac{\pi}{2}-x)=(-1)^k\cos \left[ \frac{n\pi}{2}-(n-2k)x \right]
$$

若 $n$ 为偶数，则

$$
\begin{aligned}
    \cos \left[ \frac{n\pi}{2}-(n-2k)x \right] &=(-1)^{\frac{n}{2}}\cos (n-2k)x\\
    &=(-1)^{\lfloor \frac{n}{2} \rfloor}\cos (n-2k)x
\end{aligned}
$$

若 $n$ 为奇数，则

$$
\begin{aligned}
    \cos \left[ \frac{n\pi}{2}-(n-2k)x \right] &=\cos \left[ \frac{n-1}{2}\pi +\frac{\pi}{2}-(n-2k)x \right] \\
    &=(-1)^{\frac{n-1}{2}}\sin (n-2k)x\\
    &=(-1)^{\lfloor \frac{n}{2} \rfloor}\sin (n-2k)x
\end{aligned}
$$

于是

$$
\begin{aligned}
    \cos (n-2k)\left( \frac{\pi}{2}-x \right) &=(-1)^k(-1)^{\lfloor \frac{n}{2} \rfloor}\begin{matrix}
        \cos\\
        \sin
    \end{matrix} (n-2k)x\\
    &=(-1)^{\lfloor \frac{n}{2} \rfloor \pm k}\begin{matrix}
        \cos\\
        \sin
    \end{matrix} (n-2k)x
\end{aligned}
$$

从而

$$
\sin ^nx=\frac{1}{2^{n-1}}\sum_{k=0}^{\lfloor \frac{n-1}{2} \rfloor}{(-1)^{\lfloor \frac{n}{2} \rfloor - k}\binom{n}{k}\begin{matrix}
        \cos\\
        \sin
    \end{matrix} (n-2k)x}+\frac{1-(n\mod 2)}{2^n}\binom{n}{n/2}
$$

从奇偶性来讲：

- 当 $n$ 为奇数时， $\sin ^nx$ 是奇函数，降幂后用 $\sin kx$ 表示；
- 当 $n$ 为偶数时， $\sin ^nx$ 是偶函数，降幂后用 $\cos kx$ 表示。

## 相关计算

对于这两类积分

$$
\int{\sin ^nx\d x},\quad\int{\cos ^nx\d x}
$$

如果 $n$ 是奇数，可以凑微分来计算，例如：

$$
\int{\cos ^{2k+1}x\d x}=\int{\left( \cos ^2x \right) ^k\d \left( \sin x \right)}=\int{\left( 1-\sin ^2x \right) ^k\d \left( \sin x \right)}
$$

但当 $k$ 较大时计算也会相对复杂。

我们利用上面的公式，可得：

当 $n$ 为奇数时，

$$
\begin{aligned}
    \int{\cos ^nx\d x}&=\frac{1}{2^{n-1}}\sum_{k=0}^{\lfloor \frac{n-1}{2} \rfloor}{\binom{n}{k}\frac{\sin \left( n-2k \right) x}{n-2k}}\\
    \int{\sin ^nx\d x}&=-\frac{1}{2^{n-1}}\sum_{k=0}^{\lfloor \frac{n-1}{2} \rfloor}{\left( -1 \right) ^{\lfloor \frac{n}{2} \rfloor -k}\binom{n}{k}\frac{\cos \left( n-2k \right) x}{n-2k}}
\end{aligned}
$$

当 $n$ 为偶数时，

$$
\begin{aligned}
    \int{\cos ^nx\d x}&=\frac{1}{2^{n-1}}\sum_{k=0}^{\lfloor \frac{n-1}{2} \rfloor}{\binom{n}{k}\frac{\sin \left( n-2k \right) x}{n-2k}}+\frac{x}{2^n}\binom{n}{n/2}\\
    \int{\sin ^nx\d x}&=\frac{1}{2^{n-1}}\sum_{k=0}^{\lfloor \frac{n-1}{2} \rfloor}{\left( -1 \right) ^{\lfloor \frac{n}{2} \rfloor -k}\binom{n}{k}\frac{\sin \left( n-2k \right) x}{n-2k}}+\frac{x}{2^n}\binom{n}{n/2}
\end{aligned}
$$

看上去可能有亿点复杂，但实际操作时只要记住几点：

1. 只有 $\sin x$ 奇数次幂的积分结果用 $\cos kx$ 表示，其余全用 $\sin kx$；
2. $\ds\int{\sin ^nx\d x}$ 的项的符号正负交替，且首项符号为 $\left( -1 \right) ^{\lfloor \frac{n+1}{2} \rfloor}$；
3. 偶次幂的积分会多一项 $\ds\frac{x}{2^n}\binom{n}{n/2}$；
4. $\sin kx$ 或 $\cos kx$ 中 $k$ 从 $n$ 开始，每次减 2。

例如，求 $\ds\int{\cos ^7x\d x}$

被积函数为偶函数，结果用 $\sin kx$ 表示

计算二项式系数

$$
\begin{aligned}
    &\binom{7}{0}=1,\binom{7}{1}=7,\binom{7}{2}=7\cdot \frac{6}{2}=21,\\
    &\binom{7}{3}=21\cdot \frac{5}{3}=35
\end{aligned}
$$

即

$$
\begin{array}{c|cccc}
    \hline
    k&        0&        1&        2&        3&        \\[2px]
    \hline
    {\rm C}_{n}^{k}&        1&        7&        21&        35&        \\[2px]
    \hline
\end{array}
$$

写结果

$$
\begin{aligned}
    \int{\cos ^7x\d x}&=\frac{1}{2^{7-1}}\left[ \frac{1}{7}\cos 7x+\frac{7}{5}\cos 5x+\frac{21}{3}\cos 3x+\frac{35}{1}\cos x \right] \\
    &=\frac{1}{2^6}\left[ \frac{1}{7}\cos 7x+\frac{7}{5}\cos 5x+7\cos 3x+35\cos x \right]
\end{aligned}
$$

求 $\ds\int{\sin ^8x\d x}$

被积函数为偶函数，结果用 $\sin kx$ 表示，首项符号为 $\left( -1 \right) ^{\lfloor \frac{8+1}{2} \rfloor}=1$

计算二项式系数，

$$
\begin{gathered}
    \binom{8}{0}=1,\binom{8}{1}=8,\binom{8}{2}=8\cdot \frac{7}{2}=28\\
    \binom{8}{3}=28\cdot \frac{6}{3}=56,\binom{8}{4}=56\cdot \frac{5}{4}=70
\end{gathered}
$$

即

$$
\begin{array}{c|ccccc}
\hline
    k&        0&        1&        2&        3&        4\\[2px]
    \hline
    {\rm C}_{n}^{k}&        1&        8&        28&        56&        70\\[2px]
    \hline
\end{array}
$$

写结果

$$
\begin{aligned}
    \int{\sin ^8x\d x}&=\frac{1}{2^{8-1}}\left[ \frac{1}{8}\sin 8x-\frac{8}{6}\sin 6x+\frac{28}{4}\sin 4x-\frac{56}{2}\sin 2x \right] +\frac{x}{2^8}\cdot 70\\
    &=\frac{1}{2^7}\left[ \frac{1}{8}\sin 8x-\frac{4}{3}\sin 6x+7\sin 4x-28\sin 2x+35x \right]
\end{aligned}
$$
