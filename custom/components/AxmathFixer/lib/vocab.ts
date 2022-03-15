// noinspection SpellCheckingInspection

import {toRawRegExp} from "./utils";

export class Reg extends RegExp {
    toString() {
        let leng = super.toString().length;
        return super.toString().substring(1, leng - 1)
    }

    get() {
        return this.toString();
    }

    /**
     * 返回不关闭正则表达式的 pattern
     *
     * 后面的是需要转义的 { } [ ] \ ^ $ . | ? * + ( )
     * @param {string} text
     * @returns
     */
    static getPlain(text) {
        return text.replace(/[\-\/\\^$*+?.()|[\]{}]/g, '\\$&');// 注意减号要转义
    }
}


// noinspection DuplicatedCode
export class Regularize {
    data = {
        //envis: [],
        symbols: {
            default: [] as string[],
            extend: [] as string[]
        },
        replacement: {
            on: [],
            off: [],
        },
    };

    constructor() {
        if (!window.localStorage.getItem("Regularize_data")) {
            this.data = {
                //envis: ["array", "aligned", "cases", "matrix"],
                // /\\begin({aligned})[\x20-\x7E\t\n]+?\\end\1/,
                // /\\begin({(aligned|array|matrix)})({[lcr]+})?(\[[tbp]])?[\x20-\x7E\t\n]+?\\end\1/,
                // 找到所有指定的环境
                symbols: {
                    default: [
                        "arccos", "arccot", "arccsc", "arcsec", "arcsin", "arctan",
                        "cos", "cot", "csc",
                        "exp", "lim", "ln", "log", "max", "min",
                        "sec", "sgn", "sin", "tan"
                    ],
                    extend: [
                        "Im", "Li", "Re", "Res",
                        "arch", "arsh", "arth",
                        "cosh", "coth", "csch",
                        "sech", "sh", "sinh",
                        "tanh", "th",
                    ]
                },
                replacement: {
                    on: [
                        [/\\mathrm{d}/g, "\\d "],
                        [/\\mathrm{e}/g, "\\e "],
                        [/\\ni/g, '\\not\\in '],
                        [/\\rightarrow /g, '\\to '],
                        [/\^'/g, "'"],
                        [/\^{'/g, "^{\\prime "],
                        [/\^{(.*?)}'/g, "^{$1 \\prime}"],
                        // f^'f^{'2}f^{2'}' 测试以上3条，匹配不完全对，但应该能解决问题
                        [/\u0091/g, "`"],//分别是左右的单、双引号
                        [/\u0092/g, "\'"],
                        [/\u0093/g, "``"],
                        [/\u0094/g, "\'\'"],
                    ],
                    off: [],
                },
                // \\[a-zA-Z]+\\text\{h\}
                // \sin\cos\text{arshartharch}\sin\mathrm{hLiReImResthsh}
            };
        }
    }

    /**
     *
     * @param {...string} rep
     */
    // addReplacement(...rep) {
    //     this.data.replacement.on.contains();
    // }

    /**
     */
    turnOnReplacement(...indexes: number[]) {
        let R, len;
        indexes.forEach(i => {
            R = this.data.replacement;
            len = R.off.length;
            if (i < len) {
                R.on.push(R.off[i]);
                R.off.splice(i, 1);
            }
        });
    }

    turnOffReplacement(...indexes: number[]) {
        let R, len;
        indexes.forEach(i => {
            R = this.data.replacement;
            len = R.on.length;
            if (i < len) {
                R.off.push(R.on[i]);
                R.on.splice(i, 1);
            }
        });
    }

    getReplacement() {
        let res = [];
        this.data.replacement.on.forEach(item => {
            res.push(
                [new RegExp(item[0], "g"), item[1]]
            );
        })
        return res;
    }

    /**
     * 将部分代码替换为用户简化的命令
     * @param {string} text 需要替换的 LaTeX 代码
     */
    execute_Replacement(text: string): string {
        this.getReplacement().forEach(item => {
            text = text.replace(item[0], item[1]);
        });
        return text;
    }

    /**
     * 替换在中文附近的英文逗号为“，”，以及将英文句号提取到公式外
     */
    comma_and_period(text: string): string {
        // 英文句号
        text = text.replace(/\.\$(?!\$)/g, "$.");
        // 中文逗号
        text = text.replace(/(?<=[^\x00-\xff])\$,/g, "，$");
        text = text.replace(/,\$(?=[^\x00-\xff])/g, "$，");
        return text;
    }

    add_whitespace_BothSidesOf_$(text: string): string {
        return text;
    }

    /**
     * 在紧跟的中英文之间加空格
     */
    add_whitespace_betweenZhEn(text: string): string {
        text = text.replace(/(?<=[^\x00-\xff])[a-zA-Z]/g, " $&");
        text = text.replace(/[a-zA-Z](?=[^\x00-\xff])/g, "$& ");
        return text;
    }
}

// voc = new Regularize();
// console.log(voc);


// 用一个function做命名空间，但是函数没有 jsdoc 提示

export class FormatKit {
    /*#Kit = new this.innerKit();
    constructor() {
        this.innerKit = class {
            ... 这里写函数
        };
    }*/
    // 参考链接：https://stackoverflow.com/questions/28784375#49658867

    // 当做内部类使用，存放中间过程用到的函数
    private Kit = {
        /**
         * 1.找到所有大括号内的 = 号，替换为 \u2020。/\{[^{}]+?(?<!&)=[^}]+?\}/
         *
         * 2.找到首个左边不是 & 的等号（非全局即可），替换为 \u1962
         *
         * 3.将 \u2020 换成 =，然后替换 \u1962 为 &=。
         * @param {string} line { .. &= .. } 所在行
         * @returns {string} 修复 & 对齐问题的行
         */
        fix_align_line(line) {
            line = line.replace(/{[^{}]+?=[^}]+?}/,//\{[^{}]+?(?<!&)(=+)[^}]+?\}
                (m) => m.replace(/&?=/g, "\u2020")
            );
            line = line.replace(/(?<!&)=/, "\u1962");
            line = line.replace(/\u2020/g, "=").replace("\u1962", "&=");
            return line;
        },

    };

    /**
     * 找到所有出现 { .. &= .. } 的行进行替换
     *
     * 如 \sum_{ .. &= .. }，\xlongequal{ .. &= .. }
     */
    fix_align(text: string): string {
        text = text.replace(
            /.*?{[^{}]+?(?<=&)=.*}.*\\\\/g,
            m => this.Kit.fix_align_line(m)
        );
        return text;
    }

    /**
     * 将可能为 \binom 的 array 替换
     */
    fix_binom(text: string): string {
        return text.replace(
            // 取消换行与否都能匹配，但最好换行
            /\\left\( \\begin({array}){c}\n?\t(.*?)\\\\\n?\t(.*?)\\\\\n?\\end\1 \\right\) ?/g,
            "\\binom{$2}{$3}"
        );
    }

    /**
     * @param {string} text
     * @param  {...string} mathOps 数学符号
     */
    fix_underset(text: string, ...mathOps: string[]): string {
        ["lim", "max", "min"].forEach(op => mathOps.push(op));
        let reg = "\\underset\{(.*?)\}\{\\(" + mathOps.join("|") + ")\}";
        return text.replace(toRawRegExp(reg, "g"), "\\$2_{$1}")
    }

    /**
     * 修复 \begin{..} ... \end{..} 环境中的中文，<br>
     * 简易格式化一下这些环境
     *
     * 参考 {@link Regularize} 中的 envis
     */
    fix_envis_withZh(text: string): string {
        // 先找到 环境
        let reg = /\\begin({(aligned|array|matrix|cases)})({[lcr]+})?(\[[tbp]])?(.|\n)+?\\end\1/g
        text = text.replace(reg,
            (m) => m.replace( //替换 $中文$ -> \text{中文}
                /\$([^\x00-\xff]+)\$/g, "\\text{$1}"
            ).replace(/\t.*?\\\\/g, "\n$&")    //加上换行
                .replace(/\\\\\\end/g, "\n\\end")    // 结束标记
                .replace(/\n\t\n\\end/g, "\n\t%\n\\end")  // 这里是处理该行为空的情况
        );
        text = text.replace(/(?<=\\begin{matrix}){[lrc]+}/, "");// axmath会把 2列及以上的array环境替换为matrix
        return text
    }

    fix_whitespace(text: string): string {
        // 需要先把 \mspace{}替换成 \, ，考虑\text{} 中的，就还要 检测\\mathrm
        text = text.replace(/\\mspace{([0-9.]+)(\\mathrm{)?mu}?}/g,
            (m, p1) => "\\,".repeat(Math.ceil(parseInt(p1) / 9))
        );
        // http://www.manongjc.com/article/17174.html
        // 将空格替换为 \hspace{*em}，axmath 中使用 \mspace{9mu} 表示 \hspace{0.5em}
        text = text.replace(
            /(\\{2,}([, ])|\\([, ]))+/g,
            m => `\\hspace{${[...m.matchAll(/\\/g)].length * 0.5}em}`
            // 利用 matchAll 统计 “\” 出现的次数
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/matchAll
        );
        return text;
    }

    /**
     * 将可以不在数学环境的提出来
     */
    escape_math(text: string): string {
        // 数字、小数点、英文逗号
        //text = text.replace(/\$([\d\.,()]+)\$/g, "$1");
        // mathrm 中的英文、逗点
        //text = text.replace(/\$\\mathrm{([a-zA-Z\.]+)}\$/g, "$1");
        // 可以用 /\$([\d\.,()]+|\\mathrm{[a-zA-Z]+})\$/g 一次找到
        return text;
    }

    /**
     * 提取出英文句子，将可以不在数学环境中的提出来
     */
    en_sentence(text: string): string {
        return text.replace(
            /\$((\\mathrm{[a-zA-Z]+}|\\hspace{.*?}|[0-9.,()])+)\$/g,   // .可能需要转义
            (m, p1) => p1.replace(/\\mathrm{([a-zA-Z]+)}/g, "$1")
                .replace(/\\hspace{(.*?)em}/g, (s, _p1) => " ".repeat(2 * parseFloat(_p1)))
        );
    }
}

// \$[^\x00-\xff]+?\$
console.log(new FormatKit());
