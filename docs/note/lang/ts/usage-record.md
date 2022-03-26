---
date: 2022-03-26
title: 记录 js 常用的函数
---

## 字符串

### 重复n次

1. 递归，结合三元表达式

```ts
function repeat1(str: string, num: number): string {
    return num > 1 ? str += repeat1(str, --num) : str;
}
console.log(repeat1('abc', 3));
```

2. 数组的 `join` 方法

```ts
function repeat2(str: string, num: number) {
    return new Array(num + 1).join(str);
}
console.log(repeat2('abc', 3));
```

3. ES6的 `repeat` 方法

```ts
// ES6 String.repeat
function repeat3(str: string, num: number) {
    return num > 1 ? str.repeat(num) : str;
}
console.log(repeat3('abc', 3));
```