import { defineUserConfig } from "vuepress";
import { path } from "vuepress/utils";

import { bundler } from "./configs";
import {
    pluginDeco,
    pluginDynamicChangelog,
    pluginGraphviz,
    pluginNotivue,
    pluginSpeech,
    registerComponents,
} from "./plugins";
import theme from "./theme";

export default defineUserConfig({
    base: "/",

    dest: "./dist",
    public: "./public",

    head: [
        // ! 此处引入的 css、js，当 hash 变化时也会重复加载
        // ["script", { defer: true, src: "/assets/js/index.js" + date }],
    ],
    alias: {
        "@components": path.resolve(__dirname, "./components"),
    },
    locales: {
        "/": {
            lang: "zh-CN",
            title: "zedo",
            description: "使用 vuepress2 搭建的博客",
        },
    },

    theme,
    onInitialized: (_) => {},
    plugins: [
        registerComponents,
        pluginGraphviz,
        pluginSpeech,
        pluginDynamicChangelog({
            changelogPath: "changelog.md", // 自定义路径
            headingLevel: 3, // 提取最后一段 h3 的内容
        }),
        pluginDeco({
            img: "https://zedo-img.netlify.app/img/wallhaven-z8dg9y-lossy.png",
        }),
        pluginNotivue(),
    ],

    bundler: bundler,

    clientConfigFile: path.resolve(__dirname, "./client.ts"),

    markdown: {
        importCode: {
            handleImportPath: (str) =>
                str.replace(/^@components/, path.resolve(__dirname, "./components")),
        },
    },
});
