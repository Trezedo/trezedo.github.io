import { viteBundler } from "vuepress";
import { webpackBundler } from "@vuepress/bundler-webpack";

export default {
    vite: viteBundler({
        viteOptions: {
            build: {
                rollupOptions: {
                    // 对静态文件进行分类
                    output: {
                        chunkFileNames: "assets/js/[name]-[hash].js",
                        entryFileNames: "assets/js/[name]-[hash].js",
                        // assetFileNames: `assets/[ext]/[name]-[hash].[ext]`,
                    },
                },
            },
            server: {
                proxy: {
                    "/api": {
                        target: "https://f.m.suning.com/api/ct.do",
                        rewrite: (path) => path.replace(/^\/api/, ""),
                        changeOrigin: true,
                    },
                },
            },
        },
    }),
    webpack: webpackBundler({}),
};
