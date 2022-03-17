(function () {
    var mainPage = document.querySelector("main.page#main-content");
    var sidebar = document.querySelector("aside.sidebar");
    if (sidebar) {
        var tButton_1 = document.createElement("button");
        tButton_1.className = "toggle-sidebar";
        var isShow_1 = true;
        setTimeout(function () {
            document.body.appendChild(tButton_1);
        }, 200);
        tButton_1.addEventListener('click', function () {
            if (isShow_1) {
                sidebar.style.visibility = 'hidden';
                // var(--sidebar-width)
                mainPage.style.paddingLeft = '0';
            }
            else {
                sidebar.style.visibility = 'visible';
                // var(--sidebar-width)
                mainPage.style.paddingLeft = 'var(--sidebar-width)';
            }
            isShow_1 = !isShow_1;
        });
    }
})();
/**
 tsc docs/.vuepress/public/assets/js/toggleSidebar.ts

 */ 
