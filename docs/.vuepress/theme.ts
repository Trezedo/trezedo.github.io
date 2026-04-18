import { hopeTheme } from "vuepress-theme-hope";

import { comments, navbar, sidebar } from "./configs";
import { katexOptions } from "./configs/plugins";

export default hopeTheme({
    hostname: "https://zedo.netlify.app",
    author: {
        name: "zedo",
        url: "https://zedo.netlify.app",
    },
    // 左上角，以及首页右侧
    logo: "https://q1.qlogo.cn/g?b=qq&s=5&nk=1962234583", // "/favicon.ico",

    repoDisplay: true,
    repo: "https://github.com/trezedo/trezedo.github.io",
    docsBranch: "main",
    docsDir: "docs", // "src/docs"

    pageInfo: ["Author", "Original", "Date", "Category", "Tag", "ReadingTime", "Word"],

    navbarAutoHide: "mobile", // "always" 容易卡顿
    darkmode: "toggle",
    blog: {
        articlePerPage: 12,
        medias: {
            QQ: "https://api.mmp.cc/api/qqhome?text=1962234583",
            Qzone: "https://1962234583.qzone.qq.com",
            Wechat: "https://wx.shanglala.cn/wap/url_scheme.php?id=NjYw", //"https://u.wechat.com/MMPIhfjElaxLw0gmEeUn8rI",
            Zhihu: "https://www.zhihu.com/people/0Chenky",
            Email: "mailto:trezedo@qq.com",
            Gitee: "https://gitee.com/zedo",
            GitHub: "https://github.com/trezedo",
            // Gmail: "https://example.com",
        },
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
            "/demo/encrypt.html": { hint: "密码：1234", password: "1234" },
        },
    },

    hotReload: true, // 主要是侧边栏热更新

    markdown: {
        align: true, // 一定程度上还算方便
        attrs: true,
        alert: true,
        codeTabs: true, // 与 tabs 类似，但专门展示代码
        component: true, // 以 YAML 和 JSON 的数据格式使用 Vue 组件
        chartjs: false,
        demo: true,
        echarts: false,
        flowchart: true,
        footnote: true,
        gfm: true,
        highlighter: {
            lineNumbers: 5,
            type: "shiki",
            langAlias: {
                /* obsidian 的 prismjs 可以高亮 excel，但 vuepress 的不行
                 * 此处使用 shiki 别名，js系, c#, r 语言等等都可以
                 */
                excel: "js",
            },
        },
        imgMark: false,
        imgSize: false,
        include: false, // 可导入 markdown，而非以代码形式导入
        /* attrs 导致的问题：
            1. 行高亮代码被认为是 text 
            2. https://github.com/vuepress-theme-hope/vuepress-theme-hope/issues/2048
            */
        linksCheck: { dev: true },
        mark: true, // 用 " == x ==" 高亮
        // stylize: [], // 比较强大但是为了兼容性我不用
        markmap: true,
        math: {
            type: "katex", // https://ecosystem.vuejs.press/zh/plugins/markdown/markdown-math.html
            ...katexOptions,
        },
        mermaid: true,
        revealjs: { plugins: ["highlight", "math", "search", "notes", "zoom"] },
        spoiler: true,
        sub: true,
        sup: true,
        tabs: true, // 可以写 markdown，不仅仅是代码
        tasklist: true,
        vPre: true, // 这是兼容 v1 的功能
        plantuml: true,
        vuePlayground: true,
    },

    plugins: {
        blog: {
            excerptLength: 100,
            article: "/article/",
        },
        components: {
            components: ["Badge", "VPCard"],
        },

        icon: {
            assets: "https://unpkg.com/iconify-icon@2.3.0/dist/iconify-icon.min.js", //"iconify",
        },
        comment: comments,
        copyright: {
            global: true,
            author: "zedo",
            license: "MIT",
            triggerLength: 100,
            disableSelection: false,
            disableCopy: false,
        },
        notice: [],
        pwa: false,
        slimsearch: {
            indexContent: true,
        },
    },
});
