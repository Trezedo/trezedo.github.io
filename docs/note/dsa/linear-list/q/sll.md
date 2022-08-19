---
date: 2022-08-08 12:00:00
category:
    - 数据结构
    - 线性表
tag:
    - 链表
    - C语言
---

# 数据结构练习题 - 单链表

这里的单链表是无头非循环的，与 [数据结构 - 单链表](../singly-linked-list.md) 中介绍的一致，并使用到头文件：

```c
#include "SinglyList.h"
```

## 逆置链表

<!-- https://leetcode.cn/problems/reverse-linked-list -->

逆置链表也可以叫反转链表、翻转链表。例如：

$$
\begin{gathered}
\node1\pto \node2\pto \node3\pto \node4\pto \node5\pto \,\,\text{NULL} \\[4pt]
\Downarrow \\[4pt]
\node5\pto \node4\pto \node3\pto \node2\pto \node1\pto \,\,\text{NULL}
\end{gathered}
$$

### 思路一

<!-- $$
\begin{matrix}
A\frac{\mkern37mu}{}\mkern-4.5mu\\
B\circ\mkern-7mu\frac{\mkern25mu}{}\mkern-4.5mu
\end{matrix}
\boxed{\vphantom{\Big[}\ \&\ }\mkern-4mu\frac{\mkern24mu}{}F
$$ -->

思想：原地逆置链表。遍历每个结点，将指向下一个结点的指针改为指向上一个结点。

> 由于首元结点在逆置后会变为尾结点，因此它应当指向 `NULL`。

即：

$$
\begin{aligned}
\text{原链表：} & \hphantom{\text{NULL}\gets\mathop{}} 1\to 2\to 3\to 4\to 5\to\text{NULL}\\[4pt]
\text{逆置后：} & \text{NULL}\gets 1\gets 2\gets 3\gets 4\gets 5
\end{aligned}
$$

该思想需要两个指针，用 `cur` 指向当前迭代到的结点，`next` 指向 `cur` 的下一结点，即 `cur->next`。迭代完成的条件是 `cur==NULL`。

这里为了使代码更容易理解，避免使用 `->next->next` 这种容易含糊的形式，而是使用 3 个指针，假设连续的 3 个结点 `n1`,`n2`,`n3`。但实际上：

- `n1` 就是 `cur` 的上一结点；
- `n2` 就是 `cur`；
- `n3` 就是 `next`，即 `cur->next`。

初始时，三个结点的位置如下所示：

$$
\begin{array}{cccc}
\text{NULL} & \mk{-16}\to\mk{-5} \node1 & \mk{-10}\pto \node2 &\mk{-10}\pto\node3\pto \node4\pto \node5\pto \,\,\text{NULL} \\
\uparrow &\uparrow &\uparrow\\[-1pt]
n_1 &n_2 &n_3 &
\end{array}
$$

接下来依次将 `n2` 的 `next` 域指向其上一结点 `n1`，然后三个结点往右移动即可。代码如下：

```c
/**
 * 原地逆置链表
 * @param head 头指针
 * @return 新的头结点
 */
Node *reverseList(Node *head) {
    // 至少 2 个结点才逆置
    if (head == NULL || head->next == NULL) {
        return head;
    }

    // 连续的3个结点 n1, n2, n3
    Node *n1, *n2, *n3;
    n1 = NULL;
    n2 = head;
    n3 = head->next;
    // n2 从 head 开始，移到尾结点指向的 NULL 结束
    while (n2 != NULL) {
        n2->next = n1; // 翻转指向
        // 3 个结点都往后移
        n1 = n2;
        n2 = n3;
        n3 && (n3 = n3->next); // 最后一步，n2 为空时 n3 也是空
    }
    return n1;
}
```

复杂度分析：

- 时间复杂度：$O(n)$，需要遍历链表一次，其中 $n$ 是链表的长度。
- 空间复杂度：$O(1)$，原地操作。

递归版本 <http://data.biancheng.net/view/89.html>

### 思路二

思想：新建一个空链表，不断将原链表中的结点取下来，头插到新的链表中。

> 虽然是“新建”，但操作的仍是原链表上的结点，空间复杂度为常数级。

这里给出 4 个结点的链表演示（注意标记颜色的结点）：

$$
\begin{aligned}
\text{step 1}&\\
&\text{原链表：}
\cnode{#9ff}1\pto
\cnode{#cae}2\pto
\cnode{#fc3}3\pto
\cnode{#7d7}4\pto
\,\,\text{NULL} \\[4pt]
&\text{新链表：} \text{NULL}
\end{aligned}
$$

$$
\begin{aligned}
\text{step2}&\\
&\text{原链表：}
\cnode{#cae}{2}\pto
\cnode{#fc3}{3}\pto
\cnode{#7d7}{4}\pto
\,\,\text{NULL}
\hphantom{cc\node0\pto}\\[4pt]
&\text{新链表：}
\cnode{#9ff}{1}\pto
\text{NULL}
\end{aligned}
$$

$$
\begin{aligned}
\text{step3}&\\
&\text{原链表：}
\cnode{#fc3}{3}\pto
\cnode{#7d7}{4}\pto
\,\,\text{NULL}
\hphantom{cccc\node0\pto\node{0}\pto}\\[4pt]
&\text{新链表：}
\cnode{#cae}{2}\pto
\cnode{#9ff}{1}\pto
\,\,\text{NULL}
\end{aligned}
$$

$$
\begin{aligned}
\text{step4}&\\
&\text{原链表：}
\cnode{#7d7}{4}\pto
\,\,\text{NULL} \\[4pt]
&\text{新链表：}
\cnode{#fc3}{3}\pto
\cnode{#cae}{2}\pto
\cnode{#9ff}{1}\pto
\,\,\text{NULL}
\hphantom{cc\node0\pto}
\end{aligned}
$$

$$
\begin{aligned}
\text{step5}&\\
&\text{原链表：}
\text{NULL} \\[4pt]
&\text{新链表：}
\cnode{#7d7}{4}\pto
\cnode{#fc3}{3}\pto
\cnode{#cae}{2}\pto
\cnode{#9ff}{1}\pto
\,\,\text{NULL}
\end{aligned}
$$

代码实现：

```c
/**
 * 取原链表中的结点，头插到新链表中
 * @param head 头指针
 * @return 新的头结点
 */
Node *reverseList(Node *head) {
    Node *cur = head;
    Node *newHead = NULL; // 新链表的头

    while (cur != NULL) {
        Node *next = cur->next; // 备份原链表的 next 结点

        // 将原链表当前结点头插到新链表
        cur->next = newHead;
        newHead = cur;
        // 往后迭代
        cur = next;
    }
    return newHead;
}
```

复杂度分析：

- 时间复杂度：$O(n)$，需要遍历一次链表。
- 空间复杂度：$O(1)$，操作的是原链表上的结点。

## 找到中间结点

<!-- https://leetcode.cn/problems/middle-of-the-linked-list/ -->

::: info 题目

给定一个头结点为 `head` 的非空单链表，返回链表的中间结点。

如果有两个中间结点，则返回第二个中间结点。

```text:no-line-numbers
输入：[1,2,3,4,5]
输出：3
```

```text:no-line-numbers
输入：[1,2,3,4,5,6]
输出：4
```

:::

思路：使用快慢指针。快指针的速度是慢指针的 2 倍，这样当快指针到达链表尾结点时，慢指针刚好到链表中间。 `slow` 指针每次右移1次，`fast` 每次右移2次。

1° 如果是奇数个结点，则当 `fast` 到达尾结点时，`slow` 恰好就是链表中间结点：

$$
\text{step1:}\quad\begin{array}{cccccc}
\text{slow} & & & \\[-4pt]
\downarrow & & & \\
\node1
&\mk{-5}\pto\node2
&\mk{-5}\pto\node3
&\mk{-5}\pto\node4
&\mk{-5}\pto\node5
&\mk{-5}\pto\text{NULL} \\
\uparrow & & & & \\[-4pt]
\text{fast} & & & &
\end{array}
$$

$$
\text{step2:}\quad\begin{array}{cccccc}
 & \text{slow} & & \\[-4pt]
 & \downarrow & & \\
\node1
&\mk{-5}\pto\node2
&\mk{-5}\pto\node3
&\mk{-5}\pto\node4
&\mk{-5}\pto\node5
&\mk{-5}\pto\text{NULL} \\
 & & \uparrow & & \\[-4pt]
 & & \text{fast} & &
\end{array}
$$

$$
\text{step3:}\quad\begin{array}{cccccc}
 & & \text{slow} &\\[-4pt]
 & & \downarrow &\\
\node1
&\mk{-5}\pto\node2
&\mk{-5}\pto\node3
&\mk{-5}\pto\node4
&\mk{-5}\pto\node5
&\mk{-5}\pto\text{NULL} \\
 & & & &  \uparrow \\[-4pt]
 & & & & \text{fast}
\end{array}
$$

2° 如果是偶数个结点，则当快指针 `fast` 指向 `NULL` 时，慢指针 `slow` 恰好是第二个中间结点：

$$
\begin{array}{ccccc}
 & & \text{slow} &\\[-4pt]
 & & \downarrow &\\
\node1
&\mk{-5}\pto\node2
&\mk{-5}\pto\node3
&\mk{-5}\pto\node4
&\mk{-5}\pto\,\text{NULL} \\
 & & & &  \uparrow \\[-4pt]
 & & & & \text{fast}
\end{array}
$$

```c
/**
 * 找到链表中间结点
 *
 * 若有两个中间结点，返回第 2 个
 * @param head
 * @return 中间结点
 */
Node *middleNode(Node *head) {
    // 思路：使用快慢指针，快指针的速度是慢指针的 2 倍
    Node *slow, *fast;
    slow = fast = head;
    // 奇数个结点，fast 走到尾结点
    // 偶数个结点，fast 走到尾结点的 next (NULL)
    while (fast != NULL && fast->next != NULL) {
        slow = slow->next;
        fast = fast->next;
    }
    return slow;
}
```

## 找到倒数第 k 个结点

```c
/**
 * 找到链表的倒数第 k 个结点
 * @param head
 * @return Node*
 */
Node *lastKNode(Node *head, int k) {
    // 思路同样是快慢指针，但不是倍数关系，而是等差关系。
    // 快指针先走 k 步，然后两个指针再同时往后走，保持两指针的结点逻辑距离为 k
    // 求倒数第 k 个结点，其实就是求正数第 n-k 个结点

    // k 的下界
    if (k < 1) {
        return NULL;
    }

    Node *slow, *fast;
    slow = fast = head;

    // fast 先走 k 步
    while (k--) {
        // 如果没走完 k 步就为空了，说明 k 超过了链表长度
        if (fast == NULL) {
            return NULL;
        }
        fast = fast->next;
    }
    while (fast != NULL) {
        slow = slow->next;
        fast = fast->next;
    }
    return slow;
}
```

## 合并两个有序链表

<https://leetcode.cn/problems/merge-two-sorted-lists/>

$$
\fcolorbox{black}{#bef}{$\,\mathstrut a\,$}\mkern-1mu \boxed{\diagdown}
$$

```c
/**
 * 合并两个递增的链表
 * @param pl1
 * @param pl2
 * @return Node*
 */
Node *mergeIncreasingLists(Node *pl1, Node *pl2) {
    // 如果一个链表为空，返回另一个
    if (pl1 == NULL) return pl2;
    if (pl2 == NULL) return pl1;

    Node *head = NULL, *tail = NULL; // 新的头结点，备份尾结点
    // 将值较小的结点作为新链表的头
    if (pl1->data < pl2->data) {
        head = tail = pl1;
        pl1 = pl1->next;
    } else {
        head = tail = pl2;
        pl2 = pl2->next;
    }
    /*// 此处也可以手动创建一个哨兵位的头结点，返回保存 head->next，释放哨兵位后返回
    head = tail = (Node *) malloc(sizeof(Node));

    // 最后如下：
    Node *newHead = head->next;
    free(head);
    return newHead;*/

    // 当其中一个链表为空时，停止遍历
    while (pl1 != NULL && pl2 != NULL) {
        // 每次选取值较小的结点，尾插进新链表
        if (pl1->data < pl2->data) {
            tail->next = pl1;
            tail = pl1;
            pl1 = pl1->next;
        } else {
            tail->next = pl2;
            tail = pl2;
            pl2 = pl2->next;
        }
    }
    // 其中一个链表遍历结束，另一链表中剩下的结点直接接到尾结点
    if (pl1) {
        tail->next = pl1;
    }
    if (pl2) {
        tail->next = pl2;
    }
    return head;
}
```

## 划分链表

```c
/**
 * 将链表以 x 为分界划分，小于 x 的在前，大于 x 的在后，且保持相对位置不变
 * @param head
 * @param x
 * @return Node*
 */
Node *partition(Node *head, int x) {
    // 以 x 为中心分成两部分，当做两个链表
    Node *lessHead, *lessTail, *greaterHead, *greaterTail;
    // 分别创建哨兵位
    lessHead = lessTail = (Node *) malloc(sizeof(Node));
    lessTail->next = NULL;
    greaterHead = greaterTail = (Node *) malloc(sizeof(Node));
    greaterTail->next = NULL;

    Node *cur = head;
    while (cur != NULL) {
        if (cur->data < x) {
            lessTail->next = cur;
            lessTail = cur;
        } else {
            greaterTail->next = cur;
            greaterTail = cur;
        }
        cur = cur->next;
    }
    // 将两个链表拼接
    lessTail->next = greaterHead->next;
    // 注意此处，没有该句会造成死循环；如 {3,15,4},9，15 指向 4
    greaterTail->next = NULL;

    Node *node = lessHead->next;
    free(lessHead);
    free(greaterHead);
    return node;
}
```

## 判断链表是否为回文结构

```c
// #include <stdbool.h>

/**
 * 检测链表是否为回文结构
 * @param head
 * @return bool
 */
bool isPalindrome(Node *head) {
    // 思路：根据回文结构，可以找到中间结点，分成两个链表，然后翻转后者，依次比较即可
    // 翻转后两链表的尾结点最终均指向中间结点
    Node *mid = middleNode(head);
    Node *rHead = reverseList1(mid);

    Node *curL = head, *curR = rHead;
    while (curL != NULL && curR != NULL) {
        if (curL->data != curR->data) {
            return false;
        }
        curL = curL->next;
        curR = curR->next;
    }
    return true;
}
```

## 链表交点

```c
/**
 * 找到两链表相交的结点
 * @param headA
 * @param headB
 * @return
 */
Node *getIntersectionNode(Node *headA, Node *headB) {
    // 思路1：暴力求解（穷举），O(N * M)
    // 思路2：1.判断相交：尾结点是否相同
    //       2.求交点：得到长度后，长链表先走，消去长度差，则首个相同的结点就是交点

    // 先判断是否相交，同时求出两链表长度
    Node *tailA = headA, *tailB = headB;
    int lenA = 1, lenB = 1;
    while (tailA->next) {
        tailA = tailA->next;
        lenA++;
    }
    while (tailB->next) {
        tailB = tailB->next;
        lenB++;
    }
    // 不相交
    if (tailA != tailB) {
        return NULL;
    }

    // 接下来找到相交的结点
    int gap = abs(lenA - lenB); // 长度差
    Node *longList = lenA > lenB ? headA : headB;
    Node *shortList = lenA < lenB ? headA : headB;

    // 消去长度差
    while (gap--) {
        longList = longList->next;
    }

    // 找到相等的结点
    while (longList != shortList) {
        longList = longList->next;
        shortList = shortList->next;
    }
    return longList;
}
```

## 判断链表带环

```c
/**
 * 判断链表上是否有环
 * @param head
 * @return 有环则为 相遇结点，否则为 NULL
 */
Node *hasCycle(Node *head) {
    // 思路：快慢指针 slow, fast，slow 每次走 1 步，fast 每次走 2 步
    // 如果没有环，fast 最终会为 NULL。
    // 若有环，当 slow 进入环时，看成 fast 追赶 slow。由于 fast 始终比 slow 快 1 步，存在某时刻两指针相遇
    Node *slow = head, *fast = head;
    while (fast != NULL && fast->next != NULL) {
        slow = slow->next;
        fast = fast->next->next;
        // 相遇
        if (slow == fast) {
            return slow;
        }
    }
    return NULL;
}
```

### 求环的入口结点

```c
/**
 * 获取带环链表中进入环的入口结点
 * @param head
 * @return
 */
Node *getCycleEntry1(Node *head) {
    Node *meetNode = hasCycle(head);
    if (!meetNode) return NULL;

    // 提示：可以证明：若有两个指针 p1,p2，p1 从 head 出发，p2 从相遇结点出发，则它们会在环的入口相遇
    while (meetNode != head) {
        meetNode = meetNode->next;
        head = head->next;
    }
    return head;
}

/**
 * 同样是求环的入口，但是另一种实现
 * @param head
 * @return
 */
Node *getCycleEntry2(Node *head) {
    // 思路2：找到相遇结点 meet，分别以 head 和 meet->next 为头，求出交点
    Node *meet = hasCycle(head);
    if (!meet) return NULL;

    return getIntersectionNode(head, meet->next);
}
```

## 复制带随机指针的链表

```c
typedef struct ListNode {
    int data;
    struct ListNode *next; // 指向下一结点的指针
    struct ListNode *random; // 随机指向另一结点
} Node;
```

```c
/**
 * 复制带随机指针的链表
 *
 * https://leetcode.cn/problems/copy-list-with-random-pointer/
 * @param head
 * @return
 */
Node *copyList(Node *head) {
    // 思路：1.复制结点，插入到原结点和下一结点之间
    // 设 cur 为原链表的当前结点，则 cur->next 就是复制出来的新结点，
    // 同理，cur->random 是原结点的 random 域，cur->random->next 就对应复制出来的
    // 2.接下来处理这样处理即可：cur->next->random = cur->random->next
    // 以上建立了对应的 random 的关系
    // 3.最后把复制的结点拆下来，链接成新链表，恢复原链表

    Node *cur = head;
    // 1.复制结点并插入原链表
    while (cur) {
        // 申请空间并插在原结点之后
        Node *copy = (Node *) malloc(sizeof(Node));
        copy->data = cur->data;
        copy->next = cur->next;
        cur->next = copy;

        // 跳到原结点的下一结点
        cur = copy->next;
    }

    // 2.更新 random 域
    cur = head;
    while (cur) {
        Node *copy = cur->next;
        copy->random = cur->next ? cur->next->random : NULL;
        cur = copy->next;
    }

    // 3.拆解链表
    cur = head;
    Node *copyHead = NULL, *copyTail = NULL; // 要用到尾插，避免找尾结点
    while (cur) {
        Node *copy = cur->next;
        Node *next = copy->next; // 原链表本身的下一结点

        if (copyTail == NULL) {
            // 此处初始化
            copyHead = copyTail = copy;
        } else {
            // 将复制结点尾插到新的链表
            copyTail->next = copy;
            copyTail = copy;
        }

        // 恢复原链表
        cur->next = next;
        cur = next;
    }
    return copyHead;
}
```
