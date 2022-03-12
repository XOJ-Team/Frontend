// 主页路由，需要登录才能看到的
import React from 'react'
// v6路由
import { BrowserRouter as Router, Route, Routes, Link,Navigate} from "react-router-dom";
// 框架
import Frame from "../components/Frame/Index";
//路由组件
import { createBrowserHistory } from "history";
import ListQ from '../pages/questions/ListQ';
import MainPage from '../pages/openpage/MainPage';
import LookQ from '../pages/questions/LookQ';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';


export default function Allrouters(){
    return (
      <Router history={createBrowserHistory()}>
        <Frame>
          <Link to="/main">mainpage</Link><br />
          <Link to="/questions/look">questions</Link><br />
          <Routes>
              <Route path='*' element={<Navigate to='/main' />} />
              <Route path='login' element={<Login />} />
              <Route path='404' element={<NotFound />}/>
              <Route path='main' element={<MainPage />} />
              <Route path='questions'>
                  <Route path='' element={<ListQ />} />
                  <Route path='look' element={<LookQ />} />
              </Route>
          </Routes>
        </Frame>
      </Router>
    )
}
