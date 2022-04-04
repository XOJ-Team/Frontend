// UI
import './App.less';
import 'antd/dist/antd.less';
// React
import React from 'react';
// 路由
import Mainrouter from './routers/Mainrouter';
// context
import {AuthContext} from './contexts/AuthContext';

function App() {
    // 登录状态相关

    return (
        <AuthContext>
            <Mainrouter />
        </AuthContext>
    )
}

export default App;