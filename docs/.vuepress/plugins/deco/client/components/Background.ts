import { defineComponent, h } from "vue";

export const Background = defineComponent({
    name: "Background",

    setup() {
        return () =>
            h("div", {
                id: "bg",
                name: "background",
            });
    },
});
