import { navbar } from "vuepress-theme-hope";

export default navbar([
    "/",
    "/home.md",
    { text: "使用指南", icon: "creative", link: "/guide" },
    {
        text: "归档",
        icon: "list",
        children: [
            {
                text: "文章",
                children: [
                    { text: "全部", icon: "article", link: "/article/" },
                    { text: "收藏", icon: "article", link: "/star/" },
                ],
            },
            {
                text: "分类",
                prefix: "/category",
                children: [
                    // activeMatch 避免一直高亮
                    {
                        text: "全部",
                        icon: "categoryselected",
                        link: "/",
                        activeMatch: "^/category/$",
                    },
                    { text: "数学", icon: "function", link: "/数学/" },
                    { text: "后端", icon: "stack", link: "/后端/" },
                ],
            },
            {
                text: "标签",
                icon: "tag",
                link: "/tag/",
                activeMatch: "^/tag/$",
            },
            {
                text: "笔记",
                icon: "note",
                link: "/note/",
                activeMatch: "^/note/$",
            },
            { text: "时间线", icon: "time", link: "/timeline/" },
        ],
    },
]);
