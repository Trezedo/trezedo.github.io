import {App, createPage} from "vuepress";
import {PageFrontmatter} from "@vuepress/shared";

export default async (app: App) => {
    await createDefaultPage(app, {
        path: "/test",
        markdown: `# 欢迎来到 ${app.options.title}\n这是默认主页`
    })
};

type DefaultPageOption = {
    path: string;
    frontmatter?: PageFrontmatter;
    markdown: string;
}

async function createDefaultPage(app: App, {path, markdown, frontmatter}: DefaultPageOption) {
    if (path == "") return
    if (app.pages.every((page) => page.path !== path)) {
        const homepage = await createPage(app, {
            path,
            frontmatter,
            content: markdown,
        })
        app.pages.push(homepage) // 把它添加到 `app.pages`
    }
}