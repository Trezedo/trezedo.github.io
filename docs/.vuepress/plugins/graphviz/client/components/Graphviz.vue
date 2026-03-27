<template>
    <div ref="container" class="graphviz-container"></div>
</template>

<script setup lang="ts">
import type { Viz } from "@viz-js/viz";
import type { PropType } from "vue";
import { onBeforeUnmount, onMounted, ref, watch } from "vue";

const props = defineProps({
    dot: { type: String, required: true },
    mode: {
        type: String as PropType<"img" | "svg">,
        default: "img",
    },
});

const container = ref<HTMLDivElement | null>(null);
let vizInstance: Viz | null = null;
let currentUrl: string | null = null;

/**
 * 解码 base64 字符串，失败时返回原字符串
 */
const decodeBase64 = (base64: string): string => {
    try {
        const binaryString = atob(base64);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        return new TextDecoder("utf-8").decode(bytes);
    } catch (e) {
        console.warn("Base64 decode failed, using raw string:", e);
        return base64;
    }
};

/**
 * 清理 img 模式下的 blob URL
 */
const cleanupImgResources = (): void => {
    if (currentUrl) {
        URL.revokeObjectURL(currentUrl);
        currentUrl = null;
    }
};

/**
 * 获取 SVG 字符串及其标题
 */
const getSvgString = async (): Promise<{
    svgString: string;
    title: string;
}> => {
    const dotCode = decodeBase64(props.dot);
    if (!vizInstance) {
        const { instance } = await import("@viz-js/viz");
        vizInstance = await instance();
    }
    const svgString = vizInstance.renderString(dotCode, { format: "svg" });
    let titleText = "Graphviz diagram";
    try {
        const parser = new DOMParser();
        const svgDoc = parser.parseFromString(svgString, "image/svg+xml");
        const titleElement = svgDoc.querySelector("title");
        if (titleElement) titleText = titleElement.textContent || titleText;
    } catch (e) {
        console.warn("Failed to parse SVG title:", e);
    }
    return { svgString, title: titleText };
};

/**
 * 渲染为 <img> 元素
 */
const renderAsImg = async (svgString: string, title: string): Promise<void> => {
    if (!container.value) return;

    cleanupImgResources();
    container.value.innerHTML = "";

    const blob = new Blob([svgString], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    currentUrl = url;

    const img = document.createElement("img");
    img.src = url;
    img.alt = title;
    container.value.appendChild(img);
};

/**
 * 渲染为内联 SVG
 */
const renderAsSvg = async (svgString: string): Promise<void> => {
    if (!container.value) return;

    cleanupImgResources(); // 清理可能残留的 URL
    container.value.innerHTML = svgString;
};

/**
 * 统一渲染入口
 */
const render = async (): Promise<void> => {
    if (!container.value) return;

    try {
        const { svgString, title } = await getSvgString();
        if (props.mode === "img") {
            await renderAsImg(svgString, title);
        } else {
            await renderAsSvg(svgString);
        }
    } catch (err: unknown) {
        console.error("Graphviz 渲染失败:", err);
        if (props.mode === "img") cleanupImgResources();
        if (container.value) container.value.innerHTML = "";
    }
};

// 监听 props 变化重新渲染
watch([() => props.dot, () => props.mode], render, { immediate: false });

onMounted(() => {
    render();
});

onBeforeUnmount(() => {
    cleanupImgResources();
});
</script>

<style scoped lang="scss">
.graphviz-container {
    text-align: center;

    img {
        max-width: 100%;
        height: auto;
        display: inline-block;
    }

    svg {
        max-width: 100%;
        height: auto;
        display: inline-block;
    }
}
</style>
