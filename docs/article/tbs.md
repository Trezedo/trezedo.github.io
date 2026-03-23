---
icon: bi:browser-chrome
date: 2022-02-21
modified: 2026-03-23
excerpt: 关于在 QQ 内打开 Gitee Pages 的缓存问题
category:
    - QQ
tag:
    - gitee
    - webview
---

# QQ 的 WebView 问题

## 缓存问题

<script lang="ts" setup>
import { ref, onMounted, computed } from "vue";

const env = ref("");
onMounted(() => {
    let ua = /\bQQ\b|WeChat/g.exec(navigator.userAgent);
    env.value = ua ? ua[0] : "QQ、微信";
});
//
const show = ref(false);
// markdown 中似乎用不了 __VUEPRESS_SSR__ 等
if(typeof location != "undefined") {
    const routePath = decodeURI(location.href);
    const href = ref("");
    onMounted(() => {
        const header = document.querySelector("#clear");
        header?.addEventListener("dblclick", () => {
            show.value = !show.value;
        });
        href.value = decodeURI(location.href.replace(location.origin, ""));
    });
}
</script>

在 QQ、微信环境下，Gitee Pages 的网页文件数据会被强制缓存，此后有几率==无法自动更新==。

因此建议在其他浏览器内打开，或者手动清除缓存。

> 之前 QQ 甚至可以不需要网络就能够访问打开过的页面，最近（2022 年 3 月）发现这个问题似乎修复了。

<details class="custom-block details" v-if="show">
    <summary>当前页面链接</summary>
    <p><code>route</code>: {{ routePath }}</p>
    <p><code>href</code>: {{ href }}</p>
</details>
<p style="font-size: 20px;font-weight: bold" id="clear">清除缓存</p>

{{ env }} 清理 WebView 缓存方法如下：

首先需要打开 X5 调试页面：

<div v-if="env!=='QQ、微信'">
    <p>{{ env }}内不支持通过 <code>a</code> 标签从本文打开调试页面，但可以扫描以下二维码打开：</p>
    <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=http://debugx5.qq.com/" alt="debugX5 center 360px"/>
</div>
<div v-else>
    <p><a href="http://debugx5.qq.com">http://debugx5.qq.com</a>，注意一定是 <code>http</code> 协议。</p>
</div>

然后勾选 **“文件缓存”** ，然后点击“**清除**”：

![step1 center |360](https://zedo.gitee.io/data-generator/step1.png)

显示如下则清理完成：

![step2 center |360](https://zedo.gitee.io/data-generator/step2.png)

然后重新打开所要访问的页面即可。

::: tip 提示

在微信内需要先开启 X5 内核：

![微信开启X5内核 center](https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://debugmm.qq.com/?forcex5=true)

扫码后若提示 "**force use x5 switch is on**"，即开启成功。

:::

## Vue 路由问题

在部署博客的时候，发现 QQ 内打开链接的在操作 **分享**、**收藏**、**复制链接** 等行为时出现了问题：它提取的摘要、链接都是打开时的 URL 链接，而经过 vue 的路由切换的路径不能改变它分享的链接地址。

也就是说，比如你在 QQ 内打开的链接为 <https://zedo.gitee.io/> ，在里面打开任意的文章，当你选择在右上角分享给好友时，不论你当前浏览的文章的链接是什么，分享出去（或复制）的链接都将是 <https://zedo.gitee.io/>。

::: tip

实际上，通过 `history.pushState` 改变网页地址，webview 分享时获取的地址是初次访问时的 url，这是本质问题，也应该是个 bug。

:::

目前没有什么比较好的方法（用 `javascript` 检测分享行为等），测试了一番发现：除了对页面刷新之外，没有其他方法了。

容易想到使用 vue 路由守卫去做刷新，但是这对读者体验不好，因为每篇文章打开前都会刷新，而且不是每个篇文章都会被复制链接或分享。

最终，我的解决方案是：==添加刷新按钮==来执行刷新操作：

![24221949 center |400](https://zedo-img.netlify.app/img/2022-03/24221949.png)

可以发现在右下角多了一个按钮，点它就可以刷新啦~
