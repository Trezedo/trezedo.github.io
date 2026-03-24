import { defineClientConfig } from "vuepress/client";

import Graphviz from "./components/Graphviz.vue";

export default defineClientConfig({
    enhance({ app }) {
        app.component("Graphviz", Graphviz);
    },
});
