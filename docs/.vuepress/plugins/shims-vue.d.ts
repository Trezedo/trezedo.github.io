// 解决 typescript 导入 vue 组件时 oxlint 报错
// https://www.cnblogs.com/tanxj/p/16825009.html
declare module "*.vue" {
    import { defineComponent } from "vue";
    const Component: ReturnType<typeof defineComponent>;
    export default Component;
}

//  foo.scss?inline: https://cn.vitejs.dev/guide/assets.html
// import style from "../styles/bg.plugin.scss?inline";

declare module "*.inline.scss" {
    const content: string;
    export default content;
}

declare module "*.scss" {
    const classes: { [key: string]: string };
    export default classes;
}

// https://stackoverflow.com/questions/41336858/how-to-import-css-modules-with-typescript-react-and-webpack
declare module "*.plugin.scss" {
    const classes: {
        [key: string]: string;
    };
    export default classes;
}

declare module "*.plugin.scss?inline" {
    const css: string;
    export default css;
}
