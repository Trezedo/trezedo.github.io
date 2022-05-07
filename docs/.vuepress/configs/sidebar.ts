import { sidebar } from "vuepress-theme-hope";

export default sidebar({
    "/": [
        "/README.md",
        "/home.md",
        // "/slide.md",
        /*{
            text: "工具", prefix: "tool/", children: "structure"
        },*/
        {
            text: "使用指南",
            collapsable: true,
            prefix: "guide/",
            // link: "/guide/README.md",
            children: ["page.md", "markdown.md", "disable.md", "encrypt.md"],
        },
        {
            text: "文章",
            icon: "note",
            children: [
                {
                    text: "软件",
                    icon: "note",
                    prefix: "software/",
                    collapsable: true,
                    children: "structure",
                },
                {
                    text: "技术",
                    icon: "code",
                    prefix: "article/tech/",
                    collapsable: true,
                    children: "structure",
                },
            ],
        },
    ],
    "/tool/": "structure", // 空数组可以关闭
    "/note/": [
        {
            text: "数学",
            icon: "function",
            prefix: "math/",
            children: [
                {
                    text: "探索",
                    icon: "advance",
                    prefix: "",
                    collapsable: true,
                    children: "structure",
                },
                {
                    text: "练习题",
                    icon: "exercise",
                    prefix: "q/",
                    collapsable: true,
                    children: "structure",
                },
            ],
        },
        {
            text: "算法学习",
            icon: "semantic",
            prefix: "algo/q/",
            children: "structure",
        },
        {
            text: "编程语言",
            icon: "code",
            prefix: "lang/",
            children: "structure",
        },
    ],
});
