---
icon: fa-brands:chrome
date: 2026-03-18
modified: 2026-03-23
author:
    - Kayce Basques
    - Sofia Emelianova
excerpt: A reference of convenience functions available in the Chrome DevTools Console.<br/>Chrome DevTools 控制台中提供的实用功能参考
category:
    - chrome
tag:
    - chrome
---

# Chrome 控制台实用 API 参考

::: tip

原文链接：[Console Utilities API reference](https://developer.chrome.com/docs/devtools/console/utilities/)

最初于 2022-07-24 转载此文，后因图片无法加载，又更新了一遍。最初还是全英文版，再看时已经有了中文机翻。

:::

Console Utilities API 包含一组用于执行常见任务且方便的函数：选择和检查 DOM 元素、查询对象、以可读格式显示数据、停止和启动分析器以及监视 DOM 事件。

::: danger

这些功能只有当你从 Chrome DevTools 控制台调用它们时才能工作。如果您试图在脚本中调用它们，它们将不起作用。

:::

如果你想查看 `console.log()`, `console.error()` 以及剩下的 `console.*` 函数，请看 [Console API Reference][1].

## \$\_ {#recent}

`$_` 返回最近求值的表达式的值。

在下面的例子中，计算一个简单的表达式 (`2 + 2`)。然后计算 `$_` 属性，它包含相同的值:

![$_ 是最近求值的表达式](https://zedo-img.netlify.app/img/chrome/is-most-recently-eval-91da2e37b12ba_960.png)

在下一个示例中，求值表达式最初包含一个名称数组。

计算 `$_.length` 来查找数组的长度，存储在 `$_` 中的值会变成最新的求值表达式，为 4：

![计算新命令时，$_ 会发生变化](https://zedo-img.netlify.app/img/chrome/changes-new-commands-5c3176479dc2c_960.png)

## \$0 - ​\$4 {#recent-many}

`$0`, `$1`, `$2`, `$3` 和 `$4` 作为元素面板中检查的最后 5 个 DOM 元素或概要面板中选择的最后 5 个 JavaScript 堆对象的历史引用。

`$0` 返回最近选择的元素或 JavaScript 对象，
`$1` 返回最近选择的第二个，以此类推。

在下面的例子中，Elements 面板中选择了一个 `img` 元素。在 Console 抽屉中，`$0` 已被求值并展示相同的元素:

![$0 的例子](https://zedo-img.netlify.app/img/chrome/example-0-38ab0691323fe_960.png)

下图显示了在同一页面中选择的不同元素。

`$0` 现在指向新选择的元素，而 `$1` 则返回先前选择的元素：

![$1 的例子](https://zedo-img.netlify.app/img/chrome/example-1-bdc65325a56a2_960.png)

## \$(selector \[, startNode\]) {#querySelector-function}

`$(selector)` 返回具有指定的 CSS 选择器的第一个 DOM 元素的引用。

当使用一个参数调用时，此函数是 [document.querySelector()][2] 函数的别名。

下面的例子返回了对文档中第一个 `<img>` 元素的引用:

![$('img') 的例子](https://zedo-img.netlify.app/img/chrome/example-img-b1a41e5b82a16_960.png)

右键单击返回的结果，选择“Reveal in Elements Panel”，在 DOM 中找到它，或者选择“Scroll in to View”，在页面上显示它。

下面的例子返回当前选定元素的引用，并显示其 `src` 属性:

![$('img').src 的例子](https://zedo-img.netlify.app/img/chrome/example-imgsrc-b86ba5ef405c_960.png)

这个函数还支持第二个参数 `startNode`，它指定了一个“元素”或用于搜索元素的节点。该参数的默认值是 `document`。

以下示例会返回 `devsite-header-background` 的第一个后代 `img` 元素的引用，并正确地显示其 `src` 属性:

![$('img', div).src 的例子](https://zedo-img.netlify.app/img/chrome/example-img-divsr-3b8ae5c01e964_960.png)

::: warning 注意

如果你使用的是 jQuery 等使用 `$` 的库，该功能将被覆盖，`$` 将对应该库的实现。

:::

## \$\$(selector \[, startNode\]) {#querySelectorAll-function}

`$$(selector)` 返回一个匹配给定 CSS 选择器的元素数组。这个命令等价于调用 Array.from([document.querySelectorAll()][3])。

下面的例子使用 `$$()` 来创建当前文档中所有 `<img>` 元素的数组，并展示每个元素的 `src` 属性的值:

```js
let images = $$("img");
for (let each of images) {
    console.log(each.src);
}
```

![使用 $$() 选择文档中的所有图像并显示的示例](https://zedo-img.netlify.app/img/chrome/example-using-sele-b88ecb820c41b.png)

这个函数还支持第二个参数 `startNode`，它指定一个或多个元素，以便从中搜索元素。该参数的默认值是 `document`。

这个修改后的版本使用了 `$$()` 来创建一个数组，包含所有 `<img>` 元素，这些元素出现在当前文档中选定的节点之后:

```js
let images = $$("img", document.querySelector(".devsite-header-background"));
for (let each of images) {
    console.log(each.src);
}
```

![使用 $() 选择 document 中已选 div 元素后出现的所有图像并显示其来源](https://zedo-img.netlify.app/img/chrome/example-using-selec-d3560a98283cc_960.png)

::: tip

在控制台中按下 <kbd>Shift</kbd> + <kbd>Enter</kbd> 键即可换行，这不会执行脚本。
:::

## \$x(path \[, startNode\]) {#xpath-function}

`$x(path)` 返回一个与给定 XPath 表达式匹配的 DOM 元素数组。

例如，下面的代码返回页面上所有的 `<p>` 元素:

```js
$x("//p");
```

![使用 XPath 选择器示例](https://zedo-img.netlify.app/img/chrome/example-using-xpath-sel-9ee5cd32b60bf_960.png)

以下示例会返回包含 `<a>` 元素的所有 `<p>` 元素:

```js
$x("//p[a]");
```

![使用更复杂的 XPath 选择器示例](https://zedo-img.netlify.app/img/chrome/example-using-more-comp-02a9b55f645c3_960.png)

与其他选择器函数类似，`$x(path)` 有一个可选的参数 `startNode`，用于指定要从中搜索元素的元素或节点。

![使用 startNode 的 XPath 选择器示例](https://zedo-img.netlify.app/img/chrome/example-using-xpath-sel-235f297c77cdb_960.png)

## clear() {#clear-function}

`clear()` 清除控制台的历史记录。

```js
clear();
```

## copy(object) {#copy-function}

`copy(object)` 将指定对象的字符串形式复制到剪贴板。

```js
copy($0);
```

## debug(function) {#debug-function}

当调用指定的函数时，调试程序会被调用，并在 Sources 面板上的函数内部中断，以便于逐行调试代码。

```js
debug(getData);
```

![使用 debug() 在函数内部中断](https://zedo-img.netlify.app/img/chrome/breaking-inside-function-b75481bc017a8_960.png)

使用 `undebug(fn)` 停止在函数上断点，或使用 UI 停用所有断点。

有关断点的更多信息，请参阅 [使用断点暂停代码][4]。

## dir(object) {#dir-function}

`dir(object)` 以对象的形式显示所有指定对象的属性。这个方法是 Console API 的 `console.dir()` 方法的别名。

下面的例子展示了在命令行中直接计算 `document.body` 和使用 `dir()` 来显示相同元素的区别:

```js
document.body;
dir(document.body);
```

![使用和不使用 dir() 函数打印 document.body](https://zedo-img.netlify.app/img/chrome/logging-documentbody-an-38e6368214da1_960.png)

有关更多信息，请参阅控制台 API 中的 [`console.dir()`][console-dir] 条目。

## dirxml(object) {#dirxml-function}

`dirxml(object)` 打印指定对象的 XML 表示形式，如在 Elements 选项卡中所示。
这个方法等价于 [`console.dirxml()`][console-dirxml] 方法。

## inspect(object/function) {#inspect-function}

`inspect(object/function)` 会打开相应的面板（对于 DOM 元素，是 Elements 面板；对于 JavaScript 堆对象，是 Profiles 面板），并选择指定的元素或对象。

以下示例在 Elements 面板中打开 `document.body`：

```js
inspect(document.body);
```

![使用 inspect() 检查元素](https://zedo-img.netlify.app/img/chrome/inspecting-element-insp-e274156ad4de4_960.png)

当传递一个要检查的函数时，该函数会在 Sources 面板中打开文档以供检查。

## getEventListeners(object) {#getEventListeners-function}

`getEventListeners(object)` 返回在指定对象上注册的事件侦听器。

返回值是一个对象，包含每个已注册事件类型的数组 (例如 `click` 或 `keydown`)。
每个数组的成员都是描述为每种类型注册的侦听器的对象。
例如，下面列出了在 `document` 对象上注册的所有事件监听器:

```js
getEventListeners(document);
```

![Output of using getEventListeners()](https://zedo-img.netlify.app/img/chrome/output-using-geteventlis-1e1da35bccadd_960.png)

如果在指定的对象上注册了多个监听器，则数组中会包含每个监听器对应的成员。
以下示例中，在 `document` 元素上针对 `click` 事件注册了两个事件监听器:

![Multiple listeners](https://zedo-img.netlify.app/img/chrome/multiple-listeners-1fa07046eab1a_960.png)

你可以进一步展开这些对象来探索它们的属性：

![Expanded view of listener object](https://zedo-img.netlify.app/img/chrome/expanded-view-listener-o-fea9ccaa7e1c8_960.png)

如需了解详情，请参 [阅检查对象属性](https://developer.chrome.com/docs/devtools/console/reference#inspect-object-properties)。

## keys(object) {#keys-function}

`keys(object)` 会返回一个数组，其中包含属于指定对象的属性的名称。如需获取相同属性的关联值，请使用 [`values()`](https://developer.chrome.com/docs/devtools/console/utilities#values-function)。

例如，假设你定义了以下对象:

```js
let player = {
    name: "Parzival",
    number: 1,
    state: "ready",
    easterEggs: 3,
};
```

假设 `player` 是在全局命名空间中定义的 (为了简单起见)，在控制台中输入 `keys(player)` 和 `values(player)` 将得到以下结果:

![Example of keys() and values() methods](https://zedo-img.netlify.app/img/chrome/example-keys-values-c709a644b5168_960.png)

## monitor(function) {#monitor-function}

调用指定的函数时，系统会向控制台记录一条消息，其中包含函数名称以及在调用该函数时传递给该函数的参数。

```js
function sum(x, y) {
    return x + y;
}
monitor(sum);
```

![Example of monitor() method](https://zedo-img.netlify.app/img/chrome/example-monitor-method-b7adcf92594eb_960.png)

使用 [`unmonitor(function)`](https://developer.chrome.com/docs/devtools/console/utilities#unmonitor-function) 停止监控。

## monitorEvents(object \[, events\]) {#monitorEvents-function}

当指定对象上发生指定事件之一时，将 Event 对象记录到控制台。可以指定要监视的单个事件、事件数组或映射到预定义事件集合的泛型事件“类型”之一。请参见下面的示例。

以下代码会监控 `window` 对象上的所有大小调整事件。

```js
monitorEvents(window, "resize");
```

![Monitoring window resize events](https://zedo-img.netlify.app/img/chrome/monitoring-window-resize-6cc482b08832c_960.png)

以下代码定义了一个数组，用于监控 `window` 对象上的 `resize` 和 `scroll` 事件:

```js
monitorEvents(window, ["resize", "scroll"]);
```

您还可以指定一个可用的事件“类型”，即映射到预定义事件集的字符串。下表列出了可用的事件类型及其关联的事件映射:

<table class="responsive">
    <thead>
        <tr>
            <th colspan="2">Event type &amp; 对应的映射事件</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>mouse</td>
            <td>
                "mousedown", "mouseup", "click", "dblclick", "mousemove",
                "mouseover", "mouseout", "mousewheel"
            </td>
        </tr>
        <tr>
            <td>key</td>
            <td>"keydown", "keyup", "keypress", "textInput"</td>
        </tr>
        <tr>
            <td>touch</td>
            <td>"touchstart", "touchmove", "touchend", "touchcancel"</td>
        </tr>
        <tr>
            <td>control</td>
            <td>
                "resize", "scroll", "zoom", "focus", "blur", "select", "change",
                "submit", "reset"
            </td>
        </tr>
    </tbody>
</table>

例如，以下代码使用 `key` 事件类型捕获当前在 Elements 面板中选中的输入文本字段上的所有相应按键事件。

```js
monitorEvents($0, "key");
```

以下是在文本字段中输入字符后的输出示例：

![Monitoring key events](https://zedo-img.netlify.app/img/chrome/monitoring-key-events-ef5a9ed8c7437_960.png)

使用 [`unmonitorEvents(object[, events])`](https://developer.chrome.com/docs/devtools/console/utilities#unmonitorEvents-function) 停止监控。

## profile(\[name\]) 和 profileEnd(\[name\]) {#profile-function}

`profile()` 会启动一个带有可选名称的 JavaScript CPU 性能分析会话。`profileEnd()` 完成配置文件，并在配置文件面板中显示结果。(参见 [加速 JavaScript 执行][7]。)

::: warning

`profile()` 和 `profileEnd()` 是 [`console.profile()`](https://developer.mozilla.org/docs/Web/API/console/profile) 和 [`console.profileEnd()`](https://developer.mozilla.org/docs/Web/API/console/profileEnd) 的缩写

:::

如需开始性能分析，请执行以下操作：

```js
profile("Profile 1");
```

如需停止分析并在 Profiles 面板中查看结果，请执行以下操作：

```js
profileEnd("Profile 1");
```

Profiles 面板中的结果：

![Grouped profiles](https://zedo-img.netlify.app/img/chrome/profile-1-the-performanc-e990dbe4f281e_960.png)

Profiles 还可以嵌套。例如，以下代码无论以何种顺序运行，都能正常运行：

```js
profile("A");
profile("B");
profileEnd("A");
profileEnd("B");
```

::: tip

多个 CPU 配置文件可以同时运行，你不需要按创建顺序关闭它们。

:::

## queryObjects(Constructor) {#queryObjects-function}

从控制台中调用 `queryObjects(Constructor)` 可返回使用指定构造函数创建的对象数组。例如:

- `queryObjects(Promise)`. 返回所有的 `Promise` 实例。
- `queryObjects(HTMLElement)`. 返回所有 HTML 元素。
- `queryObjects(foo)`, 返回所有通过 `new foo()` 实例化的对象，其中 `foo` 是类名。

`queryObjects()` 的范围是控制台中当前所选的执行上下文。

## table(data \[, columns\]) {#table-function}

通过传入带有可选列标题的数据对象，以表格格式记录对象数据。

这是 [`console.table()`](https://developer.chrome.com/docs/devtools/console/api#table) 的快捷方式。

例如，如需在控制台中使用表格显示名称列表，可以执行以下操作：

```js
let names = [
    { firstName: "John", lastName: "Smith" },
    { firstName: "Jane", lastName: "Doe" },
];
table(names);
```

![Example of table() method](https://zedo-img.netlify.app/img/chrome/example-table-method-880fdbceda0cd_960.png)

## undebug(function) {#undebug-function}

`undebug(function)` 会停止对指定函数进行调试，这样当 `function` 函数被调用时不再调用调试器。这与 `debug(fn)` 搭配使用。

```js
undebug(getData);
```

## unmonitor(function) {#unmonitor-function}

`unmonitor(function)` 会停止对指定函数的监控。这与 `monitor(fn)` 搭配使用。

```js
unmonitor(getData);
```

## unmonitorEvents(object \[, events\]) {#unmonitorEvents-function}

`unmonitorEvents(object[, events])` 会停止监控指定对象和事件的事件。例如，以下代码会停止对 `window` 对象的所有事件监控：

```js
unmonitorEvents(window);
```

您还可以有选择地停止监视对象上的特定事件。例如，下面的代码开始监控当前选中元素上的所有鼠标事件，然后停止监控 `mousemove` 事件 (可能是为了减少控制台输出中的干扰):

```js
monitorEvents($0, "mouse");
unmonitorEvents($0, "mousemove");
```

## values(object) {#values-function}

`values(object)` 返回一个数组，其中包含属于指定对象的所有属性的值。

```js
values(object);
```

[1]: https://developer.chrome.com/docs/devtools/console/api/
[2]: https://developer.mozilla.org/docs/Web/API/Document/querySelector
[3]: https://developer.mozilla.org/docs/Web/API/Document/querySelectorAll
[4]: https://developer.chrome.com/docs/devtools/javascript/breakpoints
[console-dir]: https://developer.chrome.com/docs/devtools/console/api/#dir
[console-dirxml]: https://developer.chrome.com/docs/devtools/console/api/#dirxml
[7]: https://developer.chrome.com/docs/devtools/rendering-tools/js-execution
