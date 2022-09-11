import { defineClientConfig } from "@vuepress/client";
import { disableDebugLog } from "@zedo";
import { decoPlugin, reloadPagePlugin } from "@zedo/plugin-hooks/";

// import { loadScripts, loadStyles } from "@zedo";

// https://v2.vuepress.vuejs.org/zh/advanced/cookbook/usage-of-client-config.html
export default defineClientConfig({
    enhance({ app, router: _r, siteData: _s }) {
        console.log(app.version);
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
    },
    // 插入到 #app 的组件
    rootComponents: [],
});
