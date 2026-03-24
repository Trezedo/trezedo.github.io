import { defineClientConfig } from "vuepress/client";

import Speech from "./Speech.vue";

export default defineClientConfig({
    enhance({ app }) {
        app.component("Speech", Speech);
    },
    // 直接将组件放在 App 的根节点
    rootComponents: [Speech],
});
