import {defineThemeConfig} from "vuepress-theme-hope";
import navbar from "./configs/navbar";
import sidebar from "./configs/sidebar";

export default defineThemeConfig({
    hostname: "https://Trezedo.club",
    author: {
        name: "Trezedo",
        url: "https://Trezedo.club",
    },
    iconPrefix: "iconfont icon-",
    logo: "https://thirdqq.qlogo.cn/g?b=sdk&k=TwT70050CH0C9Bd4qWtCmg&s=4",// "/logo.ico",

    // repo: "https://gitee.com/trezedo/trezedo",
    docsDir: "demo/src",
    navbarAutoHide: "mobile", // "always" 容易卡顿
    darkmode: "switch",
    blog: {
        articlePerPage: 6,
        medias: {
            QQ: "https://res.abeim.cn/api/qq/?qq=1962234583",
            Qzone: "https://1962234583.qzone.qq.com",
            Wechat: "https://wx.shanglala.cn/wap/url_scheme.php?id=NjYw", //"https://u.wechat.com/MMPIhfjElaxLw0gmEeUn8rI",
            Zhihu: "https://www.zhihu.com/people/0Chenky",
            Email: "mailto:trezedo@qq.com",
            Gitee: "https://gitee.com/Trezedo",
            // GitHub: "https://example.com",
            // Gmail: "https://example.com",
        },
        roundAvatar: true, // 首页右侧的头像
    },
    lastUpdated: true,
    locales: {
        "/": {
            navbar: navbar,
            sidebar: sidebar,
            footer: "Powered by <a href=\"https://v2.vuepress.vuejs.org/\">Vuepress</a>",
            displayFooter: true,
            blog: {
                description: "三分之一半吊子",
            },
            metaLocales: {
                editLink: "编辑此页",
            },
        },
        // "/zh/": {},
    },

    encrypt: {
        config: {
            "/guide/encrypt.html": ["1234"],
            "/zh/guide/encrypt.html": ["1234"],
            "/math/%E5%BE%AE%E5%88%86%E6%96%B9%E7%A8%8B%E7%AE%97%E5%AD%90%E6%B3%95.html": ["1962234583"]
        },
    },
    plugins: {
        blog: {
            autoExcerpt: true,
            article: "/article",
            // slides:undefined
        },
        // comment: {
        //     type: "waline",
        //     serverURL: "https://vuepress-theme-hope-comment.vercel.app",
        // },
        mdEnhance: {
            enableAll: true,
            presentation: {
                plugins: ["highlight", "math", "search", "notes", "zoom"],
            },
            tex: {
                output: 'html',
                // mathml 相当于 tex 源码
                macros: {
                    "\\d": "\\text{d}",
                    "\\e": "\\text{e}",
                    "\\i": "\\text{i}",
                    "\\ds": "\\displaystyle",
                    "\\eqref": "\\href{##tag#1}{(\\text{#1})}",
                    "\\ref": "\\href{##tag#1}{\\text{#1}}",
                    "\\label": "\\htmlId{tag#1}{}"
                },
                // https://github.com/KaTeX/KaTeX/issues/2003
                trust: context => ['\\htmlId', '\\href'].includes(context.command)
            },
        },
        pwa: false
    }
});