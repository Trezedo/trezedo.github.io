:: "deploy": "git push gitee master:theme-hope"
:: ch+cp 65001
echo 进入 /dist 部署

@REM git push gitee master:theme-hope
@REM git branch master

yarn docs:build
git checkout pages
@REM git rm -r --cached * @REM 删除已经提交的文件
git add dist -f
git commit -m "build"
git push gitee pages:pages
