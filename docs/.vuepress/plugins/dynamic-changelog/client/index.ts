import { createVNode, defineComponent, onMounted, render } from "vue";
import { defineClientConfig } from "vuepress/client";

import changelogData from "@temp/latestChangelog";
import SimpleModal from "./components/SimpleModal.vue";

const LatestChangelogToast = defineComponent({
    setup() {
        onMounted(() => {
            // 避免重复弹窗
            const data = changelogData;
            if (!data.timestamp || !data.content) return; // 无有效数据时不显示
            const storageKey = "changelog_last_shown"; // 单一键
            const lastShown = localStorage.getItem(storageKey);

            if (lastShown === String(data.timestamp)) return;

            // 创建弹窗容器并挂载
            const container = document.createElement("div");
            document.body.appendChild(container);

            const vnode = createVNode(SimpleModal, {
                title: data.title,
                content: data.content,
                position: "top-right", // 可改为 "top-right"
                onClose: () => {
                    render(null, container);
                    container.remove();
                },
            });

            render(vnode, container);

            // 标记已显示
            localStorage.setItem(storageKey, String(data.timestamp));
        });

        return () => null;
    },
});

export default defineClientConfig({
    rootComponents: [LatestChangelogToast],
});
