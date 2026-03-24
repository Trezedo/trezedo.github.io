<template>
    <div ref="container" class="graphviz-container"></div>
</template>

<script setup lang="ts">
import { type Viz } from "@viz-js/viz";
import { onMounted, ref } from "vue";

const props = defineProps({
    dot: { type: String, required: true },
});

const container = ref<HTMLDivElement | null>(null);
let vizInstance = <Viz | null>null;

const decodeBase64 = (base64: string) => {
    // 方法一：使用 TextDecoder（推荐，支持 Unicode）
    const binaryString = atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return new TextDecoder("utf-8").decode(bytes);
};

const render = async () => {
    if (!container.value || typeof window === "undefined") return;
    container.value.innerHTML = "";

    // 解码得到原始 DOT 代码
    const dotCode = decodeBase64(props.dot);
    console.log("Decoded DOT code:", dotCode);
    if (!vizInstance) {
        const { instance } = await import("@viz-js/viz");
        vizInstance = await instance();
    }

    const svg = await vizInstance.renderSVGElement(dotCode);
    container.value.appendChild(svg);
};

onMounted(render);
</script>

<style scoped lang="scss">
.graphviz-container {
    text-align: center;

    svg {
        max-width: 100%;
        height: auto;
    }
}
</style>
