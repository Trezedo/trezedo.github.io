import {enUnicode} from "./utils";

/**
 * 提取 display-style 公式，例如 \[...\]，$$...$$
 */
function extractDisplayLine(tex: string, appendStr: string = "\n"): string {
    return tex.replace(/(\\\[|\$\$)\n((.|\n)*?)\n(\\]|\$\$)/g, "$2" + appendStr);
}

/**
 * 提取 \text{...} 中的文字
 * @param {string} tex 待处理的 LaTeX 代码
 * @returns 不含 \text{...} 的代码
 */
function extractText(tex: string): string {
    return tex.replace(/\\text{(.*?)}/g, (res, p1: string) =>
        /**
         * p1 是括号中的内容
         * 对括号中的英文处理 [a-zA-Z]+
         * 不能是一个命令：对 \text{\pi }等 /(?<!\\)(\b[a-zA-Z]+)/
         * 前面可以是数字：(?<=\d)([a-zA-Z]+)
         * \text{ iiiiiiiii 0102356796420 eeeeeeeeeeeeeeeeeeeeeee \pi }
         */
         p1.replace(/(?<=\d)([a-zA-Z]+)|(?<!\\)(\b[a-zA-Z]+)/g, "\\mathrm{$&}")
    );
}

// https://blog.csdn.net/diaolanbeng0962/article/details/101964605
// 箭头函数如果有花括号则需要 return 关键字，否则得到 undefined

type LeftRightIndex = {
    leftIndex: number;
    rightIndex: number;
    str: string;
}

/**
 * 找到文本中所有配对的符号组 {@link https://blog.csdn.net/qq_41595212/article/details/95640802}
 * @param {string} text
 * @param {string} left 左侧配对符，默认左大括号
 * @param {string} right 右侧配对符，默认右大括号
 */
function getPaired(text: string, left: string = "{", right: string = "}"): LeftRightIndex[] {
    const leftArr: number[] = []; // 存放左边括号下标
    const successArr: LeftRightIndex[] = []; // 存放成功数据
    /*遍历字符串*/
    for (let i = 0, j = 0; i < text.length; i++) {
        if (text[i] === left) {
            leftArr.push(i);
        } else if (text[i] === right) {
            if (leftArr.length === 0) {
                throw new Error(`位置在${i}的${right}没有相匹配的`);
            }
            j = leftArr.pop() as number
            successArr.push({
                leftIndex: j,
                rightIndex: i,
                str: text.substring(j, i + 1)
            });
        }
    }
    // 检查 leftArr 的长度是否为0
    if (leftArr.length !== 0) {
        let i = leftArr[0];
        throw new Error(`位置在${i}的${left}没有相匹配的`);
    }
    return successArr.sort((a, b) => a.leftIndex - b.leftIndex);
    // json对象的排序的方法 https://www.it610.com/article/1297794796944957440.htm
}

// console.log(getPaired('(5+6)+((2+1)-(4* (2-1)))', "(", ")"))

/**
 * 获取最长的以 左右大括号匹配的 含中文字串
 */
function getLongestPairedArray(text: string): LeftRightIndex[] {
    let rIndex = 0;
    let resArr: LeftRightIndex[] = [];
    let pairedArr = getPaired(text);
    let li, ri; // 每次的左右下标
    for (let i = 0; i < pairedArr.length - 1; i++) {
        // 当前对象的 右括号下标序号 > 下一个对象左括号下标序号
        if (pairedArr[i].rightIndex > pairedArr[i + 1].leftIndex) {
            rIndex = pairedArr[i].rightIndex;
            // 从下一个开始找 rightIndex 比 当前的 大的
            for (let j = i + 1; j < pairedArr.length; j++) {
                if (pairedArr[j].rightIndex > rIndex) {
                    // 找到元素，判断其 左括号下标 是否比 rIndex 大
                    // 如果是，不合并，rIndex 就是最大分界点
                    // 否则 合并，记录其在 pairedArr 对象中的下标
                    resArr.push({
                        leftIndex: li = pairedArr[i].leftIndex,
                        rightIndex: ri = Math.min(pairedArr[j].rightIndex, rIndex),
                        str: text.substring(li, ri + 1)
                    });
                    i = j - 1;
                    // 寻找下一个最长中文字串。当前元素可能不会被合并，故i从当前下标开始
                    // 因为下一步执行 j++，所以 i = j - 1
                    break;
                }
            }
        } else {
            // 一般情况，直接记录左右下标即可
            resArr.push({
                leftIndex: li = pairedArr[i].leftIndex,
                rightIndex: ri = pairedArr[i].rightIndex,
                str: text.substring(li, ri + 1)
            });
        }
    }
    return resArr;
}


/**
 * 对括号预处理：针对 \left\{ ... \right. 的情况，
 * 
 * 此时由于符号不配对，不处理会找不到配对的符号
 * 
 * 对应 {@link AxTexBuilder.postTreat}
 */
