<template>
    <!-- 打字机效果组件 -->
</template>

<script setup lang="ts">
import { onMounted, watch } from "vue";
import { useRoute } from "vuepress/client";

const route = useRoute();

function initTypingEffect() {
    const p = document.querySelector<HTMLParagraphElement>(".vp-blog-hero-description");
    if (!p) {
        return;
    }
    p.classList.add("typing");
    // 中文要 * 2
    const length = (p.innerText.length + 1) * 2;
    document.documentElement.style.setProperty("--p-width", `${length}ch`);
    document.documentElement.style.setProperty("--p-step", `${length / 2}`);
}

function removeTypingEffect() {
    const p = document.querySelector<HTMLParagraphElement>(".vp-blog-hero-description");
    if (p) {
        p.classList.remove("typing");
    }
}

onMounted(() => {
    if (route.path === "/") {
        initTypingEffect();
    }
});

watch(
    () => route.path,
    (newPath) => {
        if (newPath === "/") {
            initTypingEffect();
        } else {
            removeTypingEffect();
        }
    },
);
</script>
