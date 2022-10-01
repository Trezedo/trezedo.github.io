import { hopeTheme } from "vuepress-theme-hope";
import { navbar, sidebar } from "./configs";
// import type { TrustContext } from "katex";

export default hopeTheme({
    hostname: "https://zedo.netlify.app",
    author: {
        name: "机器不会学习",
        url: "https://zedo.netlify.app",
    },
    iconAssets: "iconfont",
    iconPrefix: "iconfont icon-",
    // 左上角，以及首页右侧
    logo: "https://res.abeim.cn/api-qq.tx?qq=1962234583", // "/favicon.ico",

    repoDisplay: true,
    repo: "https://github.com/trezedo/trezedo.github.io",
    // docsRepo: this.repo,
    docsBranch: "main",
    docsDir: "docs", // "src/docs"

    pageInfo: ["Author", "Original", "Date", "Category", "Tag", "ReadingTime"],

    navbarAutoHide: "mobile", // "always" 容易卡顿
    darkmode: "toggle",
    themeColor: {
        blue: "#2196f3",
        red: "#f26d6d",
        green: "#3eaf7c",
        orange: "#fb9b5f",
    },

    blog: {
        articlePerPage: 12,
        medias: {
            QQ: "https://res.abeim.cn/api/qq/?qq=1962234583",
            Qzone: "https://1962234583.qzone.qq.com",
            Wechat: "https://wx.shanglala.cn/wap/url_scheme.php?id=NjYw", //"https://u.wechat.com/MMPIhfjElaxLw0gmEeUn8rI",
            Zhihu: "https://www.zhihu.com/people/0Chenky",
            Email: "mailto:trezedo@qq.com",
            Gitee: "https://gitee.com/zedo",
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
                ` and <a href="https://vuepress-theme-hope.github.io/" target="_blank">VuePress Theme Hope</a>`,
            displayFooter: true,
            blog: {
                description: "三分之一半吊子",
                intro: "/intro.html",
            },
            metaLocales: {
                editLink: "编辑此页",
            },
        },
        // "/zh/": {},
    },
    sidebarSorter: ["readme", "order", "title", "date"],

    encrypt: {
        config: {
            "/guide/encrypt.html": ["1234"],
            "/zh/guide/encrypt.html": ["1234"],
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
            chart: false,
            echarts: false,
            mermaid: true,
            sub: true,
            sup: true,
            tabs: true, // 可以写 markdown，不仅仅是代码
            codetabs: true, // 与 tabs 类似，但专门展示代码
            tasklist: true,
            imageMark: false,
            imageSize: false,
            include: false, // 可导入 markdown，而非以代码形式导入
            /* attrs 导致的问题：
            1. 行高亮代码被认为是 text 
            2. https://github.com/vuepress-theme-hope/vuepress-theme-hope/issues/2048
            */
            attrs: true,
            // 暂时启用
            presentation: {
                plugins: ["highlight", "math", "search", "notes", "zoom"],
            },
            mark: true, // 用 " == x ==" 高亮
            // stylize: [], // 比较强大但是为了兼容性我不用
            flowchart: true,
            footnote: true,
            demo: true,
            container: true, // 默认开启
            align: true, // 一定程度上还算方便
            linkCheck: "dev",
            vpre: true, // 这是兼容 v1 的功能

            katex: {
                output: "html",
                // mathml 相当于 tex 源码
                macros: {
                    "\\d": "\\mathop{}\\!\\mathrm{d}",
                    "\\e": "\\text{e}",
                    "\\i": "\\text{i}",
                    "\\ds": "\\displaystyle",
                    "\\eqref": "\\href{##tag-#1}{(\\text{#1})}",
                    "\\ref": "\\href{##tag-#1}{\\text{#1}}",
                    "\\label": "\\htmlId{tag-#1}{}",
                    "\\oldTag": "\\@ifstar\\tag@literal\\tag@paren",
                    "\\tag": "\\oldTag{#1}\\label{#1}",
                    "\\tagref": "\\href{##tag-#1}{(#1)}",
                    // 数据结构
                    "\\mk": "\\mkern{#1mu}",
                    "\\box":
                        "\\begin{array}{|c|c|}\\hline \\!#1\\! & \\!#2\\!\\\\ \\hline \\end{array}",
                    "\\node": "\\box{#1}{\\bullet}",
                    "\\cnode": "\\colorbox{#1}{$\\node{#2}$}",
                    // katex 不支持默认参数，\providecommand\pTo[1][-20]{\mkern{#1mu}\xrightarrow{\mkern24mu}\mkern-7mu}
                    "\\pto": "\\mkern{-20mu}\\xrightarrow{\\mkern24mu}\\mkern-6mu",
                    "\\circled": "\\text{\\textcircled{\\small{#1}}}",
                    "\\mod": "\\mathop{\\mathrm{mod}}",
                },
                // 似乎是 md-enhance 使用的 katex 版本较低的缘故
                strict: "ignore" /* (errorCode: string, errorMsg: string, token: any) => {
                    console.error(errorCode, errorMsg, token);
                    if (errorCode === "htmlExtension") {
                        return "ignore";
                    }
                    return "error";
                } */,
                // https://github.com/KaTeX/KaTeX/issues/2003
                trust: (context: /* TrustContext */ any) =>
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
