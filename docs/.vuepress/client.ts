import { onMounted } from "vue";
import { defineClientConfig } from "vuepress/client";

import { disableDebugLog } from "@zedo";
import { decoPlugin, reloadPagePlugin } from "@zedo/plugin-hooks/";

const handleDate = (date: Date) => {
    if (date?.toJSON() == null) {
        date = new Date();
    }
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}-${month}-${day}`;
};

async function noticeUpdateTime() {
    if (__VUEPRESS_DEV__) return;
    const data = await fetch("/sitemap.xml").then((response) => response.text());
    const xmlDoc = new DOMParser().parseFromString(data, "text/xml");
    // @ts-ignore
    let time = [...xmlDoc.querySelectorAll("lastmod")].reduce(
        (prev, { textContent: t }) => (t > prev ? t : prev),
        "",
    );

    let date = handleDate(new Date(time));
    const notice = document.querySelector(".vp-notice-title span") ?? {
        textContent: "",
    };
    notice.textContent = date ? date + " 更新" : notice.textContent;
}

// https://v2.vuepress.vuejs.org/zh/advanced/cookbook/usage-of-client-config.html
export default defineClientConfig({
    enhance({ app, router: _r, siteData: _s }) {
        console.log(`vuepress v${app.version}`);
        // 全局注册组件会被打包进 app.xxx.js，建议用官方插件注册组件
        // for (let com in Components) {
        //     app.component(com, Components[com])
        // }
    },
    setup() {
        disableDebugLog();
        /* loadStyles();
        loadScripts();
        useBackground();
        useImageSize(); */
        decoPlugin();
        reloadPagePlugin();
        onMounted(noticeUpdateTime);
    },
    // 插入到 #app 的组件
    rootComponents: [],
});
