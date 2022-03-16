# Introduction 
This's the repo of XOJ_F.

# 运行项目
在XOJ_F工作目录下使用yarn或npm install下载模块,

使用yarn start或npm start启动本地web服务器

# 代码目录结构说明

## /
craco.config.js 进行主题的自定义
@[主题-Antd文档](https://ant.design/docs/react/use-with-create-react-app-cn)

Api.mhtml 为接口文档，通过浏览器打开

## /public
存放公开的静态资源如favicon和logo

## /src
index.js为项目入口文件
App.js为应用入口文件

### /src/routers
Mainrouters.js配置了主要的路由

### /src/components
包含了自定义的UI组件和布局

### /src/pages
各个路由组件,页面

### /src/utils
存放所有工具类


# 设计规范
react-router-dom: v6

如果无需保存state，尽可能使用函数式声明的无状态组件

# 常见问题

## git无法push
需要在个人设置中添加ssh public key

## 项目结构
由于submodule问题repo下直接放项目文件，删除掉了frontend文件夹，无伤大雅

## git无法pull
`kex_exchange_identification: Connection closed by remote host` 需要切换电脑的代理，不可以用全局模式

## Form.useForm()无法获得某一表单项
如果结构为
```
<Form.Item><Input /><Form.Item>
```
如果Input有传默认参，把Input的默认参数放到Form的initialValues里面,且注意多余的换行和空格
# Contribute
Happy to have more contributers.

CPT202 Frontend Team