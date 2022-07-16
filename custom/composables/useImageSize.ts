import { onMounted, watch } from "vue";
import { useRoute } from "vue-router";

export function useImageSize() {
    // 思路来源：https://www.zhihu.com/question/23378396/answer/402528770
    function initImageSize() {
        const images = document.querySelectorAll<HTMLImageElement>(
            'img[src*="#w"]'
        ) as unknown as HTMLImageElement[];
        console.log("list: ", images);

        const reg = /#w([^#^ ]+)/; // 非空格或井号
        for (const img of images) {
            const width = reg.exec(img.src)?.[1];
            console.log(img.src, width);
            img.style.width = width + "%";
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
