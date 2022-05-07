---
icon: markdown
title: Markdown基本使用
slug: markdown-intro
date: 2022-01-22
# permalinkPattern: :year/:month/:day/markdown-intro.html
permalink: /article/markdown-intro.html
description: Markdown基本使用
lastUpdated: 2022-02-24
category: 使用指南
tag:
  - markdown
# layout: CustomLayout
---


<CurrentPageData/>
# Markdown基本使用

# 1号标题

简单介绍Markdown的基本使用以及在VuePress中的拓展

<!-- more -->

::: info INFO

s

:::

## 二号标题

### 三号

#### 四号



# 1号标题

## 二号标题

### 三号

#### 四号



### 数学公式

$$ \frac 12 \int_a^b f(x)dx $$

## Vuepress中的特殊用法

### 导入代码

@[code vue](../../custom/components/client/CurrentPageData.vue)

:::: code-group
::: code-group-item linux
```bash
mkdir docs && echo '# Hello VitePress' > docs/index.md
```
:::
::: code-group-item windows
```bash
md docs && echo # Hello VitePress > docs/index.md
```
:::
::::



::: tip
这是一个提示
:::

::: warning
这是一个警告
:::

::: danger
这是一个危险警告
:::

::: details
这是一个 details 标签
:::



## 使用Vue SFC

#### 使用 `$page`：

```md
{{ $page }}
```

输出：

::: details 查看输出结果

```md :no-v-pre :no-line-numbers
{{ $page }}
```

:::

#### 使用 `$frontmatter`

`$frontmatter` 是 `$page.fontmatter` 的引用缩写

输入：

```md
{{ $frontmatter }}
```

::: details 查看输出结果

```md :no-v-pre :no-line-numbers
{{ $frontmatter }}
```

:::



## 一键启用

