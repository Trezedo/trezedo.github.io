import {path as Path} from "@vuepress/utils";

const resolve = (path: string) => {
    return Path.resolve(__dirname, "../../../custom/components/" + path);
}

export default {
    AxmathFixer: resolve("AxmathFixer"),
    BlogPageDos: resolve("client/BlogPageDos.vue"),
    CurrentPageData: resolve("client/CurrentPageData.vue"),
    // client/CustomLayout.vue,
    List4Hope: resolve("client/List4Hope.vue"),
    // client/LocalList.vue,
    CommonFriend: resolve("QQ/CommonFriend.vue"),
    TTS: resolve("TTS.vue"),
}