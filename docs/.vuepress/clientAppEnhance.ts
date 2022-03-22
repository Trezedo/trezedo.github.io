import {defineClientAppEnhance} from '@vuepress/client'

// noinspection JSUnusedGlobalSymbols
export default defineClientAppEnhance(({app, router, siteData}) => {
    // app.config.globalProperties
    // 全局注册组件会被打包进 app.xxx.js
    // for (let com in Components) {
    //     app.component(com, Components[com])
    // }
})