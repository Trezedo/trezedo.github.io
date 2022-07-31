---
icon: function
# sidebar: false
date: 2022-01-24
title: 两道特殊积分
description: 一类分子为反正切函数、对数函数，分母为二次函数的定积分计算
category:
    - 高等数学
tag:
    - 积分
star: true
---

## 分子为反正切函数

我们考虑这样一个积分：

$$
I_1=\int_0^p{\frac{\arctan x}{x^2+Bx+C}\d x}
$$

其中 $p>0$ ，若能够使用换元 $x\mapsto \frac{p-x}{1+px}$以及等式 $\eqref{1}$ 解决 ，

$$
\arctan x+\arctan \frac{p-x}{1+px}=\arctan p \tag{1}\label{1}
$$

则

$$
\frac{\d }{\d x}\frac{p-x}{1+px}=\frac{-(1+px)-(p-x)p}{(1+px)^2}=-\frac{p^2+1}{(1+px)^2},
$$

$$
I_1=\int_0^p{\frac{\arctan \frac{p-x}{1+px}}{\left( \frac{p-x}{1+px} \right) ^2+B\left( \frac{p-x}{1+px} \right) +C}\frac{p^2+1}{\left( 1+px \right) ^2}\text{d}x}
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

再考虑形如 $\ds\int{\frac{1}{(ax+b)^2\pm c^2}\d x}$ 的积分即可.

## 分子为对数函数

对于分子为对数函数的积分，考虑如下积分：

$$
I_2=\int_0^p{\frac{\ln (x+A)}{x^2+Bx+C}\d x}\label{I2}
$$

为了使用类似的方法，需要找到一个代换$f$，且满足：

$$
f(0)=p,f(p)=0,\label2\tag2
$$

$$
\ln \left( f(x)+A \right) =\ln \frac{c}{x+A}
$$

其中 $c$ 为正常数。等式两端分别取指数，于是

$$
f(x)=\frac{c}{x+A}-A=\frac{c-Ax-A^2}{x+A}
$$

再带入条件 $\eqref2$，可求得：

$$
c=A(A+p)
$$

于是，满足以上条件的代换$\ds f=\frac{A(p-x)}{x+A}$，且$\ds\d \left( \frac{p-x}{x+A} \right) =-\frac{A+p}{(x+A)^2}\d x$

从而

$$
I_2\xlongequal{x\mapsto f(x)}\int_0^p{\frac{\ln (A(p+A)) -\ln (x+A)}{\left( A\frac{p-x}{x+A} \right) ^2+B\left( A\frac{p-x}{x+A} \right) +C}\frac{A(A+p)}{(x+A)^2}\d x}
$$

下面探索系数 $B$，$C$ 之间的关系。

令

$$
x^2+Bx+C=\left[ \left( A\frac{p-x}{x+A} \right) ^2+B\left( A\frac{p-x}{x+A} \right) +C \right] \frac{\left( x+A \right) ^2}{A\left( A+p \right)}
$$

$$
RHS=(A^2-AB+C)x^2+\left( -2A^2p-AB(A-p)+2AC \right) x+(A^2p^2+A^2Bp+A^2C)
$$

对应系数相等，则

$$
\left\{ \begin{array}{l} A^2-AB+C=A(A+p)\\ -2A^2p+AB(A+p)+2AC=BA(A+p)\\ A^2(p^2+Bp+C)=CA(A+p)
\end{array} \right. \Rightarrow \left\{ \begin{array}{l} C=A(p+B)\\ C=A(B+p)\\ A(p+B)=C \end{array} \right.
$$

即三个方程均满足

$$
C=A(p+B)
$$

### 结论

对于形如 [$I_2$](#tagI2) 的积分，如果满足 $C=A(p+B)$ ，则只需按以下方法操作便可解决：

$$
\begin{aligned}
    \int_0^p{\frac{\ln (x+A)}{x^2+Bx+C}\d x}&\xlongequal{x\mapsto A\frac{p-x}{x+A}}\int_0^p{\frac{\ln \left( A(p+A)\right) -\ln (x+A)}{x^2+Bx+C}\d x}\\
    &=\frac{\ln \left( A(p+A)\right)}{2}\int_0^p{\frac{1}{x^2+Bx+C}\d x}
\end{aligned}
$$

### 例题

求积分$\ds\int_2^6{\frac{\ln x}{x^2+2x+12}\d x}$.

::: details 查看参考答案

$$
\begin{aligned}
    \int_2^6{\frac{\ln x}{x^2+2x+12}\d x}&\xlongequal{t=x-2}\int_0^4{\frac{\ln (t+2)}{t^2+6t+20}\d t}=\frac{\ln \left( 2\cdot (2+4)\right)}{2}\int_0^4{\frac{1}{t^2+6t+20}\d t}\\
    &=\frac{\ln 12}{2}\int_0^4{\frac{1}{(t+3)^2+11}\d t}=\frac{\ln 12}{2}\left[ \frac{1}{\sqrt{11}}\arctan \frac{t+3}{\sqrt{11}} \right] _{0}^{4}\\
    &=\frac{\ln 12}{2\sqrt{11}}\left[ \arctan \frac{7}{\sqrt{11}}-\arctan \frac{3}{\sqrt{11}} \right]\\
    &=\frac{\ln 12}{2\sqrt{11}}\arctan \frac{\frac{7-3}{\sqrt{11}}}{1+\frac{7}{\sqrt{11}}\cdot \frac{3}{\sqrt{11}}}\\
    &=\frac{\ln 12}{2\sqrt{11}}\arctan \frac{\sqrt{11}}{8}
\end{aligned}
$$

:::
