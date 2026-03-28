/**
 * 变更日志插件选项
 */
export interface DynamicChangelogOptions {
    /**
     * 相对于项目根目录的路径，例如 `about/changelog.md`
     */
    changelogPath?: string;
    /**
     * 需要提取的最后一节内容的标题层级
     */
    headingLevel?: number;
}
