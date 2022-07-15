---
date: 2022-03-26
title: 记录 js 常用的函数
---

## 数字

### 取整

下取整，即 $\lfloor x \rfloor$ ：

```ts
// 位运算符
const floor = (n: number) => ~~n;

// 还可以使用 Math.floor("1.25")
```

上取整，即 $\lceil x \rceil$ ：

```ts
const ceil = (n: number) => Math.ceil(n);
// Math.ceil("1.25")
```

### 保留指定的小数位

```ts
const toFixed = (n, fixed) => ~~(Math.pow(10, fixed) * n) / Math.pow(10, fixed);
toFixed(25.198726354, 1); // 25.1
toFixed(25.198726354, 2); // 25.19
toFixed(25.198726354, 3); // 25.198
toFixed(25.198726354, 4); // 25.1987
toFixed(25.198726354, 5); // 25.19872
toFixed(25.198726354, 6); // 25.198726
```

### 获取所有参数的平均值

可以使用 `reduce()` 函数来计算所有参数的平均值

```js
const average = (...args) => args.reduce((a, b) => a + b) / args.length;
average(1, 2, 3, 4);
// Result: 2.5
```

## 字符串

### 重复 n 次

1. 递归，结合三元表达式

    ```ts
    function repeat1(str: string, num: number): string {
        return num > 1 ? (str += repeat1(str, --num)) : str;
    }
    console.log(repeat1("abc", 3));
    ```

2. 数组的 `join` 方法

    ```ts
    function repeat2(str: string, num: number) {
        return new Array(num + 1).join(str);
    }
    console.log(repeat2("abc", 3));
    ```

3. ES6 的 `repeat` 方法

    ```ts
    // ES6 String.repeat
    function repeat3(str: string, num: number) {
        return num > 1 ? str.repeat(num) : str;
    }
    console.log(repeat3("abc", 3));
    ```

### 格式化 JSON

```ts
// obj 可以是个对象、数组
JSON.stringify(obj, null, " ".repeat(4));
```

### 反转字符串

```ts
function reverse(str: string) {
    return str.split("").reverse().join("");
}
reverse("hello world");
// Result: 'dlrow olleh'
```

## 对象

### 获取时间

```ts
const timeFromDate = (date: Date) => date.toTimeString().slice(0, 8);
console.log(timeFromDate(new Date(2022, 4, 26, 12, 30, 15)));
// Result: "12:30:15"
console.log(timeFromDate(new Date()));
// Result: 返回当前时间
console.log(new Date(2022, 4, 26, 12, 30, 15));
// Thu May 26 2022 12:30:15 GMT+0800 (中国标准时间)
```

## 界面

### 滚动至页面顶部

`window.scrollTo()` 会滚动至指定的坐标，如果设置坐标为（0，0），就会回到页面顶部

```js
const goToTop = () => window.scrollTo(0, 0);
goToTop();
// Result: 将会滚动至顶部
```

### 判断标签页是否激活

浏览器可以打开很多标签页，下面的代码可以判断当前标签页是否是激活：

```ts
const isTabActive = () => document.hidden;
isTabActive();
```

### 检查元素是否聚焦

可以使用 `document.activeElement` 来判断元素是否处于聚焦状态

```js
const elementIsInFocus = (el) => el === document.activeElement;
elementIsInFocus(anyElement);
// Result: 如果处于焦点状态会返回 True 否则返回 False
```

### 检查是否支持触摸

```js
const touchSupported = () => {
    "ontouchstart" in window ||
        (window.DocumentTouch && document instanceof window.DocumentTouch);
};
console.log(touchSupported());
// Result: 如果支持触摸事件会返回 True 否则返回 False
```

### 检查是否为苹果设备

可以使用 `navigator.platform` 判断当前用户是否是苹果设备

```js
const isAppleDevice = /Mac|iPod|iPhone|iPad/.test(navigator.platform);
console.log(isAppleDevice);
// Result: 是苹果设备会返回 True
```
