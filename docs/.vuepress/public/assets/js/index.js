var scripts = {
    reloadPage: "/assets/js/reloadPage.js"
};
(function () {
    var naming = function (file) {
        // if (/^\/assets\/js\/(.*?)\.js$/.test(result)){
        //
        // }
        var base = (/^\/assets\/js/.test(file)
            ? ""
            : "/assets/js/") + file;
        base = base.replace(/\/+/g, "/");
        return /\.js$/.test(base) ? base : base + ".js";
    };
    var _loop_1 = function (key) {
        var script = document.createElement("script");
        script.src = naming(scripts[key]);
        setTimeout(function () { return document.body.appendChild(script); }, 1000);
    };
    for (var key in scripts) {
        _loop_1(key);
    }
})();
