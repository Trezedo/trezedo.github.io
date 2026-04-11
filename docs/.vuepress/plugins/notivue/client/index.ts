import type { NotivueConfig } from "notivue";
import { createNotivue } from "notivue";
import { defineClientConfig } from "vuepress/client";

import CustomNotivue from "./components/CustomNotivue.vue";

export default defineClientConfig({
    enhance({ app }) {
        const options = <NotivueConfig>{
            position: "top-right",
            limit: 4,
            enqueue: true,
            avoidDuplicates: true,
            notifications: {
                global: {
                    duration: Infinity,
                },
            },
        };
        const notivue = createNotivue(options);
        app.use(notivue);
    },
    setup() {
        //
    },
    rootComponents: [CustomNotivue],
});
