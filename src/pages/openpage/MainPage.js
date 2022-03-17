import React,{useContext} from 'react'
//跨组件传参
import { Auth } from '../../contexts/AuthContext'

export default function Mainpage(){
  // 获取跨组件传来的参数对象
  const farpropsAuth=useContext(Auth)
  return (
    <div style={{fontSize:'100px'}}>Hello!{farpropsAuth.pUsername}</div>
  )
}
