<template>
    <!-- <ArticleItem v-for="r in routes" :path="r.path" info="123"/>-->
    <ul>
        <li v-for="(r, idx) in routes" :key="idx">
            <router-link :to="r.path">{{ computeTitle(r) }}</router-link>
        </li>
    </ul>
</template>

<script lang="ts" setup>
import { getSimpleRoutes } from "../../hooks/";
import type { RouteRecordNormalized } from "vue-router";

const props = defineProps({
    prefix: {
        type: String,
        required: false,
        default: "/",
    },
    removeRoot: {
        type: Boolean,
        required: false,
        default: true,
    },
});

// let pages: PageData[] = await getResolvedPages(); // async setup()
// console.log(pages)

const routes = getSimpleRoutes(props.prefix, props.removeRoot);

function computeTitle(route: RouteRecordNormalized) {
    return (
        route.meta["title"] ||
        /[^/]*?(?=\.html$)/.exec(decodeURI(route.path))[0]
    );
}
</script>
