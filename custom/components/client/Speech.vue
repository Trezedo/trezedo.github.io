<template>
    <div
        ref="el"
        class="speech"
        :class="[data.show ? 'on' : 'off']"
        :data-text="data.text"
        :style="style"
    >
        <svg>
            <use :xlink:href="'#speech-icon-' + data.icon" />
        </svg>
    </div>
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
import { CSSProperties, onMounted, reactive, ref, watch } from "vue";
import { usePageData } from "vuepress/client";

const el = ref<HTMLDivElement | null>(null);
const data = reactive({
    text: "",
    show: false,
    icon: "play",
});
const style = reactive<CSSProperties>({
    left: "",
    top: "",
});

// 切换页面后，避免 top 值超出页面高度
watch(
    () => usePageData().value.path,
    () => {
        style.top = 0;
    },
);

const handleSelectWords = () => {
    document.body.addEventListener("mouseup", (e: MouseEvent) => {
        const str = getSelection()!.toString().trim();
        if (str === "") {
            data.show = false;
            return;
        }
        data.show = true;
        speechSynthesis.cancel();

        // @ts-ignore 记录当前选择的文字位置等
        window.speechRange = getSelection().getRangeAt(0).cloneRange();

        data.text = str;
        const r = getSelection()!.getRangeAt(0).getBoundingClientRect();
        data.icon = "play";

        style.top =
            r.top +
            r.height +
            document.querySelector("html")!.scrollTop -
            20 +
            "px";
        style.left = e.screenX + 4 + "px";

        // mousedown -> 选中的文字() -> 隐藏
        setTimeout(() => {
            if (getSelection()!.toString().trim() == "") data.show = false;
        }, 50);
    });
};

const handleBtnClick = (e: MouseEvent) => {
    // 因为要阻止冒泡，所以应当监听的事件类型也是 mouseup
    e.stopPropagation();
    e.preventDefault();
    // 若不支持语言合成
    if (
        "undefined" == typeof speechSynthesis ||
        "undefined" == typeof SpeechSynthesisUtterance
    ) {
        return;
    }
    // 重新选中之前选中的文字，https://stackoverflow.com/questions/1173194#1173319
    // 使用 css 可以避免用 js 去选择
    // getSelection()?.removeAllRanges();
    // @ts-ignore
    // getSelection()?.addRange(window.speechRange);

    if (!speechSynthesis.speaking) {
        // 如果没在朗读，新建
        const utter = new SpeechSynthesisUtterance(data.text);
        utter.onend = () => {
            // speechSynthesis.cancel();
            data.icon = "play";
        };
        speechSynthesis.speak(utter);
        data.icon = "pause";
    } else {
        // 在朗读时，点击暂停、继续
        if (speechSynthesis.paused) {
            speechSynthesis.resume();
            data.icon = "pause";
        } else {
            speechSynthesis.pause();
            data.icon = "play";
        }
    }
};

onMounted(() => {
    handleSelectWords();
    el.value?.addEventListener("mouseup", handleBtnClick);
});
</script>

<style lang="scss">
.speech {
    position: absolute;
    top: 0; // theme:避免插入 dom 后影响页脚
    opacity: 0;
    background-color: #f6f8fa;
    border: 1px solid #d1d5da;
    border-radius: 3px;
    padding: 2px;
    color: #556699;
    user-select: none; // 点击按钮时保持选中的文字
    z-index: 9999;
    transition:
        opacity,
        left 0.25s;

    &.on {
        opacity: 1;
        cursor: pointer;
    }

    &.off {
        pointer-events: none;
    }

    svg {
        height: 16px;
        width: 16px;
    }
}
</style>
