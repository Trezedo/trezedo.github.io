---
date: 2022-08-13
icon: entypo:merge
order: 4
category:
    - 数据结构
    - 排序
tag:
    - 归并排序
---

# 数据结构 - 归并排序

## 二路归并排序

基本思想：

归并排序（MERGE-SORT）是建立在归并操作上的一种有效的排序算法,该算法是采用分治法（Divide and Conquer）的一个非常典型的应用。将已有序的子序列合并，得到完全有序的序列；即先使每个子序列有序，再使子序列段间有序。若将两个有序表合并成一个有序表，称为二路归并。

归并排序过程示意：

![归并排序示例1](https://zedo-img.netlify.app/img/dsa/sorts/4.1-merge-example.png)

归并排序每次都把原数组分成两半，即分成 [0, n/2 - 1] 和 [n/2, n] 两部分，然后再对这两部分再次二分，这就是一个“分治”的过程。

对于长度不是 $2^k,k\in \mathbb{N}$ 的序列，过程也是完全类似：

![归并排序示例2](https://zedo-img.netlify.app/img/dsa/sorts/4.1-merge-example.png)

归并排序的特性总结：

1. 归并的缺点在于需要 $O(n)$ 的空间复杂度，归并排序的思考更多的是解决在磁盘中的外排序问题。
2. 时间复杂度：$O(n\log n)$
3. 空间复杂度：$O(n)$
4. 稳定性：稳定

快排思想类似二叉树的前序遍历

归并排序的思想类似二叉树的后序遍历

旧

```c
/*
本关任务：随机生成20个从1－100之间的随机数，用递归与分治法编程实现元素的查找算法。
*/
#include <stdlib.h>
#include <stdio.h>
#include <time.h>

// 分&治 递归
void merge_sort_conquer(int data[], int temp[], int start, int end) {
    if (start >= end)
        return;
    int len = end - start, mid = (len/2) + start;
    int start1 = start, end1 = mid;
    int start2 = mid + 1, end2 = end;

    // 分成两部分子问题
    merge_sort_conquer(data, temp, start1, end1);
    merge_sort_conquer(data, temp, start2, end2);

    // 治&归并
    int i = start;
    while (start1 <= end1 && start2 <= end2) {
        if (data[start1] < data[start2]) {
            /*temp[i] = data[start1];
            i++;start1++;*/
            temp[i++] = data[start1++];
        } else {
            temp[i++] = data[start2++];
        }
    }
    while (start1 <= end1)
        temp[i++] = data[start1++];
    while (start2 <= end2)
        temp[i++] = data[start2++];
    for (i = start; i <= end; i++)
        data[i] = temp[i];
}

void merge_sort(int data[], int len) {
    int temp[len];
    merge_sort_conquer(data, temp, 0, len - 1);
}

// 二分查找
int find_pos(int data[] ,int n, int key) {
    //在数组data中查找给定数据key，n是数组中数据元素的个数，返回值是数据元素的指标.
    int resIndex = -1;
    int left = 0, right = n-1, mid=0;

    while(left <= right && key>=data[0] && key<=data[n-1]) {
        mid = (left + right) / 2;
        if (key == data[mid]) {
            resIndex = mid;
            break;
        } else {
            if (key < data[mid]) {
                right = mid - 1;
            } else if (key > data[mid]) {
                left = mid + 1;
            }
        }
    }
    return resIndex;
}


int main() {
    int i,N;
    printf("请输入：");
    int a[10];
    for(i=0; i<10; i++) {
        //a=random(1,100);
        scanf("%d", &a[i]);
    }
    merge_sort(a,10);
    for(i=0; i<10; i++) {
        printf("%d ", a[i]);
    }
    scanf("%d",&N);
    printf("%d",find_pos(a,10,N)+1);
    return 0;
}

/*
2 1 4 6 3 5 7 8 9 10 5
—— 预期输出 ——
—— 实际输出 ——

1 2 3 4 5 6 7 8 9 10
5
*/

/*
你需要掌握：1、需排序的数据要求随机生成。
2、排序算法要求采用归并或选择排序算法。3、用递归与分治法编程实现元素的查找算法。
平台会对你编写的代码进行测试：
测试输入：2 1 4 6 3 5 7 8 9 10 5
预期输出：
1 2 3 4 5 6 7 8 9 10
5
*/
```

新

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