function pre_LeftBraceRightDot(tex: string): string {
    return tex.replace(/\\left\\{((.|\n)*?)\\right\./g, "\u13b1$1\u13b2");
}


/**
 * 对中文预处理：针对在 \left( ... \right) 中的中文
 *
 * 替换为 Unicode 并用 \text{...} 包裹
 */
function pre_parenthesisZh(text: string): string {
    // 预先替换掉一个小括号
    text = text.replace(/\\left\( ([^(]+?) \\right\) ?/g,
        (match, p1) => {
            // 没有以下内容就替换：
            // \frac, \int, \sqrt 多(2+)重上标, \begin
            let is_contain = /\\frac/.test(p1) || /\\int/.test(p1) || /\\sqrt/.test(p1)
                || /\^{[^}]+\^+/.test(p1) || /\\begin/.test(p1)
            // console.log(p1, is_contain)
            if (!is_contain) {
                return "(" + p1 + ")"
            } else return match;
        }
        // 这里 match 是匹配到的文本， p1 相当于 $1，但是可以进行文本替换操作
        // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/replace#使用行内函数和正则来避免循环
    );
    return text.replace(
        // /\\left\( *([^\x00-\xff]+) *\\right\) */g,
        /\(([^\x00-\xff]+)\)/g,
        (match, p1) => "(\\text{" + enUnicode(p1) + "})"
    );
}


/**
 * 对处于数学公式环境中的中文加上 \text{...}
 */
function textChineseChar(text: string) {
    // 过滤，只要含中文的
    let ZhInMathArray = getLongestPairedArray(text).filter(
        (item) => /[^\x00-\xff]/.test(item.str)
    );

    // 将得到的数组内的中文替换为 Unicode
    ZhInMathArray.forEach(item => {
        // 此处先前使用正则表达式
        text = text.replace(item.str, item.str.replace(
            /([^\x00-\xff]+)/g, (str) => "\\text{" + enUnicode(str) + "}"
        ));
    });
    // 后面不需要检测括号是否对齐，这里把前面换掉的 \left\{ ... \right. 还原
    text = AxTexBuilder.postTreat(text);
    return {text: text, array: ZhInMathArray}
}

/**
 * 删除一个公式块内的所有换行符，变成一行
 *
 * 主要是方便
 * @param {string} text 文本
 * @param {string} appendStr 附加在每行公式后的字符串
 * @returns
 */
function toSingleLine(text: string, appendStr: string = "\n\n"): string {
    let tmp_text = "";
    let array = text.replace(/\n(?!\n)/g, "").split(/\n/);
    array.forEach((e) => {
        if (e !== "") tmp_text += e + appendStr;
    });
    return tmp_text;
}


/**
 * 添加 $...$
 * @param {string} text
 * @returns
 */
function add$$(text: string): string {
    // 先将 2 个及以上的换行符统一换成2个
    text = text.replace(/\n{2,}/g, "\n\n");

    text = text.replace(/[\x20-\x7E\t]+/g,
        (res) => "$" + res + "$"
    );
    // 能找到全部 纯数学公式（不含中文）
    //[\x00-\x09\x0b-\xff][\x00-\xff]+?)(?=\n{2,})

    text = unescape(text);
    return text;
}


class AxTex {
    private text;  // “#”表示私有变量，相当于 private

    constructor(text: string) {
        this.text = text;
    }

    /**
     * 参见 {@link extractLine}
     * @returns
     */
    extractLine() {
        this.text = extractDisplayLine(this.text);
        return this;
    }

    /**
     * 参见 {@link extractText}
     * @returns
     */
    extractText() {
        this.text = extractText(this.text);
        return this;
    }

    /**
     * 对公式预处理，主要是考虑 "{"、"}"配对问题，
     *
     * 以及数学括号内的中文问题
     * 参见 {@link pre_LeftBraceRightDot}
     */
    preTreat() {
        this.text = pre_LeftBraceRightDot(this.text);
        this.text = pre_parenthesisZh(this.text);
        return this;
    }

    log() {
        console.log(this.text);
    }

    getText() {
        return this.text;
    }
}

// AxTex.prototype.myTrim = function () {
//     return this.replace(/\s/g, '');
// };


// [\u4e00-\u9fa5]+ 中文汉字（不含字符）
// [^\x00-\xff]+ 包含中文字符
// [\x20-\x7E\t]+ 单行非中文片段


export class AxTexBuilder {
    private axTex: AxTex;

    /**
     * Axmath-LaTeX 构建器的构造方法
     * @param {string|AxTex} param 字符串 或者 AxTex 类
     */
    constructor(param: string | AxTex) {
        if (param instanceof AxTex) {
            this.axTex = param;
        } else {
            this.axTex = new AxTex(param);
        }
        this.axTex.extractLine().extractText().preTreat();
    }

    private getAxTexText() {
        return this.axTex.getText();
    }

    /**
     * 参看 {@link getLongestPairedArray}
     * @returns
     */
    getLongestPairedArray() {
        return getLongestPairedArray(this.getAxTexText());
    }

    getZhInMathArray() {
        return textChineseChar(this.getAxTexText()).array;
    }

    getProcessedZh() {
        return textChineseChar(this.getAxTexText()).text;
    }

    /**
     * 参考 {@link toSingleLine}
     */
    toSingleLine(appStr = "\n\n") {
        return toSingleLine(this.getProcessedZh(), appStr);
    }

    add$$(): string {
        return add$$(this.toSingleLine());
    }

    /**
     * 还原 {@link pre_LeftBraceRightDot} 替换的字符
     * @param {string} text
     * @returns
     */
    static postTreat(text: string) {
        // 还原 \left\{ ... \right.
        text = text.replace(/\u13b1([\x20-\x7E\t\n]+)\u13b2/g,//(.*?)
            (match, p1) => "\\left\\{" + p1 + "\\right."
        );
        return text;
    }

    toString() {
        return this.add$$();
    }
}