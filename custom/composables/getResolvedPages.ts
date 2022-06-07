import { usePagesData, resolvers } from "@vuepress/client";
import { PageData } from "vuepress";

/**
 * 因为需要解析每个页面，性能消耗较大，并且是异步函数
 * <br>
 * 建议使用 {@link getSimpleRoutes}
 */
export default async function getResolvedPages() {
    const pageResolver = resolvers.resolvePageData;
    const pagesByKey = usePagesData();

    const pages = <PageData[]>[];
    for (let pageKey in pagesByKey.value) {
        let page = await pageResolver(pageKey);
        pages.push(page);
    }
    return pages;
}
