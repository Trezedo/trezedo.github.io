<template>
    <Transition name="fade">
        <div
            ref="buttonRef"
            v-if="buttonVisible && isSupported"
            class="speech"
            :style="buttonStyle"
            @click="handleClick"
        >
            <svg>
                <use :xlink:href="'#speech-icon-' + icon" />
            </svg>
        </div>
    </Transition>
    <svg
        style="position: absolute; width: 0; height: 0; overflow: hidden"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
    >
        <defs>
            <symbol id="speech-icon-pause" viewBox="0 0 32 32">
                <path
                    d="M6.095 0h3.81v32h-3.81zM25.524 0h-3.048c-0.21 0-0.381 0.171-0.381 0.381v31.238c0 0.21 0.171 0.381 0.381 0.381h3.048c0.21 0 0.381-0.171 0.381-0.381v-31.238c0-0.21-0.171-0.381-0.381-0.381z"
                />
            </symbol>
            <symbol id="speech-icon-play" viewBox="0 0 32 32">
                <path
                    d="M25.263 15.159l-17.308-14.927c-0.645-0.555-1.591-0.055-1.591 0.841v29.853c0 0.895 0.945 1.395 1.591 0.841l17.308-14.927c0.495-0.427 0.495-1.255 0-1.682z"
                />
            </symbol>
        </defs>
    </svg>
</template>

<script setup lang="ts">
import {
    onClickOutside,
    useSpeechSynthesis,
    useTextSelection,
} from "@vueuse/core";
import {
    computed,
    CSSProperties,
    onMounted,
    onUnmounted,
    ref,
    watch,
} from "vue";
import { useRouter } from "vuepress/client";

// 获取选中文本和选区位置
const { text: selectedText, rects } = useTextSelection();

// 用于语音合成的响应式文本，初始为空，并禁用自动朗读
const speechText = ref("");
const { isPlaying, isSupported, status, stop, toggle, speak } =
    useSpeechSynthesis(speechText);

const router = useRouter();
const currentSpeakingText = ref(""); // 记录当前正在朗读的文本

// 控制按钮显示
const buttonVisible = ref(false);
// 存储鼠标松开时选区的位置（用于按钮定位）
const savedRect = ref<DOMRect | null>(null);
// 按钮 DOM 元素引用（用于点击外部隐藏）
const buttonRef = ref<HTMLElement | null>(null);

// 点击按钮外部时隐藏按钮
onClickOutside(buttonRef, () => {
    buttonVisible.value = false;
});

// 全局 mouseup 事件处理：在鼠标松开时显示按钮
const handleGlobalMouseUp = () => {
    // 获取当前选区信息
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed) {
        buttonVisible.value = false;
        savedRect.value = null;
        return;
    }

    const text = selection.toString().trim();
    if (!text) {
        buttonVisible.value = false;
        savedRect.value = null;
        return;
    }

    // 获取选区所有行的矩形
    const range = selection.getRangeAt(0);
    const rects = range.getClientRects();
    if (rects.length === 0) {
        buttonVisible.value = false;
        savedRect.value = null;
        return;
    }
    // 使用最后一行矩形（鼠标松开时所在的最后一行）
    const lastRect = rects[rects.length - 1];
    buttonVisible.value = true;
    savedRect.value = lastRect;
};

// 在组件挂载时添加全局 mouseup 监听
onMounted(() => {
    document.addEventListener("mouseup", handleGlobalMouseUp);
});

// 组件卸载时移除监听
onUnmounted(() => {
    document.removeEventListener("mouseup", handleGlobalMouseUp);
    if (isPlaying.value || status.value === "pause") {
        stop();
    }
});

// 按钮位置计算（基于保存的选区位置）
const buttonStyle = computed<CSSProperties>(() => {
    const rect = savedRect.value;
    if (!rect) return { display: "none" };

    const btnWidth = 24;
    const offset = 4;
    let left = rect.right + offset;
    // 防止超出右边界
    if (left + btnWidth > window.innerWidth) {
        left = rect.right - btnWidth;
    }
    // 防止超出左边界
    left = Math.max(0, left);

    return {
        position: "fixed",
        left: `${left}px`,
        top: `${rect.bottom}px`,
        zIndex: 9999,
    };
});

// 按钮图标：正在朗读当前文本时显示暂停，否则显示播放
const icon = computed(() => {
    const isCurrentlyPlaying = status.value === "play";
    if (
        isCurrentlyPlaying &&
        currentSpeakingText.value === selectedText.value
    ) {
        return "pause";
    }
    return "play";
});

// 按钮点击处理：切换播放/停止
const handleClick = () => {
    if (!selectedText.value) return;

    const isCurrentText = currentSpeakingText.value === selectedText.value;

    if (!isPlaying.value && status.value !== "pause") {
        // 当前没有朗读任务 → 设置文本并开始朗读
        speechText.value = selectedText.value;
        speak(); // 朗读当前绑定的文本
        currentSpeakingText.value = selectedText.value;
    } else if (isCurrentText) {
        // 正在朗读或暂停当前文本 → 使用 toggle 切换播放/暂停
        toggle();
        // 如果 toggle 后变为暂停，currentSpeakingText 保持不变；如果变为播放，也是当前文本
    } else {
        // 正在朗读其他文本 → 切换至新文本
        stop(); // 停止当前朗读
        speechText.value = selectedText.value;
        speak();
        currentSpeakingText.value = selectedText.value;
    }
};

// 监听朗读结束（status 变为 'end'），清空当前文本标记
watch(status, (newStatus) => {
    if (newStatus === "end") {
        currentSpeakingText.value = "";
    }
});

// 路由切换时停止朗读并隐藏按钮
watch(
    () => router.currentRoute.value.path,
    () => {
        if (isPlaying.value || status.value === "pause") {
            stop();
        }
        currentSpeakingText.value = "";
        buttonVisible.value = false;
        savedRect.value = null;
    },
);
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.speech {
    width: 24px;
    height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f6f8fa;
    border: 1px solid #d1d5da;
    border-radius: 3px;
    padding: 2px;
    color: #556699;
    cursor: pointer;
    user-select: none; // 点击按钮时保持选中的文字
    transition: opacity 0.2s;

    &:hover {
        background-color: #e6e9ef;
    }

    svg {
        width: 16px;
        height: 16px;
    }
}
</style>
