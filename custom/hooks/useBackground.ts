import { onMounted, watch } from "vue";
import { useRoute } from "vue-router";

export function useBackground(
    img: string = "https://w.wallhaven.cc/full/72/wallhaven-72rd8e.jpg",
    test?: (path: string) => boolean
) {
    if (typeof document == "undefined") {
        return;
    }

    const css = document.createElement("style");
    css.id = "bg-css";

    const bg = document.createElement("div");
    bg.id = "bg";

    const install = () => {
        // bg.style.visibility = "visible"; 为了兼容，当图片不可用时显示 bgc
        bg.style.backgroundImage = `url(${img})`;
        css.innerHTML = `
        .blog-hero.fullscreen .mask{background-attachment:fixed !important}#bg{position:fixed;top:0;left:0;width:100%;height:100vh;z-index:-1;pointer-events:none;background:var(--bg-color-back) center center/cover no-repeat}#bg{height:100vh;transition:all 1s ease}body,.theme-container .page.blog:not(p){background:transparent}.footer-wrapper{background:var(--bg-color-blur)}.pagination-wrapper:not(p){margin-bottom:1.25rem;border-radius:0.4rem;background:var(--bg-color-blur)}.article-type-wrapper:not(p){padding:1rem;border-radius:0.4rem;background:var(--bg-color-blur)}.tag-list-wrapper .tag:not(p){box-shadow:none}
        `.trim();
    };

    const uninstall = () => {
        bg.style.backgroundImage = "";
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

        test!(route.path) && install();
    });
    watch(
        () => route.path,
        (n) => {
            test!(n) ? install() : uninstall();
        }
    );
}
