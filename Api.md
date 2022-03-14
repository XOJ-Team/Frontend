[Toc]

# 接口文档模板
|方式|说明|
|--|--|
|Post /user/login|用户登录|

|请求参数|类型/示例值|说明|
|--|--|--|
|mail|String/123456@qq.com|邮箱|

|响应参数|类型/示例值|说明|
|--|--|--|
|token|String|用户令牌|
|infolist|List|对象列表|
|infolist.item.age|int|年龄|
|infolist.item.address|String|住址|


# 用户账户信息

## 邮箱验证码登录
|方式|简介|
|--|--|
|？ /login/mail|使用邮箱和验证码登录|

|请求参数|类型/示例值|说明|
|--|--|--|
|mail|String/123456@qq.com|邮箱|
|name|String/Soon|昵称|
|password|String/123456|密码|
|phoneNumber|String|||
|verificationNumber|String|||

|响应参数|类型/示例值|说明|
|--|--|--|
|comment|String||
|obj|Object|对象|
|obj.authority|String||
|obj.createTime|2022-03-13T13:46:47.961Z||
|obj.deleteTime|2022-03-13T13:46:47.961Z||
|obj.id|0||
|obj.isDelete|true||
|obj.mail|string||
|obj.name|string||
|obj.password|string||
|obj.phoneNumber|string||
|obj.rank|0||
|obj.score|0||
|status|int|状态码|

## 邮箱密码登录

|方式|说明|
|--|--|
|？ /login/normal|使用邮箱和密码登录|

|请求参数|类型/示例值|说明|
|--|--|--|
|mail|String/123456@qq.com|邮箱|
|password|String|密码|

|响应参数|类型/示例值|说明|
|--|--|--|
|comment|String||
|obj|Object|对象|
|obj.authority|string||
|obj.createTime|2022-03-13T13:46:47.961Z||
|obj.deleteTime|2022-03-13T13:46:47.961Z||
|obj.id|0||
|obj.isDelete|true||
|obj.mail|string||
|obj.name|string||
|obj.password|string||
|obj.phoneNumber|string||
|obj.rank|0||
|obj.score|0|
|status|int|状态码|


## 验证码邮箱发送

|方式|说明|
|--|--|
|？ /verify|邮箱发送验证码|

|请求参数|类型/示例值|说明|
|--|--|--|
|mail|String/123456@qq.com|邮箱|

|响应参数|类型/示例值|说明|
|--|--|--|
|comment|String||
|obj|Object||
|status|int|状态码|

# 用户解题代码信息

## 代码提交运行后的结果的备注



## 用户所有的代码提交运行结果

## 某一个代码提交运行后的结果