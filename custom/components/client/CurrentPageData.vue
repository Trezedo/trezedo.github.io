<template>
    <div>CurrentPageData.vue</div>
</template>

<script setup lang="ts">
// https://github.com/vuepress/vuepress-next/pull/504
import { onMounted } from "vue";
import { usePageData, usePageFrontmatter, useRouteLocale, useSiteData } from "vuepress/client";

onMounted(() => {
    console.log(useRouteLocale());
    console.log(usePageData().value);
    console.log(usePageFrontmatter().value);
    console.log(useSiteData().value);
});

// for (let valueKey in usePagesData().value) {
//     resolvers.resolvePageData(valueKey).then((pageData) => {
//         console.log(decodeURI(pageData.path));
//     });
// }

// 默认主题使用的 temp
// @ts-ignore
// import page from '@temp/pages'
</script>
