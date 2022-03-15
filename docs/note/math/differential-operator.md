---
icon: function
date: 2022-02-09
category:
  - 数学
tag:
  - 微分方程
  - 算子
description: （加锁是因为没整理好hhh）介绍算子法在求解二阶线性微分方程中的应用及其部分性质的证明
---

# 微分方程算子法

待完成

<https://blog.csdn.net/SHRtuji/article/details/110094849>

<https://zh.wikipedia.org/wiki/%E5%B7%AE%E5%88%86>

<https://en.wikipedia.org/wiki/Fractional_calculus>

<https://en.wikipedia.org/wiki/Cauchy_formula_for_repeated_integration>

<https://en.wikipedia.org/wiki/Antiderivative>

<https://chaoli.club/index.php/5137/0>

<https://en.wikipedia.org/wiki/Shift_theorem>

<https://www.youtube.com/watch?v=GN_zOiODG40>

<https://zhuanlan.zhihu.com/p/132651937>

<https://wenku.baidu.com/share/a96428c0b9f67c1cfad6195f312b3169a451eae6?share_api=1&width=960>

---

```tex
\[
\lim_{n\rightarrow \infty}\left\{ \left( 2+\sqrt{3} \right) ^n \right\} % 转换有问题
\]
\[
\text{注意到}2+\sqrt{3}\text{是}x^2-4x+1=0\text{的根，对应的差分方程为}a_{n+2}=4a_{n+1}-a_n,
\]
\[
\text{其通解为}a_n=C_1\left( 2+\sqrt{3} \right) ^n+C_2\left( 2-\sqrt{3} \right) ^n\text{，}
\]
\[
\text{取}C_1=C_2=1\text{，则}\left\{ \begin{array}{l}
	a_0=2,\\
	a_1=4,\\
	a_n=\left( 2+\sqrt{3} \right) ^n+\left( 2-\sqrt{3} \right) ^n\\
\end{array} \right. 
\]
\[
a_n\text{是整数序列，因此}
\]
\[
\lim_{n\rightarrow \infty}\left\{ \left( 2+\sqrt{3} \right) ^n \right\} =\lim_{n\rightarrow \infty}\left\{ a_n-\left( 2-\sqrt{3} \right) ^n \right\} =\lim_{n\rightarrow \infty}\left\{ 1-\left( 2-\sqrt{3} \right) ^n \right\} =1
\]
\[
\left\{ n+x \right\} =\left\{ x \right\} ,\ x>0
\]
\[
\left( 2+\sqrt{3} \right) ^n+\left( 2-\sqrt{3} \right) ^n=\lfloor \left( 2+\sqrt{3} \right) ^n \rfloor +1
\]
\[
\text{令}a_n\text{为不含}\sqrt{3}\text{的正整数，其余部分为}b_n
\]
\[
\text{则}\left( 2+\sqrt{3} \right) ^n=a_n+b_n,\left( 2-\sqrt{3} \right) ^n=a_n-b_n
\]
\[
\therefore \left\{ \left( 2+\sqrt{3} \right) ^n \right\} =\left\{ a_n+b_n \right\} =a_n+b_n-\lfloor a_n+b_n \rfloor =b_n-\lfloor b_n \rfloor 
\]
\[
=\left( 2+\sqrt{3} \right) ^n-a_n-\lfloor \left( 2+\sqrt{3} \right) ^n-a_n \rfloor =
\]

%https://math.stackexchange.com/questions/1536761/limit-with-fractional-part-lim-limits-n-to-infty-2-sqrt3n
%https://math.stackexchange.com/questions/1138796/how-can-one-proves-that-lim-limits-n-rightarrow-infty-int-limits-0-i?rq=1
%https://baike.baidu.com/item/小数部分函数
```

***

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



利用重复积分的柯西公式，可知

$$
\frac{1}{D^n}f=\frac{1}{(n-1)!}\int_0^x{(x-t)^{n-1}f\d t}
$$
从而$\lambda ^n\e ^{\lambda x}\int{\e ^{-\lambda x}\frac{1}{D^n}f\d x}\to 0,n\to \infty$

从而对$I$取极限可得
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

***



