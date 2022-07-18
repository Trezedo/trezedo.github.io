/* // 无法正常使用 element-plus 或 naive-ui
import {onMounted, ref} from "vue";
import {darkTheme} from "naive-ui";
import {BuiltInGlobalTheme} from "naive-ui/es/themes/interface";

export default function useNaiveTheme() {
    const theme = ref<BuiltInGlobalTheme | undefined>();
    // window.onstorage 或 window.addEventListener('storage', () => {}) 不起作用
    // https://stackoverflow.com/questions/26974084
    onMounted(() => {
        const toggleNaiveTheme = () => {
            const thm = localStorage.getItem("vuepress-color-scheme");
            theme.value = thm === 'dark' ? darkTheme : undefined;
        };
        toggleNaiveTheme();
        const button: HTMLButtonElement = document.querySelector(".toggle-dark-button");
        button.addEventListener('click', () => toggleNaiveTheme());
    })
    return {theme}
}*/

export {};
