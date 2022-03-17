(() => {
    const mainPage = document.querySelector("main.page#main-content") as HTMLElement;
    const sidebar = document.querySelector("aside.sidebar") as HTMLElement;

    // 用 links 来判断页面是否有侧边栏
    const links = () => {
        const ul = document.querySelector("ul.sidebar-links")
        // 如果元素存在，且它的子节点个数为正，则判断为存在侧边栏
        return ul && ul?.childElementCount > 0
    }
    const button = () => document.querySelector("button.toggle-sidebar")
    /**
     * 由于 vue-router 不会刷新页面，但是 head 会执行该 js 文件，因此需要判断 <br>
     *
     * 1. 页面显示侧边栏，且没有 加载按钮： 增加按钮
     * 2. 页面显示侧边栏，且已有 加载按钮： 不变
     * 3. 页面不显示侧边栏，且没有 加载按钮： 不变
     * 4. 页面不显示侧边栏，且已有 加载按钮： 移除
     */
    if (links() && !button()) {
        const tButton = document.createElement("button");
        tButton.className = "toggle-sidebar";
        tButton.innerHTML = `<i class="icon iconfont icon-sidebar" style="font-size: 28px"></i>`
        tButton.setAttribute("aria-label", "隐藏/显示侧边栏");
        tButton.setAttribute("data-balloon-pos", "left");

        let isShow = true;
        setTimeout(() => {
            document.body.appendChild(tButton)
        }, 300)
        tButton.addEventListener('click', () => {
            if (isShow) {
                sidebar.classList.add('hide')
                // var(--sidebar-width)
                mainPage.style.paddingLeft = '0';
            } else {
                // sidebar.style.left = 'var(--sidebar-width)'
                sidebar.classList.remove('hide')
                // var(--sidebar-width)
                mainPage.removeAttribute('style')
                // mainPage.style.paddingLeft = ''; // var(--sidebar-width)
            }
            isShow = !isShow
        })
    } else if (!links() && button()) {
        document.body.removeChild(button())
    }
})()

/**
 tsc docs/.vuepress/public/assets/js/toggleSidebar.ts
 uglifyjs docs/.vuepress/public/assets/js/toggleSidebar.js -o docs/.vuepress/public/assets/js/toggleSidebar.js -m
 */