求 $y^{(5)}+2y^{(3)}+y=16(\sin x+\text{e}^{-x}+x)$ 的通解.
$$
\begin{aligned}
	y&=\frac{16}{D^5+2D^3+D}\left( \sin x+\text{e}^{-x}+x \right)\\
	&=\left( \frac{16}{D}-\frac{8}{D-\text{i}}-\frac{8}{D+\text{i}}+\frac{4\text{i}}{\left( D-\text{i} \right) ^2}-\frac{4\text{i}}{\left( D+\text{i} \right) ^2} \right) \left( \sin x+\text{e}^{-x}+x \right)\\
	&=\left[ \left( 16\int{} \right) -\left( 8\text{e}^{\text{i}x}\int{\text{e}^{-\text{i}x}} \right) -\left( 8\text{e}^{-\text{i}x}\int{\text{e}^{\text{i}x}} \right) +\left( 4\text{ie}^{\text{i}x}\iint{\text{e}^{-\text{i}x}} \right) -\left( 4\text{ie}^{-\text{i}x}\iint{\text{e}^{\text{i}x}} \right) \right] \left( \sin x+\text{e}^{-x}+x \right) \text{d}x\\
	&=\left( 8x^2-16\text{e}^{-x}-16\cos x+C_1 \right)\\
	&\quad-\left( 8x\sin x-8\text{e}^{-x}-4\cos x+C_2\text{e}^{\text{i}x}+C_3\text{e}^{-\text{i}x} \right)\\
	&\quad+\left( -\cos x-4\text{e}^{-x}-2x^2\cos x+c_2\text{e}^{\text{i}x}+c_3\text{e}^{-\text{i}x}+C_4x\text{e}^{\text{i}x}+C_5x\text{e}^{-\text{i}x} \right)\\
	&=8x^2-4\text{e}^{-x}-11\cos x-8x\sin x+2x^2\cos x\\
	&\quad+C_1'+\sin x\left( C_2'+C_3'x \right) +\cos x\left( C_4'+C_5'x \right)\\
\end{aligned}
$$


浙江大学2021数学分析

```tex
$1.(1)\lim_{x\to 0}\frac{(1+\sin ^2x)^{2022}-(\cos x)^{2022}}{\ln (1+x^2)}$.

(2)求积分$\int_{y\ge x^2+1}{\frac{\d x\d y}{y^2+x^4}}$.

(3)求$f(x)=\e ^{-f^2}$的Maclaurin公式，并求出$f^{(2022)}(0),f^{(2021)}(0)$.

(4)曲面积分$\int_S{\frac{x\d y\d z+y\d z\d x+z\d x\d y}{(x^2+y^2+z^2)^{3/2}}}$

$S$是区域$V=\left\{ (x,y,z)\mid \left| x \right|\le z,\left| y \right|\le 2,\left| z \right|\le 2 \right\} $的外侧.

$2.x_0>0$，$x_n=\arctan x_{n-1},n\ge 1$

(1)证：$\lim_{n\to \infty}x_n=0($求$\left\{ x_n \right\} $的极限)

(2)证：数列$\left\{ \sqrt{n}x_n \right\} $收敛并求极限值

$3.f(x)=x^{\alpha}\ln x$，在实数域$\mathbb{R}$上，证明：一致连续$\Leftrightarrow \alpha >1$

$4.a_n>0,\frac{a_n}{a_{n+1}}=1+\frac{\alpha}{n}+\mathcal{O}\left( \frac{1}{n^2} \right) $，$\mathcal{O}\left( \frac{1}{n^2} \right) $表示存在$M>0$，对所有的$n$成立$\left| \mathcal{O}\left( \frac{1}{n^2} \right) \right|<\frac{M}{n^2}$.

证明：级数$\sum_{n=1}^{\infty}{a_n}$收敛$\Leftrightarrow \alpha >1$

$5.f(x),g(x)$在$\left[ 0,+\infty \right) $上连续，且$\lim_{x\to \infty}\frac{f(x)}{g(x)}=1$，广义积分$\int_0^{+\infty}{g(x)\d x}$收敛.

(1)证明：广义积分$\int_0^{+\infty}{f(x)\d x}$也收敛.

(2)如果没有连续性条件，举例说明$\int_0^{+\infty}{f(x)\d x}$发散.

6.(1)叙述在实数域$\mathbb{R}$上的有限覆盖定理和致密性定理$;$

(2)用有限覆盖定理证明致密性定理.

7.证：函数$G(p)=\int_0^{\pi}{\frac{\sin x}{x^p(\pi -x)^{2-p}}\d x}$在(0,2)内连续.

$8.f(x)$单调连续，在实数域上，$f(x+1)=f(x)+1$，$f^n(x)$表示$f(x)$的$n$次复合，

$\varphi =f^n(x)-x$

(1)证明：$\forall n\ge 1,\varphi _n(x)$为周期函数$;$

(2)证明：$\forall x\in \mathbb{R},\lim_{n\to \infty}\frac{\varphi _n(x)}{n}$的极限值与$x$的取值无关.
```

