:: "deploy": "git push gitee master:theme-hope"
:: ch+cp 65001
echo 进入 /dist 部署

git checkout pages
@REM cd dist
git add dist -f
git commit -m "build"
git push gitee pages:pages
git checkout master