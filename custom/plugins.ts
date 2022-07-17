import { useHeadCss, useHeadScript } from "./composables";

const styles: CustomElement[] = [
    { id: "zedo-iconfont", src: "/assets/font/iconfont.css" },
];

const scripts: CustomElement[] = [
    {
        // 加载 notiflix
        id: "zedo-notiflix",
        src: "/assets/js/notiflix-confirm-aio-3.2.4.min.js",
    },
    {
        // 平滑滚动，文章内容较长时可能会比较卡
        id: "zedo-smooth",
        src: "https://unpkg.com/smoothscroll-for-websites@1.4.10/SmoothScroll.js",
    },
    {
        // 点击特效，小爱心
        id: "zedo-love",
        src: "/assets/js/love-me.js",
        disabled: true,
    },
];

export function loadStyles() {
    for (const css of styles) {
        !css.disabled && useHeadCss(css);
    }
}

export function loadScripts() {
    for (const js of scripts) {
        !js.disabled && useHeadScript(js);
    }
}
