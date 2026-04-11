import { App, Plugin } from "vuepress/core";
import { path } from "vuepress/utils";

export function pluginNotivue(_: unknown = {}): (app: App) => Plugin {
    return (_) => {
        return {
            name: "vuepress-plugin-notivue",
            multiple: true,
            clientConfigFile: path.resolve(__dirname, "../client/index.ts"),
        };
    };
}
