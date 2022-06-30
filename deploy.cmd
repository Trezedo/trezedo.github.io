(
    @REM 删除 pages 分支
    git branch -D pages
) && (
    @REM 建立独立的 pages 分支
    git checkout --orphan pages
) && (
    @REM 清空以添加的文件
    git rm -rf .
) && (
    @REM 忽略文件，注意不能用 powershell，因为 cmd 生成的才是 utf-8 编码
    echo node_modules > .gitignore
    echo docs >> .gitignore
    echo yarn.lock >> .gitignore
)

git add .
@REM git add dist
git commit -m "build"
(
    git push origin pages -f
) && (
    git checkout theme-hope
)
