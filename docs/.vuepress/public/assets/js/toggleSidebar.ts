(() => {
    const mainPage = document.querySelector("main.page#main-content") as HTMLElement;
    const sidebar = document.querySelector("aside.sidebar") as HTMLElement;
    if (sidebar) {
        const tButton = document.createElement("button");
        tButton.className = "toggle-sidebar";
        let isShow = true;
        setTimeout(() => {
            document.body.appendChild(tButton)
        }, 200)
        tButton.addEventListener('click', () => {
            if (isShow) {
                sidebar.style.visibility = 'hidden'
                // var(--sidebar-width)
                mainPage.style.paddingLeft = '0';
            } else {
                sidebar.style.visibility = 'visible'
                // var(--sidebar-width)
                mainPage.style.paddingLeft = 'var(--sidebar-width)';
            }
            isShow = !isShow
        })
    }
})()

/**
 tsc docs/.vuepress/public/assets/js/toggleSidebar.ts

 */