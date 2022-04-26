// 路由组件
import React from 'react'
// v6路由
import { BrowserRouter as Router, useRoutes} from "react-router-dom";
// 框架
import Frame from "../components/Frame/Index";
//路由组件
import {allroutes} from './config.js'
import { createBrowserHistory } from "history";

// 路由
function MyRoutes(){
  let element=useRoutes(allroutes)
  return element
}

export default function Mainrouter(){
    return (
      <Router history={createBrowserHistory()}>
        <Frame>
          {/* 懒加载时显示loading字样 */}
          <React.Suspense fallback={<div>Loading...</div>}>
          <MyRoutes />
          </React.Suspense>
        </Frame>
      </Router>
    )
}
