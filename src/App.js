// UI
import './App.less';
// React
import React from 'react';
// 路由
import Mainrouter from './routers/Mainrouter';
// 提供全局变量
import { AuthContext } from './contexts/AuthContext';
// 使用全局变量
import { Auth } from './contexts/AuthContext';
// 国际化
import { IntlProvider } from 'react-intl';
import enUS from './locales/en_US';
import zhCN from './locales/zh_CN'

function App() {
  // 国际化配置语言包
  let handleMessages = lang => {
    let res = null;
    switch (lang) {
      case "zhCN":
        res = zhCN;
        break;
      case "enUS":
        res = enUS;
        break;
      default:
        res = enUS;
    }
    return res;
  };

  // 登录状态相关
  console.log(navigator.language)
  return (
    <AuthContext>
      <IntlProvider
        locale={navigator.language}
        messages={handleMessages('enUS')}
      >
        <Mainrouter />
      </IntlProvider>
    </AuthContext>
  )
}

export default App;