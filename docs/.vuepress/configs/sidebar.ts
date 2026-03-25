import { sidebar } from "vuepress-theme-hope";

export default sidebar({
    // https://theme-hope.vuejs.press/zh/guide/layout/sidebar.html
    // 注意对象键声明的顺序。一般来说，应该将更精确的路径放在前面，以避免被更宽泛的路径匹配到。
    "/blog/": "structure", // 博客文章
    "/demo/": "structure", // 演示示例
    // 练习题库
    "/exercises/": [
        {
            text: "LeetCode",
            icon: "simple-icons:leetcode",
            prefix: "leetcode/",
            children: "structure",
            collapsible: true,
        },
        {
            text: "数学",
            icon: "mdi:function-variant",
            prefix: "math/",
            children: "structure",
            collapsible: true,
        },
    ],
    // 学习笔记
    "/notes/": [
        {
            text: "算法",
            icon: "hugeicons:algorithm",
            prefix: "algorithm/",
            children: "structure",
            collapsible: true,
        },
        {
            text: "大数据",
            icon: "mdi:database",
            prefix: "bigdata/",
            children: "structure",
            collapsible: true,
        },
        {
            text: "数据结构",
            icon: "carbon:data-vis-1",
            prefix: "data-structure/",
            children: [
                {
                    prefix: "linear-list/",
                    text: "线性表",
                    children: "structure",
                    collapsible: true,
                },
                {
                    prefix: "stack-queue/",
                    text: "栈和队列",
                    children: "structure",
                    collapsible: true,
                },
                {
                    prefix: "tree/",
                    text: "树",
                    children: "structure",
                    collapsible: true,
                },
                {
                    prefix: "sorts/",
                    text: "排序",
                    children: "structure",
                    collapsible: true,
                },
            ],
            collapsible: true,
        },
        {
            text: "游戏",
            icon: "mdi:gamepad-variant",
            prefix: "games/",
            children: "structure",
            collapsible: true,
        },
        {
            text: "数学",
            icon: "ooui:mathematics",
            prefix: "math/",
            children: "structure",
            collapsible: true,
        },
    ],

    // 技术实践
    "/tech/": [
        {
            text: "框架与中间件",
            icon: "mdi:layers-triple",
            prefix: "frameworks/",
            children: "structure",
            collapsible: true,
        },
        {
            text: "编程语言",
            icon: "mdi:code-tags",
            prefix: "langs/",
            children: "structure",
            collapsible: true,
        },
        {
            text: "操作系统",
            icon: "mdi:monitor",
            prefix: "os/",
            children: "structure",
            collapsible: true,
        },
        {
            text: "电脑工具",
            icon: "mdi:tools",
            prefix: "tools/",
            children: "structure",
            collapsible: true,
        },
    ],
    "/tech/tools/": "structure",

    "/": [
        "/README.md",
        "/home.md",
        // "/slide.md",
        {
            text: "使用指南",
            icon: "ri:creative-commons-line",
            collapsible: true,
            prefix: "demo/",
            children: ["page.md", "markdown.md", "disable.md", "encrypt.md"],
        },
        {
            text: "随笔",
            icon: "fluent:line-style-sketch-32-filled",
            collapsible: true,
            prefix: "blog/",
            children: "structure",
        },
        {
            prefix: "notes/",
            text: "笔记",
            icon: "ph:notebook-fill",
            children: [
                {
                    text: "数学",
                    icon: "ooui:mathematics",
                    prefix: "math/",
                    children: "structure",
                    collapsible: true,
                },
                {
                    text: "数据结构",
                    icon: "carbon:data-vis-1",
                    prefix: "data-structure/",
                    children: "structure",
                    collapsible: true,
                },
                {
                    text: "算法",
                    icon: "hugeicons:algorithm",
                    prefix: "algorithm/",
                    children: "structure",
                    collapsible: true,
                },
                {
                    text: "大数据",
                    icon: "mdi:database",
                    prefix: "bigdata/",
                    children: "structure",
                    collapsible: true,
                },
                {
                    text: "游戏",
                    icon: "mdi:gamepad-variant",
                    prefix: "games/",
                    children: "structure",
                    collapsible: true,
                },
            ],
        },
        {
            text: "技术实践",
            icon: "jam:code",
            prefix: "tech/",
            children: "structure",
        },
    ],
});
