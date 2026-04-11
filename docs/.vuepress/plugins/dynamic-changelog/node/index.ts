import { App, Plugin } from "vuepress/core";
import { fs, path } from "vuepress/utils";
import { DynamicChangelogOptions } from "../shared";

// 终端颜色
const colors = {
    yellow: "\x1b[33m",
    reset: "\x1b[0m",
};

const tempFilename = "latestChangelog.js";

/**
 * 动态 changelog 插件
 * @param options 参数
 */
export function pluginDynamicChangelog(options: DynamicChangelogOptions = {}) {
    return (app: App): Plugin => {
        const changelogPath = path.join(app.dir.source(), options.changelogPath || "changelog.md");
        const headingLevel = options.headingLevel || 3;
        return {
            name: "vuepress-plugin-dynamic-changelog",

            clientConfigFile: path.resolve(__dirname, "../client/index.ts"),

            onPrepared: async (app: App) => {
                // 使用解析后的路径
                if (!fs.existsSync(changelogPath)) {
                    console.warn(
                        `${colors.yellow}[dynamic-changelog] warning:${colors.reset} changelog.md not found at ${changelogPath}, skipping`,
                    );
                    return;
                }

                const content = fs.readFileSync(changelogPath, "utf-8");

                // 提取最后一个 heading 节
                const regex = new RegExp(
                    `#{${headingLevel}} (.*?)\\n([\\s\\S]*?)(?=\\n\\s*#{${headingLevel}} |$)`,
                    "g",
                );
                let match: RegExpExecArray | null;
                let latestMatch: RegExpExecArray | null = null;
                while ((match = regex.exec(content)) !== null) {
                    latestMatch = match;
                }

                if (!latestMatch) {
                    console.warn(
                        `${colors.yellow}[dynamic-changelog] warning:${colors.reset} No h${headingLevel} section found in ${changelogPath}`,
                    );
                    // 写入空数据，覆盖旧内容
                    const emptyData = {
                        title: "",
                        content: "",
                        timestamp: 0,
                    };
                    const jsContent = `export default ${JSON.stringify(emptyData, null, 2)}`;
                    await app.writeTemp(tempFilename, jsContent);
                    return;
                }

                const title = latestMatch[1].trim();
                const markdownContent = latestMatch[2].trim();

                // 使用 VuePress 内置的 Markdown 渲染器
                const htmlContent = app.markdown.render(markdownContent);

                const data = {
                    title: `${title} 更新`,
                    content: htmlContent,
                    timestamp: Date.now(),
                };

                // 生成 JavaScript 文件内容
                const jsContent = `export default ${JSON.stringify(data, null, 2)}`;

                // 写入临时目录
                await app.writeTemp(tempFilename, jsContent);

                console.info(`生成变更日志至文件 @temp/latestChangelog.js`);
            },
        };
    };
}
