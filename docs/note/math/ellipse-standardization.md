---
date: 2022-09-16
icon: mdi:ellipse-outline
star: true
category:
    - 高等数学
tag:
    - 椭圆
    - 拉格朗日乘数法
excerpt: 本文主要讲述了如何从一般圆系方程出发，先求其焦点坐标，然后利用拉格朗日乘数法求出了半长轴长和半短轴长。
---

# 一般椭圆方程标准化及其推导

## 从标准椭圆说起

中学我们曾经学过，在直角坐标系中，中心位于原点的主轴平行于 $x$ 轴的椭圆由如下方程指定

$$
\frac{x^2}{a^2}+\frac{y^2}{b^2}=1,a>b>0
\tag{1}
$$

**长轴**是通过连接椭圆上的两个点所能获得的最长线段，**短轴**是通过连接椭圆上的两个点所能获得的最短线段。在方程中，所设的 $2a$ 称为长轴长，$2b$ 称为短轴长，而所设的定点（原点）称为焦点，那么 $c=\sqrt{a^2-b^2}$ 称为焦距。

### 椭圆的旋转与平移

若我们将标准椭圆绕原点顺时针旋转 $\theta$ 角，则新坐标与原坐标的关系如下：

$$
\begin{bmatrix}
    x'\\
    y'\\
\end{bmatrix} =\begin{bmatrix}
    \cos \theta&    -\sin \theta\\
    \sin \theta&    \cos \theta\\
\end{bmatrix} \begin{bmatrix}
    x\\
    y\\
\end{bmatrix}
$$

即

$$
\begin{bmatrix}
    x\\
    y\\
\end{bmatrix} =\begin{bmatrix}
    \cos \theta&    -\sin \theta\\
    \sin \theta&    \cos \theta\\
\end{bmatrix} ^{-1} \begin{bmatrix}
    x'\\
    y'\\
\end{bmatrix} =\begin{bmatrix}
    \cos \theta&    \sin \theta\\
    -\sin \theta&    \cos \theta\\
\end{bmatrix} \begin{bmatrix}
    x'\\
    y'\\
\end{bmatrix}
$$

亦即

$$
\begin{cases}
    x'=x\cos \theta -y\sin \theta\\
    y'=x\sin \theta +y\cos \theta\\
\end{cases}
\Leftrightarrow \begin{cases}
    x=x'\cos \theta +y'\sin \theta\\
    y=-x'\sin \theta +y'\cos \theta\\
\end{cases}
$$

带入 $\tagref{1}$ 式可得

$$
\frac{(x'\cos \theta +y'\sin \theta)^2}{a^2}+\frac{(y'\cos \theta -x'\sin \theta)^2}{b^2}=1
$$

整理得到

$$
\begin{aligned}
\left( \frac{\cos ^2\theta}{a^2}+\frac{\sin ^2\theta}{b^2} \right) x'^2 &+\sin 2\theta \left( \frac{1}{a^2}-\frac{1}{b^2} \right) x'y'\\
&+\left( \frac{\sin ^2\theta}{a^2}+\frac{\cos ^2\theta}{b^2} \right) y'^2=1
\end{aligned}
$$

记系数

$$
\begin{aligned}
    A&=\frac{\cos ^2\theta}{a^2}+\frac{\sin ^2\theta}{b^2}\\
    B&=\sin 2\theta \left( \frac{1}{a^2}-\frac{1}{b^2} \right)\\
    C&=\frac{\sin ^2\theta}{a^2}+\frac{\cos ^2\theta}{b^2}
\end{aligned}\tag{2}
$$

就得到其满足的一般形式为

$$
Ax'^2+Bx'y'+Cy'^2=1 \tag{3}
$$

现在我们再平移该椭圆，将

$$
\begin{cases}
    x''=x'+h\\
    y''=y'+k\\
\end{cases}
$$

带入 $\tagref{3}$ 式可得到焦点位于点 $(h,k)$ 的椭圆方程

$$
A\left( x''-h \right) ^2+B\left( x''-h \right) \left( y''-k \right) +C\left( y''-k \right) ^2=1
$$

化简得到

$$
A\left( x''^2-2hx''+h^2 \right) +B\left( x''y''-kx''-hy''+hk \right) +C\left( y''^2-2ky''+k^2 \right) =1
$$

