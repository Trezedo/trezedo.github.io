import { onMounted, onUpdated, watch } from "vue";
import { useRoute } from "vue-router";

// todo 以 markdown-it 插件形式来处理
export function useImageSize() {
    if (typeof document == "undefined") {
        return;
    }
    // 思路来源：https://www.zhihu.com/question/23378396/answer/402528770

    // 检测是否支持 zoom
    // MDN 建议用 transform scale 代替，但它不会重绘
    // @ts-ignore
    const supportZoom: boolean = typeof document.body.style["zoom"] == "string";

    function initImageSize() {
        const images = document.querySelectorAll<HTMLImageElement>(
            'img[src*="#s-"]'
        ) as unknown as HTMLImageElement[];
        console.log("list: ", images);

        const reg = /#s-(\d+)(px|%)?/;
        for (const img of images) {
            const exec = reg.exec(img.src);
            const size = exec?.[1]; // 数值大小
            const unit = exec?.[2];
            if (supportZoom) {
                if (size && unit !== "px") {
                    // @ts-ignore
                    img.style["zoom"] = size + "%";
                }
            } else {
                // “兼容” Firefox，用图片原始高度处理
                size && (img.style.width = (img.naturalWidth * parseInt(size)) / 100 + "px");
            }
        }
    }

    const route = useRoute();
    onMounted(() => {
        setTimeout(() => initImageSize(), 500);
    });
    watch(
        () => route.path,
        (n) => {
            console.log(n);
            // await nextTick() 无效
            setTimeout(() => {
                initImageSize();
            }, 500);
        }
    );
    onUpdated(() => {
        console.log("!!!");
    });
}
