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

### 基本思想

直接插入排序 (Straight Insertion Sort) 的基本思想是：把待排序的记录按其关键码值的大小逐个插入到一个已经排好序的有序序列中，直到所有的记录插入完为止，得到一个新的有序序列。

实际中我们玩扑克牌时，对扑克牌排序和插入排序的思想是类似的。

当插入第 i(i>=1) 个元素时，前面的 arr[0], arr[1],..., arr[i-1] 已经排好序（相对顺序），此时用 arr[i] 与 arr[i-1], arr[i-2], … 依次分别比较，找到插入位置就将 arr[i] 插入，原来位置上的元素顺序后移。

![插入排序思想示意图 |360](https://zedo.gitee.io/img/dsa/sorts/1.1-插入排序.png)

### 代码实现

假设 [0, end] 有序，将把 end+1 的值插入，让 [0, end+1] 有序，我们要做的就是让 end 不断变大，然后重复以上过程。

注意 end+1 不能越界，范围是 \[1, n)，于是 end 范围是 \[0, n-1)。

```c
/**
 * 直接插入排序
 *
 * @param arr 数组
 * @param n 数组长度
 */
void insert_sort(int *arr, int n) {
    // 让 [0, end] 有序，end 范围是 [0, n-1)
    for (int i = 0; i < n - 1; i++) {
        int end = i; // 注意：直接用 end 替代 i 也能完成排序，但会降低效率
        int tmp = arr[end + 1]; // 把 end+1 存起来

        // 让 end+1 位置元素依次和它前面的数比较
        while (end >= 0) {
            // 碰到比它大的，就把元素往后挪
            if (arr[end] > tmp) {
                arr[end + 1] = arr[end];
                end--;
            } else {
                // 碰到比它小(<=)的，不用再挪了，直接插入
                // arr[end + 1] = tmp; // 注意：若该语句放在此处，无法访问到 arr[0] 的位置
                break;
            }
        }
        // 把当前处理的值放在 end+1
        arr[end + 1] = tmp;
    }
}
```

### 复杂度分析

最好情况：完全顺序。此时单趟循环只需要比较 1 次，故复杂度为 $O(n)$。

最坏情况：完全逆序。此时第 i 趟循环需要把前 i-1 个元素依次往后移，需要 i 步操作，故复杂度为 $\ds\sum_{i=1}^{n}i= O(n^2)$

算法只需要几个辅助变量， 空间复杂度为 $O(1)$

稳定性：稳定。对于相等的两个值，在比较时不会移动，即相对位置和顺序保持不变。

## 折半插入排序

折半插入排序 (Binary Insertion Sort) ，或**二分插入排序**是对直接插入排序算法的一种改进。折半插入排序与直接插入排序算法原理相同，但是在向已排序的数据中插入数据时，采用**折半查找**。

折半查找：先取已经排序的序列的中间元素，与待插入的数据进行比较，如果中间元素的值大于待插入的数据，那么待插入的数据属于数组的前半部分，否则属于后半部分。依次类推，不断缩小范围，确定要插入的位置。

### 代码实现

基于直接插入排序的代码，改成二分查找即可：

```c
/**
 * 折半插入排序
 * @param arr 数组
 * @param n 数组长度
 */
void binary_insert_sort(int *arr, int n) {
    // 与直接插入排序一样，[0, end] 有序，end 范围是 [0, n-1)
    for (int end = 0; end < n - 1; end++) {
        int tmp = arr[end + 1]; // 把 end+1 位置的存起来

        // 这里不再依次比较，因为 [0, end] 已经有序，改用二分查找
        int low = 0, high = end;
        while (low <= high) {
            int mid = (low + high) / 2;
            if (arr[mid] > tmp) { high = mid - 1; }
            else { low = mid + 1; }
        }
        // 循环结束，high+1 为插入位置
        int pos = high + 1;
        // 把 [pos, end] 位置的元素往后移，留出 pos 给当前处理的 tmp
        for (int i = end; i >= pos; i--) {
            arr[i + 1] = arr[i];
        }
        // 在 pos 位置插入
        arr[pos] = tmp;
    }
}
```

### 算法分析

相对于直接插入排序，折半插入排序减少了比较次数，但没有减少移动次数。平均性能优于直接插入排序。

时间复杂度：$O(n^2)$

空间复杂度：$O(1)$

稳定性：稳定

## 希尔排序

希尔排序 (Shell's Sort)，由 D.L.Shell 于 1959 年提出，也叫**缩小增量排序**或**最小增量排序**。希尔排序也在直接插入排序的基础上优化的排序算法。

该算法实质上是一种分组插入方法，因为直接插入排序在数据越接近有序时效率越高，因此希尔排序的想法是先对数据做几轮**预排序**，数据变得越有序，直接插入排序所需要的操作就越少。

先选定一个整数 gap，把待排序文件中所有记录分成 gap 个组，所有距离为 gap 的记录分在同一组内，并对每一组内的记录进行排序。然后取 gap=gap/2，重复上述分组和排序的工作。当 gap=1 时，所有记录在同一组内排好序。

下图是希尔排序的示意图：

![希尔排序示意图|480](https://zedo.gitee.io/img/dsa/sorts/1.2-希尔排序.png)

::: tip

- gap 的选取没有“官方”规定，即希尔排序算法的增量序列取法不唯一，且其效率与增量序列的取法有关。
- 当 gap > 1 时都是预排序，目的是让数组更接近于有序。当 gap == 1 时，实际上就是直接插入排序。这样整体而言，可以达到优化的效果。

:::

### 代码实现

梳理一下思路：

- 预排序：分组排序，间隔为 gap 为一组，分别进行直接插入排序，gap 由大变小。
- 目的：gap 越大，大数就能更快地排在后面，小数更快地排在前面。但 gap 越大，预排完越不接近有序，gap 越小，越接近有序。
- 当 gap = 1 时就是直接插入排序。

每 gap 为一组，增量为 d = gap，变成逻辑上的分组：[i, i+d, i+2d, ..., i+kd]

与直接插入排序的实现类似，现在还需要确定 end 变量的范围。

因为每 gap 个一组，最后 gap 个元素必定位于不同组，且倒数第 gap 个元素与 arr[0] 同组，即从 arr[n-gap] 开始，每个元素都是它们组最后一个元素，从而可确定 end 范围是 \[0, n - gap)。

```c
/**
 * 希尔排序
 *
 * @param arr 数组
 * @param n 数组长度
 */
void shell_sort(int *arr, int n) {
    // gap > 1 时都是预排序，当 gap = 1 时就是直接插入排序
    for (int gap = n / 2; gap >= 1; gap = gap / 2) {
        // 把间隔为 gap 的多组数据同时进行直接插入排序
        // 代码与直接插入排序类似，只是把 1 换成了 gap
        for (int i = 0; i < n - gap; i++) {
            int end = i; // 与直接插入排序类似，不能直接用 end 替代 i
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

希尔排序的时间复杂度不好计算。当 gap 很大时，复杂度约为 $O(n)$，当 gap 很小时，数组已经接近有序，也差不多是 $O(n)$。平均时间复杂度 $O(n^{1.25})\sim O(1.6n^{1.25})$，一般取为经验值 $O(n^{1.3})$。

空间复杂度：$O(1)$，只需要几个辅助变量。

稳定性：不稳定。预排序时可能会改变等值元素的顺序。

希尔排序不宜在链式存储结构上实现，因为预排序分组时需要随机存取。

增量序列的最后一个增量值必须为 1。增量序列取法还有：

Hibbard 增量序列

- $D_k=2^{k-1}$，相邻元素互质
- 最坏情况：$T_{\text{worst}}=O(n^{3/2})$
- 猜想：$T_{\text{avg}}=O(n^{5/4})$

Sedgewick 增量序列

- {1,5,19,41,109,...} =$\{k\mid (9(4^k-2^k)+1) \lor (4^k-3\cdot2^k+1)\}$
- 猜想：$T_{\text{worst}}=O(n^{4/3})$，且 $T_{\text{avg}}=O(n^{7/6})$

## 测试

为了方便复用，我们将所有的排序函数都放在 `sort.h` 头文件中。同时，这里给出几个用于测试的函数（不放在头文件）以及主函数：

```c
#include <sort.h>
#include <stdio.h>
#include <stdlib.h> // malloc 等
#include <time.h> // time, clock 等

// 打印数组
void print_array(int *arr, int n) {
    for (int i = 0; i < n; ++i) {
        printf("%d ", arr[i]);
    }
    printf("\n");
}

// 生成在 [min,max] 内的随机数
int random(int min, int max) {
    return min + rand() % (max - min + 1); // NOLINT(cert-msc50-cpp)
}

/**
 * 生成随机数组
 * @param n 数组长度
 * @param max_val 元素最大值
 * @return 数组头指针
 */
int *gen_random_array(int n, int max_val) {
    int *arr = (int *) malloc(sizeof(int) * n);
    for (int i = 0; i < n; i++) {
        arr[i] = random(0, max_val);
    }
    return arr;
}

/**
 * 数组深拷贝
 * @param arr 源数组
 * @param size 数组大小
 * @return 新数组头指针
 */
int *copy_arr(const int arr[], int size) {
    int *b = (int *) malloc(sizeof(int) * size);
    for (int i = 0; i < size; i++) {
        b[i] = arr[i];
    }
    // 也可用 memcpy(b, a, sizeof(int) * size);
    return b;
}


int main() {
    // 给随机数播种
    srand((unsigned) time(NULL));

    // 我们要测试的函数就放在这
}
```

我们当然也可以手动设置测试的数组，例如：

```c
void test() {
    int a[] = {3, 8, 5, 4, 3, 2, 2, 6, 9, 1};
    int n = sizeof(a) / sizeof(int);

    print_array(a, n);
    insert_sort(a, n); // 也可以是别的排序函数
    print_array(a, n);
}
```

但是，有些情况下可能当前测试用例是测不出问题的，它或许和的数组长度相关，因此上面的函数对数组长度也用了随机数。

比较性能用的函数：

```c
// 取十万个数，使用不同排序算法，比较耗时
int n = 1000000;
int *a1 = (int *) malloc(sizeof(int) * n);
int *a2 = (int *) malloc(sizeof(int) * n);
int *a3 = (int *) malloc(sizeof(int) * n);
for (int i = 0; i < n; i++) {
    a1[i] = rand();
    a2[i] = a1[i];
    a3[i] = a1[i];
}

// 这里放排序算法

free(a1);
free(a2);
free(a3);
```

上面的代码可能有些许长而且较为冗余，同样地，为了方便复用将其改写为一个更通用的函数：

```c
/**
 * 批量初始化随机数组（用于大数据量的数组），所有数组的元素一一对应相等
 * @param arrays 数组指针
 * @param arrays_size 数组个数
 * @param n 每个数组的长度
 */
void set_random_arrays(int **arrays[], int arrays_size, int n) {
    if (arrays_size < 1) return;
    // 初始化数组，因为要改变 *a 的指向，传入 a 的地址（类型 **int）
    // 相应地就需要对 arrays[i] 解引用
    for (int i = 0; i < arrays_size; i++) {
        // *arrays[i] 与 *(arrays[i]) 是相等的
        // 或者用 **(arrays + i)
        *(arrays[i]) = (int *) malloc(sizeof(int) * n);
    }

    // 给数组赋值
    for (int i = 0; i < n; i++) {
        // 注意 (*arrays[j])[i] != *arrays[j][i]，因此不能直接这样写：*arrays[0][i]
        (*(arrays[0]))[i] = random(0, 99999);
        for (int j = 1; j < arrays_size; j++) {
            // *(**(arrays + j) + i) = *(**(arrays + 0) + i);
            (*arrays[j])[i] = (*(arrays[0]))[i];
        }
    }
}
```

### 正确性验证

测试直接插入排序、折半插入排序和希尔排序：

```c
void testInsertSorts() {
    int n = random(10, 20);
    int *a1 = gen_random_array(20, 100);
    int *a2 = copy_arr(a1, n);
    int *a3 = copy_arr(a1, n);

    print_array(a1, n);
    printf("直接插入排序:\n");
    insert_sort(a1, n);
    print_array(a1, n);

    printf("折半插入排序:\n");
    binary_insert_sort(a2, n);
    print_array(a2, n);

    printf("希尔排序:\n");
    shell_sort(a3, n);
    print_array(a3, n);
}
```

输出结果（因为数据是随机的，每次运行都会不一样）：

```text
3 72 60 73 50 90 22 14 16 36 9 88 79 36 29 80 1 78
直接插入排序:
1 3 9 14 16 22 29 36 36 50 60 72 73 78 79 80 88 90
折半插入排序:
1 3 9 14 16 22 29 36 36 50 60 72 73 78 79 80 88 90
希尔排序:
1 3 9 14 16 22 29 36 36 50 60 72 73 78 79 80 88 90
```

### 性能对比

这里我们使用 `time.h` 头文件的 [`clock`](https://cplusplus.com/reference/ctime/clock/) 函数测试耗时（单位：毫秒），它返回自程序启动起，处理器时钟所使用的时间。如果失败，则返回 -1 值。

取十万个随机数

```c
void compareInsertionSorts() {
    int n = 100000; // 随机 十万 个数
    int *a1 = NULL, *a2 = NULL, *a3 = NULL;
    // int **arrays[3] = {&a1, &a2, &a3};
    set_random_arrays((int **[]){&a1, &a2, &a3}, 3, n);

    int tick1 = clock(); // clock 函数可以获取运行到此处时的毫秒数
    insert_sort(a1, n);
    int tick2 = clock();
    binary_insert_sort(a2, n);
    int tick3 = clock();
    shell_sort(a3, n);
    int tick4 = clock();

    printf("直接插入排序: %d\n", tick2 - tick1);
    printf("折半插入排序: %d\n", tick3 - tick2);
    printf("希尔排序: %d\n", tick4 - tick3);

    free(a1);
    free(a2);
    free(a3);
}
```

输出结果（注意该运行结果情况并非每次都如此）：

```text
直接插入排序: 5329
折半插入排序: 3747
希尔排序: 23
```

可见折半插入排序对直接插入排序的优化提高了 $40\%$ 左右的效率；而经过预排序的希尔排序效率提高了 $23000\%$ 左右，差距是十分明显的。

## 不重要的话

我们在实现直接插入排序时，是这样做的：假设 [0, end] 有序，将把 end+1 的值插入，让 [0, end+1] 有序。但这样每次取 `tmp` 时都是从 `end+1` 开始，其实也可以把 `end` “平移”一下，即：假设 [0, end-1] 有序，将把 end 的值插入，让 [0, end] 有序。

这样就可以得到本节三种排序的等价写法，例如：

```c
// 直接插入、折半插入均适用
void insert_sort(int *arr, int n) {
    // 假设 [0, end-1] 有序，将把 end 的值插入，让 [0, end] 有序
    // 我们要做的就是让 end 不断变大，然后重复以上过程
    // end 不能越界，范围是 [1, n)
    for (int i = 1; i < n; i++) {
        int end = i;
        int tmp = arr[end];
        // 用 end-1 替换 end，此处省略
    }
}
```

而对于希尔排序，只要加一层对 `gap` 的循环，然后把直接插入排序代码的 `1` 改成 `gap` 即可：

```c
void shell_sort(int *arr, int n) {
    for (int gap = n / 2; gap >= 1; gap = gap / 2) {
        // 范围变化：[0, n-gap) => [gap, n)
        for (int i = gap; i < n; i++) {
            // 用 end-gap 替换 end，此处省略
        }
    }
}
```
