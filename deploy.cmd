:: "deploy": "git push gitee master:theme-hope"
:: ch+cp 65001
echo 进入 /dist 部署

git checkout pages
cd dist
git add .
@REM git commit -m "build"
@REM git push gitee master:pages
@REM git branch origin