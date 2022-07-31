---
title: Chrome 控制台实用 API 参考
author:
    - kaycebasques
date: 2022-07-24
description: "A reference of convenience functions available in the Chrome DevTools Console.
<br>
Chrome DevTools 控制台中提供的易用功能参考"
category:
    - Debug
tag:
    - 调试
    - chrome
    - console
---

> 原文链接：<https://developer.chrome.com/docs/devtools/console/utilities/>

<!-- The Console Utilities API contains a collection of convenience functions for performing common
tasks: selecting and inspecting DOM elements, displaying data in readable format, stopping and
starting the profiler, and monitoring DOM events. -->

Console Utilities API 包含一组用于执行常见任务且方便的函数：选择和检查 DOM 元素、以可读格式显示数据、停止和启动分析器以及监视 DOM 事件。

::: danger

<!-- **Warning:** These functions only work when you call them from the Chrome DevTools Console. They
won't work if you try to call them in your scripts. -->

这些功能只有当你从 Chrome DevTools 控制台调用它们时才能工作。如果您试图在脚本中调用它们，它们将不起作用。

:::

<!-- Looking for `console.log()`, `console.error()`, and the rest of the `console.*` functions? See
[Console API Reference][1]. -->

如果你想查看 `console.log()`, `console.error()` 以及剩下的 `console.*` 函数，请看 [Console API Reference][1].

## \$\_ {#recent}

<!-- `$_` returns the value of the most recently evaluated expression. -->

`$_` 返回最近求值的表达式的值。

<!-- In the following example, a simple expression (`2 + 2`) is evaluated. The `$_` property is then
evaluated, which contains the same value: -->

在下面的例子中，计算一个简单的表达式(`2 + 2`)。然后计算 `$_` 属性，它包含相同的值:

<!-- alt="$_ is the most recently evaluated expression" -->

<img src="https://wd.imgix.net/image/admin/TfgjCE7ayHU8lwJJTFss.png?auto=format&w=964"
alt="$_ 是最近求值的表达式"
width="800" height="238"/>

<!-- In the next example, the evaluated expression initially contains an array of names.
Evaluating `$_.length` to find the length of the array,
the value stored in `$_` changes to become the latest evaluated expression, 4: -->

在下一个示例中，求值表达式最初包含一个名称数组。

计算 `$_.length` 来查找数组的长度，存储在 `$_` 中的值会变成最新的求值表达式，为 4：

<img src="https://wd.imgix.net/image/admin/d2jU3P5gc4G2OuK4PMQ1.png" alt="$_ changes when new commands are evaluated" width="800" height="319" />

## \$0 - ​\$4 {#recent-many}

<!-- The `$0`, `$1`, `$2`, `$3` and `$4` commands work as a historical reference to the last five DOM
elements inspected within the Elements panel or the last five JavaScript heap objects selected in
the Profiles panel.
`$0` returns the most recently selected element or JavaScript object,
`$1` returns the second most recently selected one, and so on. -->

`$0`, `$1`, `$2`, `$3` 和 `$4` 作为元素面板中检查的最后 5 个 DOM 元素或概要面板中选择的最后 5 个 JavaScript 堆对象的历史引用。

`$0` 返回最近选择的元素或 JavaScript 对象，
`$1` 返回最近选择的第二个，以此类推。

<!-- In the following example, an `img` element is selected in the Elements panel.
In the Console drawer, `$0` has been evaluated and displays the same element: -->

在下面的例子中，Elements 面板中选择了一个 `img` 元素。在 Console 抽屉中，`$0` 已被求值并展示相同的元素:

<img src="https://wd.imgix.net/image/admin/v9jdOozAkvhutIYnejJl.png" alt="$0 的例子" width="800" height="186"  />

<!-- The image below shows a different element selected in the same page.
The `$0` now refers to newly selected element, while `$1` returns the previously selected one: -->

下图显示了在同一页面中选择的不同元素。

