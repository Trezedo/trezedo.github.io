import { onMounted } from "vue";

interface CustomElement {
    id: string;
    src: string;
}

type resource = "iconfont" | "notiflix" | "smoothScroll" | "loveMe";

type CustomElements = Record<resource, CustomElement>;

const _: CustomElements = {
    iconfont: { id: "zedo-iconfont", src: "/assets/font/iconfont.css" },
    notiflix: {
        id: "zedo-notiflix",
        src: "/assets/js/notiflix-confirm-aio-3.2.4.min.js",
    },
    smoothScroll: {
        id: "zedo-smooth",
        src: "https://unpkg.com/smoothscroll-for-websites@1.4.10/SmoothScroll.js",
    },
    loveMe: {
        id: "zedo-love",
        src: "/assets/js/love-me.js",
    },
};

const date: string = "?" + new Date().getTime();

/**
 * 通过 link 元素添加 css
 * @param config
 */
const addCss = (config: CustomElement) => {
    onMounted(() => {
        if (document.getElementById(config.id)) {
            return;
        }
        const linkEl = document.createElement("link");
        linkEl.id = config.id;
        linkEl.href = config.src + date;
        linkEl.rel = "stylesheet";
        document.head.appendChild(linkEl);
    });
};

/**
 * 通过 script 加载 JavaScript 脚本
 * @param config
 */
const addScript = (config: CustomElement) => {
    onMounted(() => {
        if (document.getElementById(config.id)) {
            return;
        }
        const el = document.createElement("script");
        el.id = config.id;
        el.src = config.src + date;
        el.defer = true;
        document.head.appendChild(el);
    });
};

/**
 * 使用 iconfont
 */
export function useIconfont() {
    addCss(_.iconfont);
}

/**
 * 加载 notiflix
 */
export function useNotiflix() {
    addScript(_.notiflix);
}

/**
 * 平滑滚动，与 hope 主题共同使用可能会导致滚动比较卡
 */
export function useSmoothScroll() {
    addScript(_.smoothScroll);
}

/**
 * 点击特效：小爱心
 */
export function useLoveMe() {
    addScript(_.loveMe);
}
