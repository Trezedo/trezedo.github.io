import { searchPlugin } from "@vuepress/plugin-search";
import { searchProPlugin } from "vuepress-plugin-search-pro";

export const search = searchPlugin({
    locales: {
        "/": { placeholder: "搜索" },
        "/en/": { placeholder: "Search" },
    },
});

export const searchPro = searchProPlugin({
    locales: {
        "/": { placeholder: "搜索" },
        "/en/": { placeholder: "Search" },
    },
});

export default searchPro;
