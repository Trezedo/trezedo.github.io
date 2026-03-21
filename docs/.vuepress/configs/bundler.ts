import { viteBundler } from "@vuepress/bundler-vite";

// https://v2.vuepress.vuejs.org/zh/reference/bundler/vite.html
export default viteBundler({
    viteOptions: {
        build: {
            rollupOptions: {
                // 对静态文件进行分类
                output: {
                    // 新版暂时不可用，打包会出问题
                    // chunkFileNames: "assets/js/[name]-[hash].js",
                    // entryFileNames: "assets/js/[name]-[hash].js",
                    // assetFileNames: `assets/[ext]/[name]-[hash].[ext]`,
                },
            },
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
