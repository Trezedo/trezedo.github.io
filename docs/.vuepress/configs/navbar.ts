import { navbar } from "vuepress-theme-hope";

export default navbar([
    "/",
    // "/home.md",
    { text: "DEMO", icon: "icon-park-outline:guide-board", link: "/demo/" },

    {
        text: "笔记",
        icon: "si:ai-note-fill",
        link: "/note/",
    },
    {
        text: "编程",
        icon: "jam:code",
        link: "/lang/",
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
                        icon: "noto-v1:star",
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
                // link: "",
                children: [
                    {
                        text: "时间线",
                        icon: "icon-park-outline:timeline",
                        link: "/timeline/",
                    },
                    {
                        text: "更新日志",
                        icon: "material-icon-theme:changelog",
                        link: "changelog.md",
                    },
                ],
            },
        ],
    },
]);
