import type { CommentPluginOptions } from "@vuepress/plugin-comment";
import { NoticePluginOptions } from "@vuepress/plugin-notice";
import type { PluginConfig } from "vuepress";

import type { KatexOptions, TrustContext } from "katex";
import { registerComponents } from "./plugins/registerComponents";

export const katexOptions: KatexOptions = {
    output: "html",
    macros: {
        // 见 "/docs/preamble.sty"
        "\\d": "\\mathop{}\\!\\mathrm{d}",
        "\\e": "\\text{e}",
        "\\i": "\\text{i}",
        "\\ds": "\\displaystyle",
        "\\eqref": "\\href{##tag-#1}{(\\text{#1})}",
        "\\ref": "\\href{##tag-#1}{\\text{#1}}",
        "\\label": "\\htmlId{tag-#1}{}",
        "\\oldTag": "\\@ifstar\\tag@literal\\tag@paren",
        "\\tag": "\\oldTag{#1}\\label{#1}",
        "\\tagref": "\\href{##tag-#1}{(#1)}",
        // 数据结构
        "\\mk": "\\mkern{#1mu}",
        "\\box":
            "\\begin{array}{|c|c|}\\hline \\!#1\\! & \\!#2\\!\\\\ \\hline \\end{array}",
        "\\node": "\\box{#1}{\\bullet}",
        "\\cnode": "\\colorbox{#1}{$\\node{#2}$}",
        // katex 不支持默认参数，\providecommand\pTo[1][-20]{\mkern{#1mu}\xrightarrow{\mkern24mu}\mkern-7mu}
        "\\pto": "\\mkern{-20mu}\\xrightarrow{\\mkern24mu}\\mkern-6mu",
        "\\circled": "\\text{\\textcircled{\\small{#1}}}",
        "\\mod": "\\mathop{\\mathrm{mod}}",
        "\\Im": "\\operatorname{Im}",
        "\\Re": "\\operatorname{Re}",
    },

    // 复杂公式在 vite 打包时总会发出 warning，即使按文档使用了如下配置
    strict: (errorCode, errorMsg, token) => {
        console.error(errorCode, errorMsg, token);
        if (errorCode === "htmlExtension") {
            return "ignore";
        }
        return "error";
    },
    // https://github.com/KaTeX/KaTeX/issues/2003
    trust: (context: TrustContext) =>
        ["\\htmlId", "\\href"].includes(context.command),
};

export const comments: CommentPluginOptions = {
    provider: "Giscus",
    repo: "Trezedo/blog-giscus",
    repoId: "R_kgDOJYJYog",
    category: "Announcements",
    categoryId: "DIC_kwDOJYJYos4CV2sq",
    // 其他选项用默认值即可
};

export const noticeOptions: NoticePluginOptions = {
    config: [
        {
            path: "/",
            title: "最近更新",
            content: "根据 git log 维护更新日志",
            actions: [{ text: "确定", type: "primary" }],
            // showOnce: __VUEPRESS_DEV__ ? false : true, // 生产环境只显示一次，开发环境每次都显示
            fullscreen: true,
        },
    ],
    // 选项
};

export const pluginConfig: PluginConfig = [
    //
    registerComponents,
    // search,
];
