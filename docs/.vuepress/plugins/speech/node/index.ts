import type { Plugin } from "vuepress/core";
import { path } from "vuepress/utils";

export const speechPlugin: Plugin = {
    name: "vuepress-plugin-speech",
    clientConfigFile: path.resolve(__dirname, "../client/index.ts"),
};
