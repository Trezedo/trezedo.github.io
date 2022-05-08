import { hopeTheme } from "vuepress-theme-hope";
import { navbar, sidebar } from "./configs";

export default hopeTheme({
    hostname: "https://trezedo.gitee.io",
    author: {
        name: "Trezedo",
        url: "https://Trezedo.club",
    },
    iconPrefix: "iconfont icon-",
    // 左上角，以及首页右侧
    logo: "https://thirdqq.qlogo.cn/g?b=sdk&k=TwT70050CH0C9Bd4qWtCmg&s=4", // "/favicon.ico",

    // repo: "https://gitee.com/trezedo/trezedo",
    docsDir: "demo/src",
    navbarAutoHide: "mobile", // "always" 容易卡顿
    darkmode: "switch",
    blog: {
        articlePerPage: 8,
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
    // navbar, // 似乎失败了
    locales: {
        "/": {
            navbar: navbar,
            sidebar: sidebar,
            footer:
                `Powered by <a href="https://v2.vuepress.vuejs.org/" target="_blank">VuePress</a>` +
                ` and <a href="https://vuepress-theme-hope.github.io/" target="_blank">vuepress-theme-hope</a>`,
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
            "/note/math/differential-operator.html": ["1962234583"],
        },
    },

    plugins: {
        blog: {
            autoExcerpt: false,
            article: "/article",
            // slides:undefined
        },
        // comment: {
        //     type: "waline",
        //     serverURL: "https://vuepress-theme-hope-comment.vercel.app",
        // },
        comment: false,
        mdEnhance: {
            enableAll: true,
            presentation: {
                plugins: ["highlight", "math", "search", "notes", "zoom"],
            },
            tex: {
                output: "html",
                // mathml 相当于 tex 源码
                macros: {
                    "\\d": "\\text{d}",
                    "\\e": "\\text{e}",
                    "\\i": "\\text{i}",
                    "\\ds": "\\displaystyle",
                    "\\eqref": "\\href{##tag#1}{(\\text{#1})}",
                    "\\ref": "\\href{##tag#1}{\\text{#1}}",
                    "\\label": "\\htmlId{tag#1}{}",
                },
                // https://github.com/KaTeX/KaTeX/issues/2003
                trust: (context) =>
                    ["\\htmlId", "\\href"].includes(context.command),
            },
        },

        copyright: {
            global: true,
            author: "Trezedo",
            license: "MIT",
            triggerWords: 100,
        },
        pwa: false,
    },
});
