let scripts = {
    reloadPage: "/assets/js/reloadPage.js",
    // pop: "pop"
};

(() => {
    const naming = (file: string) => {
        let base = (/^\/assets\/js/.test(file)
            ? ""
            : "/assets/js/") + file;
        base = base.replace(/\/+/g, "/")
        return /\.js$/.test(base) ? base : base + ".js"
    }
    for (let key in scripts) {
        const script = document.createElement("script")
        script.src = naming(scripts[key])
        setTimeout(() => document.body.appendChild(script), 1000)
    }
})()