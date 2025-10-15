import { createPage, type App } from "vuepress";
import type { PageFrontmatter } from "vuepress/shared";

export default async (app: App) => {
    await createDefaultPage(app, {
        path: "/test",
        markdown: `# 欢迎来到 ${app.options.title}\n这是默认主页`,
    });
    app.pluginApi;
};

type DefaultPageOption = {
    path: string;
    frontmatter?: PageFrontmatter;
    markdown: string;
};

async function createDefaultPage(
    app: App,
    { path, markdown, frontmatter }: DefaultPageOption
) {
    if (path == "") return;
    if (app.pages.every((page) => page.path !== path)) {
        const homepage = await createPage(app, {
            path,
            content: markdown,
            frontmatter: frontmatter!,
        });
        app.pages.push(homepage); // 把它添加到 `app.pages`
    }
}
