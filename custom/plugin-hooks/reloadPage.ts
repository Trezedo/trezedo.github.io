import { onMounted } from "vue";

/**
 * QQ内打开链接，location.href, vue-router 等链接均正常，但分享时链接却是打开时的，因此通过强制刷新来解决
 */
export function reloadPagePlugin() {
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
        if (/\bQQ\b|Wechat/.test(navigator.userAgent) || /debug/.test(location.search)) {
            const button = createButton();
            document.body.appendChild(button);
            button.addEventListener("click", () => {
                location.reload();
            });
        }
    });
}
