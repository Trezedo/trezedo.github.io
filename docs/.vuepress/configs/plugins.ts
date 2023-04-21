import type { PluginConfig } from "vuepress";

import { registerComponents } from "./plugins/registerComponents";
import search from "./plugins/search";
import type { ComponentOptions } from "vuepress-plugin-components";
import type { CommentOptions } from "vuepress-plugin-comment2";
import { isDev } from "../config";

export const pluginConfig: PluginConfig = [
    //
    registerComponents,
    search,
];

function getDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    return `${year}-${month}-${day}`;
}

// 主题中不能单独使用
export const components: ComponentOptions = {
    rootComponents: {
        // https://plugin-components.vuejs.press/zh/guide/notice.html
        notice: [
            {
                path: "/",
                title: "最近更新",
                content: [
                    // "新增公告组件，更新部分文章的笔误，本地降至 pnpm7 以保证和 netlify 的版本一致",
                    // "修改 springboot 笔记，尝试通过 packageManager 使用 pnpm8",
                    // "新增 netlify 部署笔记，更新收集的在线工具",
                    // "启用 Giscus 评论区，新增 minio 笔记",
                    `1.更正 MySQL 文章中的勘误，补充 MinIO。
                    <br>
                    2.使用 shields.io 展示库/包的版本号。`,
                ][0],
                // confirm: true,
                // actions: [],
                showOnce: isDev() ? false : true,
                // fullscreen: true,
            },
        ],
    },
};

export const comments: CommentOptions = {
    provider: "Giscus",
    repo: "Trezedo/blog-giscus",
    repoId: "R_kgDOJYJYog",
    category: "Announcements",
    categoryId: "DIC_kwDOJYJYos4CV2sq",
    // 其他选项用默认值即可
};
