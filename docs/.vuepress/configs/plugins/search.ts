import { searchPlugin } from "@vuepress/plugin-search";
import { searchProPlugin } from "vuepress-plugin-search-pro";

export const search = searchPlugin({
    locales: {
        "/": { placeholder: "搜索" },
        "/en/": { placeholder: "Search" },
    },
});

export const searchPro = searchProPlugin({
    indexContent: true, // 索引全部内容
    locales: {
        "/": { placeholder: "搜索" },
        "/en/": { placeholder: "Search" },
    },
});

export default search;
