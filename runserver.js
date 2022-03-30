//直接挂后台跑这个文件即可部署
const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'build')));

// 相对于服务器根路径的相对路径，以*结尾以配置SPA
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
// 项目监听的端口
const port=80;
// 启动app
app.listen(port);
console.log(`start app on port ${port}`);