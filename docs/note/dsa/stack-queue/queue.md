---
icon: mdi:queue-first-in-last-out
date: 2022-08-10
modified: 2026-03-23
order: 2
category:
    - 数据结构
tag:
    - 队列
    - c语言
next: ./q.md
---

# 数据结构 - 队列

## 队列

数据结构

```c
#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>
#include <assert.h>

typedef int QDataType;

// 由于队列是 FIFO(先进先出)，采用数组会移动数据，故采用单链表(带头结点)
typedef struct QueueNode {
    QDataType data;
    struct QueueNode *next;
} QueueNode;

// 队列需要控制队头和队尾两个指针，单独用一个结构体存放
typedef struct Queue {
    QueueNode *head; // 队头
    QueueNode *tail; // 队尾
} Queue;
```

## 接口申明

```c
// 因为队头、队尾指针都存储在结构体中，改变它俩的指向使用值传递就能做到，故不用二级指针
// 如果参数不用结构体 (Queue *pq)，则需传二级指针 (QueueNode **pHead, QueueNode **pTail)

/**
 * 初始化队列
 * @param pq 队列指针
 */
void QueueInit(Queue *pq);

/**
 * 销毁队列
 * @param pq 队列指针
 */
void QueueDestroy(Queue *pq);

/**
 * 打印队列
 * @param pq 队列指针
 */
void QueuePrint(Queue *pq);

/**
 * 入队
 * @param pq 队列指针
 * @param x 入队元素的值
 */
void QueuePush(Queue *pq, QDataType x);

/**
 * 出队
 * @param pq 队列指针
 */
void QueuePop(Queue *pq);

/**
 * 获取队头的值
 * @param pq 队列指针
 * @return
 */
QDataType QueueFront(Queue *pq);

/**
 * 获取队尾的值
 * @param pq 队列指针
 * @return
 */
QDataType QueueBack(Queue *pq);

/**
 * 队列长度
 * @param pq 队列指针
 * @return
 */
int QueueSize(Queue *pq);

/**
 * 队列是否为空
 * @param pq 队列指针
 * @return
 */
bool QueueEmpty(Queue *pq);
```

## 实现

### 初始化与销毁

```c
void QueueInit(Queue *pq) {
    assert(pq);
    pq->head = NULL;
    pq->tail = NULL;
}

void QueueDestroy(Queue *pq) {
    assert(pq);
    QueueNode *cur = pq->head;
    // 从头开始删，注意结束条件不是 cur != pq->tail
    while (cur != NULL) {
        QueueNode *next = cur->next;
        free(cur);
        cur = next;
    }
    pq->head = pq->tail = NULL;
}
```

### 入队与出队

```c
void QueuePush(Queue *pq, QDataType x) {
    assert(pq);
    // 入队相当于链表的尾插
    QueueNode *node = (QueueNode *) malloc(sizeof(QueueNode));
    node->data = x;
    node->next = NULL;

    // 如果队列为空，还要处理头指针
    if (pq->head == NULL) {
        pq->head = pq->tail = node;
    } else { // 一般情况
        pq->tail->next = node;
        pq->tail = node;
    }
}

void QueuePop(Queue *pq) {
    assert(pq);
    assert(!QueueEmpty(pq));
    // 出队相当于链表的头删
    QueueNode *next = pq->head->next;
    free(pq->head);
    pq->head = next;
    // 注意只有 1 个结点的情况，删除结点后还需处理 tail 指针
    if (pq->head == NULL) {
        pq->tail = NULL;
    }
}

QDataType QueueFront(Queue *pq) {
    assert(pq);
    assert(!QueueEmpty(pq));
    return pq->head->data;
}

QDataType QueueBack(Queue *pq) {
    assert(pq);
    assert(!QueueEmpty(pq));
    return pq->tail->data;
}
```

### 队列的遍历

```c
void QueuePrint(Queue *pq) {
    QueueNode *cur = pq->head;
    printf("head-->");
    while (cur != NULL) {
        printf(" %d %s--", cur->data, cur->next != NULL ? "" : "<");
        cur = cur->next;
    }
    printf("tail\n");
}

int QueueSize(Queue *pq) {
    assert(pq);
    int len = 0;
    QueueNode *cur = pq->head;
    while (cur) {
        len++;
        cur = cur->next;
    }
    return len;
}
```

### 队列判空

```c
bool QueueEmpty(Queue *pq) {
    assert(pq);
    return pq->head == NULL;
}
```
