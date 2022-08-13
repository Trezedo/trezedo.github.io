---
date: 2022-03-15
icon: vue
article: false
---

# Hope 主题 demo 中使用 vue

## Option API

::: vue-demo vue3 option api

```vue
<template>
    <p>a = {{ a }}</p>
    <button @click="change">点击+1</button>
</template>
<script>
export default {
    data: () => ({ a: 0 }),
    methods: {
        change() {
            this.a += 1;
        },
    },
};
</script>
```

:::

## Composition API

::: vue-demo vue3 option api

```vue
<template>
    <p>a = {{ a }}</p>
    <button @click="change">点击+1</button>
</template>
<script>
// 注意在demo中需要从 'Vue' 中解构
const { ref } = Vue;
export default {
    setup() {
        const a = ref(0);
        function change() {
            a.value += 1;
        }
        return {
            a,
            change,
        };
    },
};
</script>
```

:::

::: tip

目前还不支持 `script setup`

:::
