import { navbar } from "vuepress-theme-hope";

export default navbar([
    "/",
    {
        text: "笔记",
        icon: "ph:notebook-fill",
        link: "/notes/",
    },
    {
        text: "技术实践",
        icon: "jam:code",
        link: "/tech/",
    },
    {
        text: "解题",
        icon: "fluent:calligraphy-pen-question-mark-20-filled",
        link: "/exercises/",
    },
    {
        text: "站点导航",
        icon: "ri:archive-drawer-fill",
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
                        text: "星标",
                        icon: "ph:star-fill",
                        link: "/star/",
                    },
                ],
            },
            {
                text: "索引",
                prefix: "",
                children: [
                    {
                        text: "分类",
                        icon: "material-symbols:category-outline",
                        link: "/category/",
                        activeMatch: "^/category/.*$", // 子页面保持高亮
                    },
                    {
                        text: "标签",
                        icon: "ph:tag-bold",
                        link: "/tag/",
                        activeMatch: "^/tag/.*$",
                    },
                ],
            },
            {
                text: "归档",
                icon: "ph:archive-box-bold",
                children: [
                    {
                        text: "时间线",
                        icon: "icon-park-outline:timeline",
                        link: "/timeline/",
                    },
                    {
                        text: "更新日志",
                        icon: "ri:history-line",
                        link: "changelog.md",
                    },
                ],
            },
        ],
    },
    { text: "DEMO", icon: "icon-park-outline:guide-board", link: "/demo/" },
]);
