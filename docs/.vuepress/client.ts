import { defineClientConfig } from "vuepress/client";

// https://v2.vuepress.vuejs.org/zh/advanced/cookbook/usage-of-client-config.html
export default defineClientConfig({
    enhance({ app, router: _router, siteData: _siteData }) {
        console.log(`vue v${app.version}`);
        console.log(`vuepress v${__VUEPRESS_VERSION__}`);
        // 全局注册组件会被打包进 app.xxx.js，建议用官方插件注册组件
        // for (let comp in Components) {
        //     app.component(comp, Components[comp])
        // }
    },
    setup() {
        //
    },
    // 插入到 #app 的组件
    rootComponents: [],
});
