---
date: 2022-09-26
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

## 降幂公式 {:power-reduction}

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

从奇偶性来讲，当 $n$ 为奇数时， $\sin ^nx$ 仍是奇函数，所以降幂后用 $\sin kx$ 表示；

而当 $n$ 为奇数时， $\sin ^nx$ 是偶函数，因此用 $\cos kx$ 表示。

## 相关计算

待续。
