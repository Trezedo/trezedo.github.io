<template>
    <div>
        <!-- <NInput v-model:value="text" type="textarea" placeholder="粘贴代码"-->
        <!--         :autosize="{minRows: 6,maxRows: 6}" @change="saveText"-->
        <!-- />-->
        <textarea v-model="text" @input="saveText" aria-placeholder="粘贴代码"/>
    </div>
    <div>
        <button @click="convert">转换</button>
        <button @click="showArray">输出所有匹配串信息</button>
        <button @click="showZhArray">输出含中文的最长匹配串信息</button>
        <label>提取出公式、中文，预处理</label>
        <button @click="test">测试</button>
        <button @click="beautify">美化</button>
        <textarea v-model="output1" aria-placeholder="输出代码"/>
    </div>
    <div>
        <div>
            <label>公式块内无换行，清理两块公式间的换行符，还原预处理的大括号</label>
            <button @click="showRaw()">显示原生字符</button>
        </div>
        <textarea v-model="output2" aria-placeholder="输出代码"/>
    </div>
    <div>
        <div>
            <label>在output1的基础上，处理中文 加上 $...$</label>
        </div>
        <textarea v-model="output3" aria-placeholder="输出代码"/>
    </div>
</template>

<script lang="ts" setup>
import {ref, onMounted} from "vue";

// noinspection ES6UnusedImports
import {AxTexBuilder} from "./lib/axUtils";
import {FormatKit, Regularize} from "./lib/vocab";
import {ArrayStringify} from "./lib/utils";

const text = ref("")
const output1 = ref("")
const output2 = ref("")
const output3 = ref("")

onMounted(() => {
    text.value = window.localStorage.getItem("orgText");
    convert();
})

function saveText() {
    window.localStorage.setItem("orgText", text.value);
}

function convert() {
    // let axTex = new AxTex(text.value);
    // 初始化时，就会提取出公式、\text{}中的中文
    let atb = new AxTexBuilder(text.value);
    // output1.value = atb.getDealtZh();// 处理中文，公式中的中文转为 Unicode
    // output1.value = atb.toSingleLine();//在处理完中文的情况下，将公式化为一行
    output1.value = atb.toString();// 加上 $..$
}

function showArray() {
    let atb = new AxTexBuilder(text.value);
    output1.value = ArrayStringify(atb.getLongestPairedArray(), "\n\n") || "该数组为空";
}

function showZhArray() {
    let atb = new AxTexBuilder(text.value);
    output1.value = ArrayStringify(atb.getZhInMathArray(), "\n\n") || "该数组为空";
}

function test() {
    let kit = new FormatKit();
    output1.value = kit.fix_align(output1.value);
    output2.value = kit.fix_binom(output1.value);
    output3.value = kit.fix_underset(output2.value);
    output3.value = kit.fix_envis_withZh(output3.value);
    output3.value = kit.fix_whitespace(output3.value);
    output3.value = kit.escape_math(output3.value);
    output3.value = kit.en_sentence(output3.value);
}

function beautify() {
    let rg = new Regularize();
    output3.value = rg.execute_Replacement(output3.value);
    output3.value = rg.comma_and_period(output3.value);
}

function showRaw() {
    console.log(output3.value)
}

// 以下为调试用的
// var axTexBuilder = new AxTexBuilder(main.text);

// 所有以 "{" 和 "}" 配对的下标及内容 (getPaired)
// var Arr = getLongestPairedArray(axTexBuilder.toString());

// 筛选 Arr 中只含中文的
// var ZhInMathArr = handleChineseChar(axTexBuilder.toString()).Array

// main.output3 = handleChineseChar(axTexBuilder.toString()).Text;

// main.output4 = toSingleLine(main.output3);
// main.done = add$$(main.output4);
</script>

<style scoped>
textarea {
    font-family: "微软雅黑", Courier, monospace;
    height: 140px;
    width: 90%;
}

label {
    color: darkcyan;
}
</style>