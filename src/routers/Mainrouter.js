// 路由组件
import React from 'react'
// v6路由
import { BrowserRouter as Router, Route, Routes, Link,Navigate, useRoutes} from "react-router-dom";
// 框架
import Frame from "../components/Frame/Index";
//路由组件
import {allroutes} from './config.js'
import { createBrowserHistory } from "history";

function MyRoutes(){
  let element=useRoutes(allroutes)
  return element
}

export default function Mainrouter(){
    return (
      <Router history={createBrowserHistory()}>
        <Frame>
          <MyRoutes />
        </Frame>
      </Router>
    )
}
