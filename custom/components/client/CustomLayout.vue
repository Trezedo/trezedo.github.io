<template>
    <div>CustomLayout.vue</div>
    <Content></Content>
</template>

<script lang="ts" setup>
import { Content } from "@vuepress/client";
import { useRouter } from "vue-router";

const router = useRouter();

const pages = router
    .getRoutes()
    .filter(
        (route) =>
            (route.path.endsWith(".html") || route.path.endsWith("/")) &&
            route.redirect == undefined
    );
console.log(pages);
</script>
