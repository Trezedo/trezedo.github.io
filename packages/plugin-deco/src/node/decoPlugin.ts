import { getDirname, path } from "@vuepress/utils";
import type { Plugin } from "vuepress";

const __dirname = getDirname(import.meta.url);

export interface DecoOption {
    img?: string;
    excludePaths?: string[];
}

export const decoPlugin = ({
    img = "https://z.wiki/u/42DuSN",
    excludePaths = [],
}: DecoOption = {}): Plugin => ({
    name: "vuepress-plugin-deco",

    define: {
        __DECO_IMG__: img,
        __DECO_PATHS__: excludePaths,
    },

    clientConfigFile: path.resolve(__dirname, "../client/config.js"),
});
