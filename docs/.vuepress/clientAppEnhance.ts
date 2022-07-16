import { defineClientConfig } from "@vuepress/client";
import { useIconfont, useImageSize, useLoveMe, useNotiflix } from "@zedo";

// https://v2.vuepress.vuejs.org/zh/advanced/cookbook/usage-of-client-config.html
export default defineClientConfig({
    enhance({ app, router, siteData }) {
        // app.config.globalProperties
        // 全局注册组件会被打包进 app.xxx.js
        // for (let com in Components) {
        //     app.component(com, Components[com])
        // }
    },
    setup() {
        useIconfont();
        useImageSize();
        useNotiflix();
        useLoveMe();
    },
    rootComponents: [],
});
