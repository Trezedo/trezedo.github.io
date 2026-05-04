import { defineClientConfig } from "vuepress/client";

import GlobalBackground from "./components/GlobalBackground.vue";
import HomeCover from "./components/HomeCover.vue";
import TypingEffect from "./components/TypingEffect.vue";
import { setupBackground, showReloadPageButton, warnIfInQQOrWeChat } from "./utils";

import "./styles/index.scss";

export default defineClientConfig({
    enhance({ app }) {
        app.component("HomeCover", HomeCover);
    },
    rootComponents: [
        ...(__DECO_ENABLE_BACKGROUND__ ? [HomeCover] : []),
        ...(__DECO_ENABLE_TYPING__ ? [TypingEffect] : []),
        GlobalBackground,
    ],

    setup() {
        if (__DECO_ENABLE_BACKGROUND__) setupBackground();
        if (__DECO_ENABLE_QQ_WARNING__) warnIfInQQOrWeChat();
        showReloadPageButton();
    },
});
