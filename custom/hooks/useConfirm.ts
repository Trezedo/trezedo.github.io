/**
 * @param title 标题
 * @param message 消息
 * @param okText ”确定“按钮的文字
 */
interface ConfirmRequired {
    title?: string;
    message: string;
    okText?: string;
}

interface ConfirmOption extends ConfirmRequired {
    cancelText?: string; // Cancel button text in string format.
    onOkClick?: () => void; // a callback function that will be called when the OK button element has been clicked.
    onCancelClick?: () => void; // a callback function that will be called when the Cancel button element has been clicked.
    options?: object; // extending the initialize options with new the options for each confirm box.
}

/**
 * 使用 Notiflix 的 Confirm <br>
 * 提供了 {@link show} 方法
 */
export function useConfirm() {
    if (typeof window == "undefined") return;
    // @ts-ignore
    let Confirm = window.Notiflix.Confirm;

    class NConfirm {
        show(option: ConfirmOption) {
            Confirm?.show(
                option.title || "提示",
                option.message,
                option.okText || "确定",
                option.cancelText || "取消",
                option.onOkClick || (() => {}),
                option.onCancelClick || (() => {}),
                option.options
            );
        }
    }

    return new NConfirm();
}
