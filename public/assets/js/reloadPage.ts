(() => {
    const createButton = () => {
        const button = document.createElement("button");
        button.className = "refresh-page";
        button.innerHTML = `<i class="icon iconfont icon-refresh" style="font-size: 27px"></i>`;
        button.setAttribute("aria-label", "刷新页面");
        button.setAttribute("data-balloon-pos", "left");

        // 非 hover 状态时，取消焦点
        button.onmouseout = () => button.blur();
        return button;
    };
    if (
        /\bQQ\b|Wechat/.test(navigator.userAgent) ||
        /debug/.test(location.search)
    ) {
        const button = createButton();
        document.body.appendChild(button);
        button.addEventListener("click", () => {
            location.reload();
        });
    }
})();

/*
QQ内打开链接，location.href 和 vue-router 等均正常，但是分享时链接只能是打开时的，因此通过强制刷新来解决
SFC 内的方式如下，注意不能直接在 clientAppEnhance.ts 当中写，否则会一直刷新：

```javascript
const router = useRouter();

onMounted(() => {
    if (/\bQQ\b/.test(navigator.userAgent)) {
        router.beforeEach((to, from, next) => {
            location.href = to.path
        })
    }
})
```
 */
/**
 tsc docs/.vuepress/public/assets/js/reloadPage.ts
 uglifyjs docs/.vuepress/public/assets/js/reloadPage.js -o docs/.vuepress/public/assets/js/reloadPage.js -m
 */
