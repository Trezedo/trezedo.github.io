---
icon: tabler:file-type-vue
date: 2022-01-23
modified: 2026-03-23
category:
    - markdown
    - vuepress
tag:
    - markdown
    - vue
    - vuepress
slug: vue-usage
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

@[code vue](../../../../custom/components/client/CurrentPageData.vue)
