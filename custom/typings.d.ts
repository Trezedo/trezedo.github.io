declare module "*.vue" {
    import Vue from "vue";
    export default Vue;
}

interface CustomElement {
    id: string;
    src: string;
    disabled?: boolean;
}

type resource = "iconfont" | "notiflix" | "smoothScroll" | "loveMe";

type CustomElements = Record<resource, CustomElement>;

// https://stackoverflow.com/questions/41336858/how-to-import-css-modules-with-typescript-react-and-webpack
declare module "*.plugin.scss" {
    const classes: { [key: string]: string };
    export default classes;
}

declare module "*.plugin.scss?inline" {
    const css: string;
    export default css;
}
