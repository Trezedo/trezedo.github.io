<template>
    <div>CurrentPageData.vue</div>
</template>

<script lang="ts" setup>
// https://github.com/vuepress/vuepress-next/pull/504
import {usePageData, usePageFrontmatter, useSiteData, usePagesData, resolvers, useRouter} from "@vuepress/client";
import {onMounted} from 'vue';

onMounted(() => {
    console.log(useRouter().getRoutes())
    console.log(usePageData().value)
    console.log(usePageFrontmatter().value)
    console.log(useSiteData().value)
})

for (let valueKey in usePagesData().value) {
    resolvers.resolvePageData(valueKey).then(pageData => {
        console.log(decodeURI(pageData.path))
    })
}

// 默认主题使用的 temp
// @ts-ignore
// import page from '@temp/pages'
</script>

<style scoped>

</style>