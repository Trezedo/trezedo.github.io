<template>
    <div>CustomLayout.vue</div>
    <Content></Content>
</template>

<script setup lang="ts">
import {useRouter, Content as Content,} from "@vuepress/client"

const router = useRouter()
const pages = router.getRoutes().filter(
    route => (route.path.endsWith(".html") || route.path.endsWith("/")) && route.redirect == undefined
)
console.log(pages)

</script>

<style scoped>

</style>