现令

$$
\begin{aligned}
    D&=-2Ah-Bk\\
    E&=-Bh-2Ck\\
    F&=Ah^2+Bhk+Ck^2-1
\end{aligned}\tag{4}
$$

再将坐标 $\left( x,y \right)$ 代回，这就得到了一般圆系方程

$$
Ax^2+Bxy+Cy^2+Dx+Ey+F=0 \tag{5}
$$

### 对系数的进一步探讨

再来看 $\tagref{2}$ 式中的系数，显然有

$$
\begin{aligned}
    A+C &= \frac{\cos ^2\theta +\sin ^2\theta}{a^2}+\frac{\sin ^2\theta +\cos ^2\theta}{b^2}=\frac{1}{a^2}+\frac{1}{b^2}\\
    A-C &= \frac{\cos ^2\theta -\sin ^2\theta}{a^2}+\frac{\sin ^2\theta -\cos ^2\theta}{b^2}=\cos 2\theta \left( \frac{1}{a^2}-\frac{1}{b^2} \right)
\end{aligned}
$$

若 $A-C=0$ ，则 $\cos 2\theta =0\Rightarrow \theta =\pm \dfrac{\pi}{4}$；否则

$$
\frac{B}{A-C}=\frac{\sin 2\theta}{\cos 2\theta}=\tan 2\theta \tag{6}
$$

可见如果 $B=0$ 则椭圆没有发生旋转，否则可以通过 $\tagref{6}$ 式求得旋转角度 $\theta$。

如此又有

$$
\begin{aligned}
(A-C) ^2+B^2&=\left( \cos ^22\theta +\sin ^22\theta \right) \left( \frac{1}{a^2}-\frac{1}{b^2} \right) ^2\\
&=\left( \frac{1}{a^2}-\frac{1}{b^2} \right) ^2
\end{aligned}
$$

故

$$
\sqrt{\left( A-C \right) ^2+B^2}=\left| \frac{1}{a^2}-\frac{1}{b^2} \right|=\frac{1}{b^2}-\frac{1}{a^2}
$$

注意到

$$
\begin{aligned}
    AC&=\frac{\cos ^2\theta \sin ^2\theta}{a^4}+\frac{\sin ^2\theta \cos ^2\theta}{b^4}+\frac{\cos ^4\theta +\sin ^4\theta}{a^2b^2}\\
    &=\frac{\sin ^22\theta}{4}\left( \frac{1}{a^4}+\frac{1}{b^4} \right) +\frac{\left( \sin ^2\theta +\cos ^2\theta \right) ^2-2\cos ^2\theta \sin ^2\theta}{a^2b^2}\\
    &=\frac{\sin ^22\theta}{4}\left( \frac{1}{a^4}+\frac{1}{b^4} \right) +\frac{1}{a^2b^2}-\frac{2\sin ^22\theta}{4a^2b^2}\\
    &=\frac{1}{a^2b^2}+\frac{\sin ^22\theta}{4}\left( \frac{1}{a^4}+\frac{1}{b^4}-\frac{2}{a^2b^2} \right) \\
    &=\frac{1}{a^2b^2}+\frac{1}{4}\left[ \sin 2\theta \left( \frac{1}{a^2}-\frac{1}{b^2} \right) \right] ^2\\
    &=\frac{1}{a^2b^2}+\frac{B^2}{4}
\end{aligned}
$$

即

$$
4AC-B^2=\frac{4}{a^2b^2}>0
$$

因此，如果一般圆系方程 $\tagref{5}$ 式不满足上式，那么它不是一个椭圆。

由 $\tagref{4}$ 式可得

$$
\begin{cases}
    2Ah+Bk=-D \\
    Bh+2Ck=-E \\
\end{cases}
$$

若把 $h,k$ 视为未知数，则可解得

$$
\begin{aligned}
    h=\frac{\begin{vmatrix}
    -D&    B\\
    -E&    2C\\
    \end{vmatrix}}{\begin{vmatrix}
    2A&    B\\
    B&    2C\\
    \end{vmatrix}}=\frac{BE-2CD}{4AC-B^2}\\
    k=\frac{\begin{vmatrix}
    2A&    -D\\
    B&    -E\\
    \end{vmatrix}}{\begin{vmatrix}
    2A&    B\\
    B&    2C\\
    \end{vmatrix}}=\frac{BD-2AE}{4AC-B^2}
