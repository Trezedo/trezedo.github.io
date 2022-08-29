---
date: 2022-08-12
category:
    - 数据结构
    - 排序
tag:
    - 冒泡排序
    - 快速排序
order: 2
---

# 数据结构 - 交换排序

基本思想：所谓交换，就是根据序列中两个记录键值的比较结果来对换这两个记录在序列中的位置。

交换排序的特点是：将键值较大的记录向序列的尾部移动，键值较小的记录向序列的前部移动。

由于需要用到“交换”，这里先给出交换两个数的 `swap` 函数的定义：

```c
/**
 * 交换两个数
 * @param 数 a 的地址
 * @param 数 b 的地址
 */
void swap(int *a, int *b) {
    int tmp = *a;
    *a = *b;
    *b = tmp;
}
```

## 冒泡排序

冒泡排序的基本思想是：从前往后（或从后往前）两两比较相邻元素的值，若为逆序（即 arr[i-1] > arr[i]）就交换它们，直到整个序列比较完。这也叫第一趟冒泡。下一趟冒泡时，前一趟确定的最大（或最小）元素不再参与比较。每趟冒泡都会把序列中最大（或最小）的元素放在最终位置。这样最多需要 $n-1$ 趟冒泡就能把序列排好序。

下图是（向下）冒泡排序的过程，第一趟排序时：$5>1$，交换；$5<9$，不交换；$9>8$，交换；$9>\overline5$，交换； $9>6$，交换；$9>4$，交换；$9>7$，交换；$9>3$，交换；$9>2$，交换。这样，最大的元素 9 就交换到最后了。后面几趟冒泡过程的描述省略。每次排序，值最大的元素都会“沉底”。

::: tip

我们也可以“向上”冒泡，每次把最小元素“漂浮”到“水面”。

:::

![冒泡排序示例  |400](./img/2.1-冒泡排序.png)

上图中，我们将每趟冒泡“沉底”的元素用 <span style="color: #e67700"> 橘色</span> 标记（即排好序的元素），每趟冒泡发生交换的元素用 <span style="color: #087f5b">绿色</span> 标记。注意 $5$ 和 $\overline{5}$ 的相对位置没有发生改变。

