# Introduction 
This's the repo of XOJ frontend.

# Api文档
把Swagger页面搬运到了[这里](https://sanmusen.top/projectapi/Swagger.html)

# 运行项目
在XOJ_F工作目录下使用yarn或npm install下载模块,
使用yarn start或npm start启动本地web服务器

# 项目部署

1. 服务器需要nodejs环境，确认package.json文件内的homepage为项目的url的根目录（如：http://47.100.92.209:3003/
2. 在XOJ_F目录下执行npm install, npm run build，随后会生成build目录
3. - 把build目录改个名丢到Nginx里-[Nginx配合Jenkins发布React](https://www.cnblogs.com/mazhaokeng/p/9581835.html)-注意SPA配置```try_files $uri $uri/ /index.html;```
   - 或者使用Express或Tomcat，依旧注意SPA配置，[参阅标题Serving Apps with Client-Side Routing](https://create-react-app.dev/docs/deployment/)


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

### /src/contexts
上下文变量共享组件

### /src/routers
Mainrouters.js配置了主要的路由

### /src/components
包含了自定义的UI组件和布局

### /src/services
封装接口

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

## 判断参数是否存在

url传参：
```
let location = useLocation()
let params = qs.parse(location.search.slice(1))
if('id' in params) 判断location里面有没有id这个参数
```

组件间传参：
```
const farpropsAuth=useContext(Auth)
if(farpropsAuth['pAuthority']!=null) pAuthority肯定被传来，判断pAuthority的值是不是null
```

# Contribute
Happy to have more contributers.

CPT202 Frontend Team