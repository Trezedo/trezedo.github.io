import {defineClientAppEnhance} from '@vuepress/client'
import Components from "../../custom/components"

// noinspection JSUnusedGlobalSymbols
export default defineClientAppEnhance(({app, router, siteData}) => {
    // app.config.globalProperties
    for (let com in Components) {
        app.component(com, Components[com])
    }
})