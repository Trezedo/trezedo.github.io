---
date: 2022-12-01
icon: fluent:math-format-professional-16-filled
category:
    - 高等数学
tag:
    - 微分方程
    - 算子
createAt: 2022-02-09
---

# 微分方程算子法

此处主要整理算子法在求解线性微分方程中的应用及其部分性质的证明。

首先线性微分方程可以写成：

$$
a_0y^{(n)} + a_1y^{(n−1)} + a_2y^{(n−2)} + \cdots + a_{n−1}y' + a_n y=f(x)
$$

用微分算子表示：

$$
(a_0D^n+a_1D^{n-1}+a_2D^{n-2}+\cdots +a_{n-1}D+a_n)y=f(x)
$$

设  $\ds F(D)=\sum_{k=0}^{n}{a_kD^{n-k}}$  则有：

$$
F(D)y=f(x) \implies y=\frac{1}{F(D)}f(x)
$$

解出来就是对应的  $y$ ，即是线性方程的一个特解，所以用算子法解微分方程的关键就在于解  $\dfrac{1}{F(D)}f(x)$ ，而这就需要了解微分算子的相关性质。

## 基本性质

性质 1（**指数式**）：若 $F\left( k \right) \ne 0$，则：

$$
\frac{1}{F\left( D \right)}\e ^{kx}=\frac{1}{F\left( k \right)}\e ^{kx}
$$

特殊地，当 $k=0$ 时（$a$ 为任意常数）：

$$
\frac{1}{F(D)}a=a\frac{1}{F(D)}\e ^{0\cdot x}=\frac{a}{F(0)}
$$

若 $F(k)=0$ ，不妨设 $k$ 为 $F(k)$ 的 $m$ 重根（$F(k)=F'(k)=\cdots =F^{(m-1)}(k)=0$ 且 $F^{(m)}(k)\ne 0$），则：

$$
\frac{1}{F(D)}\e ^{kx}=x^m\frac{1}{F^{(m)}(D)}\e ^{kx}=x^m\frac{1}{F^{(m)}(k)}\e ^{kx}
$$

其中 $F^{(m)}(D)$ 表示 $F(D)$ 对 $D$ 的 $m$ 阶导数。

::: info 例 1.1

求特解 $y''+3y'-2y=\e ^{2x}$

:::

$F(D)=D^2+3D-2$ 且 $F(2)=8\ne 0$，故

$$
y^{\ast}=\frac{1}{F(D)}\e ^{2x}=\frac{1}{F(2)}\e ^{2x}=\frac{1}{8}\e ^{2x}
$$

::: info 例 1.2

求特解 $y'''+3y''+3y'+y=\e ^{-x}$

:::

$F(D)=D^3+3D^2+3D+1=(D+1)^3$，故 $k=-1$ 是 $F(k)$ 的 $3$ 重根，于是

$$
y*=\frac{1}{F(D)}\e ^{-x}=x^3\frac{1}{F'''(-1)}\e ^{-x}=x^3\frac{1}{3!}\e ^{-x}=\frac{1}{6}x^3\e ^{-x}
$$

::: tip

实际上书写时只需判断 $k$ 是否为方程的零点，如果是，求导即可：

$$
y*=\frac{1}{D^3+3D^2+3D+1}\e ^{-x}=x\frac{1}{3D^2+6D+3}\e ^{-x}=x^2\frac{1}{6D+6}\e ^{-x}=\frac{1}{6}x^3\e ^{-x}
$$

:::

性质 2（**移位式**）：$f(x)$ 为 $\e^{kx}g(x)$

$$
\frac{1}{F(D)}\e ^{kx}g(x)=\e ^{kx}\frac{1}{F(D+k)}g(x)
$$

::: info 例 2.1

求特解 $y''-4y'+4=x^2\e ^{2x}$

:::

$$
\begin{aligned}
    y*&=\frac{1}{D^2-4D+4}x^2\e ^{2x}=\e ^{2x}\frac{1}{(D+2)^2-4(D+2)+4}x^2\\
    &=\e ^{2x}\frac{1}{D^2}x^2=\e ^{2x}\frac{1}{D}\frac{x^3}{3}=\e ^{2x}\frac{x^4}{3\cdot 4}=\frac{1}{12}x^4\e ^{2x}
