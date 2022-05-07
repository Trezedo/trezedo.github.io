import { defineUserConfig, UserConfig, viteBundler } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";
import themeConfig from "./themeConfig";
import onInitialized from "./configs/onInitialized";
import bundlerConfig from "./configs/bundlerConfig";
import { ViteBundlerOptions } from "vuepress";
import { WebpackBundlerOptions } from "@vuepress/bundler-webpack";
import components from "./configs/components";
import { config } from "process";

import { searchPlugin } from "@vuepress/plugin-search";
import { registerComponentsPlugin } from "@vuepress/plugin-register-components";

// 这里的时间是构建时间，因为当前处于 nodejs 环境，其实也是可以做到 “不缓存” 的
const date: string = "?" + new Date().getTime();

// noinspection JSUnusedGlobalSymbols,SpellCheckingInspection
export default defineUserConfig({
    base: "/",
    dest: "./dist",
    head: [
        [
            "link",
            {
                rel: "stylesheet",
                href: "//at.alicdn.com/t/font_2410206_mfj6e1vbwo.css" + date,
            },
        ],
        [
            "link",
            {
                rel: "stylesheet",
                href:
                    (isDev()
                        ? "/assets/css/index.css"
                        : "/assets/css/index.min.css") + date,
            },
        ],
        // ["link", {rel: "shortcut icon", href: "/favicon.ico",type:"image/x-icon"}],
        /*["link", {
            rel: "icon", type: "image/jpeg",
            href: "https://thirdqq.qlogo.cn/g?b=sdk&k=TwT70050CH0C9Bd4qWtCmg&s=3&t=" + new Date().getTime()
        }],*/
        // ["style", {}, `img.logo,img.hero-logo{border-radius: 50%;}`]
        // https://www.cnblogs.com/jiasm/p/7683930.html
        [
            "script",
            {
                defer: true,
                src: "/assets/js/notiflix-confirm-aio-3.2.4.min.js",
            },
        ],
        ["script", { defer: true, src: "/assets/js/index.js" + date }],
    ],
    locales: {
        "/": {
            lang: "zh-CN",
            title: "Trezedo",
            description: "使用vuepress2搭建的博客",
        },
        // "/zh/": {},
    },
    theme: themeConfig,
    // clientAppEnhanceFiles: "",
    onInitialized,
    plugins: [
        [
            searchPlugin({
                locales: {
                    "/": { placeholder: "搜索" },
                    "/en/": { placeholder: "Search" },
                },
            }),
        ],
        // 使用插件，而不是在 clientAppEnhance.ts 手动导入，因为会增大 app.xxx.js 打包的体积
        registerComponentsPlugin({ components }),
    ],
    bundler: viteBundler({
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

    clientAppSetupFiles: [
        // beta.18 加入了隐藏侧边栏，取消自己写的
        // path.resolve(__dirname, './configs/setupFiles/toggleSidebar.ts')
    ],
    // port: 8888
});

export function isDev(): boolean {
    return process.env.NODE_ENV == "development";
}

export function bundler(): string {
    return "@vuepress/bundler-vite";
    // return isDev()
    //     ? '@vuepress/bundler-vite'
    //     : "@vuepress/bundler-webpack"; // 使用 webpack 打包
}
