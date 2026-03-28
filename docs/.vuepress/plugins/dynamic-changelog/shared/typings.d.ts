declare module "@temp/latestChangelog" {
    export interface ChangelogData {
        title: string;
        content: string;
        timestamp: number;
    }
    const data: ChangelogData;
    export default data;
}
