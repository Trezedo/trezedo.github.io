import { navbar } from "vuepress-theme-hope";

export default navbar([
    "/",
    "/home.md",
    { text: "使用指南", icon: "icon-park-outline:guide-board", link: "/guide" },
    {
        text: "归档",
        icon: "list",
        children: [
            {
                text: "文章",
                children: [
                    {
                        text: "全部",
                        icon: "ph:article-ny-times-bold",
                        link: "/article/",
                    },
                    {
                        text: "收藏",
                        icon: "f7:square-favorites-alt",
                        link: "/star/",
                    },
                ],
            },
            {
                text: "分类",
                prefix: "/category",
                children: [
                    // activeMatch 避免一直高亮
                    {
                        text: "全部",
                        icon: "material-symbols:category-outline",
                        link: "/",
                        activeMatch: "^/category/$",
                    },
                    {
                        text: "数学",
                        icon: "ooui:mathematics",
                        link: "/高等数学/",
                    },
                    {
                        text: "后端",
                        icon: "streamline-cyber-color:network",
                        link: "/后端/",
                    },
                ],
            },
            {
                text: "标签",
                icon: "solar:tag-bold",
                link: "/tag/",
                activeMatch: "^/tag/$",
            },
            {
                text: "笔记",
                icon: "si:ai-note-fill",
                link: "/note/",
                activeMatch: "^/note/$",
            },
            {
                text: "时间线",
                icon: "icon-park-outline:timeline",
                link: "/timeline/",
            },
        ],
    },
]);
