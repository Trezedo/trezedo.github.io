<template>
    <p v-show="disabled" style="color: red; font-weight: bold">
        抱歉，当前浏览器不支持语音合成API。
    </p>
    <div>
        <label>语言：</label>
        <select :disabled="disabled" v-model="currentLang">
            <option selected value="all">全部</option>
            <option
                v-for="(lang, idx) in getSupportedLang()"
                :key="idx"
                :value="lang"
            >
                {{ lang }}
            </option>
        </select>
    </div>
    <div>
        <label>音色：</label>
        <select :disabled="disabled" v-model="speakerIdx">
            <option
                v-for="(voice, idx) in filterVoicesByLang(currentLang)"
                :key="idx"
                :value="idx"
            >
                {{ voice.name }}
            </option>
            <option
                v-if="filterVoicesByLang(currentLang).length === 0"
                disabled
            >
                没有可选项
            </option>
        </select>
    </div>
    <div>
        <label>语速：</label>
        <input
            type="number"
            min="0"
            max="10"
            step="0.2"
            v-model="rate"
            :disabled="disabled"
        />
        <label>音调：</label>
        <input
            type="number"
            min="0"
            max="2"
            step="0.1"
            v-model="pitch"
            :disabled="disabled"
        />
    </div>
    <textarea v-model="textInput" />
    <div style="text-align: left">
        <button type="button" @click="speak()" :disabled="disabled">
            朗读
        </button>
    </div>
</template>

<script lang="ts" setup>
// 电池 https://blog.csdn.net/qq_33302253/article/details/113790474
import { onMounted, ref, watch } from "vue";

// 是否支持语音合成
const disabled = ref(false);

// 用户相关输入变量
const currentLang = ref<string>("all");
const speakerIdx = ref(0);
const textInput = ref("hello, 你好");
const rate = ref(1.2); // 0 - 10
const pitch = ref(1.2); // 0 - 2

// 语音辅助变量
const allVoices = ref<SpeechSynthesisVoice[]>([]);
const currentVoices = ref<SpeechSynthesisVoice[]>([]);

onMounted(() => {
    // 判断浏览器是否支持
    if (!window.speechSynthesis) {
        disabled.value = true;
    } else {
        const loadVoices = () => {
            let voices = speechSynthesis.getVoices();
            // 利用map之key的唯一性，对 voiceURI 去重
            let map = new Map();
            allVoices.value = voices.filter(
                (v) => !map.has(v.voiceURI) && map.set(v.voiceURI, 1)
            );
            let length = allVoices.value.length;
            if (length > 0) {
                console.log(`成功加载 ${length} 个语音`);
            }
            currentVoices.value = allVoices.value;
        };
        loadVoices();
        // 异步获取语音 https://stackoverflow.com/questions/46863170
        window.speechSynthesis.onvoiceschanged = () => {
            loadVoices();
        };
    }
});

// 改变语言时，重置 朗读者 索引、过滤语音列表
watch(currentLang, (newVal) => {
    currentVoices.value = filterVoicesByLang(newVal);
    speakerIdx.value = 0;
});

function speak(text?: string) {
    let utter = new SpeechSynthesisUtterance();
    utter.text = text ? text : textInput.value;
    utter.rate = rate.value;
    utter.pitch = pitch.value;
    if (currentVoices.value.length > 0) {
        utter.voice = currentVoices.value[speakerIdx.value];
        utter.lang = utter.voice.lang;
    }
    speechSynthesis.speak(utter);
}

function getSupportedLang(voices?: SpeechSynthesisVoice[]): string[] {
    let lang: string[] = [];
    if (!voices) voices = allVoices.value;
    voices.forEach((v) => lang.push(v.lang.trim()));
    // 使用 集合 进行去重
    return [...new Set(lang.sort())];
}

function filterVoicesByLang(lang: string, voices?: SpeechSynthesisVoice[]) {
    if (lang == "all") return allVoices.value;
    if (!voices) voices = allVoices.value;
    return voices.filter(
        (v) => v.lang.trim().toLowerCase() == lang.trim().toLowerCase()
    );
}

/*onMounted(async () => {
    const response = await axios.get("/api")
    console.log(response.data)
})*/
</script>

<style scoped>
textarea {
    width: 100%;
    height: 4.4rem;
    font-size: 1rem;
    font-family: inherit;
}
</style>
