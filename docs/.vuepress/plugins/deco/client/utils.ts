import { push } from "notivue";
import { onMounted, onUpdated, ref, watch } from "vue";
import { useRoute } from "vuepress/client";

/**
 * 检测当前环境是否为 QQ 或 WeChat
 */
function getQQOrWeChatEnv(): string | null {
    const match = /\bQQ\b|WeChat/.exec(navigator.userAgent);
    return match?.[0] ?? null;
}

/**
 * 如果在 QQ 或 WeChat 环境中，提示用户环境异常
 */
export function warnIfInQQOrWeChat() {
    // 定义显示弹窗的函数
    function showConfirm() {
        const env = getQQOrWeChatEnv();
        const browser = /Chrome|Firefox|Safari/gi.exec(navigator.userAgent);
        const browserName = browser?.[0] ?? "未知";
        const contextText = `当前为 ${env || browserName} 环境，点击确定查看详情`;

        push.warning({
            title: "检测到环境异常",
            message: contextText,
            duration: Infinity,
            props: {
                actions: true,
            },
            onManualClear() {
                alert("用户关闭了通知");
            },
        });
    }

    onMounted(() => {
        if (getQQOrWeChatEnv()) {
            showConfirm();
        }
    });
}

/**
 * QQ内打开链接，location.href, vue-router 等链接均正常，但分享时链接却是打开时的，因此通过强制刷新来解决
 */
export function showReloadPageButton() {
    onMounted(() => {
        const createButton = () => {
            const btn = document.createElement("button");
            btn.className = "refresh-page";
            btn.innerHTML = `<i class="icon iconfont icon-refresh" style="font-size: 27px"></i>`;
            btn.setAttribute("aria-label", "刷新页面");
            btn.setAttribute("data-balloon-pos", "left");

            // 非 hover 状态时，取消焦点
            btn.onmouseout = () => btn.blur();
            return btn;
        };
        if (getQQOrWeChatEnv() || /debug/.test(location.search)) {
            const button = createButton();
            document.body.appendChild(button);
            button.addEventListener("click", () => {
                location.reload();
            });
        }
    });
}

export function setupBackground() {
    const route = useRoute();
    const bgEl = ref<HTMLElement | null>(null);

    const install = (el: HTMLElement | null) => {
        void (el && (el.style.backgroundImage = `url(${__DECO_IMG__})`));
    };

    const uninstall = (el: HTMLElement | null) => {
        void (el && (el.style.backgroundImage = ""));
    };

    onMounted(() => {
        bgEl.value = document.createElement("div");
        bgEl.value.id = "bg";

        document.body.insertBefore(bgEl.value, document.body.children[0]);

        void (!__DECO_PATHS__.includes(route.path) && install(bgEl.value));
    });

    watch(
        () => route.path,
        (n) => {
            if (!__DECO_PATHS__.includes(n)) install(bgEl.value);
            else uninstall(bgEl.value);
        },
    );
}

// todo 以 markdown-it 插件形式来处理
export function useImageSize() {
    if (__VUEPRESS_SSR__) {
        return;
    }
    // 思路来源：https://www.zhihu.com/question/23378396/answer/402528770

    // 检测是否支持 zoom
    // MDN 建议用 transform scale 代替，但它不会重绘
    // @ts-ignore
    const supportZoom: boolean = typeof document.body.style["zoom"] == "string";

    function initImageSize() {
        const images = document.querySelectorAll<HTMLImageElement>(
            'img[src*="#s-"]',
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
                void (size && (img.style.width = (img.naturalWidth * parseInt(size)) / 100 + "px"));
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
        },
    );
    onUpdated(() => {
        console.log("!!!");
    });
}
