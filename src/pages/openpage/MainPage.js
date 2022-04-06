import React, { useContext } from 'react'
//跨组件传参
import { Auth } from '../../contexts/AuthContext'
//utils
import { useNavigate } from 'react-router-dom'
import {findRoute} from '../../routers/config'
//UI
import DocumentTitle from 'react-document-title'//动态Title
import Logo from '../../logo.svg'
import { Button } from 'antd'
import './MainPage.css'

export default function Mainpage() {
  // 获取跨组件传来的参数对象
  const farpropsAuth = useContext(Auth)
  const navigate=useNavigate()
  return (
    <DocumentTitle title="XOJ | Home">
      <div style={{fontSize:'1.5em'}}>
        <div style={{ textAlign: 'center' }}>
          <div id="photocontain">
            <div id='headphoto' style={{ backgroundImage: 'url(//www.xjtlu.edu.cn/zh/assets/image-cache/images/campus/campus-cb-sky.1f5be76d.jpg)' }}>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center',paddingTop:'30px' }}>
          <div style={{width:'50%',textAlign: 'center',display:'flex',flexDirection:'column',justifyContent:'center' }}>
            <div>
              <div style={{fontSize:'1.5em',fontWeight:'bolder'}}>XJTLU Online Coding Judgement</div>
              <div style={{fontSize:'0.9em',color:'gray'}}>make your code comfortable and joyful</div>
            </div>
            <div style={{ textAlign: 'center',marginTop:'50px' }}>
              <Button type='primary' className='bigbutton' onClick={()=>{navigate(findRoute('questionList'))}}>Get Start</Button>
              <Button type='' className='bigbutton' onClick={()=>{navigate(findRoute('aboutxoj'))}}>About</Button>
            </div>
          </div>

          <div style={{width:'50%',textAlign: 'center',padding:'50px 0px'}}>
          Some Describe. Lorem ipsum dolor sit amet,<br /> consectetur adipisicing elit,<br />sed do eiusmod tempor incididunt ut labore et doloremagna aliqua.<br />
Ut enim ad minim veniam,<br /> quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.<br />
Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.<br />
Excepteur sint occaecat cupidatat non proident,<br /> sunt in culpa qui officia deserunt mollit anim id est laborum.<br />
          </div>
        </div>

      </div>
    </DocumentTitle>
        )
}
