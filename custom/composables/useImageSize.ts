import { onMounted, watch } from "vue";
import { useRoute } from "vue-router";

export function useImageSize() {
    // 思路来源：https://www.zhihu.com/question/23378396/answer/402528770

    // 检测是否支持 zoom
    // MDN 建议用 transform scale 代替，但它不会重绘
    const supportZoom: boolean = typeof document.body.style["zoom"] == "string";

    function initImageSize() {
        const images = document.querySelectorAll<HTMLImageElement>(
            'img[src*="#s-"]'
        ) as unknown as HTMLImageElement[];
        console.log("list: ", images);

        const reg = /#s-(\d+)(px|%)?/;
        for (const img of images) {
            const exec = reg.exec(img.src);
            const width = exec?.[1];
            const unit = exec?.[2];
            console.log(img.src, width);
            if (supportZoom) {
                img.style["zoom"] = width + unit ?? "%";
                return;
            }
        }
    }

    const route = useRoute();
    onMounted(() => {
        console.log("onMounted");
        setTimeout(() => initImageSize(), 200);
    });
    watch(
        () => route.path,
        () => {
            console.log(new Date().getTime());
            setTimeout(() => initImageSize(), 200);
        }
    );
}
