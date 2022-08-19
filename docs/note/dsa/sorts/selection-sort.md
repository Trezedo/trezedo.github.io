---
date: 2022-08-12
category:
    - 数据结构
    - 排序
tag:
    - 直接选择排序
    - 堆排序
order: 2
---

# 数据结构 - 选择排序

## 直接选择排序

straight select sort

```c
/**
 * 直接选择排序（优化）
 *
 * 交换排序的一种。原来的算法是一趟选一个，优化后同时交换一个大、一个小
 * 优化后复杂度：N + N-2 + N-4 + N-6 + ... + 0
 * 该算法较差，最好情况也是 O(n*n)
 * @param a
 * @param n
 */
void select_sort(int *a, int n) {
    int begin = 0, end = n - 1;
    while (begin < end) {
        int minIdx = begin, maxIdx = begin; // 最小数和最大数的下标
        // 在 [begin, end] 区间内，找到最大和最小元素的下标
        for (int i = begin; i <= end; i++) {
            if (a[i] < a[minIdx]) {
                minIdx = i;
            }
            if (a[i] > a[maxIdx]) {
                maxIdx = i;
            }
        }
        // 把最小的换到左边，最大的换到右边
        swap(a + begin, a + minIdx);
        // 如果 begin 跟 maxIdx 重叠，则需要修正一下
        // eg: 9,3,5,2,7,-1,9,4,0
        if (begin == maxIdx) { // 此时 begin 被换到了 minIdx
            maxIdx = minIdx;
        }
        swap(a + maxIdx, a + end);
        begin++;
        end--;
    }
}
```

## 堆排序

```c
/**
 * 交换两个数
 * @param pa
 * @param pb
 */
void swap(int *pa, int *pb) {
    int tmp = *pa;
    *pa = *pb;
    *pb = tmp;
}

/**
 * 堆排序的向下调整算法(建小堆)
 *
 * 前提：左右子树都是小堆
 * 选出左右孩子较小者，与父亲比较，如果比父亲小就交换，然后继续往下调整，调到叶子结点时终止
 */
void $adjust_down(int *arr, int n, int root) {
    int parent = root;
    int child = parent * 2 + 1; // 比父亲大的孩子，先默认选左孩子

    // 调整到叶子结点就结束，物理结构上超出长度 n 就是空结点
    while (child < n) {
        // 选出左右孩子中较大者（也可能只有左孩子）
        if ((child + 1 < n) && arr[child + 1] > arr[child]) {
            child += 1;
        }

        if (arr[child] > arr[parent]) {
            // 交换父子位置
            swap(arr + child, arr + parent);
            parent = child;
            child = parent * 2 + 1;
        } else {
            break;
        }
    }
}

/**
 * 堆排序
 * @param a
 * @param n
 */
void heap_sort(int *a, int n) {
    // 把数组建成大堆(升序)或小堆(降序)

    // 这里完成建堆操作，复杂度 O(n)
    // 因为向下调整算法的前提是左右子树都是小堆，不能直接使用
    // 因此需要从最后一颗子树开始调
    for (int i = (n - 1 - 1) / 2; i >= 0; i--) {
        $adjust_down(a, n, i);
    }

    // 排升序，应该建大堆
    int end = n - 1;
    while (end > 0) {
        // 交换堆顶和最后一个叶子结点，可选出最大值并放在末尾
        swap(a + 0, a + end);
        // 因为最大数已经选出，把剩下的数看作堆，再向下调整，找出次大数，再跟倒数第二个位置交换
        // 最多向下调整树的高度次(log n)
        $adjust_down(a, end, 0);
        end--;
    }
}
```
