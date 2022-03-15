import {defineSidebarConfig} from "vuepress-theme-hope";

export default defineSidebarConfig({
    "/": [
        "/README.md",
        "/home.md",
        "/slide.md",
        /*{
            text: "工具", prefix: "tool/", children: "structure"
        },*/
        {
            text: "如何使用",
            collapsable: true,
            prefix: "guide/",
            // link: "/guide/README.md",
            children: ["page.md", "markdown.md", "disable.md", "encrypt.md"],
        },
        {
            text: "文章", icon: "note", prefix: "article/",
            children: [
                {
                    text: "软件", icon: "note", collapsable: true,
                    prefix: "",
                    children: [
                        "git-usage.md",
                        "markdown基本使用.md",
                        "miktex-installation.md",
                        "nodejs-installation.md",
                    ]
                },
                {
                    text: "技术", icon: "note", prefix: "tech/", collapsable: true,
                    // children: "structure"
                    children: [
                        "vert.x-learning.md",
                        "VuePress2使用.md",
                        "katex-plugin-vuepress.md",
                        "用gitee搭建图床.md",

                        "/article/使用Vue(组件).md",
                        "/article/免费接口.md",
                        "/article/tbs.md",
                    ]
                },
            ],
        }
    ],
    "/tool/": "structure", // 空数组可以关闭
    "/note/math/": [
        {
            text: "如何使用", prefix: "", collapsable: true,
            children: "structure",
        },
        {
            text: "练习题", prefix: "q/", collapsable: true,
            children: "structure"
        }
    ]
});
