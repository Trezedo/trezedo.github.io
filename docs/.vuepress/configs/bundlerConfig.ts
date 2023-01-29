import { viteBundler } from "vuepress";
// import { webpackBundler } from "@vuepress/bundler-webpack";

export default {
    vite: viteBundler({
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
    }),
    webpack: undefined, // webpackBundler({}),
};
