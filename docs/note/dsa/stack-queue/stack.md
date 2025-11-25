---
date: 2022-08-10
icon: game-icons:stack
category:
    - 数据结构
    - 线性表
tag:
    - 栈
    - C语言
order: 1
---

# 数据结构 - 栈

## 栈

数据结构

```c
#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>
#include <assert.h>

// 栈可以用数组或链表来存取数据，数组更优，因此这里用数组实现
typedef int SDataType;
typedef struct Stack {
    SDataType *arr;
    int top; // 栈顶
    int capacity; // 容量
} Stack;
```

## 接口申明

这里的函数名全部都以 `Stack` 开头。

```c
/**
 * 栈初始化
 * @param ps 栈指针
 */
void StackInit(Stack *ps);

/**
 * 是否栈空
 * @param ps 栈指针
 */
bool StackEmpty(Stack *ps);

/**
 * 栈的大小
 * @param ps 栈指针
 */
int StackSize(Stack *ps);

/**
 * 销毁栈
 * @param ps 栈指针
 */
void StackDestroy(Stack *ps);

/**
 * 入栈
 * @param ps 栈指针
 * @param x 入栈元素的值
 */
void StackPush(Stack *ps, SDataType x);

/**
 * 出栈
 * @param ps 栈指针
 */
void StackPop(Stack *ps);

/**
 * 栈顶元素的值
 * @param ps 栈指针
 */
SDataType StackTop(Stack *ps);
```

## 实现

### 初始化

```c
void StackInit(Stack *ps) {
    assert(ps);
    ps->arr = NULL;
    ps->top = 0; // 指向栈顶的下一位；也可取 -1，指向栈顶元素
    ps->capacity = 0;
}
```

### 栈的大小

```c
bool StackEmpty(Stack *ps) {
    assert(ps);
    return ps->top == 0;
}

int StackSize(Stack *ps) {
    assert(ps);
    return ps->top;
}
```

### 出入栈

```c
void StackPush(Stack *ps, SDataType x) {
    assert(ps);
    // 栈满的情况，扩容
    if (ps->top == ps->capacity) {
        int newCapacity = ps->capacity ? ps->capacity * 2 : 4;
        SDataType *tmp = (SDataType *) realloc(ps->arr, sizeof(SDataType) * newCapacity);
        if (tmp == NULL) {
            printf("realloc failed !\n");
            exit(-1);
        }
        ps->arr = tmp;
        ps->capacity = newCapacity;
    }
    ps->arr[ps->top] = x;
    ps->top++;
}

void StackPop(Stack *ps) {
    assert(ps);
    assert(!StackEmpty(ps));
    ps->top--;
}
```

```c
SDataType StackTop(Stack *ps) {
    assert(ps);
    assert(!StackEmpty(ps));
    return ps->arr[ps->top - 1];
}
```

### 销毁栈

```c
void StackDestroy(Stack *ps) {
    assert(ps);
    free(ps->arr);
    ps->arr = NULL;
    ps->capacity = ps->top = 0;
}
```
