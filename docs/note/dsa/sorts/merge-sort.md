---
date: 2022-08-13
category:
    - 数据结构
    - 排序
tag:
    - 归并排序
order: 4
---

# 数据结构 - 归并排序

## 二路归并排序

```c
// #include <stdlib.h>

/**
 * 归并排序递归子函数(避免多次 malloc)
 * @param arr 待排序数组
 * @param left 子区间开始位置
 * @param right 子区间结束位置
 * @param tmp 临时辅助数组
 */
void $merge_sort(int *arr, int left, int right, int *tmp) {
    // 1个数，或不满足条件的区间，不做任何操作
    if (left >= right) return;

    int mid = (left + right) >> 1;
    // 假设 [left, mid], [mid+1, right] 有序，就可以归并
    $merge_sort(arr, left, mid, tmp);
    $merge_sort(arr, mid + 1, right, tmp);

    int begin1 = left, end1 = mid;
    int begin2 = mid + 1, end2 = right;

    int index = left;
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

    // 把 tmp 拷贝到 arr
    for (int i = left; i <= right; i++) {
        arr[i] = tmp[i];
    }
}

/**
 * 归并排序
 * @param arr 待排序数组
 * @param n 数组大小
 */
void merge_sort(int *arr, int n) {
    int *tmp = (int *) malloc(sizeof(int) * n);

    $merge_sort(arr, 0, n - 1, tmp);

    free(tmp);
}
```
