# Introduction 
This's the repo of XOJ_F.

# 运行项目
在XOJ_F工作目录下使用npm install或使用yarn下载模块, 
使用npm start启动本地web服务器

# 代码目录结构说明

## public
存放了公开的静态资源如favicon和logo

## src
index.js为项目入口文件
App.js为应用入口文件

### routers
Mainrouters.js配置了主要的路由

### components
包含了自定义的UI组件和布局

### pages
各个路由组件,页面

### utils
auth.js存储/改变用户的登录状态

# 设计规范
react-router-dom: v6

# 常见问题

## git无法push
需要在个人设置中添加ssh public key

## 项目结构
由于submodule问题repo下直接放项目文件，删除掉了frontend文件夹，无伤大雅

## git无法pull
`kex_exchange_identification: Connection closed by remote host` 需要切换电脑的代理，不可以用全局模式

# Contribute
Happy to have more contributers.

CPT202 Frontend Team