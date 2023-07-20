import { getDirname, path } from "@vuepress/utils";
import type { Plugin } from "vuepress";
import type { DecoOption } from "../shared";

const __dirname = getDirname(import.meta.url);

export const decoPlugin = ({
    img = "https://zedo.gitee.io/img/wallhaven-72rd8e.png",
    excludePaths = [],
}: DecoOption = {}): Plugin => ({
    name: "vuepress-plugin-deco",

    define: {
        __DECO_IMG__: img,
        __DECO_PATHS__: excludePaths,
    },

    clientConfigFile: path.resolve(__dirname, "../client/config.js"),
});