\end{aligned}
$$

::: info 例 2.2

求特解 $y'''-3y''+3y'-y=x\e ^x$

:::

$$
\begin{aligned}
    y*&=\frac{1}{D^3-3D^2+3D-1}x\e ^x=\frac{1}{(D-1)^3}x\e ^x=\e ^x\frac{1}{(D+1-1)^3}x\\
    &=\e ^x\frac{1}{D^3}x=\frac{1}{4!}x^4\e ^x=\frac{1}{24}x^4\e ^x\\
\end{aligned}
$$

性质 3：$f(x)$ 为多项式

$$
\begin{aligned}
    y^{\ast}&=\frac{1}{F(D)}(a_0x^m+a_1x^{m-1}+\cdots +a_m)\\
    &=Q(D)(a_0x^m+a_1x^{m-1}+\cdots +a_m)\\
\end{aligned}
$$

其中 $Q(D)$ 为 $1$ 除以按升幂排序的 $F(D)$ 的商式，其最高次数取到 $f(x)$ 的次数 $m$。

通常 $Q(D)$ 可以由长除法和泰勒级数 $\ds\frac{1}{1-x}=1+x+x^2+\cdots +x^n+\cdots$ 求得，这里只用后者。

::: info 例 3.1

求特解 $y''+y=x^2-x+2$

:::

因为 $D^2x^2=2,D^3x^2=0$，故 $Q(D)$ 只要求到 $2$ 次幂：

$$
Q(D)=\frac{1}{D^2+1}=\frac{1}{1-(-D^2)}=1+(-D^2)=1-D^2
$$

$$
\begin{aligned}
    y*&=Q(D)(x^2-x+2)=(1-D^2)(x^2-x+2)\\
    &=(x^2-x+2)-2=x^2-x
\end{aligned}
$$

::: info 例 3.2

求特解 $y''+2y'+5y=x^4\e ^{-x}$

:::

$$
\begin{aligned}
    y*&=\frac{1}{(D+1)^2+4}x^4\e ^{-x}=\e ^{-x}\frac{1}{(D-1+1)^2+4}x^4=\e ^{-x}\frac{1}{D^2+4}x^4\\
    &=\frac{\e ^{-x}}{4}\frac{1}{1-\left( -\frac{D^2}{4} \right)}x^4=\frac{\e ^{-x}}{4}\left[ 1+\left( -\frac{D^2}{4} \right) +\left( -\frac{D^2}{4} \right) ^2 \right] x^4\\
    &=\frac{\e ^{-x}}{4}\left( 1-\frac{D^2}{4}+\frac{D^4}{16} \right) x^4=\frac{\e ^{-x}}{4}\left[ x^4-\frac{1}{4}\cdot 4\cdot 3x^2+\frac{1}{16}\cdot 4! \right]\\
    &=\frac{\e ^{-x}}{4}\left( x^4-3x^2+\frac{3}{2} \right)
\end{aligned}
$$

性质 4（性质 1 的推广）：$f(x)$ 为 $\sin ax,\cos ax$

这是性质 $1$ 中 $k$ 取虚数单位 $\i$ 的情形，结合欧拉公式 $\e ^{\i x}=\cos x+\i \sin x$ 可得

$$
\begin{gather}
    \frac{1}{F(D)}\sin ax=\Im \frac{1}{F(D)}\e ^{\i ax}=\Im \frac{1}{F(\i a)}\e ^{\i ax}\\
    \frac{1}{F(D)}\cos ax=\Re \frac{1}{F(D)}\e ^{\i ax}=\Re \frac{1}{F(\i a)}\e ^{\i ax}
\end{gather}
$$

特殊且常用的如下：

其中 $F(-a^2)\ne 0$，则

$$
\begin{gather*}
    \frac{1}{F(D^2)}\sin ax=\Im \frac{1}{F(-a^2)}\e ^{\i ax}=\frac{1}{F(-a^2)}\sin ax\\
    \frac{1}{F(D^2)}\cos ax=\Re \frac{1}{F(-a^2)}\e ^{\i ax}=\frac{1}{F(-a^2)}\cos ax
\end{gather*}
$$

若 $F(-a^2)=0$，类似地，不妨设 $-a^2$ 为 $F(-a^2)$ 的 $m$ 重根，则

$$
\begin{gather*}
    \frac{1}{F(D^2)}\sin ax=x^m\frac{1}{F^{(m)}(-a^2)}\sin ax\\
    \frac{1}{F(D^2)}\cos ax=x^m\frac{1}{F^{(m)}(-a^2)}\cos ax
\end{gather*}
$$

::: info 例 4.1

求特解 $y''-2y'+5y=\e ^x\sin 3x$

:::

$$
y*=\frac{1}{(D-1)^2+4}\e ^x\sin 3x=\e ^x\frac{1}{D^2+4}\sin 3x=\e ^x\frac{1}{-3^2+4}\sin 3x=-\frac{1}{5}\e ^x\sin 3x
$$

::: info 例 4.2

求特解 $y''+2y'+2y=x\e ^{-x}\cos x$

:::

$$
y*=\frac{1}{(D+1)^2+1}x\e ^{-x}\cos x=\e ^{-x}\frac{1}{D^2+1}x\cos x=\e ^{-x}\Re \frac{1}{D^2+1}x\e ^{\i x}
$$

而

$$
\begin{aligned}
    \frac{1}{D^2+1}x\e ^{\i x}&=\e ^{\i x}\frac{1}{(D+\i )^2+1}x=\e ^{\i x}\frac{1}{D^2+2\i D}=\frac{\e ^{\i x}}{2\i }\frac{1}{D}\frac{1}{1+\frac{D}{2\i }}x\\
    &=\frac{\e ^{\i x}}{2\i }\frac{1}{D}\left( 1-\frac{D}{2\i } \right) x=\frac{\e ^{\i x}}{2}\frac{1}{D}\left( \frac{x}{\i }+\frac{1}{2} \right)\\
    &=\frac{\e ^{\i x}}{2}\left( -\i \frac{x^2}{2}+\frac{1}{2}x \right) =\frac{\cos x+\i \sin x}{4}(-\i x^2+x)\\
    &=\frac{1}{4}(x\cos x+x^2\sin x)+\frac{\i }{4}(x\sin x-x^2\cos x)\\
\end{aligned}
$$

故

$$
y*=\e ^{-x}\Re \frac{1}{D^2+1}x\e ^{\i x}=\frac{1}{4}(x\cos x+x^2\sin x)
$$

性质 5

$$
\frac{1}{F(D)}f(x)=\frac{1}{F_1(D)F_2(D)}f(x)=\frac{1}{F_2(D)F_1(D)}f(x)
$$

::: info 例 5

求特解 $y^{(4)}-y=\e ^x$

:::

$$
\begin{aligned}
    y*&=\frac{1}{D^4-1}\e ^x=\frac{1}{D-1}\frac{1}{(D+1)(D^2+1)}\e ^x=\frac{1}{D-1}\e ^x\frac{1}{(1+1)(1^2+1)}\\
    &=\frac{1}{4}\frac{1}{D-1}\e ^x=\frac{1}{4}x\e ^x
\end{aligned}
$$

性质 6

$$
\frac{1}{F(D)}\left[ f_1(x)+f_2(x)\right] =\frac{1}{F(D)}f_1(x)+\frac{1}{F(D)}f_2(x)
$$

该性质比较简单，不需要例子也能理解。

<!-- <https://zh.wikipedia.org/wiki/%E5%B7%AE%E5%88%86>

<https://en.wikipedia.org/wiki/Fractional_calculus>

<https://en.wikipedia.org/wiki/Antiderivative>

<https://chaoli.club/index.php/5137/0>

<https://en.wikipedia.org/wiki/Shift_theorem>

<https://www.youtube.com/watch?v=GN_zOiODG40>

<https://zhuanlan.zhihu.com/p/132651937> -->

## 部分证明

此部分可以仅作了解。

$$
\begin{aligned}
    I&=\e ^{\lambda x}\frac{1}{D}\e ^{-\lambda x}f=\e ^{\lambda x}\int{\e ^{-\lambda x}f\d x}=\e ^{\lambda x}\int{\e ^{-\lambda x}\d \left( \frac{1}{D}f \right)}\\
    &=\frac{1}{D}f+\e ^{\lambda x}\int{\lambda \e ^{-\lambda x}\left( \frac{1}{D}f \right) \d x}\\
    &=\frac{1}{D}f+\lambda \e ^{\lambda x}\int{\e ^{-\lambda x}\d \left( \frac{1}{D^2}f \right)}\\
    &=\frac{1}{D}f+\lambda \frac{1}{D^2}f+\lambda ^2\e ^{\lambda x}\int{\e ^{-\lambda x}\frac{1}{D^2}f\d x}\\
    &=\frac{1}{D}f+\lambda \frac{1}{D^2}f+\lambda ^2\frac{1}{D^3}f+\lambda ^3\e ^{\lambda x}\int{\e ^{-\lambda x}\frac{1}{D^3}f\d x}\\
    &=\sum_{m=0}^{n-1}{\frac{\lambda ^m}{D^{m+1}}f}+\lambda ^n\e ^{\lambda x}\int{\e ^{-\lambda x}\frac{1}{D^n}f\d x}\\
    &=\sum_{m=0}^{\infty}{\frac{\lambda ^m}{D^{m+1}}f}\\
    &=\frac{1}{D-\lambda}f
\end{aligned}
$$

利用柯西重复积分公式 [^cauchy]，可知

$$
\frac{1}{D^n}f=\frac{1}{(n-1)!}\int_0^x{(x-t)^{n-1}f\d t}
$$

从而 $\ds\lambda ^n\e ^{\lambda x}\int{\e ^{-\lambda x}\frac{1}{D^n}f\d x}\to 0,n\to \infty$

从而对 $I$ 取极限可得

$$
I=\sum_{m=0}^{\infty}{\frac{\lambda ^m}{D^{m+1}}f}=\frac{1}{D-\lambda}f
$$

即

$$
\frac{1}{D}\e ^{-\lambda x}f=\e ^{-\lambda x}\frac{1}{D-\lambda}f
$$

由于 $\lambda$ 是任意的，可以在上式中使用 $-\lambda$ 代替，因此

$$
\frac{1}{D}\e ^{\lambda x}f=\e ^{\lambda x}\frac{1}{D+\lambda}f
$$

<!-- ---

求 $y^{(5)}+2y^{(3)}+y=16(\sin x+\e ^{-x}+x)$ 的通解.

$$
\begin{aligned}
    y&=\frac{16}{D^5+2D^3+D}\left( \sin x+\e ^{-x}+x \right)\\
    &=\left( \frac{16}{D}-\frac{8}{D-\i }-\frac{8}{D+\i }+\frac{4\i }{\left( D-\i  \right) ^2}-\frac{4\i }{\left( D+\i  \right) ^2} \right) \left( \sin x+\e ^{-x}+x \right)\\
    &=\left[ \left( 16\int{} \right) -\left( 8\e ^{\i x}\int{\e ^{-\i x}} \right) -\left( 8\e ^{-\i x}\int{\e ^{\i x}} \right) +\left( 4\text{ie}^{\i x}\iint{\e ^{-\i x}} \right) -\left( 4\text{ie}^{-\i x}\iint{\e ^{\i x}} \right) \right] \left( \sin x+\e ^{-x}+x \right) \d x\\
    &=\left( 8x^2-16\e ^{-x}-16\cos x+C_1 \right)\\
    &\quad-\left( 8x\sin x-8\e ^{-x}-4\cos x+C_2\e ^{\i x}+C_3\e ^{-\i x} \right)\\
    &\quad+\left( -\cos x-4\e ^{-x}-2x^2\cos x+c_2\e ^{\i x}+c_3\e ^{-\i x}+C_4x\e ^{\i x}+C_5x\e ^{-\i x} \right)\\
    &=8x^2-4\e ^{-x}-11\cos x-8x\sin x+2x^2\cos x\\
    &\quad+C_1'+\sin x\left( C_2'+C_3'x \right) +\cos x\left( C_4'+C_5'x \right)\\
\end{aligned}
$$ -->

[^cauchy]: [Cauchy formula for repeated integration](https://en.wikipedia.org/wiki/Cauchy_formula_for_repeated_integration)