`$0` 现在指向新选择的元素，而 `$1` 则返回先前选择的元素：

<img src="https://wd.imgix.net/image/admin/ET1JJFtUIXvaoPCGQ94C.png" alt="$1 的例子" width="800" height="318"  />

## \$(selector \[, startNode\]) {#querySelector-function}

<!-- `$(selector)` returns the reference to the first DOM element with the specified CSS selector.
When called with one argument,
this function is an alias for the [document.querySelector()][2] function. -->

`$(selector)` 返回具有指定的 CSS 选择器的第一个 DOM 元素的引用。

当使用一个参数调用时，此函数是 [document.querySelector()][2] 函数的别名。

<!-- The following example returns a reference to the first `<img>` element in the document: -->

下面的例子返回了对文档中第一个 `<img>` 元素的引用:

<img src="https://wd.imgix.net/image/admin/poVWF9iRLAYZ08O2t88S.png" alt="$('img') 的例子" width="800" height="234"  />

<!-- Right-click on the returned result and select 'Reveal in Elements Panel' to find it in the DOM,
or 'Scroll in to View' to show it on the page.

The following example returns a reference to the currently selected element and displays its src property: -->

右键单击返回的结果，选择“Reveal in Elements Panel”，在 DOM 中找到它，或者选择“Scroll in to View”，在页面上显示它。

下面的例子返回当前选定元素的引用，并显示其 src 属性:

<img src="https://wd.imgix.net/image/admin/TLcKoLAXcrFcOgSPnNaD.png" alt="$('img').src 的例子" width="800" height="234"  />

<!-- This function also supports a second parameter, startNode, that specifies an 'element' or Node from
which to search for elements.
The default value of this parameter is `document`. -->

<!-- The following example returns a reference to the first element after the currently selected Node and
displays its src properly: -->

这个函数还支持第二个参数 startNode，它指定了一个“元素”或用于搜索元素的节点。该参数的默认值是 `document`。

下面的示例返回当前选定节点后的第一个元素的引用，并正确地显示其 src 属性:

<img src="https://wd.imgix.net/image/admin/Q5XlmeIMaHQkpP1QryBd.png" alt="$('img', div).src 的例子" width="800" height="234" />

::: warning 提示

<!-- **Note:** If you are using a library such as jQuery that uses `$`, this functionality will be
overwritten, and `$` will correspond to that library's implementation. -->

如果你使用一个像 jQuery 一样使用 `$` 的库，该功能将被覆盖，`$` 将对应该库的实现。

:::

## \$\$(selector \[, startNode\]) {#querySelectorAll-function}

<!-- `$$(selector)` returns an array of elements that match the given CSS selector.
This command is equivalent to calling [document.querySelectorAll()][3].

The following example uses `$$()` to create an array of all `<img>` elements in the current document
and displays the value of each element's `src` property: -->

`$$(selector)` 返回一个匹配给定 CSS 选择器的元素数组。这个命令等价于调用[document.querySelectorAll()][3]。

下面的例子使用 `$$()` 来创建当前文档中所有 `<img>` 元素的数组，并显示每个元素的 `src` 属性的值:

```js
let images = $$("img");
for (let each of images) {
    console.log(each.src);
}
```

<!-- Example of using $$() to select all images in the document and display their sources. -->

<img src="https://wd.imgix.net/image/BrQidfK9jaQyIHwdw91aVpkPiib2/f3W2BdYq3PAl435AMXso.png?auto=format&w=964"
alt="使用 $$() 选择文档中的所有图像并显示的示例。" width="800" height="536"  />

<!-- This function also supports a second parameter, startNode, that specifies an element or Node from
which to search for elements.
The default value of this parameter is `document`.

This modified version of the previous example uses `$$()` to create an array of all `<img>` elements
that appear in the current document after the selected Node: -->

这个函数还支持第二个参数 startNode，它指定一个或多个元素，以便从中搜索元素。该参数的默认值是 `document`。

