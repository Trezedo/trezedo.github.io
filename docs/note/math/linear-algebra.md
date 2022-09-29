---
date: 2022-09-24
category:
    - 线性代数
tag:
    - 线性代数
---

# 线性代数二级结论

## 特征值相关

若 $A$ 是三阶矩阵， $A^{\ast}$ 是伴随矩阵， ${\rm tr}\left( A \right)$ 是 $A$ 的迹，证明：

$$
\left| \lambda E-A \right|=\lambda ^3-{\rm tr}\left( A \right) \lambda ^2+{\rm tr}\left( A^{\ast} \right) \lambda -\left| A \right|
$$

不妨设 $A=\left[ \begin{matrix}
    a_{11}&        a_{12}&        a_{13}\\
    a_{21}&        a_{22}&        a_{23}\\
    a_{31}&        a_{32}&        a_{33}\\
\end{matrix} \right]$ ，则

$$
\begin{aligned}
    D&=\left| A-\lambda E \right|=\left| \begin{matrix}
    a_{11}-\lambda&        a_{12}&        a_{13}\\
    a_{21}&        a_{22}-\lambda&        a_{23}\\
    a_{31}&        a_{32}&        a_{33}-\lambda\\
\end{matrix} \right|\\
    &=\left| \begin{matrix}
    a_{11}&        a_{12}&        a_{13}\\
    a_{21}&        a_{22}-\lambda&        a_{23}\\
    a_{31}&        a_{32}&        a_{33}-\lambda\\
\end{matrix} \right|-\left| \begin{matrix}
    \lambda&        0&        0\\
    a_{21}&        a_{22}-\lambda&        a_{23}\\
    a_{31}&        a_{32}&        a_{33}-\lambda\\
\end{matrix} \right|\\
    &=\left| \begin{matrix}
    a_{11}&        a_{12}&        a_{13}\\
    a_{21}&        a_{22}&        a_{23}\\
    a_{31}&        a_{32}&        a_{33}-\lambda\\
\end{matrix} \right|-\left| \begin{matrix}
    a_{11}&        a_{12}&        a_{13}\\
    0&        \lambda&        0\\
    a_{31}&        a_{32}&        a_{33}-\lambda\\
\end{matrix} \right|-\lambda \left| \begin{matrix}
    a_{22}-\lambda&        a_{23}\\
    a_{32}&        a_{33}-\lambda\\
\end{matrix} \right|\\
    &=\left| A \right|-\left| \begin{matrix}
    a_{11}&        a_{12}&        a_{13}\\
    a_{21}&        a_{22}&        a_{23}\\
    0&        0&        \lambda\\
\end{matrix} \right|-\lambda \left| \begin{matrix}
    a_{11}&        a_{13}\\
    a_{31}&        a_{33}-\lambda\\
\end{matrix} \right|-\lambda \left[ \left| \begin{matrix}
    a_{22}&        a_{23}\\
    a_{32}&        a_{33}-\lambda\\
\end{matrix} \right|-\left| \begin{matrix}
    \lambda&        0\\
    a_{32}&        a_{33}-\lambda\\
\end{matrix} \right| \right]\\
    &=\left| A \right|-\lambda M_{33}-\lambda \left[ M_{22}-\left| \begin{matrix}
    a_{11}&        a_{13}\\
    0&        \lambda\\
\end{matrix} \right| \right] -\lambda \left[ M_{11}-\left| \begin{matrix}
    a_{22}&        a_{23}\\
    0&        \lambda\\
\end{matrix} \right|-\lambda \left( a_{33}-\lambda \right) \right]\\
    &=\left| A \right|-\lambda M_{33}-M_{22}\lambda +a_{11}\lambda ^2-\lambda M_{11}+\lambda \left[ a_{22}\lambda +a_{33}\lambda -\lambda ^2 \right]\\
    &=\left| A \right|-\left( M_{11}+M_{22}+M_{33} \right) \lambda +\left( a_{11}+a_{22}+a_{33} \right) \lambda ^2-\lambda ^3\\
    &=\left| A \right|-\left( A_{11}+A_{22}+A_{33} \right) \lambda +{\rm tr}\left( A \right) \lambda ^2-\lambda ^3\\
    &=-\lambda ^3+{\rm tr}\left( A \right) \lambda ^2-{\rm tr}\left( A^{\ast} \right) \lambda +\left| A \right|
\end{aligned}
$$

故

$$
\left| \lambda E-A \right|=\left( -1 \right) ^3\left| A-\lambda E \right|=\lambda ^3-{\rm tr}\left( A \right) \lambda ^2+{\rm tr}\left( A^{\ast} \right) \lambda -\left| A \right|
$$
