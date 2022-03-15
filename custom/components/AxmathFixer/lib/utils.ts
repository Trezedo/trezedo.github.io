/**
 * 将中文字符串转换为 Unicode，已被 W3C 弃用，后续可能不再支持
 * https://www.zhihu.com/question/21861899
 * http://www.ruanyifeng.com/blog/2007/10/ascii_unicode_and_utf-8.html
 *
 */
export function enUnicode(text: string): string {
    return text.replace(/[^\u0000-\u00FF]/g, (chinese) => escape(chinese))
}

/**
 * 将 Array 转化为字符串
 */
export function ArrayStringify(array: any[], appendStr: string = '\n'): string {
    let list = "";
    array.forEach(el => list += JSON.stringify(el) + appendStr);
    return list;
}

/**
 * 生成由字符串组成的正则表达式，允许使用字符串拼接。
 *
 * 尽量免去冗余转义，注意 "\", "{", "}" 需要转义
 * @param {string} pattern 字符串，不能包含 \" 或 \" 之类的
 * @param {string} flags g, i, m 等
 * @returns {RegExp} 原生正则表达式
 */
export function toRawRegExp(pattern: string, flags: string = ""): RegExp {
    let reg = "/" +
        //JSON.stringify(pattern).replace(/"/g, "")
        pattern.replace(/[\\{}]/g, "\\$&")
        + "/" + flags;
    return eval(reg) as RegExp;
}