这个修改后的版本使用了 `$$()` 来创建一个数组，包含所有 `<img>` 元素，这些元素出现在当前文档中选定的节点之后:

```js
let images = $$("img", document.querySelector(".devsite-header-background"));
for (let each of images) {
    console.log(each.src);
}
```

<!-- Example of using $() to select all images appearing after the select div element in the document and displaying their sources. -->
<img src="https://wd.imgix.net/image/admin/MKKFwNfiqaq8JPUkgchF.png" alt="使用 $() 选择 document 中已选 div 元素后出现的所有图像并显示其来源" width="800" height="336"  />

::: tip

<!-- **Note:** Press <kbd>Shift</kbd> + <kbd>Enter</kbd> in the console to start
a new line without executing the script. -->

在控制台中按下 <kbd>Shift</kbd> + <kbd>Enter</kbd> 键即可换行，这不会执行脚本。
:::

## \$x(path \[, startNode\]) {#xpath-function}

<!-- `$x(path)` returns an array of DOM elements that match the given XPath expression.

For example, the following returns all the `<p>` elements on the page: -->

`$x(path)` 返回一个与给定 XPath 表达式匹配的 DOM 元素数组。

例如，下面的代码返回页面上所有的 `<p>` 元素:

```js
$x("//p");
```

<img src="https://wd.imgix.net/image/admin/8fIwlT9ZWd9109E9jyRb.png" alt="Example of using an XPath selector" width="800" height="282"  />

<!-- The following example returns all the `<p>` elements that contain `<a>` elements: -->

下面的例子返回所有包含 `<a>` 元素的 `<p>` 元素:

```js
$x("//p[a]");
```

<img src="https://wd.imgix.net/image/admin/qvqloRRfS4IU1WhDsJkP.png" alt="Example of using a more complicated XPath selector" width="800" height="251"  />

<!-- Similar to the other selector functions, `$x(path)` has an optional second parameter, `startNode`,
that specifies an element or Node from which to search for elements. -->

与其他选择器函数类似，`$x(path)` 有一个可选的参数 startNode，它指定一个或多个元素，以便从中搜索元素。

<img src="https://wd.imgix.net/image/admin/srYQFy4Y7TRlT0kGarUN.png" alt="Example of using an XPath selector with startNode" width="800" height="282"  />

## clear() {#clear-function}

<!-- `clear()` clears the console of its history. -->

`clear()` 清除控制台的历史记录。

```js
clear();
```

## copy(object) {#copy-function}

<!-- `copy(object)` copies a string representation of the specified object to the clipboard. -->

`copy(object)` 将指定对象的字符串形式复制到剪贴板。

```js
copy($0);
```

## debug(function) {#debug-function}

<!-- When the specified function is called, the debugger is invoked and breaks inside the function on the
Sources panel allowing to step through the code and debug it. -->

当调用指定的函数时，将调用调试器，并在 Sources 面板上的函数内部中断，从而允许逐步遍历代码并调试它。

```js
debug(getData);
```

<img src="https://wd.imgix.net/image/admin/dhPBjuzWvsEbHeGR5NpQ.png" alt="Breaking inside a function with debug()" width="800" height="526"  />

<!-- Use `undebug(fn)` to stop breaking on the function, or use the UI to disable all breakpoints.

For more information on breakpoints, see [Pause Your Code With Breakpoints][4]. -->

使用 `undebug(fn)` 停止函数断点，或使用 UI 禁用所有断点。

有关断点的更多信息，请参见 [使用断点暂停代码][4]。

## dir(object) {#dir-function}

<!-- `dir(object)` displays an object-style listing of all the specified object's properties.
This method is an alias for the Console API's `console.dir()` method.

The following example shows the difference between evaluating `document.body` directly in the
command line, and using `dir()` to display the same element: -->

`dir(object)` 以对象的形式显示所有指定对象的属性。这个方法是 Console API 的 `console.dir()` 方法的别名。

