import type { CommentPluginOptions } from "@vuepress/plugin-comment";
import { NoticePluginOptions } from "@vuepress/plugin-notice";
import type { PluginConfig } from "vuepress";

import type { KatexOptions, TrustContext } from "katex";
import { registerComponents } from "./plugins/registerComponents";

export const katexOptions: KatexOptions = {
    output: "html",
    macros: {
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
    // 似乎是 md-enhance 使用的 katex 版本较低的缘故
    strict: "ignore" /* (errorCode: string, errorMsg: string, token: any) => {
                    console.error(errorCode, errorMsg, token);
                    if (errorCode === "htmlExtension") {
                        return "ignore";
                    }
                    return "error";
                } */,
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
            content: [
                // "新增公告组件，更新部分文章的笔误，本地降至 pnpm7 以保证和 netlify 的版本一致",
                // "修改 springboot 笔记，尝试通过 packageManager 使用 pnpm8",
                // "新增 netlify 部署笔记，更新收集的在线工具",
                // "启用 Giscus 评论区，新增 minio 笔记",
                /* `1.更正 MySQL 文章中的勘误，补充 MinIO。
                    <br>
                    2.使用 shields.io 展示库/包的版本号。`, */
                // "拆分 springboot 笔记中的 smart doc 部分，调整内容顺序",
                // "新增部分文档，暂时禁用 search-pro",
                "重启 search-pro, css 样式调整",
                "更新至 vuepress@2.0.0-rc.24",
            ][0],
            actions: [
                {
                    text: "确定",
                    link: "/",
                    type: "primary",
                },
            ],
            // confirm: true,
            // actions: [],
            // showOnce: __VUEPRESS_DEV__ ? false : true,
            // fullscreen: true,
        },
    ],
    // 选项
};

export const pluginConfig: PluginConfig = [
    //
    registerComponents,
    // search,
];
