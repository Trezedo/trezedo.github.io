---
icon: vue
slug: vue-usage
date: 2022-01-23
category:
    - VuePress
tag:
    - vue
    - VuePress
permalink: /article/sfc-in-vuepress.html
---

# 使用 Vue 组件

## 示例展示

你好， {{ msg }}
<RedDiv>
当前计数为： {{ count }}
</RedDiv>
<button @click="count++">点我！</button>

<script setup>
import { h, ref } from 'vue';
const RedDiv = (_, ctx) => h(
    'div',
    {
        class: 'red-div',
    },
    ctx.slots.default()
);
const msg = 'Markdown 中的 Vue';
const count = ref(0)
</script>

<style>
.red-div {
  color: red;
}
</style>

## 示例代码如下

```html
<template>
    <color-picker size="mini"></color-picker>
</template>
```

@[code vue](../../custom/components/client/LocalList.vue)
