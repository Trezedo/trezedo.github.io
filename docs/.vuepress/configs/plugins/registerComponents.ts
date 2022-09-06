import { registerComponentsPlugin } from "@vuepress/plugin-register-components";
import { path as Path } from "@vuepress/utils";

const resolve = (path: string) => {
    return Path.resolve(__dirname, "../../../../custom/components/" + path);
};

const components = {
    BlogPageDos: resolve("client/BlogPageDos.vue"),
    CurrentPageData: resolve("client/CurrentPageData.vue"),
    List4Hope: resolve("client/List4Hope.vue"),
    CommonFriend: resolve("QQ/CommonFriend.vue"),
    TTS: resolve("TTS.vue"),
};

// 使用插件，而不是在 clientAppEnhance.ts 手动导入，因为会增大 app.xxx.js 打包的体积
export const registerComponents = registerComponentsPlugin({
    components,
    // 以下无效
    // componentsDir: Path.resolve(__dirname, "../../../../custom/components/"),
});
