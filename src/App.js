// UI
import logo from './logo.svg';
import './App.css';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
// React
import React from 'react';
// 路由
import Mainrouters from './routers/Mainrouters';

// 登录状态相关
import {isLogined} from "./utils/auth";

function App() {
    return (<Mainrouters></Mainrouters>)
}

export default App;