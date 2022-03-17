(() => {
    const header = document.querySelector("header")
    header?.addEventListener("dblclick", () => {
        location.reload();
    })
})()

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