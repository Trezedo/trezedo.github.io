:: "deploy": "git push gitee master:theme-hope"
:: ch+cp 65001
echo 进入 /dist 部署

@REM git push gitee master:theme-hope
@REM 逻辑：添加文件并推送，然后取消所有提交的文件并无视（为了下次打包过来直接推送，因为当前分支不能 build）

@REM yarn docs:build
git checkout pages && deploy.cmd

@REM git rm -r --cached * @REM 删除已经提交的文件追踪，并不会物理删除
@REM git rm -r dist/assets/js
@REM git add dist
@REM git commit -m "build and deploy"
@REM git push gitee pages:pages
@REM git rm -r dist
@REM git commit -m "remove build after 'push'"
@REM git checkout master