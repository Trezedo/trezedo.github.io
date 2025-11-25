---
date: 2023-05-23
icon: skill-icons:typescript
---

# JS 小功能 & 技巧

## Intl 国际化 API

[`Intl`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Intl) 对象是 ECMAScript 国际化 API 的一个命名空间，它提供了如下API：

- [`Intl.Collator`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Intl/Collator) collators 的构造函数，用于启用对语言敏感的字符串比较的对象。

- [`Intl.DateTimeFormat`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat) 用于启用语言敏感的日期和时间格式的对象的构造函数。

- [`Intl.ListFormat`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Intl/ListFormat) 用于启用语言敏感的列表格式化构造函数。

- [`Intl.NumberFormat`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat) 用于启用语言敏感数字格式的对象的构造函数。

- [`Intl.PluralRules`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Intl/PluralRules) 用于启用多种敏感格式和多种语言语言规则的对象的构造函数。

- [`Intl.RelativeTimeFormat`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat) 用于语言敏感的相对时间的格式化。

```ts
const date = new Date();
let zhCN = new Intl.DateTimeFormat("zh-CN", { dateStyle: "full" }).format(date);
let itIT = new Intl.DateTimeFormat("it-IT").format(date);
let enUS = new Intl.DateTimeFormat("en-US").format(date);
let enGB = new Intl.DateTimeFormat("en-US").format(date);

console.table({
    zhCN,
    itIT,
});
```

## 退出、关闭页面前提示

当浏览器窗口关闭或者刷新时，会触发 `beforeunload` 事件。当前页面不会直接关闭，可以点击确定按钮关闭或刷新，也可以取消关闭或刷新。

某些浏览器过去在确认对话框中显示返回的字符串，从而使事件处理程序能够向用户显示自定义消息。但是此方法已被弃用，并且在大多数浏览器中不再支持。

```ts
window.onbeforeunload = (event: Event) => {
    // 取消事件
    event.preventDefault();
    // event.returnValue = false; // returnValue 已弃用
    return ""; // 返回 null 或 undefined 不会触发
};
```
