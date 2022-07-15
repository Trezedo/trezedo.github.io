import { defineUserConfig } from "vuepress";
import { Bundler } from "@vuepress/core";
import { path } from "@vuepress/utils";

import { onInitialized, bundlerConfig } from "./configs/";
import { pluginConfig } from "./configs/plugins";
import themeConfig from "./themeConfig";

// 这里的时间是构建时间，因为当前处于 nodejs 环境，其实也是可以做到 “不缓存” 的
const date: string = "?" + new Date().getTime();

// noinspection JSUnusedGlobalSymbols,SpellCheckingInspection
export default defineUserConfig({
    base: "/",
    dest: "./dist",
    head: [
        // ! 此处引入的 css、js，当 hash 变化时也会重复加载
        /* [
            "link",
            { rel: "stylesheet", href: "/assets/font/iconfont.css" + date },
        ], */
        // ["link", {rel: "shortcut icon", href: "/favicon.ico",type:"image/x-icon"}],
        /*["link", {
            rel: "icon", type: "image/jpeg",
            href: "https://thirdqq.qlogo.cn/g?b=sdk&k=TwT70050CH0C9Bd4qWtCmg&s=3&t=" + new Date().getTime()
        }],*/
        // https://www.cnblogs.com/jiasm/p/7683930.html
        /* [
            "script", // 会导致标题栏图片闪烁
            {
                defer: true,
                src: "https://unpkg.com/smoothscroll-for-websites@1.4.10/SmoothScroll.js",
            },
        ], */
        [
            "script",
            {
                defer: true,
                src: "/assets/js/notiflix-confirm-aio-3.2.4.min.js",
            },
        ],
        ["script", { defer: true, src: "/assets/js/index.js" + date }],
        ["script", { defer: true, src: "/assets/js/love-me.js" }],
    ],
    alias: {
        "@zedo": path.resolve(__dirname, "../../custom/"),
    },
    locales: {
        "/": {
            lang: "zh-CN",
            title: "Trezedo",
            description: "使用vuepress2搭建的博客",
        },
        // "/zh/": {},
    },
    theme: themeConfig,
    onInitialized: onInitialized,
    plugins: pluginConfig,

    bundler: bundler("vite"),

    // clientAppSetupFiles beta.18 加入了隐藏侧边栏，取消自己写的
    // path.resolve(__dirname, './configs/setupFiles/toggleSidebar.ts')
    clientConfigFile: path.resolve(__dirname, "./clientAppEnhance.ts"),
});

export function isDev(): boolean {
    return process.env.NODE_ENV == "development";
}

export function bundler(type: "vite" | "webpack"): Bundler {
    return bundlerConfig[type];
}
