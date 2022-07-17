import { onMounted } from "vue";

const date: string = "?" + new Date().getTime();

/**
 * 通过 link 元素添加 css
 * @param config
 */
export const useHeadCss = (config: CustomElement) => {
    onMounted(() => {
        // 实际上没必要做以下判断，因为不是在子组件中执行
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
export const useHeadScript = (config: CustomElement) => {
    onMounted(() => {
        const el = document.createElement("script");
        el.id = config.id;
        el.src = config.src + date;
        el.defer = true;
        document.head.appendChild(el);
    });
};
