import { hopeTheme } from "vuepress-theme-hope";
import { comments, navbar, sidebar } from "./configs";
import { katexOptions, noticeOptions } from "./configs/plugins";

export default hopeTheme({
    hostname: "https://zedo.netlify.app",
    author: {
        name: "zedo",
        url: "https://zedo.netlify.app",
    },
    // 左上角，以及首页右侧
    logo: "http://q1.qlogo.cn/g?b=qq&s=5&nk=1962234583", // "/favicon.ico",

    repoDisplay: true,
    repo: "https://github.com/trezedo/trezedo.github.io",
    // docsRepo: this.repo,
    docsBranch: "main",
    docsDir: "docs", // "src/docs"

    pageInfo: [
        "Author",
        "Original",
        "Date",
        "Category",
        "Tag",
        "ReadingTime",
        "Word",
    ],

    navbarAutoHide: "mobile", // "always" 容易卡顿
    darkmode: "toggle",
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
    hotReload: false,
    plugins: {
        blog: {
            excerptLength: 100,
            article: "/article",
            // slides:undefined
        },
        icon: {
            assets: "iconify",
        },
        comment: comments,
        copyright: {
            global: true,
            author: "Trezedo",
            license: "MIT",
            triggerLength: 100,
            disableSelection: false,
            disableCopy: true,
        },
        pwa: false,
        search: {
            locales: {
                "/": { placeholder: "搜索" },
                "/en/": { placeholder: "Search" },
            },
            // 排除首页
            isSearchable: (page) => page.path !== "/",
        },
        slimsearch: {
            indexContent: true,
        },
        notice: noticeOptions,
    },
    markdown: {
        alert: true,
        // https://ecosystem.vuejs.press/zh/plugins/markdown/markdown-math.html
        math: {
            type: "katex",
            ...katexOptions,
        },
        chartjs: false,
        echarts: false,
        mermaid: true,
        sub: true,
        sup: true,
        tabs: true, // 可以写 markdown，不仅仅是代码
        codeTabs: true, // 与 tabs 类似，但专门展示代码
        tasklist: true,
        imgMark: false,
        imgSize: false,
        include: false, // 可导入 markdown，而非以代码形式导入
        /* attrs 导致的问题：
            1. 行高亮代码被认为是 text 
            2. https://github.com/vuepress-theme-hope/vuepress-theme-hope/issues/2048
            */
        attrs: true,
        // 暂时启用
        // presentation: ["highlight", "math", "search", "notes", "zoom"],
        revealjs: true,
        mark: true, // 用 " == x ==" 高亮
        // stylize: [], // 比较强大但是为了兼容性我不用
        flowchart: true,
        footnote: true,
        demo: true,
        // container: true, // 已弃用
        align: true, // 一定程度上还算方便
        linksCheck: { dev: true },
        vPre: true, // 这是兼容 v1 的功能
    },
});
