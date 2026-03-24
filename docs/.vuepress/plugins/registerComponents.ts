import { registerComponentsPlugin } from "@vuepress/plugin-register-components";
import { path as Path } from "vuepress/utils";

function resolve(path: string) {
    // process.cwd() 是当前 nodejs 进程的工作目录，取决于运行命令时所在的位置，本项目中是项目根目录
    return Path.join(process.cwd(), "custom/components/" + path);
}

// 在 client.ts 中使用 app.component 手动注册会增大 app.xxx.js 打包的体积
export const registerComponents = registerComponentsPlugin({
    // componentsDir 只能注册一个目录下的组件，不能递归注册
    components: {
        BlogPageDos: resolve("client/BlogPageDos.vue"),
        CurrentPageData: resolve("client/CurrentPageData.vue"),
        CommonFriend: resolve("QQ/CommonFriend.vue"),
        TTS: resolve("TTS.vue"),
    },
});
