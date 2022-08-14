import { sidebar } from "vuepress-theme-hope";

export default sidebar({
    "/": [
        "/README.md",
        "/home.md",
        // "/slide.md",
        {
            text: "使用指南",
            icon: "creative",
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
                    prefix: "software/",
                    text: "软件",
                    icon: "note",
                    collapsable: true,
                    children: "structure",
                },
                {
                    prefix: "article/tech/",
                    text: "技术",
                    icon: "code",
                    collapsable: true,
                    children: "structure",
                },
            ],
        },
        {
            prefix: "note/",
            text: "笔记",
            icon: "note",
            children: [
                {
                    text: "数学",
                    icon: "function",
                    prefix: "math/", // prefix 对 link 无效
                    link: "math/Readme.md",
                },
                {
                    text: "数据结构",
                    icon: "computer",
                    prefix: "dsa/",
                    link: "dsa/Readme.md",
                },
            ],
        },
    ],

    "/article/": [
        { prefix: "", icon: "note", text: "文章", children: "structure", collapsable: true },
        { prefix: "tech/", icon: "code", text: "技术", children: "structure", collapsable: true },
    ],

    "/note/math/": [
        { prefix: "", icon: "advance", text: "笔记碎片", collapsable: true, children: "structure" },
        {
            prefix: "q/",
            icon: "exercise",
            text: "习题记录",
            collapsable: true,
            children: "structure",
        },
    ],
    "/note/dsa/": [
        // { prefix: "", icon: "", text: "数据结构与算法", link: "Readme.md" },
        {
            prefix: "linear-list/",
            icon: "",
            text: "线性表",
            children: "structure",
            collapsable: true,
        },
        {
            prefix: "stack-queue/",
            icon: "",
            text: "栈和队列",
            children: "structure",
            collapsable: true,
        },
        { prefix: "tree/", icon: "tree", text: "树", children: "structure" },
        { prefix: "sorts/", icon: "", text: "排序", children: "structure", collapsable: true },
    ],
    "/note/algo/": [
        { prefix: "", text: "随笔", icon: "semantic", children: "structure" },
        { prefix: "q/", text: "算法题", icon: "exercise", children: "structure" },
    ],
    "/note/lang/": [
        { prefix: "C/", text: "C", icon: "c", children: "structure" },
        { prefix: "ts/", text: "TypeScript", icon: "typescript", children: "structure" },
    ],

    "/tool/": "structure", // 空数组可以关闭
});
