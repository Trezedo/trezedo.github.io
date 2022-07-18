import { onMounted, watch } from "vue";
import { useRoute } from "vue-router";

export function useBackground(test?: (path: string) => boolean) {
    if (typeof document == "undefined") {
        return;
    }

    const css = document.createElement("style");
    css.id = "bg-css";

    const bg = document.createElement("div");
    bg.id = "bg";

    const install = () => {
        bg.style.visibility = "visible";
        css.innerHTML = `
        .blog-hero.fullscreen .mask{background-attachment:fixed !important}#bg{position:fixed;top:0;left:0;width:100%;height:100%;z-index:-1;background:url(https://w.wallhaven.cc/full/72/wallhaven-72rd8e.jpg) center center/cover no-repeat;pointer-events:none}body,.theme-container .page.blog:not(p){background:transparent}.footer-wrapper{background:var(--bg-color-blur)}.pagination-wrapper:not(p){margin-bottom:1.25rem;border-radius:0.4rem;background:var(--bg-color-blur)}.article-type-wrapper:not(p){padding:1rem;border-radius:0.4rem;background:var(--bg-color-blur)}.tag-list-wrapper .tag:not(p){box-shadow:none}
    `;
    };

    const uninstall = () => {
        // 移除 css，bg 设为不可见
        bg.style.visibility = "hidden";
        css.innerHTML = ``;
    };

    const route = useRoute();
    test =
        test ??
        function (path: string) {
            return /^\/(tag|category|star|slide|encrypted|article\/$|$)/gm.test(
                path
            );
        };

    onMounted(() => {
        // 插入元素，引入 css
        document.body.insertBefore(bg, document.body.children[0]);
        document.head.appendChild(css);

        test(route.path) && install();
    });
    watch(
        () => route.path,
        (n) => {
            test(n) ? install() : uninstall();
        }
    );
}
