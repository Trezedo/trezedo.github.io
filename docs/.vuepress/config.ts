import {defineHopeConfig} from "vuepress-theme-hope";
import themeConfig from "./themeConfig";
import onInitialized from "./configs/onInitialized";
import bundlerConfig from "./configs/bundlerConfig";
import {ViteBundlerOptions} from "vuepress";
import {WebpackBundlerOptions} from "@vuepress/bundler-webpack";
import {path} from '@vuepress/utils';

// 这里的时间是构建时间，因为当前处于 nodejs 环境，其实也是可以做到 “不缓存” 的
const date = new Date().getTime();

// noinspection JSUnusedGlobalSymbols,SpellCheckingInspection
export default defineHopeConfig<ViteBundlerOptions | WebpackBundlerOptions>({
    base: "/",
    dest: "./dist",
    head: [
        ["link", {rel: "stylesheet", href: "//at.alicdn.com/t/font_2410206_mfj6e1vbwo.css" + date}],
        ["link", {rel: "stylesheet", href: "/assets/css/index.css?" + date}],
        // ["link", {rel: "shortcut icon", href: "/favicon.ico",type:"image/x-icon"}],
        ["link", {
            rel: "icon", type: "image/jpeg",
            href: "https://thirdqq.qlogo.cn/g?b=sdk&k=TwT70050CH0C9Bd4qWtCmg&s=3&t=" + date
        }],
        // ["style", {}, `img.logo,img.hero-logo{border-radius: 50%;}`]
        // ["script", {src: "/assets/js/pop.js"}]
        ["script", {src: "/assets/js/notiflix-confirm-aio-3.2.4.min.js"}],
        // ["script", {src: "/assets/js/toggleSidebar.js?" + date}],
        ["script", {src: '/assets/js/index.js?' + date}],
    ],
    locales: {
        "/": {
            lang: "zh-CN",
            title: "Trezedo",
            description: "使用vuepress2搭建的博客",
        },
        // "/zh/": {},
    },
    theme: "hope",
    themeConfig,
    // clientAppEnhanceFiles: "",
    onInitialized,
    plugins: [
        ['@vuepress/plugin-search', {
            locales: {
                '/': {placeholder: '搜索',},
                '/en/': {placeholder: 'Search',},
            },
        }],
    ],
    bundler: bundler(),
    bundlerConfig,
    clientAppSetupFiles: [
        path.resolve(__dirname, './configs/setupFiles/toggleSidebar.ts')
    ]
    // port: 8888
});

export function bundler() {
    return '@vuepress/bundler-vite';
    // return process.env.NODE_ENV == "development"
    //     ? '@vuepress/bundler-vite'
    //     : "@vuepress/bundler-webpack"; // 使用 webpack 打包
}