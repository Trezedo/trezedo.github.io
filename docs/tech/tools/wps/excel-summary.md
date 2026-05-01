---
icon: vscode-icons:file-type-excel
date: 2026-02-26
modified: 2026-03-23
category:
    - wps
tag:
    - excel
---

# Excel 使用总结

## 常用快捷键

| 快捷键               | 功能说明                                                                               |
| -------------------- | -------------------------------------------------------------------------------------- |
| **Ctrl+Shift+L**     | 选中标题行后开启/关闭筛选功能                                                          |
| **Ctrl+Shift+V**     | 粘贴为数值（去掉公式，保留计算结果）                                                   |
| **Ctrl+T**           | 创建超级表                                                                             |
| **Ctrl+;**           | 插入当前日期，如 2026/1/1                                                              |
| **Ctrl+'**           | 插入当前时间，如 11:15                                                                 |
| **Ctrl+Shift+;**     | 插入当前时间，如 11:15                                                                 |
| **Ctrl+1**           | 打开单元格格式面板                                                                     |
| **Ctrl+9**           | 隐藏选定行                                                                             |
| **Ctrl+0**           | 隐藏选定列                                                                             |
| **Ctrl+-**           | 删除数据                                                                               |
| **Ctrl+Shift+-**     | 去除单元格边框线                                                                       |
| **Ctrl+Shift+=**     | 插入单元格/行/列                                                                       |
| **Ctrl+Shift+P**     | 设置单元格字体格式（+F 失效，可能快捷键冲突）                                          |
| **Ctrl+Shift+Enter** | 输入数组公式（旧版本）                                                                 |
| **Ctrl+D**           | 选中区域向下填充公式/数值                                                              |
| **Ctrl+`**           | 显示单元格值或公式之间切换                                                             |
| **Shift+ 鼠标左键**  | 交换单元格位置                                                                         |
| **Shift+F2**         | 添加批注                                                                               |
| **Alt+↓**            | 打开单元格下拉菜单                                                                     |
| **Alt+Enter**        | 单元格内换行                                                                           |
| **F2**               | 进入编辑单元格模式                                                                     |
| **F9**               | 计算所有打开的工作簿中的所有工作表（如果在编辑单元格，则将选中的公式部分转为计算结果） |
| **Shift+F9**         | 仅计算当前活动工作表                                                                   |
| **Shift+Alt+←/→**    | 取消/创建行列分组                                                                      |

部分快捷键可参考微软文档：[Excel 中的键盘快捷方式 - Microsoft](https://support.microsoft.com/zh-cn/office/excel-中的键盘快捷方式-1798d9d5-842a-42b8-9c99-9b7213f0040f)

## Excel 公式

### 1. 计算 2026 年第 n 周周一的日期

```excel
=LET(
    n, 1,
    y, 2026,
    d, DATE(y,1,1),
    周一日期, d+MOD(8-WEEKDAY(d,2),7),
    周一日期+7*(n-1)
)
```

- 将会得到 `46027`，即 2026 年 1 月 5 日
- 这里是 2026 年 1 月 1 日之后第一个 " 星期一 " 的日期
- [WEEKDAY 函数文档](https://support.microsoft.com/zh-cn/office/weekday-%E5%87%BD%E6%95%B0-60e44483-2ed1-439f-8bd0-e404c190949a)

### 2. 逐行提取文本（无 TEXTSPLIT 公式的情况下）

```excel
=TRIM(MID(SUBSTITUTE($A$1, CHAR(10), REPT(" ", 100)), (COLUMN()-COLUMN($B$1))*100+1, 100))
```

**注意**：旧版本 WPS 输入数组公式需按下 **Ctrl+Shift+Enter**

### 3. 校验第二代身份证

```excel
=LET(
    id, A1,
    IFS(
        LEN(id)<>18, "×",
        RIGHT(id)=MID("10X98765432", 1+MOD(SUM(MID(id,ROW(INDIRECT("1:17")),1)*2^(18-ROW(INDIRECT("1:17")))),11), 1), "√",
        1, "×"
    )
)
```

**优化版本**（支持动态数组的高版本 [WPS 15933](https://bbs.wps.cn/topic/15961) 之后，避免易失性）：

```excel
=LET(
    id, A1,
    IFS(
        LEN(id)<>18, "×",
        RIGHT(id)=MID("10X98765432", 1+MOD(SUM(MID(id,SEQUENCE(17),1)*2^SEQUENCE(17,,17,-1)),11), 1), "√",
        1, "×"
    )
)
```

### 4. 多行文本汇总

```excel
=TEXTJOIN(CHAR(10), 1, IF(B2:B4=0, "", $A2:$A4&B2:B4&"人"))
```

## 参考文档

- [WPS 加载项开发文档](http://open.wps.cn/previous/docs/client/wpsLoad)
- [WPS JS API 文档](https://open.wps.cn/documents/app-integration-dev/wps365/client/wpsoffice/jsapi/go-to-js-from-vb)
- [WPS 二次开发 - gitee](https://gitee.com/zouyf/wps)
