import { sidebar } from "vuepress-theme-hope";

export default sidebar({
    // https://theme-hope.vuejs.press/zh/guide/layout/sidebar.html
    // 注意对象键声明的顺序。一般来说，应该将更精确的路径放在前面，以避免被更宽泛的路径匹配到。
    "/article/": "structure",
    "/software/": "structure",
    "/tool/": "structure",
    "/lang/": "structure",

    "/note/math/": [
        {
            prefix: "",
            icon: "hugeicons:note",
            text: "笔记碎片",
            children: "structure",
        },
    ],
    "/note/dsa/": [
        { prefix: "", icon: "", text: "前言", link: "Readme.md" },
        {
            prefix: "linear-list/",
            icon: "",
            text: "线性表",
            children: [
                {
                    prefix: "",
                    text: "基础知识",
                    children: "structure",
                    collapsible: true,
                },
                {
                    prefix: "q/",
                    text: "习题",
                    children: "structure",
                    collapsible: true,
                },
            ],
        },
        {
            prefix: "stack-queue/",
            icon: "",
            text: "栈和队列",
            children: [
                {
                    prefix: "",
                    text: "基础知识",
                    children: "structure",
                    collapsible: true,
                },
                // {}
            ],
        },
        { prefix: "tree/", icon: "tree", text: "树", children: "structure" },
        {
            prefix: "sorts/",
            icon: "",
            text: "排序",
            children: "structure",
            collapsible: true,
        },
    ],
    "/note/algo/": [
        { prefix: "", text: "随笔", icon: "semantic", children: "structure" },
        {
            prefix: "q/",
            text: "算法题",
            icon: "exercise",
            children: "structure",
        },
    ],
    "/note/lang/": [
        { prefix: "C/", text: "C", icon: "c", children: "structure" },
        {
            prefix: "ts/",
            text: "TypeScript",
            icon: "typescript",
            children: "structure",
        },
    ],
    "/note/": [
        {
            prefix: "algo/",
            icon: "hugeicons:algorithm",
            text: "算法",
            children: "structure",
            collapsible: true,
        },
        {
            prefix: "dsa/",
            icon: "carbon:data-vis-1",
            text: "数据结构",
            children: "structure",
            collapsible: true,
        },
        {
            prefix: "math/",
            icon: "ooui:mathematics",
            text: "数学",
            children: "structure",
            collapsible: true,
        },
    ],
    "/": [
        "/README.md",
        "/home.md",
        // "/slide.md",
        {
            text: "使用指南",
            icon: "creative",
            collapsible: true,
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
                    collapsible: true,
                    children: "structure",
                },
                {
                    prefix: "article/tech/",
                    text: "技术",
                    icon: "code",
                    collapsible: true,
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
});
