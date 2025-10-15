<template>
    <NormalPage :class="{ 'has-cover': !!imgLink }">
        <template #top>
            <div
                class="page-cover"
                :style="{ backgroundImage: `url(${imgLink})` }"
            />
        </template>
    </NormalPage>
</template>

<script setup lang="ts">
/*
如果修改 ts，则：
将 "@theme-hope" 换成 "vuepress-theme-hope/lib/client"
"../styles" 换成 "vuepress-theme-hope/lib/client/styles"
"../../shared" 换成 "vuepress-theme-hope/lib/shared"
*/
// https://github.com/vuepress-theme-hope/vuepress-theme-hope/blob/main/packages/theme/src/client/components/NormalPage.ts
// 修改 CommonWrapper.ts 会影响很多地方

import { usePageFrontmatter } from "vuepress/client";
import { computed, onMounted, ref } from "vue";

// @ts-ignore
import NormalPage from "vuepress-theme-hope/components/NormalPage";

const frontmatter = usePageFrontmatter();

const coverLink = ref(frontmatter.value["cover"] || "https://z.wiki/u/42DuSN");

const imgLink = computed(() => {
    return (frontmatter.value["article"] !== false && coverLink.value) || "";
});

onMounted(() => {
    const { head, tag, category, ...others } = frontmatter.value;
    console.group("frontmatter");
    console.log({ head, tag, category });
    console.table(others);
    console.groupEnd();
});
</script>

<style lang="scss">
:root {
    --cover-height: 40vh;

    @media (max-width: 959px) {
        --cover-height: 25vh;
    }
}

$coverHeight: var(--cover-height);
$navbarHeight: var(--navbar-height);

.page-cover {
    position: absolute;
    top: 0;
    left: 0;

    width: 100%;
    height: $coverHeight;

    background: #fff0 center center/cover no-repeat;
    pointer-events: none;
}

/* .theme-container .page */
#main-content {
    // position: relative;
    background-color: #fff;

    &.has-cover {
        padding-top: $coverHeight; // var(--navbar-height);
    }

    // 加密页的上边距
    & .password-layer.expand {
        margin-top: calc($navbarHeight - $coverHeight);
    }
}
</style>
