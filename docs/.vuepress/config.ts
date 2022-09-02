import { Bundler, defineUserConfig } from "vuepress";
import { path } from "@vuepress/utils";

import { bundlerConfig, onInitialized, pluginConfig } from "./configs/";
import theme from "./theme";

// 这里的时间是构建时间，因为当前处于 nodejs 环境，其实也是可以做到 “不缓存” 的
const date: string = "?" + new Date().getTime();

export default defineUserConfig({
    base: "/",

    dest: "./dist",
    public: "./public",
    // templateBuild: "custom/index.build.html",

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
        ["script", { defer: true, src: "/assets/js/index.js" + date }],
    ],
    alias: {
        "@zedo": path.resolve(__dirname, "../../custom/"),
        "@theme-hope/components/NormalPage.js": path.resolve(
            __dirname,
            "../../custom/components/views/NormalPage.vue"
        ),
    },
    locales: {
        "/": {
            lang: "zh-CN",
            title: "zedo",
            description: "使用 vuepress2 搭建的博客",
        },
        // "/zh/": {},
    },

    theme,
    onInitialized: onInitialized,
    plugins: pluginConfig,

    bundler: bundler("vite"),

    // clientConfigFile: path.resolve(__dirname, "./clientAppEnhance.ts"),
});

export function isDev(): boolean {
    return process.env["NODE_ENV"] == "development";
}

export function bundler(type: "vite" | "webpack"): Bundler {
    return bundlerConfig[type];
}
