import {defineClientAppSetup} from '@vuepress/client'
import {ref, onMounted, watch} from 'vue'
import {useRoute} from "vue-router";

// noinspection JSUnusedGlobalSymbols
export default defineClientAppSetup(() => {
    const route = useRoute();
    const buttonVisible = ref(false); // 按钮是否隐藏
    watch(buttonVisible, (newVal) => {
        const button = document.querySelector("button.toggle-sidebar") as HTMLElement
        if (newVal == true) {
            button.style.visibility = 'visible'
        } else {
            button.style.visibility = 'hidden'
        }
    })
    const containSidebar = (): boolean => {
        const ul = document.querySelector("ul.sidebar-links")
        // 如果元素存在，且它的子节点个数为正，则判断为存在侧边栏
        return ul && ul?.childElementCount > 0
    }
    // 路径变化时，判断是否需要隐藏按钮
    watch(
        () => route.path,
        () => buttonVisible.value = containSidebar()
    );

    const showBar = ref<boolean>(true) // 侧边栏当前状态，默认显示侧边栏
    const toggleSidebar = (): void => {
        showBar.value = !showBar.value
    }
    const updateState = (): void => {
        const mainPage = document.querySelector(".page") as HTMLElement;
        const sidebar = document.querySelector(".sidebar") as HTMLElement;
        // 检测当前状态，false 为隐藏
        if (showBar.value === false) {
            // 通过 hide 类改变 left 的值，实现隐藏侧边栏
            sidebar.classList.add('hide');
            mainPage.classList.add('full');
        } else if (showBar.value === true) {
            sidebar.classList.remove('hide');
            mainPage.classList.remove('full');
        }
        console.log(showBar.value)
    }
    watch(showBar, updateState)
    // 路径变化时，判断是否需要更新侧边栏状态
    watch(() => route.path, () => {
        setTimeout(updateState, 700)
    });

    const genButton = (): void => {
        const button = document.createElement("button");
        button.className = "toggle-sidebar";
        button.innerHTML = `<i class="icon iconfont icon-sidebar" style="font-size: 28px"></i>`
        button.setAttribute("aria-label", "隐藏/显示侧边栏");
        button.setAttribute("data-balloon-pos", "left");
        // 非 hover 状态时，取消焦点
        button.onmouseout = () => button.blur();
        button.addEventListener('click', toggleSidebar);
        document.body.appendChild(button)
    };
    onMounted(() => genButton());
})