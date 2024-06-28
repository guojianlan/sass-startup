# 启动步骤
## 创建数据库
打开自己的数据库，创建一个新的数据库，数据库跟packages/db里面的database一样，我们这里叫sass.  
所以我们使用DB的创建语句先创建数据库
```bash
   CREATE DATABASE IF NOT EXISTS sass;
```
## 打包db和redis的项目
进入到db的目录下运行脚本
```bash
npm run build
```
进入到redis的目录下运行脚本
```bash
npm run build
```
## 开启server
进入client目录，执行脚本
```bash
npm run dev
```

## 扩展
以后开发数据表就在db的目录下增加entity实体文件，然后运行npm run watch，这样typescript就会生成新的包供给client端使用

## 注意事项
此项目的typeorm我用了同步模式，你每次启动都会同步数据库，记得线上要关掉这个配置。有问题随时联系：424139777@qq.com