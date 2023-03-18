import { useRouter } from "vue-router";

/**
 * useRouter API 在 beta.39 之后某个版本被 "@vuepress/client" 移除了
 * 改用 "vue-router"
 *
 * 通过 vue-router 的 {@link getRoutes} 方法进行筛选，<br>
 * 因为路由在页面加载之前就已经生成完毕，故性能消耗小
 * @param prefix 路由前缀，用来限定路径
 * @param removeRoot 移除根页面，如路径是以前缀结尾的页面
 */
export function getSimpleRoutes(prefix?: string, removeRoot?: boolean) {
    const router = useRouter();
    return router.getRoutes().filter((route) => {
        // 基本过滤，先获取所有拥有对应组件的页面
        let basic = route.name != undefined && route.name != "404";

        // 是否有前缀，如果有则判断是否以它开头
        let withPrefix = true;
        if (prefix) {
            withPrefix = route.path.startsWith(prefix);
            if (removeRoot) {
                // 以 prefix 开头，但不能同时以它结尾
                withPrefix &&= !(route.path.endsWith(prefix) || route.path.endsWith(prefix + "/"));
            }
        }
        return basic && withPrefix;
    });
}

/**
 * console.log(getSimpleRoutes("/note/math/"))
 * console.log(getSimpleRoutes("/note/math/", true))
 */
