import { onMounted, onUnmounted, readonly, ref } from "vue";

export function useSpeech() {
    const isShowing = ref(false);
    const text = ref("");
    const icon = ref<"play" | "pause">("play");
    const position = ref({ top: 0, left: 0 });
    const selectedRange = ref<Range | null>(null);

    let utterance: SpeechSynthesisUtterance | null = null;

    // 更新按钮位置
    const updatePosition = () => {
        if (!selectedRange.value) return;
        const rect = selectedRange.value.getBoundingClientRect();
        let top = rect.bottom + window.scrollY + 4;
        let left = rect.left + window.scrollX + 4;

        // 边界保护，防止按钮超出视口
        const btnWidth = 24;
        const btnHeight = 24;
        if (left + btnWidth > window.innerWidth) {
            left = window.innerWidth - btnWidth - 4;
        }
        if (top + btnHeight > window.innerHeight + window.scrollY) {
            top = rect.top + window.scrollY - btnHeight - 4;
        }

        position.value = { top, left };
    };

    const hide = () => {
        isShowing.value = false;
    };

    const show = () => {
        if (text.value.trim() === "") {
            hide();
            return;
        }
        isShowing.value = true;
        updatePosition();
    };

    // 鼠标松开时处理选中的文字
    const handleTextSelection = (e: MouseEvent) => {
        const selection = window.getSelection();
        const selectedText = selection?.toString().trim() || "";
        if (selectedText === "") {
            hide();
            return;
        }

        const range = selection?.getRangeAt(0);
        if (range) {
            selectedRange.value = range.cloneRange();
            text.value = selectedText;
            icon.value = "play";
            show();
        } else {
            hide();
        }
    };

    // 朗读或暂停/继续
    const speak = () => {
        if (!selectedRange.value) return;

        const utteranceText = text.value;
        if (!utteranceText) return;

        if (
            !("speechSynthesis" in window) ||
            !("SpeechSynthesisUtterance" in window)
        ) {
            console.warn("浏览器不支持语音合成");
            return;
        }

        if (!speechSynthesis.speaking) {
            utterance = new SpeechSynthesisUtterance(utteranceText);
            utterance.onend = () => {
                icon.value = "play";
                utterance = null;
            };
            utterance.onerror = () => {
                icon.value = "play";
                utterance = null;
            };
            speechSynthesis.speak(utterance);
            icon.value = "pause";
        } else {
            if (speechSynthesis.paused) {
                speechSynthesis.resume();
                icon.value = "pause";
            } else {
                speechSynthesis.pause();
                icon.value = "play";
            }
        }
    };

    // 按钮点击处理
    const handleToggleSpeech = (e: MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        speak();
    };

    // 清理事件
    const cleanup = () => {
        document.removeEventListener("mouseup", handleTextSelection);
        window.removeEventListener("scroll", updatePosition);
        window.removeEventListener("resize", updatePosition);
    };

    onMounted(() => {
        document.addEventListener("mouseup", handleTextSelection);
        window.addEventListener("scroll", updatePosition);
        window.addEventListener("resize", updatePosition);
    });

    onUnmounted(() => {
        cleanup();
        if (speechSynthesis.speaking) {
            speechSynthesis.cancel();
        }
    });

    return {
        isShowing: readonly(isShowing),
        icon: readonly(icon),
        position: readonly(position),
        handleToggleSpeech,
    };
}
