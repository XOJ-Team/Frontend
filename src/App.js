// UI
import logo from './logo.svg';
import './App.less';
import 'antd/dist/antd.less';
// React
import React from 'react';
// 路由
import Mainrouter from './routers/Mainrouter';

// 登录状态相关
import {isLogined} from "./utils/auth";

function App() {
    return (<Mainrouter></Mainrouter>)
}

export default App;