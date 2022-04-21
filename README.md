# Introduction 
This's the repo of XOJ frontend.

# 运行项目
必须：安装Node.js, 安装yarn
在XOJ_F工作目录下使用yarn下载模块,
使用yarn start或npm start启动项目

# 项目部署

1. 服务器需要nodejs环境。
   
   确认package.json文件内的homepage为前端项目的url的根路径。
   
   确认/src/utils/request里的baseURL为后端项目的url根路径。
2. 在XOJ_F目录下执行 npm install 和 npm run build，随后会生成build目录
3. - 直接用Node启动服务并挂在后台，```npm install express && node runserver.js```
   - 或者把build目录改个名丢到Nginx里-[Nginx配合Jenkins发布React](https://www.cnblogs.com/mazhaokeng/p/9581835.html)-注意SPA配置```try_files $uri $uri/ /index.html;```
   - 或者使用Tomcat，依旧注意SPA配置，[参阅Stackoverflow](https://stackoverflow.com/questions/41246261/react-routing-is-able-to-handle-different-url-path-but-tomcat-returns-404-not-av/41249464#41249464)

You can access [https://xoj.codes/](https://xoj.codes/) to visit deployed website.

Process to develop in Development env：

1. Install Node.js, and add it to your environment variables.
2. Select a plain folder, open the terminal located on this folder, run ```git clone https://XOJ-Team@dev.azure.com/XOJ-Team/CPT202 Team B-3/_git/XOJ_F``` in your terminal.
3. cd to the folder XOJ_F.
4. run ```npm install yarn``` and run```yarn``` to download dependencies.
5. run project: run ```npm start``` to run local develop server, then open the browser and visit  ```localhost:3000```.

Process to deploy Production env:

1. After build a Dev env.
2. open the terminal and cd to the folder XOJ_F.
3. run ```npm run build```, then a folder 'build' is created.
4. Move this ‘build’ folder to cloud server.
5. the simplest way to deploy is install Node in server, paste runserver.js in project with ‘build’ folder, then run ```node runserver.js```, 
    
    or you can use nginx: copy folder 'build' into folder like '/usr/local/var/www', install nginx, then add this in nginx.conf then run ```nginx -s reload```.
    

```jsx
location {
    alias /usr/local/var/www/build;
    index index.html;
    try_files $uri /index.html;
}
```

1. then you can visit [http://YourIP/](http://YourIP/).
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

frame内的各个page组件统一margin: 20px 40px，与导航栏隔开距离

普通字体大小以px为单位，恒等字体大小以rem为单位

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

全局组件传参：
```
const farpropsAuth=useContext(Auth)
if(farpropsAuth['pAuthority']!=null) pAuthority肯定被传来，判断pAuthority的值是不是null
```

组件传参
```
if(props.size===undefined) 是否存在属性size
if(props.size===null) 属性size存在，但为null
```

# Contribute
Happy to have more contributers.

CPT202 Frontend Team