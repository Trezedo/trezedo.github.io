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
