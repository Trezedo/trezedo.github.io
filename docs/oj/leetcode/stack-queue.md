---
icon: ph:stack-minus-bold
date: 2022-12-31
modified: 2026-03-23
category:
    - 数据结构
    - leetcode
tag:
    - 队列
    - 栈
---

# 栈与队列

## 栈

中缀转后缀，逆波兰式

1.添括号：对每个数学运算都加上括号 ​

2.移运算：将运算符移到对应的括号外边（顺序任意）：

3.去括号：将所有括号去掉：​

表达式 `a+b*c-(d+e)/f`  的后缀表达式为 `abc*+de+f/-`

[20. 有效的括号 - LeetCode](https://leetcode.cn/problems/valid-parentheses/)

```cpp
class Solution {
public:
    static bool isValid(const string &s) {
        stack<char> stack;
        for (char ch: s) {
            if (ch == '(' || ch == '[' || ch == '{') {
                stack.push(ch);
            } else {
                if (stack.empty()) {
                    return false; // 右括号多
                }
                char top = stack.top();
                if ((top == '(' && ch == ')') || (top == '[' && ch == ']') || (top == '{' && ch == '}')) {
                    stack.pop(); // 匹配则弹出元素
                } else {
                    return false; // 不匹配
                }
            }
        }
        if (!stack.empty()) { // 左括号多
            return false;
        }
        return true;
    }
};
```

[155. 最小栈 - leetcode](https://leetcode.cn/problems/min-stack/)

```cpp
class MinStack {
private:
    stack<int> stack, minStack;
public:
    MinStack() = default;

    void push(int val) {
        stack.push(val);
        if (minStack.empty() || val <= minStack.top()) {
            // 栈空，或者 val 不大于栈顶元素时入栈
            minStack.push(val);
        }
    }

    void pop() {
        if (stack.top() == minStack.top()) {
            minStack.pop(); // minStack 仅当两栈栈顶相等时才出栈
        }
        stack.pop();
    }

    int top() {
        return stack.top();
    }

    int getMin() {
        return minStack.top();
    }
};
```

[232. 用栈实现队列 - LeetCode](https://leetcode.cn/problems/implement-queue-using-stacks/)

```cpp
class MyQueue {
private:
    stack<int> inStack, outStack; // 分别用于入栈和出栈

    static void transfer(stack<int> &from, stack<int> &to) {
        while (!from.empty()) {
            to.push(from.top());
            from.pop();
        }
    }

public:
    MyQueue() = default;

    void push(int x) {
        inStack.push(x);
    }

    int pop() {
        if (empty()) return -1;
        int top = peek();
        outStack.pop(); // 出栈
        return top;
    }

    int peek() {
        if (empty()) { // 没有元素
            return -1;
        }
        if (outStack.empty()) { // 栈2 为空，将栈1 全部移到 栈2
            transfer(inStack, outStack);
        }
        // 返回栈顶元素
        return outStack.top();
    }

    bool empty() {
        return inStack.empty() && this->outStack.empty();
    }
};
```

[225. 用队列实现栈 - LeetCode](https://leetcode.cn/problems/implement-stack-using-queues/)
