import { App, Plugin } from "vuepress/core";
import { path } from "vuepress/utils";

export interface DecoOption {
    img?: string;
    excludePaths?: string[];
    enableBackground?: boolean;
    enableTypingEffect?: boolean;
    enableQQWarning?: boolean;
}

export function pluginDeco({
    img = "https://zedo-img.netlify.app/img/wallhaven-z8dg9y-lossy.png",
    excludePaths = [],
    enableBackground = false,
    enableTypingEffect = true,
    enableQQWarning = true,
}: DecoOption = {}): (app: App) => Plugin {
    return (_) => ({
        name: "vuepress-plugin-deco",
        clientConfigFile: path.resolve(__dirname, "../client/index.ts"),

        // 向客户端注入全局变量
        define: {
            __DECO_IMG__: img,
            __DECO_PATHS__: excludePaths,
            __DECO_ENABLE_BACKGROUND__: enableBackground,
            __DECO_ENABLE_TYPING__: enableTypingEffect,
            __DECO_ENABLE_QQ_WARNING__: enableQQWarning,
        },
    });
}
