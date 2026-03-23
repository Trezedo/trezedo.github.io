---
icon: tabler:exchange-filled
date: 2022-08-09
modified: 2026-03-23
order: 3
category:
    - 数据结构
tag:
    - 链表
    - c语言
next: ../stack-queue/README.md
---

# 数据结构 - 双向链表

这里我们主要介绍的是链表中最复杂的结构：循环双向链表 (Circular Doubly Linked List)

数据结构：

```c
#include <stdio.h>
#include <stdlib.h>
#include <assert.h>

typedef int DataType;
typedef struct CDList {
    DataType data;
    struct CDList *prev; // 指向上一结点
    struct CDList *next; // 指向下一结点
} Node;
```

接口申明：

```c
// 因为链表带头结点，不会修改头指针，只会修改头指针指向的结构体的值，故不需要二级指针

/**
 * 初始化循环双向链表
 * @return 链表头指针
 */
Node *InitList();

/**
 * 打印链表
 * @param head 链表头指针
 */
void Print(Node *head);

/**
 * 创建结点
 * @param x 结点的值
 * @return 结点指针
 */
Node *createNode(DataType x);

/**
 * 尾插
 *
 * @param head 头指针
 * @param x 插入结点的值
 */
void PushBack(Node *head, DataType x);

/**
 * 尾删
 * @param head 头指针
 */
void PopBack(Node *head);

/**
 * 头插
 * @param head 头指针
 * @param x 插入结点的值
 */
void PushFront(Node *head, DataType x);

/**
 * 头删
 * @param head 头指针
 */
void PopFront(Node *head);

/**
 * 按值查找结点
 * @param head 头指针
 * @param val 查找的值
 * @return 结点指针
 */
Node *Find(Node *head, DataType val);

/**
 * 在指定结点之前插入新结点
 * @param pos 指定结点
 * @param x 新结点的值
 */
void InsertBefore(Node *pos, DataType x);

/**
 * 删除指定结点之后的结点
 *
 * 若要删除指定结点，还需判断是否为头结点
 * @param pos 指定结点
 */
void DeleteAfter(Node *pos);

/**
 * 销毁链表
 *
 * 为避免野指针隐患，传入二级指针
 * @param head 头指针
 */
void Destroy(Node **head);
```

## 接口实现

### 初始化

```c
Node *InitList() {
    // 头指针指向哨兵位的头结点
    Node *head = (Node *) malloc(sizeof(Node));
    // 由于循环双向链表的结构，头结点的 prev 和 next 都是自己
    head->next = head;
    head->prev = head;
    return head;
}

Node *createNode(DataType x) {
    Node *node = (Node *) malloc(sizeof(Node));
    node->data = x;
    node->prev = NULL; // 不必但建议
    node->next = NULL;
    return node;
}
```

同样地，遍历双向循环链表并打印值：

```c
void Print(Node *head) {
    assert(head);
    // 由于头结点不存放有效数据，故应该从 head->next 开始遍历
    Node *cur = head->next;
    printf("head <--> ");
    // 由于是循环链表，遍历结束的条件不是判空，而是判断 next 域是否与 head 相等
    while (cur != head) {
        printf("%d <--> ", cur->data);
        cur = cur->next;
    }
    printf("head\n");
}
```

### 插入

```c
// 尾插
void PushBack(Node *head, DataType x) {
    assert(head);
    // 可直接调用 InsertBefore(head, x);

    Node *newNode = createNode(x);
    Node *tail = head->prev; // 尾结点

    // 换头换尾
    tail->next = newNode;
    newNode->prev = tail;
    newNode->next = head;
    head->prev = newNode;
}

// 头插
void PushFront(Node *head, DataType x) {
    assert(head);
    // 可直接调用 InsertBefore(head->next, x);

    Node *newNode = createNode(x);
    Node *first = head->next; // 首结点

    first->prev = newNode;
    newNode->next = first;
    newNode->prev = head;
    head->next = newNode;
}
```

### 删除

```c
// 尾删
void PopBack(Node *head) {
    assert(head);
    // 需要判空，否则会把头结点删除
    assert(head->next != head);

    Node *tail = head->prev;
    Node *tailPrev = tail->prev; // 可不定义，但定义后意义更明确，且不需在意 free 的顺序

    head->prev = tailPrev;
    tailPrev->next = head;
    free(tail);
}

// 头删
void PopFront(Node *head) {
    assert(head);
    // 与尾删类似，判空
    assert(head->next != head); // 等价 head->prev != head

    Node *first = head->next;
    Node *firstNext = first->next;

    firstNext->prev = head;
    head->next = firstNext;
    free(first);
}
```

### 查找

```c
Node *Find(Node *head, DataType val) {
    assert(head);
    // 与 Print 函数类似
    Node *cur = head->next;
    while (cur != head) {
        if (cur->data == val) {
            return cur;
        }
        cur = cur->next;
    }
    return NULL;
}
```

因为找到结点之后我们得到的是指针，要修改结点的值是容易的。我们可以实现在结点之前插入另一结点，以及删除某结点的后一结点：

```c
void InsertBefore(Node *pos, DataType x) {
    assert(pos);
    Node *posPrev = pos->prev;
    Node *newNode = createNode(x);

    posPrev->next = newNode;
    newNode->prev = posPrev;
    newNode->next = pos;
    pos->prev = newNode;
}

void DeleteAfter(Node *pos) {
    // 实际上该函数有一定风险，因为没判断 pos 是否为头结点
    assert(pos);

    Node *next = pos->next;
    Node *nextNext = next->next;

    pos->next = nextNext;
    nextNext->prev = pos;
    free(next);
}
```

### 销毁

```c
void Destroy(Node **head) {
    assert(*head);

    Node *cur = (*head)->next;
    // 先释放非头结点
    while (cur->next != *head) {
        Node *next = cur->next;
        free(cur);
        cur = next;
    }
    // 释放头结点
    free(*head);
    *head = NULL;
}
```
