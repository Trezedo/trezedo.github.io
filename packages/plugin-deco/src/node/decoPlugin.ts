import { getDirname, path } from "@vuepress/utils";
import type { Plugin } from "vuepress";

const __dirname = getDirname(import.meta.url);

export interface DecoOption {
    img?: string;
    excludePaths?: string[];
}

export const decoPlugin = ({
    img = "https://zedo-img.netlify.app/img/wallhaven-z8dg9y-lossy.png",
    excludePaths = [],
}: DecoOption = {}): Plugin => ({
    name: "vuepress-plugin-deco",

    define: {
        __DECO_IMG__: img,
        __DECO_PATHS__: excludePaths,
    },

    clientConfigFile: path.resolve(__dirname, "../client/config.js"),
});
