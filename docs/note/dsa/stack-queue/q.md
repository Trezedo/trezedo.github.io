---
date: 2022-08-11
icon: ph:stack-overflow-logo-bold
category:
    - 数据结构
    - 线性表
tag:
    - 栈
    - 队列
    - C语言
order: 3
next: "../tree/README.md"
---

# 栈和队列习题

## 用队列实现栈

[225. 用队列实现栈](https://leetcode.cn/problems/implement-stack-using-queues/)

```c
// 定义匿名结构体为 MyStack 类型
typedef struct {
    Queue q1;
    Queue q2;
} MyStack;


MyStack *myStackCreate() {
    MyStack *stack = (MyStack *) malloc(sizeof(MyStack));
    QueueInit(&stack->q1);
    QueueInit(&stack->q2);
    return stack;
}

void myStackPush(MyStack *obj, int x) {
    //
    if (!QueueEmpty(&obj->q1)) {
        QueuePush(&obj->q1, x);
    } else {
        QueuePush(&obj->q2, x);
    }
}

int myStackPop(MyStack *obj) {
    // 先区分为空队列和非空队列
    Queue *emptyQ = &obj->q1;
    Queue *nonEmptyQ = &obj->q2;
    if (!QueueEmpty(&obj->q1)) {
        emptyQ = &obj->q2;
        nonEmptyQ = &obj->q1;
    }

    // 将非空队列不断出队，进入另一个队列，最后那个就是要出栈的元素
    while (QueueSize(nonEmptyQ) > 1) {
        QueuePush(emptyQ, QueueFront(nonEmptyQ));
        QueuePop(nonEmptyQ);
    }
    // 剩下最后一个元素，相当于栈顶
    int top = QueueFront(nonEmptyQ);
    QueuePop(nonEmptyQ);
    return top;
}

int myStackTop(MyStack *obj) {
    // 取非空队列的队尾
    if (!QueueEmpty(&obj->q1)) {
        return QueueBack(&obj->q1);
    } else {
        return QueueBack(&obj->q2);
    }
}

bool myStackEmpty(MyStack *obj) {
    return QueueEmpty(&obj->q1) && QueueEmpty(&obj->q2);
}

void myStackFree(MyStack *obj) {
    // 释放两个队列的空间
    QueueDestroy(&obj->q1);
    QueueDestroy(&obj->q2);
    // 释放存放两个队列的结构体
    free(obj);
}
```

## 用栈实现队列

[232. 用栈实现队列](https://leetcode.cn/problems/implement-queue-using-stacks/)

```c
typedef struct {
    Stack stackPush;
    Stack stackPop;
} MyQueue;


MyQueue *myQueueCreate() {
    MyQueue *q = (MyQueue *) malloc(sizeof(MyQueue));
    StackInit(&q->stackPush);
    StackInit(&q->stackPop);
    return q;
}

void myQueuePush(MyQueue *obj, int x) {
    // 直接在 stackPush 入队
    StackPush(&obj->stackPush, x);
}

/**
 * 从 source 栈转移到 target 栈
 * @param source
 * @param target
 */
void transfer(Stack *source, Stack *target) {
    assert(source);
    assert(target);
    assert(source != target);

    while (!StackEmpty(source)) {
        StackPush(target, StackTop(source));
        StackPop(source);
    }
}

int myQueuePop(MyQueue *obj) {
    // 如果 stackPop 有数据，直接出栈
    // 否则就先把 stackPush 导入 stackPop 再出栈
    if (StackEmpty(&obj->stackPop)) {
        // 如果 stackPush 不为空，先搬到 stackPop，保持出队顺序
        transfer(&obj->stackPush, &obj->stackPop);
    }
    // 在 stackPop 出队
    int front = StackTop(&obj->stackPop);
    StackPop(&obj->stackPop);
    return front;
}

int myQueuePeek(MyQueue *obj) {
    // 如果 stackPop 非空，直接返回栈顶元素，否则就先把 stackPush 导过去，保证入队顺序，再返回栈顶元素
    if (StackEmpty(&obj->stackPop)) {
        transfer(&obj->stackPush, &obj->stackPop);
    }
    return StackTop(&obj->stackPop);
}

bool myQueueEmpty(MyQueue *obj) {
    return StackEmpty(&obj->stackPush) && StackEmpty(&obj->stackPop);
}

void myQueueFree(MyQueue *obj) {
    StackDestroy(&obj->stackPush);
    StackDestroy(&obj->stackPop);
    free(obj);
}
```

## 循环队列

[622. 设计循环队列](https://leetcode.cn/problems/design-circular-queue/)

```c
typedef int DataType;
typedef struct {
    DataType *arr;
    int front;
    int tail;
    int size; // 容量
} MyCircularQueue;


bool myCircularQueueIsEmpty(MyCircularQueue *obj);

bool myCircularQueueIsFull(MyCircularQueue *obj);


// 具体实现

MyCircularQueue *myCircularQueueCreate(int k) {
    MyCircularQueue *queue = (MyCircularQueue *) malloc(sizeof(MyCircularQueue));
    queue->arr = (DataType *) malloc(sizeof(DataType) * (k + 1));
    queue->size = k;
    // 初始时，数组最后一个位置不存放有效数据
    queue->front = queue->tail = 0;
    return queue;
}

bool myCircularQueueEnQueue(MyCircularQueue *obj, int value) {
    // 队满，不允许入队
    if (myCircularQueueIsFull(obj)) {
        return false;
    }

    obj->arr[obj->tail] = value;
    // 主要是 tail++，但要注意越界
    obj->tail = (obj->tail + 1) % (obj->size + 1);
    return true;
}

bool myCircularQueueDeQueue(MyCircularQueue *obj) {
    // 队空，不允许出队
    if (myCircularQueueIsEmpty(obj)) {
        return false;
    }

    // 不用管数据，只要移动指针，同样要注意越界
    obj->front = (obj->front + 1) % (obj->size + 1);
    return true;
}

int myCircularQueueFront(MyCircularQueue *obj) {
    if (myCircularQueueIsEmpty(obj)) return -1;

    return obj->arr[obj->front];
}

int myCircularQueueRear(MyCircularQueue *obj) {
    if (myCircularQueueIsEmpty(obj)) return -1;

    // 注意 tail 在 arr[0] 时，队尾在 arr[k]
    return obj->tail == 0
           ? obj->arr[obj->size]
           : obj->arr[obj->tail - 1];
    /*// 或
    int i = (obj->tail + obj->size) % (obj->size + 1);
    return obj->arr[i];*/
}

bool myCircularQueueIsEmpty(MyCircularQueue *obj) {
    return obj->front == obj->tail;
}

bool myCircularQueueIsFull(MyCircularQueue *obj) {
    return (obj->tail + 1) % (obj->size + 1) == obj->front;
}

void myCircularQueueFree(MyCircularQueue *obj) {
    // 释放手动创建的数组和头
    free(obj->arr);
    free(obj);
}
```