\end{aligned}\tag{7}
$$

实际上还可得到如下关系：

$$
\begin{aligned}
    Dh+Ek&=-\left( 2Ah^2+Bkh \right) -\left( Bhk+2Ck^2 \right)\\
    &=-2\left( Ah^2+Bkh+Ck^2 \right)\\
\end{aligned}\tag{8}
$$

这里 $(h,k)$ 是焦点坐标，$D$ 和 $E$ 分别是 $\tagref5$ 式中 $x$ 和 $y$ 项的系数。

## 椭圆标准化

上面我们通过标准椭圆方程得到了一般椭圆方程。那么反过来同样可行，可通过旋转和平移得到将一般椭圆方程标准化。

通过 $\tagref{7}$ 式我们知道，方程

$$
Ax^2+Bxy+Cy^2+Dx+Ey+F=0
$$

可通过作代换

$$
\begin{cases}
    u=x-h \\
    v=y-k \\
\end{cases}
$$

就能消去一般方程中 $u$ 和 $v$ 项的系数。当然，如果不知道这个结论，也可以通过带入方程然后令系数为零求出 $h$ 和 $k$，此处从略。

通过上述平移坐标变换我们已经将椭圆焦点平移到了原点，此时的椭圆方程为

$$
\begin{gather*}
    A\left( u+h \right) ^2+B\left( u+h \right) \left( v+k \right) +C\left( v+k \right) ^2+D\left( u+h \right) +E\left( v+k \right) +F=0\\
    Au^2+Ah^2+Buv+Bhk+Cv^2+Ck^2+Dh+Ek+F=0\\
    Au^2+Buv+Cv^2+\left( Ah^2+Bhk+Ck^2+Dh+Ek+F \right) =0
\end{gather*}
$$

带入 $\tagref{8}$ 式得到

$$
Au^2+Buv+Cv^2=Ah^2+Bhk+Ck^2-F\xlongequal{\triangle} G
$$

### 求半长轴长和半短轴长

接下来，我们不打算用 $\tagref{6}$ 式去求旋转角度。

由长轴和短轴的定义，这两个几何量的求解可转化为椭圆上的点 $(u,v)$ 到原点距离 $d=\sqrt{u^2+v^2}$ 的最大值和最小值，即 $d^2$ 在条件 $Au^2+Buv+Cv^2=G$ 下的极值。

求条件极值，用拉格朗日乘数法，令函数

$$
L(x,y,\lambda)=x^2+y^2+\lambda (Ax^2+Bxy+Cy^2-G)
$$

再令

$$
    \begin{cases}
    L_x'=2x+\lambda (2Ax+By) =0&    \circled{1}\\
    L_y'=2y+\lambda (Bx+2C) =0&    \circled{2}\\
    L_{\lambda}'=Ax^2+Bxy+Cy^2-G=0&    \circled{3}\\
\end{cases}\tag{9}
$$

于是

$$
\begin{aligned}
    \frac{x}{2}\circled{1}+\frac{y}{2}\circled{2}&=x^2+y^2+\lambda (Ax^2+Bxy+Cy^2)\\
    &=x^2+y^2+\lambda G = 0
\end{aligned}
$$

即要求 $x,y$ 使得 $x^2+y^2=-\lambda G$，故而 $\tagref{9}$ 式有非零解，即

$$
\begin{cases}
    2(1+A\lambda)x+\lambda By =0\\
    \lambda Bx+2(1+2C\lambda) =0\\
\end{cases}
$$

有非零解，因此系数行列式

$$
\begin{aligned}
    \det &=\begin{vmatrix}
    2(1+A\lambda)&    \lambda B\\
    \lambda B&    2(1+2C\lambda)\\
\end{vmatrix}\\
    &=4(1+A\lambda) (1+2C\lambda) -\lambda ^2B^2\\
    &=(4AC-B^2) \lambda ^2+4(A+C) \lambda +4\\
    &=0
\end{aligned}
$$

