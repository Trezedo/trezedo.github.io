// 进入网页时执行，且只执行一次
let scripts = [
    "/assets/js/reloadPage.js",
    // "toggleSidebar.js" // 只会执行一次；不会更新，但又需要动态检测
    // "pop"
];

(() => {
    const naming = (file: string) => {
        let base = (/^\/assets\/js/.test(file)
            ? ""
            : "/assets/js/") + file;
        base = base.replace(/\/+/g, "/")
        return /\.js$/.test(base) ? base : base + ".js"
    }
    let count = 0;
    let defer = 200; // 延迟执行时间
    if (!window['__script_once__']) {
        const date = "?" + new Date().getTime() / 1000
        for (let key in scripts) {
            const script = document.createElement("script")
            script.src = naming(scripts[key])
            setTimeout(() => document.body.appendChild(script), defer)
            count++;
        }
        if (count == scripts.length) {
            window['__script_once__'] = 1
        }
    }
})()

/**
 执行脚本，编译并压缩代码
 tsc docs/.vuepress/public/assets/js/index.ts    # --removeComments 移除注释
 uglifyjs docs/.vuepress/public/assets/js/index.js -o docs/.vuepress/public/assets/js/index.js -m
 其中 m 是 minify，可重命名变量、去除注释
 */