# Introduction 
This's the repo of XOJ frontend.

# Run project

You can access [https://xoj.codes/](https://xoj.codes/) to visit deployed website.

Process to develop in Development env：

1. Install Node.js, and add it to your environment variables.
2. Select a plain folder, open the terminal located in this folder, run `git clone https://XOJ-Team@dev.azure.com/XOJ-Team/CPT202 Team B-3/_git/XOJ_F` in your terminal.
3. cd to the folder XOJ_F.
4. For requesting to backend API, change 'urlpool' to your backend root url in file: src/utils/request.js
5. run `npm install yarn` and run`yarn` to download dependencies.
6. run project: run `npm start` to run local develop server, then open the browser and visit [localhost:3000](localhost:3000).


Process to deploy Production env:

1. Need to finish step 5 showed before.
2. open the terminal and cd to the folder XOJ_F.
3. run `npm run build`, then a folder 'build' is created.
4. Move this ‘build’ folder to cloud server.
5. the simplest way to deploy is install Node in server, copy runserver.js in project with ‘build’ folder to server, then run `node runserver.js`,
or you can use nginx: copy folder 'build' to path like '/usr/local/var/www', install nginx, then add this text in nginx.conf then run `nginx -s reload`.
```jsx
location {
    alias /usr/local/var/www/build;
    index index.html;
    try_files $uri /index.html;
}
```
6. then you can visit [http://YourIP/](http://YourIP/).


# Code structure

## /
craco.config.js: config of DIY Theme
@[Antd-Doc](https://ant.design/docs/react/use-with-create-react-app-cn)

## /public
Store public static resources such as index.html, favicon and logo.

## /src
App.js: entrance file
index.js: entrance file

### /src/contexts
Context variable sharing component.

### /src/routers
Mainrouters.js config main routes.

### /src/components
Contains components and layouts

### /src/services
Encapsulate request services.

### /src/pages
Main pages in application.

### /src/utils
Store all tools like timeutils.

### /src/locales
Store international language package.


# Design specification
react-router-dom: v6

Use stateless components declared functionally whenever possible

# Common problem

## Can not push
Need to add your ssh public key to repository.

## Can not pull
Check your remote target url.
`kex_exchange_identification: Connection closed by remote host` do not using network proxy.

## Judge whether there is a value

url params：
```
let location = useLocation()
let params = qs.parse(location.search.slice(1))
if('id' in params)//Judge whether there is a param named 'id'
```

context params：
```
const farpropsAuth=useContext(Auth)
if(farpropsAuth['pAuthority']!=null)//Judge whether Authority===null
```

component parmas:
```
if(props.size===undefined) //Judge whether there is a param named 'size'
if(props.size===null) //Judge whether props.size===null
```



----CPT202 Frontend Team