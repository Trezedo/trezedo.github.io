import {path as Path} from "@vuepress/utils";

const resolve = (path: string) => {
    return Path.resolve(__dirname, "../../../custom/components/" + path);
}

export default {
    BlogPageDos: resolve("client/BlogPageDos.vue"),
    List4Hope: resolve("client/List4Hope.vue"),
    AxmathFixer: resolve("AxmathFixer"),
    TTS: resolve("TTS.vue"),
    CommonFriend: resolve("QQ/CommonFriend.vue"),
    // CustomLayout,
}