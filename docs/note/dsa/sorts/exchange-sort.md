---
date: 2022-08-12
category:
    - 数据结构
    - 排序
tag:
    - 冒泡排序
    - 快速排序
order: 3
---

# 数据结构 - 交换排序

## 冒泡排序

## 快速排序

以升序为例：

左边比它小，右边比它大

### 代码实现

挖坑法

begin 和 end 至少有一个是坑，因此它俩相遇时的位置就是坑

```c
/**
 * 快速排序
 *
 * 分治
 * @param arr
 * @param left 开始
 * @param right 结束
 * @param n
 */
void quick_sort_1(int *arr, int left, int right) {
    if (left >= right) return;

    int begin = left, end = right;
    int pivot = begin; // 一般选最左边或最右边
    int key = arr[begin];
    while (begin != end) { // begin < end
        // 坑在左边，end 从右边过来找比 key 小的数
        while (begin < end && arr[end] >= key) {
            end--;
        }
        // 这时找到目标，把小的放到左边的坑里，自己形成新的坑位
        arr[pivot] = arr[end];
        pivot = end;

        // 坑在右边，begin 从左到右找比 key 大的数
        while (begin < end && arr[begin] <= key) {
            begin++;
        }
        // 这时找到目标，把大的放到右边的坑里，自己形成新的坑位
        arr[pivot] = arr[begin];
        pivot = begin;
    }
    // 这里是相遇的位置
    pivot = begin;
    arr[pivot] = key;

    // pivot 已经排到正确的位置了，如果它的左边、右边都排好序，那么整个数组就是有序的
    // 此时 [left, right] 被分成了 [left, pivot-1], pivot, [pivot+1, right]
    quick_sort_1(arr, left, pivot - 1);
    quick_sort_1(arr, pivot + 1, right);
}
```

单趟排序是 $O(n)$

三数取中

快排思想类似二叉树的前序遍历

归并排序的思想类似二叉树的后序遍历
