<template>
    <div v-if="showCanvas" class="bg-wrap">
        <canvas ref="bgCanvas" class="bg-canvas"></canvas>
    </div>
</template>

<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref } from "vue";

// Canvas 引用
const bgCanvas = ref(null);
// 控制是否显示 Canvas 背景
const showCanvas = ref(false);

// 动画状态变量
let ctx = null;
let w = 0;
let h = 0;
let t = 0;
let animationId = null;
let themeObserver = null;
let resizeHandler = null;

// 响应式主题标记（来源于 html 的 data-theme 属性）
const isDark = ref(false);

/**
 * 检测是否为 Linux aarch64 环境（避免卡顿，跳过动画）
 * 匹配规则：UserAgent 包含 "Linux" 且包含 "aarch64" 或 "arm64"
 * x86_64 的国产电脑实测不卡
 */
const isLinuxAarch64 = () => {
    if (typeof navigator === "undefined") return false; // 服务端安全
    const ua = navigator.userAgent.toLowerCase();
    return ua.includes("linux") && (ua.includes("aarch64") || ua.includes("arm64"));
};

// 从根元素读取主题并更新 isDark
const updateThemeFromHtml = () => {
    const theme = document.documentElement.getAttribute("data-theme");
    isDark.value = theme === "dark";
};

// 获取主背景渐变
function getGradient() {
    const g = ctx.createLinearGradient(0, 0, w, h);
    const base = t * 60; // 快速色调变化

    if (isDark.value) {
        g.addColorStop(0, `hsl(${base % 360}, 50%, 20%)`);
        g.addColorStop(0.5, `hsl(${(base + 140) % 360}, 50%, 26%)`);
        g.addColorStop(1, `hsl(${(base + 280) % 360}, 50%, 20%)`);
    } else {
        g.addColorStop(0, `hsl(${base % 360}, 75%, 92%)`);
        g.addColorStop(0.5, `hsl(${(base + 140) % 360}, 75%, 90%)`);
        g.addColorStop(1, `hsl(${(base + 280) % 360}, 75%, 92%)`);
    }
    return g;
}

// 绘制流动光影层
function drawFlowLayer(speed, scale, alpha, hueOffset) {
    for (let i = 0; i < 5; i++) {
        // 横向穿屏偏移
        let x = ((t * speed * 300 + i * 350) % (w + 600)) - 300;
        // 纵向波浪摆动
        let y = h / 2 + Math.sin(t * speed * 1.5 + i) * 180;
        let radius = Math.min(w, h) * scale;

        const grad = ctx.createRadialGradient(x, y, 0, x, y, radius);
        let hue = (t * 90 + hueOffset + i * 60) % 360;

        if (isDark.value) {
            grad.addColorStop(0, `hsla(${hue}, 85%, 60%, ${alpha})`);
            grad.addColorStop(1, `hsla(${hue}, 85%, 60%, 0)`);
        } else {
            grad.addColorStop(0, `hsla(${hue}, 95%, 65%, ${alpha})`);
            grad.addColorStop(1, `hsla(${hue}, 95%, 65%, 0)`);
        }

        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);
    }
}

// 中心柔和渐变，增强视觉层次
function drawCenterFade() {
    const grad = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, Math.min(w, h) / 1.4);
    if (isDark.value) {
        grad.addColorStop(0, "rgba(18,20,28,0.92)");
        grad.addColorStop(1, "rgba(18,20,28,0)");
    } else {
        grad.addColorStop(0, "rgba(255,255,255,0.92)");
        grad.addColorStop(1, "rgba(255,255,255,0)");
    }
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);
}

// 主绘制循环
function draw() {
    if (!ctx) return;

    t += 0.014; // 动画节奏

    // 1. 铺底色渐变
    ctx.fillStyle = getGradient();
    ctx.fillRect(0, 0, w, h);

    // 2. 多层流动光影（速度差制造流动感）
    drawFlowLayer(0.4, 0.55, 0.22, 0);
    drawFlowLayer(0.9, 0.45, 0.18, 120);
    drawFlowLayer(1.4, 0.35, 0.14, 240);

    // 3. 中心柔光/暗角，突出层次
    drawCenterFade();

    // 继续下一帧
    animationId = requestAnimationFrame(draw);
}

// 窗口尺寸自适应
function handleResize() {
    if (!bgCanvas.value) return;
    const canvas = bgCanvas.value;
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
}

/**
 * 实际初始化 Canvas 动画（仅当需要显示且环境正常时调用）
 */
function initCanvasAnimation() {
    if (!bgCanvas.value) return;

    const canvas = bgCanvas.value;
    ctx = canvas.getContext("2d");

    // 设置画布尺寸
    handleResize();

    // 监听窗口大小变化
    resizeHandler = () => handleResize();
    window.addEventListener("resize", resizeHandler);

    // 1. 初次读取 html 的 data-theme
    updateThemeFromHtml();

    // 2. 监听 data-theme 属性变化（例如外部系统或用户通过其他方式修改）
    themeObserver = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
            if (mutation.type === "attributes" && mutation.attributeName === "data-theme") {
                updateThemeFromHtml();
            }
        }
    });
    themeObserver.observe(document.documentElement, { attributes: true });

    // 启动动画
    draw();
}

// 清理动画与观察者、事件
function cleanupCanvas() {
    if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
    }
    if (resizeHandler) {
        window.removeEventListener("resize", resizeHandler);
        resizeHandler = null;
    }
    if (themeObserver) {
        themeObserver.disconnect();
        themeObserver = null;
    }
    ctx = null;
}

// 组件挂载：决定是否显示并启动 Canvas
onMounted(async () => {
    // 若为 Linux aarch64 环境，则直接跳过所有 Canvas 相关逻辑（不显示、不初始化）
    if (isLinuxAarch64()) {
        showCanvas.value = false;
        return;
    }

    // 非卡顿环境：显示 Canvas 并等待 DOM 更新后初始化动画
    showCanvas.value = true;
    await nextTick(); // 确保 Canvas 元素已渲染到 DOM
    if (bgCanvas.value) {
        initCanvasAnimation();
    }
});

// 组件卸载前：若已启动动画则进行清理
onBeforeUnmount(() => {
    if (showCanvas.value) {
        cleanupCanvas();
    }
});
</script>

<style scoped>
.bg-canvas {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
}
</style>
