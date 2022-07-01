<template>
    <div v-for="page in pages">
        <router-link :to="page.path">
            {{ extractFilename(page.path) }}
        </router-link>
    </div>

    <div>根据Router获取所有页面</div>
    <div v-for="page in pages">
        <router-link :to="page.path">
            {{ decodeURI(page.path) }}
        </router-link>
    </div>

    <div>使用 @temp/pages.js 获取页面</div>
    <div v-for="page in pagesTemp">
        {{ page }}
    </div>

    <div>根据 usePagesData Api 获取页面(可能会移除)</div>
    <div>{{ pagesList }}</div>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import { useRoute, useRouter, RouterLink } from "vue-router";
import {
    usePageData,
    usePagesData,
    usePageFrontmatter,
    useSiteData,
    resolvers,
} from "@vuepress/client";

// @ts-ignore
import _pages from "@temp/pages";
import { Page } from "vuepress";

const pagesTemp = computed(() => <Page[]>_pages);

const pagesData = usePagesData();
// console.log(usePageData().value)
// console.log(usePageFrontmatter().value)
// console.log(useSiteData().value)

const pagesList = ref([]);
for (let page in pagesData.value) {
    pagesList.value.push(page);
}

const route = useRoute();
const router = useRouter();

// console.log("route =>", route)

const pages = router
    .getRoutes()
    .filter(
        (rt) =>
            (rt.path.endsWith(".html") || rt.path.endsWith("/")) &&
            rt.redirect == undefined
    )
    .filter((rt) => rt.path != route.path);

function extractFilename(path: string): string {
    const realPath = decodeURI(path);
    const realName = realPath.replace(/.*?([^\/]+)(\/|.html)$/g, (m, p) => p);
    return realPath.endsWith("/") ? "Readme.md" : realName + ".md";
}

pages.forEach((p) =>
    resolvers.resolvePageData(<string>p.name).then((page) => {
        console.log(page.frontmatter);
    })
);
</script>

<style lang="scss">
//
</style>
