import { viteBundler } from "@vuepress/bundler-vite";

// https://v2.vuepress.vuejs.org/zh/reference/bundler/vite.html
export default viteBundler({
    viteOptions: {
        build: {
            // rollupOptions 已弃用，改为 rolldownOptions，但使用空配置也会触发 warning
        },

        server: {
            proxy: {},
        },
    },
    vuePluginOptions: {
        template: {
            compilerOptions: {
                isCustomElement: (tag) => {
                    return ["font"].includes(tag);
                },
            },
        },
    },
});
