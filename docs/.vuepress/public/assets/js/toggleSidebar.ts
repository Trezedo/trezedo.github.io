function init() {
    const mainPage = () => document.querySelector<HTMLElement>(".page");
    const sidebar = () => document.querySelector<HTMLElement>(".sidebar");

    // 实际上这个按钮是我们创建的
    const button = () => document.querySelector("button.toggle-sidebar");
    // 用 links 来判断页面是否有侧边栏
    const links = () => {
        const ul = document.querySelector("ul.sidebar-links");
        // 如果元素存在，且它的子节点个数为正，则判断为存在侧边栏
        return ul && ul?.childElementCount > 0;
    };
    /**
     * 由于 vue-router 不会刷新页面，但是 head 会执行该 js 文件，因此需要判断 <br>
     *
     * 1. 页面存在侧边栏，且没有 加载按钮： 增加按钮
     * 2. 页面存在侧边栏，且已有 加载按钮： 不变 - 但切换页面后 要判断 sidebar 是否被隐藏
     * 3. 页面不存在侧边栏，且没有 加载按钮： 不变
     * 4. 页面不存在侧边栏，且已有 加载按钮： 移除
     */
    let isHide = () => localStorage.getItem("sidebar") === "hide"; // 用 false 作为初始值的辅助变量
    if (links() && !button()) {
        const tButton = document.createElement("button");
        tButton.className = "toggle-sidebar";
        tButton.innerHTML = `<i class="icon iconfont icon-sidebar" style="font-size: 28px"></i>`;
        tButton.setAttribute("aria-label", "隐藏/显示侧边栏");
        tButton.setAttribute("data-balloon-pos", "left");

        // 非 hover 状态时，取消焦点
        tButton.onmouseout = () => tButton.blur();
        tButton.onclick = toggle;
        document.body.appendChild(tButton);
    } else if (!links() && button()) {
        document.body.removeChild(button()!);
    } else if (links() && button()) {
        // 切换页面时，page会恢复初始状态，而 sidebar 不会
        // 因此当从关闭 sidebar 的页面切换到其他页面时，sidebar隐藏且page不是全屏的
        // 此时是新页面了，因此为了判断需要用到 localStorage
        // 显示被隐藏的侧边栏
        sidebar()?.classList.remove("hide");
        if (isHide()) localStorage.setItem("sidebar", "show");
    }

    function toggle() {
        if (!isHide()) {
            // 通过 hide 类改变 left 的值，实现隐藏侧边栏
            sidebar()?.classList.add("hide");
            mainPage()?.classList.add("full");
            localStorage.setItem("sidebar", "hide");
        } else {
            sidebar()?.classList.remove("hide");
            mainPage()?.classList.remove("full");
            // sidebar().style.left = 'var(--sidebar-width)'
            // mainPage.style.paddingLeft = ''; // var(--sidebar-width)
            localStorage.setItem("sidebar", "show");
        }
    }
}

setTimeout(() => init(), 300);

/**
tsc docs/.vuepress/public/assets/js/toggleSidebar.ts
uglifyjs docs/.vuepress/public/assets/js/toggleSidebar.js -o docs/.vuepress/public/assets/js/toggleSidebar.js -m
 */
