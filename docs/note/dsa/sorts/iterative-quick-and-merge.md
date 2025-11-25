---
date: 2022-08-13
icon: bytesize:lightning
category:
    - 数据结构
    - 排序
tag:
    - 快速排序
    - 归并排序
order: 5
---

# 数据结构 - 快排和归并(非递归)

## 快速排序

non-recursive，iterative

## 归并排序

```c
/**
 * 归并排序，非递归版本
 *
 * 两两归并、四四归并、八八归并...
 *
 * 注意元素个数不是 2^n 的情况，右区间可能不存在，例如 9 个元素时第一次归并，10个元素时第二次归并
 * @param arr
 * @param n
 */
void merge_sort_non_r(int *arr, int n) {
    int tmp[n]; // 辅助数组
    int gap = 1; // 每组归并数据的个数
    while (gap < n) {
        for (int i = 0; i < n; i += 2 * gap) {
            // 分成需要归并的两组：[i, i+gap-1] [i+gap, i+2*gap-1]
            // 下面的代码是复制前面的。
            int begin1 = i, end1 = i + gap - 1;
            int begin2 = i + gap, end2 = i + 2 * gap - 1;

            // 修正，归并过程中右半区间不存在（begin2 越界）
            if (begin2 >= n) {
                break;
            }
            // 归并过程中，右半区间算多了（end2 越界）
            if (end2 >= n) {
                end2 = n - 1;
            }

            int index = i;
            while (begin1 <= end1 && begin2 <= end2) {
                if (arr[begin1] < arr[begin2]) {
                    tmp[index++] = arr[begin1++];
                } else {
                    tmp[index++] = arr[begin2++];
                }
            }
            // 此时一定有 1 个数组已经走“到尾”，把剩下的元素放进 tmp
            while (begin1 <= end1) {
                tmp[index++] = arr[begin1++];
            }
            while (begin2 <= end2) {
                tmp[index++] = arr[begin2++];
            }

            // 把归并部分的数据拷贝回 arr，个数不足以归并的就不管
            // for (int j = 0; j < n; j++) {
            for (int j = 0; j <= end2; j++) {
                arr[j] = tmp[j];
            }
        }

        gap *= 2;
    }
}
```