下面的例子展示了在命令行中直接计算 `document.body` 和使用 `dir()` 来显示相同元素的区别:

```js
document.body;
dir(document.body);
```

<img src="https://wd.imgix.net/image/admin/SBW2kszkhG1rlXfxtQDg.png" alt="Logging document.body with and without dir() function" width="800" height="590"  />

<!-- For more information, see the [`console.dir()`][console-dir] entry in the Console API. -->

有关更多信息，请参阅控制台 API 中的 [`console.dir()`][console-dir] 条目。

## dirxml(object) {#dirxml-function}

<!-- `dirxml(object)` prints an XML representation of the specified object, as seen in the Elements tab.
This method is equivalent to the [`console.dirxml()`][console-dirxml] method. -->

`dirxml(object)` 打印指定对象的 XML 表示，如在 Elements 选项卡中所示。
这个方法等价于 [`console.dirxml()`][console-dirxml] 方法。

## inspect(object/function) {#inspect-function}

<!-- `inspect(object/function)` opens and selects the specified element or object in the appropriate
panel: either the Elements panel for DOM elements or the Profiles panel for JavaScript heap objects.

The following example opens the `document.body` in the Elements panel: -->

`inspect(object/function)` 在合适的面板中打开并选择指定的元素或对象：用于 DOM 元素的 Elements 面板或用于 JavaScript 堆对象的 Profiles 面板。

下面的示例中，在元素面板中打开 `document.body`：

```js
inspect(document.body);
```

<img src="https://wd.imgix.net/image/admin/BDFR3iEMqRnWIWrrVEu6.png" alt="Inspecting an element with inspect()" width="800" height="337"  />

<!-- When passing a function to inspect, the function opens the document up in the Sources panel for you
to inspect. -->

当传递一个要检查的函数时，该函数会在 Sources 面板中打开文档以供检查。

## getEventListeners(object) {#getEventListeners-function}

<!-- `getEventListeners(object)` returns the event listeners registered on the specified object.
The return value is an object that contains an array for each registered event type
(`click` or `keydown`, for example).
The members of each array are objects that describe the listener registered for each type.
For example, the following lists all the event listeners registered on the document object: -->

`getEventListeners(object)` 返回在指定对象上注册的事件侦听器。

返回值是一个对象，包含每个已注册事件类型的数组(例如 `click` 或 `keydown`)。
每个数组的成员都是描述为每种类型注册的侦听器的对象。
例如，下面列出了在 document 对象上注册的所有事件监听器:

```js
getEventListeners(document);
```

<!-- // todo 检查语义 -->

<img src="https://wd.imgix.net/image/admin/pVhvAi37yxLejbODHGSZ.png" alt="Output of using getEventListeners()" width="800" height="255"  />

<!-- If more than one listener is registered on the specified object, then the array contains a member
for each listener.
In the following example, there are two event listeners registered on the document element
for the `click` event: -->

如果在指定的对象上注册了多个侦听器，则数组为每个侦听器包含一个成员。
在下面的例子中，有两个事件监听器在 document 元素上注册了 `click` 事件:

<img src="https://wd.imgix.net/image/admin/Hlh3CErBYJTTNg9butfj.png" alt="Multiple listeners" width="800" height="389"  />

<!-- You can further expand each of these objects to explore their properties: -->

你可以进一步展开这些对象来探索它们的属性：

<img src="https://wd.imgix.net/image/admin/EJnoDfrKGIhwz7cx0WE3.png" alt="Expanded view of listener object" width="800" height="389"  />

## keys(object) {#keys-function}

<!-- `keys(object)` returns an array containing the names of the properties belonging to the specified
object. To get the associated values of the same properties, use `values()`.

For example, suppose your application defined the following object: -->

`keys(object)` 返回一个包含属于指定对象的属性名称的数组。要获取相同属性的关联值，请使用 `values()`。

例如，假设你定义了以下对象:

```js
let player1 = { name: "Ted", level: 42 };
```

