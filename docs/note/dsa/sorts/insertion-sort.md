---
date: 2022-08-12
category:
    - 数据结构
    - 排序
tag:
    - 直接插入排序
    - 希尔排序
    - 折半插入排序
order: 1
---

# 数据结构 - 插入排序

## 直接插入排序

```c
/**
 * 直接插入排序
 *
 * 最坏情况：完全逆序，复杂度  1+2+3+...+ n-1 = O(n^2)
 * 最好情况：顺序、有序，复杂度 O(n)
 * @param arr 数组
 * @param n 数组长度
 */
void insert_sort(int *arr, int n) {
    // 假设 [0, end] 有序，将把 end+1 的值插入，让 [0, end+1] 有序
    // 我们要做的就是让 end 不断变大，然后重复以上过程。
    // 注意 end+1 不能越界，范围是 [1, n)，于是 end 范围是 [0, n-1)
    for (int i = 0; i < n - 1; i++) {
        int end = i; // 可以直接把 i 换成 end
        int tmp = arr[end + 1]; // 把 end+1 存起来

        // 让 end+1 位置元素依次和它前面的数比较
        while (end >= 0) {
            // 碰到比它大的，就把元素往后挪
            if (arr[end] > tmp) {
                arr[end + 1] = arr[end];
                end--;
            } else {
                // 碰到比它小(<=)的，不用再挪了，直接插入
                // arr[end + 1] = tmp; // 若该语句放在此处，无法访问到 arr[0] 的位置
                break;
            }
        }
        // 在这里插入
        arr[end + 1] = tmp;
    }
}
```

## 希尔排序

```c
/**
 * 希尔排序，是在直接插入排序的基础上优化
 * 1.先进行预排序，让数组接近有序（越有序，直接插入排序所需要的操作就越少）
 *
 * 也叫 缩小增量排序 或 最小增量排序
 *
 * 复杂度：gap 处，O(log n)
 * gap 很大时，复杂度约为 O(n)
 * gap 很小时，数组已经接近有序，也差不多是 O(n)
 * 平均时间复杂度 O(n^1.3)
 * @param arr
 * @param n
 */
void shell_sort(int *arr, int n) {
    // 预排序：分组排序，间隔为 gap 为一组，分别进行直接插入排序，gap 由大变小
    // 目的：gap 越大，大数更快地排在后面，小数更快地排在前面
    // 但，gap 越大，预排完越不接近有序，gap 越小，越接近有序
    // 当 gap = 1 时就是直接插入排序

    int gap = n;
    while (gap > 1) {
        gap = gap / 2; // gap 的选取没有“官方”规定
        // gap = gap / 3 + 1;
        // gap > 1 都是预排序，gap == 1 才是直接插入排序

        // 代码与直接插入排序类似，只是把 1 换成了 gap
        for (int i = 0; i < n - gap; i++) {
            int end = i;
            int tmp = arr[end + gap];
            while (end >= 0) {
                if (arr[end] > tmp) {
                    arr[end + gap] = arr[end];
                    end -= gap;
                } else {
                    break;
                }
            }
            arr[end + gap] = tmp;
        }
    }
}
```

## 折半插入排序