这是关于 $\lambda$ 的一元二次方程，判别式

$$
\begin{aligned}
    \Delta &=\left[ 4\left( A+C \right) \right] ^2-4\left( 4AC-B^2 \right) \cdot 4\\
    &=16\left( A^2+C^2+2AC-4AC+B^2 \right) \\
    &=16\left[ \left( A-C \right) ^2+B^2 \right] >0
\end{aligned}
$$

因此有两个不同的解

$$
\begin{aligned}
    \lambda _{1,2}&=\frac{-4\left( A+C \right) \pm \sqrt{\Delta}}{2\left( 4AC-B^2 \right)}=-2\frac{\sqrt{\left( A+C \right) ^2}\mp \sqrt{\left( A-C \right) ^2+B^2}}{4AC-B^2}\\
    &=\frac{-2}{\left( A+C \right) \pm \sqrt{\left( A-C \right) ^2+B^2}}
\end{aligned}
$$

于是

$$
d^2=-\lambda G =\frac{2\left( Ah^2+Bhk+Ck^2-F \right)}{\left( A+C \right) \pm \sqrt{\left( A-C \right) ^2+B^2}}
$$

因此长轴和短轴的平方分别对应上式取 $-$ 号和 $+$ 号，即

$$
\begin{aligned}
    a^2&=\frac{2\left( Ah^2+Bhk+Ck^2-F \right)}{\left( A+C \right) -\sqrt{\left( A-C \right) ^2+B^2}}\\
    b^2&=\frac{2\left( Ah^2+Bhk+Ck^2-F \right)}{\left( A+C \right) +\sqrt{\left( A-C \right) ^2+B^2}}
\end{aligned}
$$

这就完成了求解。

::: tip

注意，此处的 $a,b$ 和 [对系数的进一步探讨](#对系数的进一步探讨) 中的不一致。因为如果一致，则

$$
\begin{aligned}
a^2&=\frac{2\left( Ah^2+Bhk+Ck^2-F \right)}{\left( \frac{1}{a^2}+\frac{1}{b^2} \right) -\left( \frac{1}{b^2}-\frac{1}{a^2} \right)}\\
\Rightarrow 1&=Ah^2+Bhk+Ck^2-F
\end{aligned}
$$

从而

$$
\begin{aligned}
    a^2&=\frac{2}{\left( A+C \right) -\sqrt{\left( A-C \right) ^2+B^2}}\\
    b^2&=\frac{2}{\left( A+C \right) +\sqrt{\left( A-C \right) ^2+B^2}}
\end{aligned}
$$

即长轴长和短轴长只与系数 $A,B,C$ 有关，这显然是不正确的。

:::

## 总结

本文主要讲述了如何从一般圆系方程出发，求解焦点坐标及其轴长。结论如下：

若方程

$$
Ax^2+Bxy+Cy^2+Dx+Ey+F=0
$$

可化为椭圆，则该椭圆焦点坐标为 $(h,k)$，其中

$$
h=\frac{BE-2CD}{4AC-B^2},\quad k=\frac{BD-2AE}{4AC-B^2}
$$

且满足

$$
\begin{aligned}
    a^2&=\frac{2\left( Ah^2+Bhk+Ck^2-F \right)}{\left( A+C \right) -\sqrt{\left( A-C \right) ^2+B^2}}\\
    b^2&=\frac{2\left( Ah^2+Bhk+Ck^2-F \right)}{\left( A+C \right) +\sqrt{\left( A-C \right) ^2+B^2}}
\end{aligned}
$$

还可通过

$$
\tan 2\theta=\frac{B}{A-C}
$$

求得旋转角度。

利用线性代数中的二次型的知识将椭圆方程标准化更简单，可以看视频：

<iframe src="https://player.bilibili.com/player.html?bvid=BV1S8411W7Yq"
    width="100%"
    height="500"
    allow="fullscreen"
    style="border: none"
    sandbox="allow-same-origin allow-scripts allow-popups">
</iframe>

## 参考

1. [椭圆 - wikipedia](https://zh.wikipedia.org/wiki/%E6%A4%AD%E5%9C%86)
2. [旋转 - wikipedia](https://zh.wikipedia.org/wiki/%E6%97%8B%E8%BD%AC)