<!-- Assuming `player1` was defined in the global namespace (for simplicity), typing `keys(player1)` and
`values(player1)` in the console results in the following: -->

假设 `player1` 是在全局命名空间中定义的(为了简单起见)，在控制台中输入 `keys(player1)` 和 `values(player1)` 将得到以下结果:

<img src="https://wd.imgix.net/image/admin/HYEKFYyD93YzGLoF2avv.png" alt="Example of keys() and values() methods" width="800" height="226"  />

## monitor(function) {#monitor-function}

<!-- When the function specified is called, a message is logged to the console that indicates the
function name along with the arguments that are passed to the function when it was called. -->

当调用指定的函数时，将记录一条消息到控制台，该消息指示函数名以及在调用函数时传递给该函数的参数。

```js
function sum(x, y) {
    return x + y;
}
monitor(sum);
```

<img src="https://wd.imgix.net/image/admin/V28TFRjUqryt2u3b2zls.png" alt="Example of monitor() method" width="800" height="221"  />

<!-- Use `unmonitor(function)` to cease monitoring. -->

使用 `unmonitor(function)` 停止监控。

## monitorEvents(object \[, events\]) {#monitorEvents-function}

<!-- When one of the specified events occurs on the specified object, the Event object is logged to the
console. You can specify a single event to monitor, an array of events, or one of the generic events
"types" mapped to a predefined collection of events. See examples below.

The following monitors all resize events on the window object. -->

当指定对象上发生指定事件之一时，将 Event 对象记录到控制台。可以指定要监视的单个事件、事件数组或映射到预定义事件集合的泛型事件“类型”之一。请参见下面的例子。

下面的代码监视窗口对象上的所有调整大小事件。

```js
monitorEvents(window, "resize");
```

<img src="https://wd.imgix.net/image/admin/ZrU8M58cKhN2eZRpiNVI.png" alt="Monitoring window resize events" width="800" height="252"  />

<!-- The following defines an array to monitor both "resize" and "scroll" events on the window object: -->

下面定义了一个数组来监视 window 对象上的"resize"和"scroll"事件:

```js
monitorEvents(window, ["resize", "scroll"]);
```

<!-- You can also specify one of the available event "types", strings that map to predefined sets of events.
The table below lists the available event types and their associated event mappings: -->

您还可以指定一个可用的事件“类型”，即映射到预定义事件集的字符串。下表列出了可用的事件类型及其关联的事件映射:

<table class="responsive">
    <thead>
        <tr>
            <!-- <th colspan="2">Event type &amp; Corresponding mapped events</th> -->
            <th colspan="2">Event type &amp; 对应的事件集</th>
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

<!-- For example, the following uses the "key" event type all corresponding key events on an input text
field currently selected in the Elements panel. -->

例如，下面使用“key”事件类型在 Elements 面板中当前选择的输入文本字段中所有对应的键事件。

```js
monitorEvents($0, "key");
```

<!-- Below is sample output after typing a characters in the text field: -->

下面是在文本框中输入一个字符后的输出示例:

<img src="https://wd.imgix.net/image/admin/Shs04IRgNP87cbbjCbtd.png" alt="Monitoring key events" width="800" height="252"  />

## profile(\[name\]) 和 profileEnd(\[name\]) {#profile-function}

<!-- `profile()` starts a JavaScript CPU profiling session with an optional name. `profileEnd()`
completes the profile and displays the results in the Profile panel. (See also [Speed Up JavaScript
Execution][7].) -->

`profile()` 用一个可选的名称启动一个 JavaScript CPU 分析会话。`profileEnd()` 完成配置文件，并在配置文件面板中显示结果。(参见 [加速 JavaScript 执行][7]。)

<!-- To start profiling: -->

开始分析：

```js
profile("My profile");
```

<!-- To stop profiling and display the results in the Profiles panel: -->

停止分析并在 Profiles 面板中显示结果：

```js
profileEnd("My profile");
```

