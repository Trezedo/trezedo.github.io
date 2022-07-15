import { onMounted, onUnmounted } from "vue";

const date: string = "?" + new Date().getTime();

type CustomElement = Record<string, { id: string; src: string }>;

const _: CustomElement = {
    iconfont: { id: "zedo-iconfont", src: "/assets/font/iconfont.css" },
    smoothScroll: {
        id: "zedo-smooth",
        src: "https://unpkg.com/smoothscroll-for-websites@1.4.10/SmoothScroll.js",
    },
};

export function useIconfont() {
    onMounted(() => {
        if (document.getElementById(_.iconfont.id)) {
            return;
        }
        const linkEl = document.createElement("link");
        linkEl.id = _.iconfont.id;
        linkEl.rel = "stylesheet";
        linkEl.href = _.iconfont.src + date;
        document.head.appendChild(linkEl);
    });

    // 可能会比较卡
    onUnmounted(() => {
        if (document.getElementById(_.smoothScroll.id)) {
            return;
        }
        const el = document.createElement("script");
        el.id = _.smoothScroll.id;
        el.defer = true;
        el.src = _.smoothScroll.src + date;
        document.head.appendChild(el);
    });
}
