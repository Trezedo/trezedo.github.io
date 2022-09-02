import type { PluginConfig } from "vuepress";

import { registerComponents } from "./registerComponents";
import { search } from "./search";
import { decoPlugin } from "vuepress-plugin-deco";

export const pluginConfig: PluginConfig = [
    //
    registerComponents,
    search,
    decoPlugin(),
];