<!-- Profiles can also be nested. For example, this will work in any order: -->

Profiles 也可以嵌套。例如，这将以任何顺序工作:

```js
profile("A");
profile("B");
profileEnd("A");
profileEnd("B");
```

<!-- Result in the profiles panel: -->

Profiles 面板中的结果：

<img src="https://wd.imgix.net/image/admin/BWxxLJby5scm6zF0eidW.png" alt="Grouped profiles" width="800" height="469"  />

::: tip

<!-- **Note:** Multiple CPU profiles can operate at once and you aren't required to close them out in
creation order. -->

多个 CPU 配置文件可以同时操作，你不需要按创建顺序关闭它们。

:::

## queryObjects(Constructor) {#queryObjects-function}

<!-- Call `queryObjects(Constructor)` from the console to return an array of objects that were created
with the specified constructor. For example:

- `queryObjects(Promise)`. Returns all instances of `Promise`.
- `queryObjects(HTMLElement)`. Returns all HTML elements.
- `queryObjects(foo)`, where `foo` is a class name. Returns all objects that were instantiated via `new foo()`. -->

The scope of `queryObjects()` is the currently-selected execution context in the console.

从控制台中调用 `queryObjects(Constructor)` 来返回使用指定构造函数创建的对象数组。例如:

- `queryObjects(Promise)`. 返回所有的 `Promise` 实例。
- `queryObjects(HTMLElement)`. 返回所有 HTML 元素。
- `queryObjects(foo)`, 返回所有通过 `new foo()` 实例化的对象，其中 `foo` 是类名。

## table(data \[, columns\]) {#table-function}

<!-- Log object data with table formatting by passing in a data object in with optional column headings.
For example, to display a list of names using a table in the console, you would do: -->

通过传入带有可选列标题的数据对象，以表格格式记录对象数据。
例如，要在控制台中使用表格显示名称列表，你可以这样做:

```js
let names = [
    { firstName: "John", lastName: "Smith" },
    { firstName: "Jane", lastName: "Doe" },
];
table(names);
```

<img src="https://wd.imgix.net/image/admin/jI1NQZJs08FsKA6nMyIp.png" alt="Example of table() method" width="800" height="488"  />

## undebug(function) {#undebug-function}

<!-- `undebug(function)` stops the debugging of the specified function so that when the function is called,
the debugger is no longer invoked. This is used in concert with `debug(fn)`. -->

`undebug(function)` 停止对指定函数的调试，这样当函数被调用时，调试器就不再被调用。这与 `debug(fn)` 一起使用。

```js
undebug(getData);
```

## unmonitor(function) {#unmonitor-function}

<!-- `unmonitor(function)` stops the monitoring of the specified function. This is used in concert with `monitor(fn)`. -->

`unmonitor(function)` 停止对指定函数的监视。这与 `monitor(fn)` 一起使用。

```js
unmonitor(getData);
```

## unmonitorEvents(object \[, events\]) {#unmonitorEvents-function}

<!-- `unmonitorEvents(object[, events])` stops monitoring events for the specified object and events.
For example, the following stops all event monitoring on the window object: -->

`unmonitorEvents(object[, events])` 停止对指定对象和事件的监控。例如，以下停止 window 对象上的所有事件监控:

```js
unmonitorEvents(window);
```

<!-- You can also selectively stop monitoring specific events on an object. For example, the following
code starts monitoring all mouse events on the currently selected element, and then stops monitoring
"mousemove" events (perhaps to reduce noise in the console output): -->

您还可以有选择地停止监视对象上的特定事件。例如，下面的代码开始监控当前选中元素上的所有鼠标事件，然后停止监控“mousemove”事件(可能是为了减少控制台输出中的干扰):

```js
monitorEvents($0, "mouse");
unmonitorEvents($0, "mousemove");
```

## values(object) {#values-function}

<!-- `values(object)` returns an array containing the values of all properties belonging to the specified object. -->

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
