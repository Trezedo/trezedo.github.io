import { defineClientConfig } from "vuepress/client";

import { Background } from "./components/Background";
import TypingEffect from "./components/TypingEffect.vue";
import { setupBackground, showReloadPageButton, warnIfInQQOrWeChat } from "./utils";

import "./styles/index.scss";

export default defineClientConfig({
    enhance({ app: _ }) {
        //
    },
    rootComponents: [
        ...(__DECO_ENABLE_BACKGROUND__ ? [Background] : []),
        ...(__DECO_ENABLE_TYPING__ ? [TypingEffect] : []),
    ],

    setup() {
        console.table({
            __DECO_IMG__,
            __DECO_PATHS__,
            __DECO_ENABLE_BACKGROUND__,
            __DECO_ENABLE_TYPING__,
            __DECO_ENABLE_QQ_WARNING__,
        });

        if (__DECO_ENABLE_BACKGROUND__) setupBackground();
        if (__DECO_ENABLE_QQ_WARNING__) warnIfInQQOrWeChat();
        showReloadPageButton();
    },
});
