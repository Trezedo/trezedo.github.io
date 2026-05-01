---
icon: tabler:math-integrals
date: 2022-01-24
modified: 2026-03-23
category:
    - 高等数学
    - 积分
tag:
    - 积分
star: true
---

# 两道特殊积分

本文将讨论如下两种形式的积分，找到其易积时各待定系数满足的关系：

$$
\begin{aligned}
    I_1&=\int_0^p{\frac{\arctan x}{x^2+Bx+C}\d x}
    \\[1.2em]
    I_2&=\int_0^p{\frac{\ln (x+A)}{x^2+Bx+C}\d x}
\end{aligned}
$$

<!-- more -->

## 分子为反正切函数

我们先考虑 $I_1$：

$$
I_1=\int_0^p{\frac{\arctan x}{x^2+Bx+C}\d x}
$$

其中 $p>0$ ，若能够使用换元 $x\mapsto \frac{p-x}{1+px}$ 以及等式 $\eqref{1}$ 解决，

$$
\arctan x+\arctan \frac{p-x}{1+px}=\arctan p \tag{1}%\label{1}
$$

则

$$
\frac{\d }{\d x}\frac{p-x}{1+px}=\frac{-(1+px)-(p-x)p}{(1+px)^2}=-\frac{p^2+1}{(1+px)^2},
$$

$$
I_1=\int_0^p{\frac{\arctan \frac{p-x}{1+px}}{\left( \frac{p-x}{1+px} \right) ^2+B\left( \frac{p-x}{1+px} \right) +C}\frac{p^2+1}{(1+px) ^2}\d x}
$$

为了使用等式 $\eqref{1}$，还需使分母的方程一致，即

$$
\left[ \left( \frac{p-x}{1+px} \right) ^2+B\left( \frac{p-x}{1+px} \right) +C \right] \frac{(1+px)^2}{p^2+1}=x^2+Bx+C
$$

展开可得

$$
\frac{p^2C-pB+1}{p^2+1}x^2+\frac{p^2B+2pC-2p-B}{p^2+1}x+\frac{p^2+pB+C}{p^2+1}=x^2+Bx+C
$$

使对应系数相等，三个方程均解得

$$
B=p(C-1)
$$

从而我们得到：

$$
\color{black}\colorbox{#bef}{\(\ds\int_0^p{\frac{\arctan x}{x^2+p(C+1)x+C}\d x}\)}
$$

其中 $p>0,C\in \mathbb{R}$. 求解时，只需

$$
I\xlongequal{x\mapsto \frac{p-x}{1+px}}\int_0^p{\frac{\arctan \frac{p-x}{1+px}}{x^2+Bx+C}\d x}=\frac{\arctan p}{2}\int_0^p{\frac{1}{x^2+Bx+C}\d x}
$$

再考虑形如 $\ds\int{\frac{1}{(ax+b)^2\pm c^2}\d x}$ 的积分即可，可参考 [几种基本形式的积分](./integrals-of-basic-forms.md)。

## 分子为对数函数

对于 $I_2$：

$$
I_2=\int_0^p{\frac{\ln (x+A)}{x^2+Bx+C}\d x} \label{I2}
$$

为了使用类似的方法，需要找到一个代换 $f$，且满足：

$$
\begin{gather*}
    f(0)=p,f(p)=0,\\
    \ln (f(x)+A) =\ln \frac{c}{x+A}
\end{gather*}\tag{2}
$$

其中 $c$ 为正常数。等式两端分别取指数，于是

$$
f(x)=\frac{c}{x+A}-A=\frac{c-Ax-A^2}{x+A}
$$

再带入条件 $\eqref2$，可求得：

$$
c=A(A+p)
$$

于是，我们找到了满足以上条件的代换

$$
\ds f=\frac{A(p-x)}{x+A}
$$

且

$$
\ds\d \left( \frac{p-x}{x+A} \right) =-\frac{A+p}{(x+A)^2}\d x
$$

从而

$$
I_2\xlongequal{x\mapsto f(x)}\int_0^p{\frac{\ln (A(p+A)) -\ln (x+A)}{\left( A\frac{p-x}{x+A} \right) ^2+B\left( A\frac{p-x}{x+A} \right) +C}\frac{A(A+p)}{(x+A)^2}\d x}
$$

下面探索系数 $B$，$C$ 之间的关系。令

$$
x^2+Bx+C=\left[ \left( A\frac{p-x}{x+A} \right) ^2+B\left( A\frac{p-x}{x+A} \right) +C \right] \frac{\left( x+A \right) ^2}{A(A+p)}
$$

$$
\begin{aligned}
    RHS=(A^2-AB+C)x^2 &+ (-2A^2p-AB(A-p)+2AC) x\\
    & +(A^2p^2+A^2Bp+A^2C)
\end{aligned}
$$

对应系数相等，则

$$
\begin{cases}
A^2-AB+C=A(A+p)\\ -2A^2p+AB(A+p)+2AC=BA(A+p)\\ A^2(p^2+Bp+C)=CA(A+p)
\end{cases} \Rightarrow
\begin{cases}
C=A(p+B)\\ C=A(B+p)\\ A(p+B)=C \end{cases}
$$

即三个方程均满足

$$
C=A(p+B)
$$

则满足上式的积分 $\href{#tag-I2}{I_2}$：

$$
\begin{aligned}
    I_2&=\int_0^p{\frac{\ln (x+A)}{x^2+Bx+A(p+B)}\d x}\\
    &\xlongequal{x\mapsto A\frac{p-x}{x+A}}\frac{\ln (A(p+A))}{2}\int_0^p{\frac{1}{x^2+Bx+A(p+B)}\d x}
    \\&=\frac{1}{2}\int_0^p{\frac{\ln (A(p+A))}{x^2+Bx+A(p+B)}\d x}
\end{aligned}
$$

### 例题

求积分 $\ds\int_2^6{\frac{\ln x}{x^2+2x+12}\d x}$.

::: details 查看参考答案

$$
\begin{aligned}
    I&\xlongequal{t=x-2}\int_0^4{\frac{\ln (t+2)}{t^2+6t+20}\d t}=\frac{\ln ( 2\cdot (2+4))}{2}\int_0^4{\frac{1}{t^2+6t+20}\d t}\\
    &=\frac{\ln 12}{2}\int_0^4{\frac{1}{(t+3)^2+11}\d t}=\frac{\ln 12}{2}\left[ \frac{1}{\sqrt{11}}\arctan \frac{t+3}{\sqrt{11}} \right] _{0}^{4}\\
    &=\frac{\ln 12}{2\sqrt{11}}\left[ \arctan \frac{7}{\sqrt{11}}-\arctan \frac{3}{\sqrt{11}} \right]\\
    &=\frac{\ln 12}{2\sqrt{11}}\arctan \frac{\frac{7-3}{\sqrt{11}}}{1+\frac{7}{\sqrt{11}}\cdot \frac{3}{\sqrt{11}}}\\
    &=\frac{\ln 12}{2\sqrt{11}}\arctan \frac{\sqrt{11}}{8}
\end{aligned}
$$

:::

## 总结

有以下结论：

$$
\int_0^p{\frac{\arctan x}{x^2+p(B+1)x+B}\d x}=\frac{1}{2}\int_0^p{\frac{\arctan p}{x^2+p(B+1)x+B}\d x}
$$

$$
\int_0^p{\frac{\ln (x+A)}{x^2+Bx+A(p+B)}\d x}=\frac{1}{2}\int_0^p{\frac{\ln (A(p+A))}{x^2+Bx+A(p+B)}\d x}
$$

其中 $p>0,A,B\in \mathbb{R},A>0$。
