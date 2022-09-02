import { defineComponent, h } from "vue";

export const Background = defineComponent({
    name: "BackToTop",

    setup() {
        return () =>
            h("div", {
                id: "bg",
                name: "back-to-top",
            });
    },
});
