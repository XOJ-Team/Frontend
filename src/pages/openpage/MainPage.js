import React,{useContext} from 'react'
//跨组件传参
import { Auth } from '../../contexts/AuthContext'
//UI
import DocumentTitle from 'react-document-title'//动态Title
import Logo from '../../logo.svg'
import { Button } from 'antd'

export default function Mainpage(){
  // 获取跨组件传来的参数对象
  const farpropsAuth=useContext(Auth)
  return (
    <DocumentTitle title="XOJ | Home">
    <div style={{textAlign:'center'}}>
      <div>
        <img src={Logo} style={{height:'200px'}}></img>
      </div>
      <br />
      <div>
        Online Coding Judgement, making coding comfortable and joyful
      </div>
      <div>
      <Button type='primary' style={{borderRadius:'20px',margin:'20px 10px'}}>Get Start</Button>
      <Button type='' style={{borderRadius:'20px',margin:'20px 10px'}}>About</Button>
      </div>
    </div>
    </DocumentTitle>
  )
}
