<template>
    <div class="bg-wrap">
        <canvas ref="bgCanvas" class="bg-canvas"></canvas>
        <!-- 不再保留手动切换按钮 -->
    </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue";

// Canvas 引用
const bgCanvas = ref(null);

// 动画状态变量
let ctx = null;
let w = 0;
let h = 0;
let t = 0;
let animationId = null;
let themeObserver = null;

// 响应式主题标记（来源于 html 的 data-theme 属性）
const isDark = ref(false);

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

// 初始化
onMounted(() => {
    if (!bgCanvas.value) return;

    const canvas = bgCanvas.value;
    ctx = canvas.getContext("2d");

    // 设置画布尺寸
    handleResize();

    // 监听窗口大小变化
    window.addEventListener("resize", handleResize);

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
});

// 清理动画与观察者
onBeforeUnmount(() => {
    if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
    }
    window.removeEventListener("resize", handleResize);
    if (themeObserver) {
        themeObserver.disconnect();
        themeObserver = null;
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
