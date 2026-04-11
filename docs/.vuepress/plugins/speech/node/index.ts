import type { Plugin } from "vuepress/core";
import { path } from "vuepress/utils";

export const pluginSpeech: Plugin = {
    name: "vuepress-plugin-speech",
    clientConfigFile: path.resolve(__dirname, "../client/index.ts"),
};
