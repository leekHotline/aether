# 默认从当前终端命令行位置开始 创建本地与云端项目 
your_project_name
## create-local-remote-repo 提示词:可选(本地仓库地址D:\develop\gitee\aether) 仓库名 aether，私有，直接创建本地+远端并初始化，完成后不要询问。
D:\develop\gitee>mkdir your_project_name

D:\develop\gitee>cd your_project_name

D:\develop\gitee\your_project_name>git init
Initialized empty Git repository in D:/develop/gitee/your_project_name/.git/

D:\develop\gitee\your_project_name>gh repo create your_project_name --private
✓ Created repository leekHotline/your_project_name on github.com
  https://github.com/leekHotline/your_project_name

D:\develop\gitee\your_project_name>git remote add origin https://github.com/leekHotline/your_project_name.git

D:\develop\gitee\your_project_name>echo # your_project_name >> README.md

D:\develop\gitee\your_project_name>git branch -M main

# 单人项目可复用提交代码操作 add-commit-push

## add-commit-push 提示词:对当前仓库直接 add -A、自动生成最简 commit message 并 push，不要询问。
D:\develop\gitee\your_project_name>git add .

D:\develop\gitee\your_project_name>git commit -m "feat: init project"
[master (root-commit) 32b9333] feat: init project
 1 file changed, 1 insertion(+)
 create mode 100644 READEME.md


D:\develop\gitee\your_project_name>git push origin main
Enumerating objects: 3, done.
Counting objects: 100% (3/3), done.
Writing objects: 100% (3/3), 247 bytes | 247.00 KiB/s, done.
Total 3 (delta 0), reused 0 (delta 0), pack-reused 0
To https://github.com/leekHotline/your_project_name.git
 * [new branch]      main -> main
