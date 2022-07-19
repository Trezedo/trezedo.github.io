import { onMounted, watch } from "vue";
import { useRoute } from "vue-router";

// see: https://cn.vitejs.dev/guide/assets.html
import style from "./bg.plugin.scss?inline";

export function useBackground(
    img: string = "https://w.wallhaven.cc/full/72/wallhaven-72rd8e.jpg",
    test?: (path: string) => boolean
) {
    if (typeof document == "undefined") {
        return;
    }

    console.log(style);

    const css = document.createElement("style");
    css.id = "bg-css";

    const bg = document.createElement("div");
    bg.id = "bg";

    const install = () => {
        // bg.style.visibility = "visible"; 为了兼容，当图片不可用时显示 bgc
        bg.style.backgroundImage = `url(${img})`;
        css.innerHTML = style.trim();
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
