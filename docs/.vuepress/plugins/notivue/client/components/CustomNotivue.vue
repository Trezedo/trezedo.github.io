<template>
    <Notivue v-slot="item">
        <Notification :item="item" :theme="pastelTheme">
            <NotificationProgress :item="item" />
        </Notification>
    </Notivue>
</template>

<script setup lang="ts">
import { Notification, NotificationProgress, Notivue, pastelTheme } from "notivue";
</script>

<style lang="scss">
// 在此处导入可避免 ts 的类型检查错误 https://docs.notivue.smastrom.io/more-info/troubleshooting#webpack-vue-cli
@import "notivue/notification.css";
@import "notivue/animations.css";
@import "notivue/notification-progress.css";

.Notivue__notification {
    cursor: default;

    .Notivue__content-title {
        --nv-title-size: 1.125rem !important;
        position: relative;

        // border-bottom: 2px solid rgba(0, 0, 0, 0.1);position: relative;
        /* 移除原有的 border-bottom 或 box-shadow */
        &::after {
            content: "";
            position: absolute;
            bottom: -0.5em;
            left: 0;
            width: 100%;
            height: 2px;
            background-color: rgba(0, 0, 0, 0.1);
        }
    }

    .Notivue__content-message {
        margin-top: 1em;
    }

    .Notivue__close {
        align-self: flex-start;
    }
}
</style>
