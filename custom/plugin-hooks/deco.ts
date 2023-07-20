import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";

const img = "https://zedo.gitee.io/img/wallhaven-72rd8e.png";
const style = `#bg {position: fixed;top: 0;left: 0;width: 100%;height: 100vh;z-index: -1;pointer-events: none;background-color: var(--bg-color-back);background: center center / cover no-repeat;transition: all 1s ease;}body {background: transparent;}`;

const test = <string[]>[];

export function decoPlugin() {
    const route = useRoute();

    const install = (el: HTMLElement | null) => {
        // bg.style.visibility = "visible"; 为了兼容，当图片不可用时显示 bgc
        el && (el.style.backgroundImage = `url(${img})`);
    };
    const uninstall = (el: HTMLElement | null) => {
        el && (el.style.backgroundImage = "");
    };

    /* function (path: string) {
        return /^\/(tag|category|star|slide|encrypted|article\/$|$)/gm.test(path);
    }; */

    const bgEl = ref<HTMLElement | null>(null);

    onMounted(() => {
        const css = document.createElement("style");
        css.innerHTML = style;
        document.head.appendChild(css);

        bgEl.value = document.createElement("div");
        bgEl.value.id = "bg";

        // 插入元素，引入 css
        document.body.insertBefore(bgEl.value, document.body.children[0]);

        !test.includes(route.path) && install(bgEl.value);
    });

    watch(
        () => route.path,
        (n) => {
            !test.includes(n) ? install(bgEl.value) : uninstall(bgEl.value);
            console.log(n);
        }
    );
}
