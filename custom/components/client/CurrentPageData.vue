<template>
    <div>CurrentPageData.vue</div>
</template>

<script lang="ts" setup>
// https://github.com/vuepress/vuepress-next/pull/504
import {usePageData, usePageFrontmatter, useSiteData, usePagesData, resolvers, useRouter} from "@vuepress/client";
import {onMounted} from 'vue';

console.log(useRouter().getRoutes())
// console.log(usePageData().value)
// console.log(usePageFrontmatter().value)
// console.log(useSiteData().value)

// for (let valueKey in usePagesData().value) {
//     resolvePageData(valueKey).then(pageData => {
//         console.log(decodeURI(pageData.path))
//     })
// }


// @ts-ignore
import page from '@temp/pages'
import {Page} from "vuepress";

onMounted(() => {
    console.log(page)
})
</script>

<style scoped>

</style>