<template>
    <div :class="['changelog-modal-overlay', `changelog-modal-${position}`]" @click.self="close">
        <div class="changelog-modal-container">
            <div class="changelog-modal-header">
                <h3>{{ title }}</h3>
                <button class="changelog-modal-close" @click="close">×</button>
            </div>
            <div class="changelog-modal-body" v-html="content" />
            <div class="changelog-modal-footer">
                <button @click="close">知道了</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    title?: string;
    content?: string;
    position?: string;
}>();

const emit = defineEmits<{ close: [] }>();
const close = () => emit("close");
</script>

<style lang="scss" scoped>
.changelog-modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
}

.changelog-modal-top-right {
    align-items: flex-start;
    justify-content: flex-end;
    background: transparent;
    pointer-events: none;
}

.changelog-modal-top-right .changelog-modal-container {
    margin-top: 20px;
    margin-right: 20px;
    pointer-events: auto;
}

.changelog-modal-container {
    background: white;
    border-radius: 8px;
    max-width: 450px;
    width: 90%;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.changelog-modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px;
    border-bottom: 1px solid #eee;
}

.changelog-modal-header h3 {
    margin: 0;
    font-size: 1.2rem;
}

.changelog-modal-close {
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: #666;
}

.changelog-modal-body {
    padding: 16px;
    max-height: 60vh;
    overflow-y: auto;
}

.changelog-modal-footer {
    padding: 12px 16px;
    text-align: right;
    border-top: 1px solid #eee;
}

.changelog-modal-footer button {
    background: var(--vp-c-accent-bg); // #3eaf7c
    color: white;
    border: none;
    padding: 6px 16px;
    border-radius: 4px;
    cursor: pointer;
}

.changelog-modal-footer button:hover {
    background: var(--vp-c-accent-hover); //#2c8c5a;
}
</style>
