import { useHeadCss, useHeadScript } from "./hooks";

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

/**
 * 关闭生产环境时的 console.log ，但可以通过 --debug 开启
 */
export function disableDebugLog() {
    if (typeof window == "undefined") {
        return;
    }
    if (process.env.NODE_ENV == "production") {
        // development
        // @ts-ignore
        window.log = console.log;
        console.log = (..._args: any) => {};

        if (/--debug$/.test(location.search)) {
            // @ts-ignore
            window.console.log = window.log;
        }
    }
}
