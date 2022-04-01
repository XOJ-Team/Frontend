import React,{useContext} from 'react'
//跨组件传参
import { Auth } from '../../contexts/AuthContext'
import DocumentTitle from 'react-document-title'//动态Title



export default function Mainpage(){
  // 获取跨组件传来的参数对象
  const farpropsAuth=useContext(Auth)
  return (
    <DocumentTitle title="XOJ | Home">
    <div style={{fontSize:'100px'}}>Hello!{farpropsAuth.pUsername}</div>
    </DocumentTitle>
  )
}
