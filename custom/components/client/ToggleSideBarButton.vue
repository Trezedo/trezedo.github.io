<template>
    <button class="toggle-sidebar"
            :aria-label="ariaLabel"
            :data-balloon-pos="position"
            @click="toggle"
            v-show="visible"
    >
        <i class="icon iconfont icon-sidebar" :style="{'font-size': fontsize}"/>
    </button>
</template>

<script lang="ts">
import {ref, defineComponent, onMounted} from 'vue'

export default defineComponent({
    props: {
        label: String,
        position: String as () => 'left' | 'right' | 'up' | 'down',
        size: String
    },
    setup(props) {
        const ariaLabel = props.label ? props.label : "Toggle Sidebar"
        const fontsize = ref(props.size ? props.size : '28px')

        const visible = ref(false)
        onMounted(() => {

        })
        const toggle = () => {
            const mainPage = () => document.querySelector(".page") as HTMLElement;
            const sidebar = () => document.querySelector(".sidebar") as HTMLElement;
        }

        return {
            ariaLabel,
            fontsize,
            visible,
            toggle
        }
    }
})

</script>

<style scoped>

</style>