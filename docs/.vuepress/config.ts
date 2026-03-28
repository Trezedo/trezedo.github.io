import { defineUserConfig } from "vuepress";
import { path } from "vuepress/utils";

import { bundler, onInitialized } from "./configs";
import {
    dynamicChangelogPlugin,
    graphvizPlugin,
    registerComponents,
    speechPlugin,
} from "./plugins";
import theme from "./theme";

// 这里的时间是构建时间，因为当前处于 nodejs 环境，其实也是可以做到 “不缓存” 的
// const date: string = "?" + new Date().getTime();

export default defineUserConfig({
    base: "/",

    dest: "./dist",
    public: "./public",

    head: [
        // ! 此处引入的 css、js，当 hash 变化时也会重复加载
        // ["script", { defer: true, src: "/assets/js/index.js" + date }],
    ],
    alias: {
        "@zedo": path.resolve(__dirname, "../../custom/"),
        "@theme-hope/components/NormalPage": path.resolve(
            __dirname,
            "../../custom/components/views/NormalPage.vue",
        ),
    },
    locales: {
        "/": {
            lang: "zh-CN",
            title: "zedo",
            description: "使用 vuepress2 搭建的博客",
        },
    },

    theme,
    onInitialized: onInitialized,
    plugins: [
        registerComponents,
        graphvizPlugin,
        speechPlugin,
        dynamicChangelogPlugin({
            changelogPath: "changelog.md", // 自定义路径
            headingLevel: 3, // 提取最后一段 h3 的内容
        }),
    ],

    bundler: bundler,

    clientConfigFile: path.resolve(__dirname, "./client.ts"),
});
