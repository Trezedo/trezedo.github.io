import type { PluginConfig } from "vuepress";

import { registerComponents } from "./plugins/registerComponents";
import search from "./plugins/search";
import type { ComponentOptions } from "vuepress-plugin-components";
import type { CommentOptions } from "vuepress-plugin-comment2";

export const pluginConfig: PluginConfig = [
    //
    registerComponents,
    search,
];

// 主题中不能单独使用
export const components: ComponentOptions = {
    rootComponents: {
        notice: [
            {
                path: "/",
                title: "公告",
                content: [
                    // "新增公告组件，更新部分文章的笔误，本地降至 pnpm7 以保证和 netlify 的版本一致",
                    // "修改 springboot 笔记，尝试通过 packageManager 使用 pnpm8",
                    // "新增 netlify 部署笔记，更新收集的在线工具",
                    "启用 Giscus 评论区，新增 minio 笔记",
                ][0],
                // confirm: true,
                // actions: [],
                // showOnce: false,
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
