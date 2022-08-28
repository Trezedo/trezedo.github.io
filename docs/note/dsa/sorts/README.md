---
article: false
date: 2022-08-12
prev: ../tree/tree.md
---

# 数据结构序论 - 排序算法

## 排序的概念

### 排序的概念

排序：所谓排序，就是使一串记录，按照其中的某个或某些关键字的大小，递增或递减的排列起来的操作。

稳定性：假定在待排序的记录序列中，存在多个具有相同的关键字的记录，若经过排序，这些记录的相对次序保持不变，即在原序列中，r[i]=r[j]，且 r[i] 在 r[j] 之前，而在排序后的序列中，r[i] 仍在 r[j] 之前，则称这种排序算法是稳定的；否则称为不稳定的。

内部排序：数据元素全部放在内存中的排序。

外部排序：数据元素太多不能同时放在内存中，根据排序过程的要求不能在内外存之间移动数据的排序。

## 常见的排序算法

插入排序

- [直接插入排序](insertion-sort.md#直接插入排序)
- [折半插入排序](insertion-sort.md#折半插入排序)
- [希尔排序](insertion-sort.md#希尔排序)

选择排序

- [直接选择排序](selection-sort.md#直接选择排序)
- [堆排序](selection-sort.md#堆排序)

交换排序

- [冒泡排序](exchange-sort.md#冒泡排序)
- [快速排序](exchange-sort.md#快速排序)

归并排序

- [二路归并排序](merge-sort.md)

<iframe src="/markmap/排序算法分类.html"
    width="100%"
    height="400"
    frameborder="0"
    scrolling="No"
/>
