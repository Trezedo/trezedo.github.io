---
icon: tabler:logic-xor
date: 2023-01-02
modified: 2026-03-23
category:
    - leetcode
tag:
    - 异或运算
---

# 位运算

异或运算可看作不进位加法，有如下性质：

1. $a\oplus 0=a$
2. $a\oplus a=0$
3. 交换律：$a\oplus b=b\oplus a$
4. 结合律：$a\oplus (b\oplus c)=(a\oplus b)\oplus c$

编程语言如 `C/C++`、`Java`、`JavaScript` 等用 `^` 表示异或。

有时候会用异或运算来实现不用临时变量交换两个数：

```c
a = a^b;
b = b^a;
a = a^b;
```

但必须注意的是，如果满足 `a==b`，不但不能实现交换，还会将 `a`、`b` 置零！

给定一组数，若只有一个数仅出现奇数次，其余数都出现偶数次，求出这个数。

类似题：[136. 只出现一次的数字 - leetcode](https://leetcode.cn/problems/single-number/)

给定一组数，若有两个数出现奇数次，其余数都出现偶数次，求出这两个数。

[137. 只出现一次的数字 II](https://leetcode.cn/problems/single-number-ii/)

给你一个整数数组 `nums` ，除某个元素仅出现 **一次** 外，其余每个元素都恰出现 **三次**。请你找出并返回那个只出现了一次的元素。

master 定理

$T(n)=aT\left(\frac nb\right)+O(n^d)$

- 若 $\log_ba<d$，则 $T(n)=O(n^d)$
- 若 $\log_ba=d$，则 $T(n)=O(n^d\log n)$
- 若 $\log_ba>d$，则 $T(n)=O(n^{\log_ba})$

归并排序的拓展：小和问题和逆序对问题

小和问题

在一个数组中，每一个数左边比当前数小的数累加起来，叫做这个数组的小和。

例如：`[1,3,4,2,5]` 1 左边比 1 小的数，没有；3 左边比 3 小的数，1；4 左边比 4 小的数，1、3；2 左边比 2 小的数，1；5 左边比 5 小的数，1,3,4,2；所以小和为

$$
1+(1+3)+1+(1+3+4+2)=16
$$

逆序对问题：在一个数组中，左边的数如果比右边的大，则这两个数构成一个逆序对，打印所有的逆序对。

荷兰国旗问题：

- i<num，i 和小区下一个交换，小区右扩，i 前移；
- i=num，i 前移；
- i>num，i 和大区前一个交换，大区左扩，i 不动；

若已知两带环链表及其环的入口，判断是否相交，若相交则求出交点。

堆排序扩展题：
已知一个几乎有序的数组（几乎有序是指，如果把数组排好序，每个元素移动的距离可以不超过 k，且 k 相对于数组来说比较小），选择一个合适的排序算法针对这个数组进行排序。

坑：

- 归并排序的额外空间复杂度可以降为 O(1)，但是非常难，可以搜“归并排序内部缓存法”。
- 快速排序可以做到稳定性，但同样非常难，可以搜“O1 stable sort”。
- 所有的改进都不重要，因为目前没找到时间复杂度 O(nlog n)，额外空间复杂度 O(1)，又稳定的排序。

打印两个有序链表的公共部分

给定一个单链表的头结点 head，结点的值类型都是整型，再给定一个整数 x。实现一个调整链表的函数，将链表调整为左部分都是值小于 x 的结点，中间部分都是值等于 x 的结点，右部分都是值大于 x 的结点。要求值相等的结点相对顺序与调整前一样，时间复杂度为 O(n)，空间复杂度 O(1)。

用 6 个指针记录三个分区的头结点和尾结点，遍历一遍链表并将结点放到对应的分区，最后连接三个分区。

```cpp
// 处理当前结点 cur，放到对应的分区
// head 和 tail 分别是分区的头、尾结点
inline void process(ListNode *cur, ListNode *&head, ListNode *&tail) {
    if (head == nullptr) { // 初始化分区，也可以创一个头结点，避免这步操作
        head = cur;
        tail = cur;
    } else { // 更新分区的尾结点
        tail->next = cur; // 顺序不可交换！先更新 next 域再修改尾结点
        tail = cur;
    }
}

ListNode *listPartition(ListNode *head, int x) {
    ListNode *sH = nullptr, *sT = nullptr; // small, head & tail
    ListNode *eH = nullptr, *eT = nullptr; // equal
    ListNode *bH = nullptr, *bT = nullptr; // big
    ListNode *cur = head;
    while (cur) {
        ListNode *next = cur->next;
        cur->next = nullptr;
        if (cur->val < x) {
            process(cur, sH, sT);
        } else if (cur->val == x) {
            process(cur, eH, eT);
        } else {
            process(cur, bH, bT);
        }
        cur = next;
    }
    if (sT != nullptr) { // 如果有小区
        sT->next = eH;// 连接到等区
        eT = eT == nullptr ? sT : eT; // 用谁连接大区的头结点，谁就变成 eT
    }
    if (eT != nullptr) { // 如果小区和等区至少存在一个，连接大区头结点
        eT->next = bH;
    }
    return sH ? sH : (eH ? eH : bH);
}
```
