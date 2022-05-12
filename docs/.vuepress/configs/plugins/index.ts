import type { PluginConfig } from "vuepress";

import { registerComponents } from "./registerComponents";
import { search } from "./search";

export const pluginConfig: PluginConfig = [
    //
    registerComponents,
    search,
];
