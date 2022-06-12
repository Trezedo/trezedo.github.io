<template>
    <input
        v-model="qq"
        placeholder="请输入对方QQ号"
        @keypress.enter="viewFriend"
    />
    <button @click="viewFriend()" :disabled="qq === '' || qq.length < 5">
        查看
    </button>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import useConfirm from "../../composables/useConfirm";

const confirm = useConfirm();
const qq = ref<string>("");
watch(qq, (newVal) => {
    qq.value = newVal.replace(/[^0-9]/g, "");
});

function viewFriend() {
    if (qq.value.length < 5) return;
    const middlePage =
        "https://i.qianbao.qq.com/lib/components/adapt/middlepage.html?url=";
    const qrCode =
        "https://gxh.vip.qq.com/club/themes/pc/qrcode/html/index.html?qrcode_url=";
    const baseUrl = "https://ti.qq.com/friends/recall?uin=";

    const url = encodeURIComponent(baseUrl + qq.value);
    if (/Windows\b/.test(navigator.userAgent)) {
        confirm.show({
            message: "请在QQ内或装有QQ的移动端打开",
            onOkClick() {
                window.open(qrCode + url);
            },
        });
        return;
    }
    if (/QQ\b/.test(navigator.userAgent)) {
        window.open(baseUrl + qq.value, "_blank");
    } else {
        window.open(middlePage + url);
        // setTimeout(() => _window.close(), 5000) // 手机端无效
    }
}

/*
    <a href="mqqwpa://im/chat?chat_type=wpa&uin=123456">click here Android</a>
    <a href="mqq://im/chat?chat_type=wpa&uin=123456&version=1&src_type=web">click here iOS</a>
    <a href="mqqwpa://im/chat?chat_type=wpa&uin=123456&version=1&src_type=web&web_src=oicqzone.com">唤起移动端 qq</a>
    <a href="mqqwpa://im/chat?chat_type=wpa&uin=351193498&version=1&src_type=web&web_src=www.chinesestack.com">唤起移动端 qq</a>
    <a href="mqqapi://card/show_pslcard?src_type=internal&version=1&uin=1129862506&card_type=group&source=qrcode">和Qun聊天</a>
    <a href="mqqapi://card/show_pslcard?src_type=internal&version=1&uin=1129862506&card_type=group&source=external">和Qun11聊天</a>
 */
</script>
