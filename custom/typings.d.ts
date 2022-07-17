interface CustomElement {
    id: string;
    src: string;
    disabled?: boolean;
}

type resource = "iconfont" | "notiflix" | "smoothScroll" | "loveMe";

type CustomElements = Record<resource, CustomElement>;
