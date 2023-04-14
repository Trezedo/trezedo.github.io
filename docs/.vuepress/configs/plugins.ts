import type { PluginConfig } from "vuepress";

import { registerComponents } from "./plugins/registerComponents";
import search from "./plugins/search";
import type { ComponentOptions } from "vuepress-plugin-components";

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
                content: "修改 springboot 笔记，尝试通过 packageManager 使用 pnpm8",
                // confirm: true,
                // actions: [],
                // showOnce: false,
                // fullscreen: true,
            },
        ],
    },
};
