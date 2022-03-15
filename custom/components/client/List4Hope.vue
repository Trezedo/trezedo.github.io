<template>
    <!-- <ArticleItem v-for="r in routes" :path="r.path" info="123"/>-->
    <ul>
        <li v-for="r in routes">
            <router-link :to="r.path">{{ computeTitle(r) }}</router-link>
        </li>
    </ul>

</template>

<script lang="ts">
import {defineComponent} from "vue";
import {getSimpleRoutes} from "../../composables/getSimpleRoutes";
import {RouteRecordNormalized} from "vue-router"

export default defineComponent({
    name: "ArticleList",
    props: {
        prefix: {
            type: String,
            required: false,
            default: "/"
        },
        removeRoot: {
            type: Boolean,
            required: false,
            default: true
        }
    },
    setup(props) {
        // let pages: PageData[] = await getResolvedPages(); // async setup()
        // console.log(pages)

        const routes = getSimpleRoutes(props.prefix, props.removeRoot);

        function computeTitle(route: RouteRecordNormalized) {
            return route.meta["title"] || /[^/]*?(?=\.html$)/.exec(decodeURI(route.path))[0]
        }

        return {
            routes,
            computeTitle
        }
    }
})
</script>

<style scoped>

</style>