(() => {
    const mainPage = document.querySelector("main.page#main-content") as HTMLElement;
    const sidebar = document.querySelector("aside.sidebar") as HTMLElement;
    if (sidebar) {
        const tButton = document.createElement("button");
        tButton.className = "toggle-sidebar";
        tButton.innerHTML = `<i class="icon iconfont icon-sidebar" style="font-size: 28px"></i>`
        tButton.setAttribute("aria-label", "隐藏/显示侧边栏");
        tButton.setAttribute("data-balloon-pos", "left");

        let isShow = true;
        setTimeout(() => {
            document.body.appendChild(tButton)
        }, 200)
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
    }
})()

/**
 tsc docs/.vuepress/public/assets/js/toggleSidebar.ts
 uglifyjs docs/.vuepress/public/assets/js/toggleSidebar.js -o docs/.vuepress/public/assets/js/toggleSidebar.js -m
 */