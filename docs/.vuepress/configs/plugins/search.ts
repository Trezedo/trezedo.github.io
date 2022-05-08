import searchPlugin from "@vuepress/plugin-search";

export const search = searchPlugin({
    locales: {
        "/": { placeholder: "搜索" },
        "/en/": { placeholder: "Search" },
    },
});
