---
date: 2022-08-08
category:
    - 数据结构
    - 线性表
tag:
    - 链表
    - C语言
prev: sequence-list.md
next: doubly-linked-list.md
---

# 数据结构 - 单链表(C 语言描述)

## 链表的表示

### 顺序表的问题及思考

问题：

1. 中间、头部的插入删除，时间复杂度为 $O(N)$；
2. 增容需要申请新空间，拷贝数据，释放旧空间。会有不小的消耗。
3. 增容一般是呈2倍的增长，势必会有一定的空间浪费。例如当前容量为100，满了以后增容到
200，我们再继续插入了5个数据，后面没有数据插入了，那么就浪费了95个数据空间。


思考：如何解决以上问题呢？下面给出了链表的结构来看看。

### 链表的概念及结构

概念：链表是一种**物理存储结构上非连续**、非顺序的存储结构，数据元素的**逻辑顺序**是通过链表中的**指针链接次序**实现的 。

![image-20220814112231167](C:\Users\zedo\AppData\Roaming\Typora\typora-user-images\image-20220814112231167.png)

![image-20220814112248911](C:\Users\zedo\AppData\Roaming\Typora\typora-user-images\image-20220814112248911.png)

实际中要实现的链表的结构非常多样，以下情况组合起来就有8种链表结构：

1. 单向、双向
2. 带头结点（哨兵位）、不带头结点
3. 循环、非循环

![image-20220814112336600](C:\Users\zedo\AppData\Roaming\Typora\typora-user-images\image-20220814112336600.png)

![image-20220814112344170](C:\Users\zedo\AppData\Roaming\Typora\typora-user-images\image-20220814112344170.png)

![image-20220814112351367](C:\Users\zedo\AppData\Roaming\Typora\typora-user-images\image-20220814112351367.png)

虽然有这么多的链表的结构，但是我们实际中最常用还是两种结构：

![image-20220814112406164](C:\Users\zedo\AppData\Roaming\Typora\typora-user-images\image-20220814112406164.png)

1. 无头单向非循环链表：**结构简单**，一般不会单独用来存数据。实际中更多是作为**其他数据结构的子结构**，如哈希桶、图的邻接表等等。这种结构在考试、笔试和面试中出现很多。
2. 带头双向循环链表：**结构最复杂**，一般用在单独存储数据。实际中使用的链表数据结构，都
    是带头双向循环链表。另外这个结构虽然结构复杂，但是使用代码实现以后会发现结构会带来很多优势，实现反而简单了，todo 后面我们代码实现了就知道了。

此篇文章我们主要实现结构最简单的无头单向非循环链表，关于双链表请看[下一篇文章](doubly-linked-list.md)。

## 单链表的实现

### 相关概念

在给出接口和实现之前，我们先给出它的结构体定义，并说明几个概念。

```c
typedef int DataType;

// 这里是不带头结点的单向链表
typedef struct ListNode {
    DataType data; // 结点存储的数据
    struct ListNode *next; // 下一结点指针
} Node;
```

|         名称         | 说明                                                         |
| :------------------: | ------------------------------------------------------------ |
|        头指针        | 链表中第一个结点的**存储位置**（地址）。                     |
|        头结点        | 1.头结点是为了操作的统一与方便而设立的，放在第一个元素结点之前，其数据域一般无意义。<br />2.如果链表有头结点，那么头指针就是指向头结点的指针。 |
| 首元结点 | 1.链表中存储第一个数据元素的结点，也叫首结点；<br />2.如果链表有头结点，则头结点之后的第一个结点就是首元结点。 |
| 尾结点 | 链表的最后一个结，一般尾结点的指针的指向为空。 |

根据链表的特点和头指针的定义可知，整个链表的存取必须是从头指针开始的。因此：

- 头结点不是链表所必需的，但头指针是链表必需的。
- 头指针具有标识作用，故常用头指针冠以链表的名字。

这里给出图示加以区分：

![img](http://images.cnitblog.com/blog/277239/201308/24055201-91e1a3475c5a45a48e680e7c01184ca1.jpg)

![img](http://images.cnitblog.com/blog/277239/201308/24061140-44d74b0b267a4d42b0f8f0dab03132fd.jpg)

有了头结点后，不论是首元结点还是普通结点，对它的删除和在它之前插入结点的操作统一起来了（下文会说明）。

### 接口

包括链表的创建、销毁和增删查改。

```c
void Print(Node *head);

/**
 * 创建结点
 * @param x
 * @return
 */
Node *createNode(DataType x);

/**
 * 尾插法
 * @param ppHead
 * @param x
 */
void PushBack(Node **ppHead, DataType x);

/**
 * 头插法
 * @param ppHead
 * @param x
 */
void PushFront(Node **ppHead, DataType x);

/**
 * 尾删法
 * @param ppHead
 */
void PopBack(Node **ppHead);

void PopBack2(Node **ppHead);

/**
 * 头删法
 * @param ppHead
 */
void PopFront(Node **ppHead);


/**
 * 查找值为 val 的结点
 * @param ppHead
 * @param val
 * @return
 */
Node *Find(Node *ppHead, DataType val);

/**
 * 在结点之后插入
 * <br>
 * 单链表更适合在后插入
 * @param pos
 * @param x
 */
void InsertAfter(Node *pos, DataType x);

/**
 * 在结点之前插入，有效率问题
 * @param ppHead
 * @param pos
 * @param x
 */
void InsertBefore(Node **ppHead, Node *pos, DataType x);

/**
 * 移除结点
 * @param ppHead
 * @param pos 待删除的结点
 */
void Delete(Node **ppHead, Node *pos);

/**
 * 删除指定结点的下一个结点
 * @param pos
 */
void DeleteAfter(Node *pos);

/**
 * 销毁链表
 * @param ppHead
 */
void Destroy(Node **ppHead);
```

::: info

这里多数接口的名称和[上一篇文章](sequence-list.md)中顺序表的一致。没有加上前缀、后缀或命名空间限定。

:::


## 顺序表和链表的对比

|  类型  | 优点                                                         | 缺点                                                         |
| :----: | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 顺序表 | 空间连续、支持随机访问                                       | 1.中间或前面部分的插入删除时间复杂度 $O(N)$； <br />2.增容的代价比较大。 |
|  链表  | 1.任意位置插入删除时间复杂度为 $O(1)$；<br />2.没有增容消耗，按需申请节点空间，不用了直接释放。 | 以节点为单位存储，不支持随机访问                             |

## 单链表的综合题

由于该部分占用了较大篇幅，且单链表是最常考察的知识点，单独写了一篇文章。