你可以设置 `themeconfig.mdEnhance.enableAll` 启用 [md-enhance](https://vuepress-theme-hope.github.io/md-enhance) 插件的所有功能。

```js {3-5}
module.exports = {
  themeConfig: {
    mdEnhance: {
      enableAll: true,
    },
  },
};
```

## 其他语法

### 脚注

此文字有脚注[^first].

[^first]: 这是脚注内容

::: details 代码

```md
此文字有脚注[^first].

[^first]: 这是脚注内容
```

:::

### Tex 语法

$$
\frac {\partial^r} {\partial \omega^r} \left(\frac {y^{\omega}} {\omega}\right)
= \left(\frac {y^{\omega}} {\omega}\right) \left\{(\log y)^r + \sum_{i=1}^r \frac {(-1)^i r \cdots (r-i+1) (\log y)^{r-i}} {\omega^i} \right\}
$$

::: details 代码

```latex
$$
\frac {\partial^r} {\partial \omega^r} \left(\frac {y^{\omega}} {\omega}\right)
= \left(\frac {y^{\omega}} {\omega}\right) \left\{(\log y)^r + \sum_{i=1}^r \frac {(-1)^i r \cdots (r-i+1) (\log y)^{r-i}} {\omega^i} \right\}
$$
```

:::

[点击查看](https://vuepress-theme-hope.github.io/zh/guide/markdown/tex/)

### 代码案例



```html
<h1>Mr.Hope</h1>
<p><span id="very">十分</span> 帅</p>
```

```js
document.querySelector("#very").addEventListener("click", () => {
  alert("十分帅");
});
```

```css
span {
  color: red;
}
```



````md
::: demo 一个普通 Demo

```html
<h1>Mr.Hope</h1>
<p><span id="very">十分</span> 帅</p>
```

```js
document.querySelector("#very").addEventListener("click", () => {
  alert("十分帅");
});
```

```css
span {
  color: red;
}
```

:::
````



```js
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { message: "十分帅" };
  }
  render() {
    return (
      <div className="box-react">
        Mr.Hope <span>{this.state.message}</span>
      </div>
    );
  }
}
```

```css
.box-react span {
  color: red;
}
```



::: details 代码

````md
::: demo [react] 一个 React Demo

```js
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { message: "十分帅" };
  }
  render() {
    return (
      <div className="box-react">
        Mr.Hope <span>{this.state.message}</span>
      </div>
    );
  }
}
```

```css
.box-react span {
  color: red;
}
```

:::
````

:::

```vue
<template>
  <div class="box">
    Mr.Hope <span>{{ message }}</span>
  </div>
</template>
<script>
export default {
  data: () => ({ message: "十分帅" }),
};
</script>
<style>
.box span {
  color: red;
}
</style>
```



````md
::: demo [vue] 一个 Vue Demo

```vue
<template>
  <div class="box">
    Mr.Hope <span>{{ message }}</span>
  </div>
</template>
<script>
export default {
  data: () => ({ message: "十分帅" }),
};
</script>
<style>
.box span {
  color: red;
}
</style>
```

:::
````



```md
# 标题

十分帅
```

```ts
const message: string = "Mr.Hope";

document.querySelector("h1").innerHTML = message;
```

```scss
h1 {
  font-style: italic;

  + p {
    color: red;
  }
}
```



[点击查看](https://vuepress-theme-hope.github.io/zh/guide/markdown/demo/)



- 列表 1
- 列表 2

---



## 其他语法

::: tip 自定义标题
提示容器
:::

::: warning 自定义标题

警告容器

:::

::: danger 自定义标题

危险容器

:::

::: details 自定义标题

详情容器

:::

:::: details 代码

```md
::: info 自定义标题

信息容器

:::

::: tip 自定义标题

提示容器

:::

::: warning 自定义标题

警告容器

:::

::: danger 自定义标题
危险容器
:::

::: details 自定义标题
详情容器
:::
```

::::

### 使用gravizo

```html
<img src='https://g.gravizo.com/svg?
digraph G {
   main -> parse -> execute;
   main -> init;
   main -> cleanup;
   execute -> make_string;
   execute -> printf
   init -> make_string;
   main -> 是的;
   execute -> compare;
}'/>
```

结果：

<img src='https://g.gravizo.com/svg?
digraph G {
   main -> parse -> execute;
   main -> init;
   main -> cleanup;
   execute -> make_string;
   execute -> printf
   init -> make_string;
   main -> 是的;
   execute -> compare;
}'/>

此外，还可以使用 `embed` 、`iframe` 等嵌入。但如果不指定宽度，其在手机端会超过屏幕宽度。

```html
<embed src="https://g.gravizo.com/svg?
 digraph G {
   main -> parse -> execute;
   main -> init;
   main -> cleanup;
   execute -> make_string;
   execute -> printf
   init -> make_string;
   main -> 是的;
   execute -> compare;
 }" type="image/svg+xml"/>
```



```html
<img src='https://g.gravizo.com/svg?
@startuml;
;
actor User;
participant "First Class" as A;
participant "Second Class" as B;
participant "Last Class" as C;
;
User -> A: DoWork;
activate A;
;
A -> B: Create Request;
activate B;
;
B -> C: DoWork;
activate C;
;
C --> B: WorkDone;
destroy C;
;
B --> A: Request Created;
deactivate B;
;
A --> User: Done;
deactivate A;
;
@enduml
'>
```



<img src='https://g.gravizo.com/svg?
@startuml;
;
actor User;
participant "First Class" as A;
participant "Second Class" as B;
participant "Last Class" as C;
;
User -> A: DoWork;
activate A;
;
A -> B: Create Request;
activate B;
;
B -> C: DoWork;
activate C;
;
C --> B: WorkDone;
destroy C;
;
B --> A: Request Created;
deactivate B;
;
A --> User: Done;
deactivate A;
;
@enduml
'>

### 流程图

```flow
start=>start: 接收到消息
info=>operation: 读取信息
setCache=>operation: 更新缓存
end=>end: 处理结束
start->info->setCache->end
```

```flow
st=>start: Start
op=>operation: Your Operation
cond=>condition: Yes or No?
e=>end
st->op->cond
cond(yes)->e
cond(no)->op
```



