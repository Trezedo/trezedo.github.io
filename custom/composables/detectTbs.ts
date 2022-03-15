// noinspection SpellCheckingInspection

import {onMounted} from "vue";
import useConfirm from "../composables/useConfirm";

export default function detectTbs() {
    const confirm = useConfirm();

    function initNotiflix() {
        let env = /\bQQ\b|WeChat/g.exec(navigator.userAgent);
        let browser = /Chrome|Firefox|Safari/gi.exec(navigator.userAgent);
        confirm.show({
            title: '检测到环境异常', message: `当前为 ${env || browser} 环境，点击确定查看详情`,
            okText: '确定', cancelText: "取消",
            onOkClick: () => {
                window.open(`/article/tbs.html?t=${new Date().getTime()}`);
            },
            options: {titleColor: "#eebf31", okButtonBackground: "#eebf31"}
        })
    }

    onMounted(() => {
        if (/\bQQ\b|WeChat/g.test(navigator.userAgent)) {
            initNotiflix()
        }
    })
}

/*import {onMounted, ref, watch} from "vue";

function detectTbsWithCDN() {
    const loaded = ref(false);
    onMounted(() => {
        if (/\bQQ\b|WeChat/g.test(navigator.userAgent)) {
            const notify = document.createElement("script");
            notify.src = "//unpkg.com/notiflix@3.2.4/dist/notiflix-aio-3.2.4.min.js";
            document.body.appendChild(notify);
            notify.onload = () => {
                loaded.value = true;
            };
        }
        watch(loaded, () => initNotiflix());
    });

    function initNotiflix() {
        let env = /\bQQ\b|WeChat/g.exec(navigator.userAgent);
        // @ts-ignore
        const {Confirm} = window.Notiflix;
        // const {Block, Confirm, Loading, Notify, Report} = window.Notiflix;
        document.documentElement.style.overflowY = 'hidden';
        Confirm.show(
            '检测到环境异常', `当前为${env}环境，点击确定查看详情`, '确定', '取消',
            // 加上时间戳，避免未加载页面时，在更新后打不开
            // () => router.push({path: "/article/tbs.html", query: {t: new Date().getTime()}}),
            () => {
                window.open(`/article/tbs.html?t=${new Date().getTime()}`);
                document.documentElement.style.overflowY = 'scroll';
            },
            () => document.documentElement.style.overflowY = 'scroll',
            {titleColor: "#eebf31", okButtonBackground: "#eebf31"}
        );
    }
}*/

// 不兼容手机
// css.href = "https://unpkg.com/naranja@1.0.3/lib/naranja.min.css"
// orange.src = "https://unpkg.com/naranja@1.0.3/lib/naranja.min.js"