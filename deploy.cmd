(
    @REM 建立独立的 pages 分支
    git checkout --orphan pages
) && (
    @REM 清空源码分支添加的文件
    git rm -rf .
) && (
    @REM 添加忽略文件，注意不能用 powershell，它生成的文件不是 utf-8 编码
    echo node_modules > .gitignore
    echo docs >> .gitignore
    echo yarn.lock >> .gitignore
) && (
    @REM 添加文件并提交
    git add .
    git commit -m "publish :rocket: : build"
) && (
    @REM 强制推送，会覆盖历史提交记录，不过该分支不需要记录
    git push origin pages -f
) && (
    git checkout theme-hope
) && (
    @REM 删除本地 pages 分支
    git branch -D pages
)
