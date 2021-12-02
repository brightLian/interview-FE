# git 相关

### git 常用命令有哪些？

- git init：初始化仓库
- git clone：克隆代码
- git pull：拉代码
- git checkout：切换分支、回退代码
- git status：查看仓库当前的状态，显示有变更的文件
- git add：添加文件到暂存区
- git commit：将暂存区内容添加到仓库中
- git push：推代码
- git reset：回退版本
- git revert：回退版本
- git branch：查看分支（不加参数本地，-a 为远程，-d 为删除）
- git merge：合并分支

### rebase 和 merge 的区别？

两者都是从一个分支获取并合并到当前分支，只是采取到工作方式不同。

- rebase：
  - 会合并之前的 commit 历史
  - 得到更简洁的项目历史，去掉了 merge commit
  - 如果合并出现代码问题不容易定位，因为重写了历史
- merge：
  - 自动创建一个新的 commit
  - 合并的时候遇到冲突，仅需要修改后重新 commit
  - 记录了真实的 commit 情况，包括每个分支的详情

### reset、revert、checkout 之间的区别？

- git revert 后会多出一条commit，这里可进行回撤操作。
- git reset 直接把之前 commit 删掉，非 git reset --hard 的操作是不会删掉修改代码，如果远程已经有之前代码，需要强推 git push -f。
- git checkout 回退本地文件。

### 内网 gitlab 服务如何搭建？