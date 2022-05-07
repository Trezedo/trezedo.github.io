<template></template>

<script lang="ts" setup>
import { onMounted } from "vue";
import detectTbs from "../../composables/detectTbs";

/**
 * 检测是否在 QQ 或 微信 内打开
 */
detectTbs();

/**
 * 关闭页面事件
 */
onMounted(() => {
    window.onbeforeunload = (ev) => {
        console.log(ev);
        // localStorage.removeItem("show-warning")
    };
});

/**
 * 在博客首页，取消以 <a href=""/> 的方式滚动（会改变 hash）
 *
 * 新版取消了这种方式，因此不需要自己实现
 */
/*onMounted(() => {
    const button = document.querySelector(".slide-down-wrapper") as HTMLLinkElement;
    const heroBottom = document.querySelector("#hero-bottom") as HTMLDivElement;
    button?.removeAttribute("href");
    button?.addEventListener("click", () => {
        heroBottom?.scrollIntoView({behavior: 'smooth'})
    })
})*/
</script>

<!--suppress CssUnusedSymbol -->
<style>
a.slide-down-wrapper:hover {
    cursor: pointer;
    border-radius: 50%;
}
</style>
