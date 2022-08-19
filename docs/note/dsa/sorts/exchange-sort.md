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

```c
/**
 * 冒泡排序
 *
 * N-1 + N-2 + N-3 + ...  = O(N^2)
 *
 * 与 直接插入排序 相比？ 直接插入排序更好！
 *
 * 如：1 2 3 5 4 6 （接近有序）
 * 冒泡排序：第1趟：1 2 3 4 5 6 操作 N-1 次；第2趟：N-2 次
 * 插入排序：N
 *
 * 插入排序对有序、接近有序、局部有序，适应性更强
 * @param a
 * @param n
 */
void bubble_sort(int *a, int n) {
    for (int end = 0; end < n; end++) {
        // 每次排序，最大元素都会在最右边

        int exchange = 0; // 这里用一个变量标记是否发生交换
        for (int j = 1; j < n - end; j++) {
            if (a[j - 1] > a[j]) {
                swap(a + j - 1, a + j);
                exchange = 1;
            }
        }
        // 没有发生交换，说明已经有序
        if (exchange == 0) {
            break;
        }
    }
}
```

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

```c
// 提取快排挖坑法的核心逻辑（返回坑的新位置）
int $part_sort1(int *arr, int left, int right);

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

    int pivot = $part_sort1(arr, left, right);

    // pivot 已经排到正确的位置了，如果它的左边、右边都排好序，那么整个数组就是有序的
    // 此时 [left, right] 被分成了 [left, pivot-1], pivot, [pivot+1, right]
    quick_sort_1(arr, left, pivot - 1);
    quick_sort_1(arr, pivot + 1, right);
}

// 三数取中，快排的一种优化方法
int $get_middle(const int *arr, int left, int right);

// 中间过程
int $part_sort1(int *arr, int left, int right) {
    int begin = left, end = right;
    int pivot = begin; // 一般选最左边或最右边
    int key = arr[begin];
    while (begin != end) { // begin < end
        // 坑在左边，end 从右边过来找比 key 小的数
        // ! 如果 'arr[end] >= key' 没有等号，可能会死循环！
        // 例如： 5 1 2 5 5 8 9
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

    // 返回该位置，用于分治
    return pivot;
}

// 三数取中，避免选到数组中最小的元素，导致快排是最坏情况
int $get_middle(const int *arr, int left, int right) {
    int mid = (left + right) >> 1; // 除 2
    // 选出三个数的中位数的下标
    int a = arr[left], b = arr[mid], c = arr[right];
    return a > b
           ? b > c
             ? mid
             : (a > c ? right : left)
           : a > c
             ? left
             : (b > c ? right : mid);
}

void quick_sort_2(int *arr, int left, int right) {
    if (left >= right) return;

    // 优化：三数取中，避免最坏情况
    // 取到一个不可能是最小的数的下标，然后与第一个数交换
    int index = $get_middle(arr, left, right);
    swap(arr + left, arr + index);

    int pivot = $part_sort1(arr, left, right);

    // 下面与 quick_sort_1 大致相同，但可做小区间优化，当然，该优化效果不明显
    quick_sort_2(arr, left, pivot - 1);
    quick_sort_2(arr, pivot + 1, right);
}


/**
 * 左右指针法：挖坑法的变形
 *
 * 思想：同样是 begin, end 两个指针，begin 找比 key 小的，end 找比 key 大的
 * 两个同时找到时，交换指针的位置，重复以上操作，直至指针相遇
 * @param arr
 * @param left
 * @param right
 * @return
 */
int $part_sort2(int *arr, int left, int right) {
    // 这里默认做了三数取中的优化
    int index = $get_middle(arr, left, right);
    swap(arr + left, arr + index);

    int begin = left, end = right;
    int keyIdx = begin;

    while (begin < end) {
        // 找小
        while (begin < end && arr[end] >= arr[keyIdx]) {
            --end;
        }

        // 找大
        while (begin < end && arr[begin] <= arr[keyIdx]) {
            ++begin;
        }
        swap(arr + begin, arr + end);
    }
    swap(arr + begin, arr + keyIdx);

    // 返回该位置，用于分治
    return begin;
}

// 左右指针比挖坑法快一小丢丢
void quick_sort_3(int *arr, int left, int right) {
    if (left >= right) return;

    int pivot = $part_sort2(arr, left, right);

    quick_sort_3(arr, left, pivot - 1);
    quick_sort_3(arr, pivot + 1, right);
}

/**
 * 前后指针法
 *
 * 性能比挖坑法差些：
 * 快排(挖坑法): 77
 * 快排(左右指针法): 69
 * 快排(前后指针法): 1686
 *
 * 初始时，有两个指针 prev 和 cur，cur 每次遇到比 key 小的值，就停下来，prev++，交换 prev 和 cur 位置的值
 * 当 cur 走完一趟，交换 key 和 prev 的位置的值
 *
 * @param arr
 * @param left
 * @param right
 * @return
 */
int $part_sort3(int *arr, int left, int right) {
    // 两个指针间隔的都是比 key 大的，小的往左翻，大的往右推

    int index = $get_middle(arr, left, right);
    swap(arr + left, arr + index);

    int keyIdx = left;
    int prev = left, cur = left + 1;
    while (cur <= right) {
        /*if (arr[cur] < arr[keyIdx]) {// 此处没必要用 <=
            prev++;
            swap(arr + cur, arr + keyIdx);
        }*/
        // 优化：相等时没必要交换
        if (arr[cur] < arr[keyIdx] && ++prev != cur) {
            swap(arr + cur, arr + keyIdx);
        }
        cur++;
    }
    swap(arr + keyIdx, arr + prev);
    return prev;
}

void quick_sort_4(int *arr, int left, int right) {
    if (left >= right) return;

    int pivot = $part_sort3(arr, left, right);

    quick_sort_4(arr, left, pivot - 1);
    quick_sort_4(arr, pivot + 1, right);
}
```