下面的动图来自 [github](https://github.com/hustcc/JS-Sorting-Algorithm/blob/master/res/bubbleSort.gif)，它可以更直观的体现整个冒泡排序的过程：

![冒泡排序动图示意](./img/bubbleSort.gif)

### 代码实现

假设要让 [0, end] 中最大元素的位置放在 arr[end]，那么 end 的范围应该是 [0, n-1]，即 \[0, n)。对于 [0, end], [end+1, n-1] 两部分区间，后者是有序的，前者要让两两相邻元素比较，我们可以让它和它之前的元素比较，则用于该循环的变量范围是 [1, n-(end+1)]，即 \[1, n-end)。

```c
/**
 * 冒泡排序
 * @param arr 数组
 * @param n 数组长度
 */
void bubble_sort(int *arr, int n) {
    for (int end = 0; end < n; end++) {
        // 每次排序，最大元素都会在最右边
        for (int j = 1; j < n - end; j++) {
            if (arr[j - 1] > arr[j]) {
                swap(arr + j - 1, arr + j);
            }
        }
    }
}
```

优点：每趟排序结束后，都能把至少 1 个元素放在最终位置，同时能够局部排好其他元素。

### 优化

与[直接插入排序](insertion-sort.md#直接插入排序)相比，谁的效率更高？答案是直接插入排序！

请看下面这个例子：1 2 3 5 4 6 （接近有序），分别用直接插入排序和冒泡排序处理。

直接插入排序（序号代表趟数，<span style="color:red">红色</span>表示当前处理的，<span style="color:#087f5b">绿色</span>表示移动）：

1. 1 <span style="color:red">2</span> 3 5 4 6，比较 1 次，不发生移动；
2. 1 2 <span style="color:red">3</span> 5 4 6，比较 1 次，不发生移动；
3. 1 2 3 <span style="color:red">5</span> 4 6，比较 1 次，不发生移动；
4. 1 2 3 <span style="color:red">4</span> <span style="color:#087f5b">5</span> 6，比较 2 次，移动 1 个元素；
5. 1 2 3 4 5 <span style="color:red">6</span>，比较 1 次，不发生移动；

总共比较 $1\times 4+2=6$ 次，复杂度为 $\ds\sum_{i=1}^{n-1}{(1+c)}=O(n)$。

冒泡排序（<span style="color: #e67700"> 橘色</span>表示已排好序，<span style="color: #087f5b">绿色</span>表示发生交换）：

1. 1 2 3 <span style="color: #087f5b">4 5</span> <span style="color:#e67700">6</span>，比较 5 次，交换 1 次；
2. 1 2 3 4 <span style="color:#e67700">5 6</span>，比较 4 次，不发生交换；
3. 1 2 3 <span style="color:#e67700">4 5 6</span>，比较 3 次，不发生交换；
4. 1 2 <span style="color:#e67700">3 4 5 6</span>，比较 2 次，不发生交换；
5. 1 <span style="color:#e67700">2 3 4 5 6</span>，比较 1 次，不发生交换。

总共比较 $5+4+3+2+1=15$ 次，复杂度为 $\ds\sum_{i=1}^{n-1}{(n-i )}=O(n^2)$。

由此可见，插入排序对有序（接近有序、局部有序）序列的适应性更强。

除此之外，从上面冒泡排序的例子来看，如果某一趟排序中**没有发生交换**，就说明已经排好序了，后面的几趟排序就可以省略，算法可以结束。我们用一个变量 `exchange` 标记一趟遍历中是否发生交换来实现优化：

```c
// 冒泡排序（优化）
void bubble_sort(int *arr, int n) {
    for (int end = 0; end < n; end++) {
        // 每次排序，最大元素都会在最右边
        int exchange = 0; // 这里用一个变量标记是否发生交换
        for (int j = 1; j < n - end; j++) {
            if (arr[j - 1] > arr[j]) {
                swap(arr + j - 1, arr + j);
                exchange = 1;
            }
        }
        // 没有发生交换，说明已经有序
        if (exchange == 0) {
            break; // 也可以用 return;
        }
    }
}
```

### 复杂度分析

若序列有 n 个序列，总共需要 n-1 趟排序；第 $i$ 趟需要比较 $n-i$ 次。

最好情况：序列为完全顺序。此时只需要比较第一趟，序列不发生交换，算法就会终止，比较次数 $n-1$，移动次数 $0$。复杂度为 $O(n)$。

最坏情况：序列为完全逆序。此时每趟都需要比较，共 $\ds \sum_{i=1}^{n-1}{(n-i)}=\frac{n^2-n}{2}$ 次；每次比较都会交换，一次交换需要 3 步操作，共 $3\ds \sum_{i=1}^{n-1}{(n-i)}=\frac{3(n^2-n)}{2}$ 次操作。复杂度为 $O(n^2)$。

平均情况：先看标准版本，比较次数为 $\ds \sum_{i=1}^{n-1}{(n-i)}=\frac{n^2-n}{2}$，交换次数比最坏情况要少，但复杂度仍为 $O(n^2)$，因此标准版本冒泡排序平均时间复杂度为 $O(n)$。

在改进冒泡排序的情况下，与标准版本相比，需要执行更少的比较和交换次数，但如果讨论时间复杂度，平均和最坏情况下的时间复杂度与标准时间复杂度相同：$O(n^2)$。

空间复杂度：仅使用了常数个辅助变量，故为 $O(1)$。

稳定性：当 A[j-1]=A[j] 时并不会交换，故算法是稳定的，这个也可以从最开始的冒泡排序示例图体现出来。

## 快速排序

快速排序是 Hoare 于 1962 年提出的一种分治递归的交换排序方法，其基本思想为：任取待排序元素序列中的某元素作为基准值 (一般用 pivot 表示)，按照该排序码将待排序集合分割成两子序列，左子序列中所有元素均小于基准值，右子序列中所有元素均大于基准值，然后最左右子序列重复该过程，直到所有元素都排列在相应位置上为止。

例如序列 $\{\textcolor{#e67700}{49},38,65,97,76,13,27,49^\ast\}$，选取 $\textcolor{#e67700}{49}$ 为基准，可以划分得到的如下区间：

$$
\{27,38,13\},\textcolor{#e67700}{49},\{76,97,65,49^\ast\}
$$

其中 $\{27,38,13\}$ 中每个值都比 49 小，$\{76,97,65,49^\ast\}$ 中每个值都比 49 大(>=)。

基准一般选取序列中两端的元素，当然若要选取其他位置的元素，只需要交换到两端就好了。

将区间按照基准值划分为左右两半部分的常见方式有多种方法，这里给出常见的 3 种。

### 挖坑法

设有两个指针，初始时，指针 begin 和 end 至少有一个是“坑”，因此它俩相遇时的位置就是坑。

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
```

### 左右指针法

```c
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
```

### 前后指针法

```c


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
