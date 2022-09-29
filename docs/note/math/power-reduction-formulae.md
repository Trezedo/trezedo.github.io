---
date: 2022-09-26
category:
    - 高等数学
tag:
    - 三角函数
---

# 三角函数之降幂公式

将 $\sin^n x$ 和 $\cos^n x$ 用 $\sin kx$ 和 $\cos kx$ 线性表示。

<!-- more -->

## 二项式定理

$$
\left( x+y \right) ^n=\sum_{k=0}^n{\binom{n}{k}x^{n-k}y^k}=\sum_{k=0}^n{\binom{n}{k}x^ky^{n-k}}
$$

其中 $\ds\binom{n}{k}$ 是二项式系数，在中学时我们用的记号为 ${\rm C}_{n}^{k}$。

它满足等式

$$
\binom{n}{k}=\binom{n}{n-k}
$$

## 欧拉公式

$$
\cos x=\frac{\e ^{\i x}+\e ^{-\i x}}{2}
$$

其中 $\rm i$ 是虚数单位。

## 降幂公式的推导

由欧拉公式

$$
\cos ^nx=\frac{\left( \e^{\i x}+\e ^{-\i x} \right) ^n}{2^n}
$$

由二项式定理

$$
\begin{aligned}
    S&=\left( \e ^{\i x}+\e ^{-\i x} \right) ^n=\sum_{k=0}^n{\binom{n}{k}\left( \e ^{\i x} \right) ^k\left( \e ^{-\i x} \right) ^{n-k}}=\sum_{k=0}^n{\binom{n}{k}\e ^{\i \left( 2k-n \right) x}}\\
    &=\sum_{k=0}^n{\binom{n}{k}\left( \e ^{\i x} \right) ^{n-k}\left( \e ^{-\i x} \right) ^k}=\sum_{k=0}^n{\binom{n}{k}\e ^{\i \left( n-2k \right) x}}\\
    &=\sum_{k=0}^n{\binom{n}{k}\frac{\e ^{\i \left( 2k-n \right) x}+\e ^{\i \left( n-2k \right) x}}{2}}\\
    &=\sum_{k=0}^n{\binom{n}{k}\cos \left( n-2k \right) x}
\end{aligned}
$$

若 $n$ 为偶数，则将合式 $S$ 分为三部分

$$
\begin{aligned}
    S&=\sum_{k=0}^{\frac{n}{2}-1}{\binom{n}{k}\cos \left( n-2k \right) x}+\binom{n}{n/2}+\sum_{k=\frac{n}{2}+1}^n{\binom{n}{k}\cos \left( n-2k \right) x}\\
    &=S_1+\binom{n}{n/2}+\sum_{j=\frac{n}{2}-1}^0{\binom{n}{n-j}\cos \left( n-2\left( n-j \right) \right) x}\\
    &=S_1+\binom{n}{n/2}+\sum_{j=0}^{\frac{n}{2}-1}{\binom{n}{k}\cos \left( n-2j \right) x}\\
    &=2\sum_{j=0}^{\frac{n}{2}-1}{\binom{n}{k}\cos \left( n-2j \right) x}+\binom{n}{n/2}
\end{aligned}
$$

这里记号 $\ds\sum_{j=\frac{n}{2}-1}^0{}$ 表示倒序求和，注意到 $\cos x$ 是偶函数。

故

$$
\cos ^nx=\frac{S}{2^n}=\frac{1}{2^{n-1}}\sum_{j=0}^{\frac{n}{2}-1}{\binom{n}{k}\cos \left( n-2j \right) x}+\frac{1}{2^n}\binom{n}{n/2}
$$

若 $n$ 为奇数，则可将 $S$ 均分为两部分，根据 $n$ 为偶数的情况可推知

$$
\cos ^nx=\frac{1}{2^{n-1}}\sum_{j=0}^{\frac{n-1}{2}}{\binom{n}{k}\cos \left( n-2j \right) x}
$$

综合有

$$
\cos ^nx=\begin{dcases}
    \frac{1}{2^{n-1}}\sum_{k=0}^{\frac{n-1}{2}}{\binom{n}{k}\cos \left( n-2k \right) x}&        ,n\text{为奇数}\\
    \frac{1}{2^{n-1}}\sum_{k=0}^{\frac{n}{2}-1}{\binom{n}{k}\cos \left( n-2k \right) x}+\frac{1}{2^n}{\rm C}_{n}^{\frac{n}{2}}&        ,n\text{为偶数}\\
\end{dcases}
$$

由关系 $\sin x=\cos \left( \frac{\pi}{2}-x \right)$ 得

$$
\begin{aligned}
    \sin ^nx&=\begin{dcases}
    \frac{1}{2^{n-1}}\sum_{k=0}^{\frac{n-1}{2}}{\binom{n}{k}\cos \left( n-2k \right) \left( \frac{\pi}{2}-x \right)}&        ,n\text{为奇数}\\
    \frac{1}{2^{n-1}}\sum_{k=0}^{\frac{n}{2}-1}{\binom{n}{k}\cos \left( n-2k \right) \left( \frac{\pi}{2}-x \right)}+\frac{1}{2^n}{\rm C}_{n}^{\frac{n}{2}}&        ,n\text{为偶数}\\
\end{dcases}\\
    &=\begin{dcases}
    \frac{1}{2^{n-1}}\sum_{k=0}^{\frac{n-1}{2}}{\left( -1 \right) ^{\frac{n-1}{2}-k}\binom{n}{k}\sin \left( n-2k \right) x}&        ,n\text{为奇数}\\
    \frac{1}{2^n}C_{n}^{\frac{n}{2}}+\frac{1}{2^{n-1}}\sum_{k=0}^{\frac{n}{2}-1}{\left( -1 \right) ^{\frac{n}{2}-k}\binom{n}{k}\cos \left( n-2k \right) x}&        ,n\text{为偶数}\\
\end{dcases}
\end{aligned}
$$
