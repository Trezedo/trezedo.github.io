import {defineClientAppSetup} from '@vuepress/client'
import {ref, onMounted, watch} from 'vue'
import {useRoute} from "vue-router";

// noinspection JSUnusedGlobalSymbols
export default defineClientAppSetup(() => {
    // 生成按钮
    const genButton = (): void => {
        const button = document.createElement("button");
        button.className = "toggle-sidebar";
        button.innerHTML = `<i class="icon iconfont icon-sidebar" style="font-size: 28px"></i>`;
        button.setAttribute("aria-label", "隐藏/显示侧边栏");
        button.setAttribute("data-balloon-pos", "left");
        // 默认隐藏
        button.setAttribute("style", "visibility: hidden");
        // 非 hover 状态时，取消焦点
        button.onmouseout = () => button.blur();
        button.addEventListener('click', toggleSidebar);
        document.body.appendChild(button);
    };

    // 控制按钮的显示，依赖于当前页面是否含有侧边栏
    const updateButtonState = (): void => {
        // 判断页面是否存在侧边栏
        const containSidebar = (): boolean => {
            // 如果元素存在，且它的子节点个数为正，则判断为存在侧边栏
            const ul = document.querySelector("ul.sidebar-links")
            return ul && ul?.childElementCount > 0
        };
        const button = document.querySelector("button.toggle-sidebar") as HTMLElement;
        button.style.visibility = containSidebar() ? 'visible' : 'hidden';
    };

    onMounted(() => {
        genButton();
        // 延迟 500ms 更新按钮状态
        setTimeout(updateButtonState, 500)
    });

    const route = useRoute();
    // 路径变化时，更新按钮状态
    watch(
        () => route.path,
        () => setTimeout(updateButtonState, 500)
    );

    const barState = ref<boolean>(true) // 侧边栏当前状态，true 为显示侧边栏
    // 切换侧边栏状态
    const toggleSidebar = (): void => {
        barState.value = !barState.value;
    };
    // 更新侧边栏状态
    const updateBarState = (): void => {
        const mainPage = document.querySelector(".page") as HTMLElement;
        const sidebar = document.querySelector(".sidebar") as HTMLElement;
        // 检测当前状态，false 为隐藏
        if (barState.value === false) {
            // 通过 hide 类改变 left 的值，实现隐藏侧边栏
            sidebar.classList.add('hide');
            mainPage.classList.add('full');
        } else if (barState.value === true) {
            sidebar.classList.remove('hide');
            mainPage.classList.remove('full');
        }
    };
    // 检测到 barState 变化时，更新状态
    watch(barState, updateBarState)
    // 路径变化时，判断是否需要更新侧边栏状态
    watch(() => route.path, () => {
        setTimeout(updateBarState, 700)
    });

})