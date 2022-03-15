let scripts = [
    "/assets/js/reloadPage.js",
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
    if (!window['__c_script__']) {
        for (let key in scripts) {
            const script = document.createElement("script")
            script.src = naming(scripts[key])
            setTimeout(() => document.body.appendChild(script), 1000)
            count++;
        }
        if (count == scripts.length) {
            window['__c_script__'] = 1
        }
    }
})()

/**
 执行脚本，编译并压缩代码
 tsc docs/.vuepress/public/assets/js/index.ts    # --removeComments 移除注释
 uglifyjs docs/.vuepress/public/assets/js/index.js -o docs/.vuepress/public/assets/js/index.js -m
 其中 m 是 minify，可重命名变量、去除注释
 */