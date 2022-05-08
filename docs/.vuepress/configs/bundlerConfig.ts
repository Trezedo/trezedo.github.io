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

function assetType(ext: string): string {
    if (ext.endsWith(".css")) return "css";
    else if (ext.endsWith(".js") || ext.includes(".js.")) return "js";
    else if (/\.(jpg|png|svg|jpeg|gif|ico)$/i.test(ext)) return "img";
    else if (/.(woff|woff2|ttf|eot)$/.test(ext)) return "font";
    else return "other";
}
