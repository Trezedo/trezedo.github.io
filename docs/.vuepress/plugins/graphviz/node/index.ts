import type { Plugin } from "vuepress/core";
import { path } from "vuepress/utils";

export const pluginGraphviz: Plugin = {
    name: "vuepress-plugin-graphviz",
    clientConfigFile: path.resolve(__dirname, "../client/index.ts"),

    extendsMarkdown(md) {
        const defaultFence = md.renderer.rules.fence;
        md.renderer.rules.fence = (tokens, idx, options, env, self) => {
            const token = tokens[idx];
            const info = token.info ? token.info.trim() : "";
            const lang = info.split(/\s+/)[0];

            if (["graphviz", "dot"].includes(lang)) {
                const content = token.content;
                const base64 = Buffer.from(content, "utf-8").toString("base64");
                return `<Graphviz dot="${base64}" />`;
            }

            return defaultFence?.(tokens, idx, options, env, self) || "";
        };
    },
};
