<template>
    <!--  -->
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
// import { detectTbs } from "../../hooks/";

/**
 * 检测是否在 QQ 或 微信 内打开
 */
// detectTbs();

/**
 * 关闭页面事件
 */
onMounted(() => {
    window.onbeforeunload = (e: BeforeUnloadEvent) => {
        console.log(e);
    };
});

/**
 * 在博客首页，取消以 <a href=""/> 的方式滚动（会改变 hash）
 *
 * 新版取消了这种方式，因此不需要自己实现
 */
/* onMounted(() => {
    const button = document.querySelector<HTMLLinkElement>(
        ".slide-down-wrapper"
    );
    const heroBottom = document.querySelector<HTMLDivElement>("#hero-bottom");
    button?.removeAttribute("href");
    button?.addEventListener("click", () => {
        heroBottom?.scrollIntoView({ behavior: "smooth" });
    });
}); */

// 初始化打字机效果
onMounted(() => {
    const p = document.querySelector<HTMLParagraphElement>(
        ".vp-blog-hero-description"
    );
    if (!p) {
        console.error("找不到对应元素");
        return;
    }
    p.classList.add("typing");
    // 中文要 * 2
    const length = (p.innerText.length + 1) * 2;
    document.documentElement.style.setProperty("--p-width", `${length}ch`);
    document.documentElement.style.setProperty("--p-step", `${length / 2}`);
});
</script>

<!--suppress CssUnusedSymbol -->
<style>
a.slide-down-wrapper:hover {
    cursor: pointer;
    border-radius: 50%;
}
</style>
