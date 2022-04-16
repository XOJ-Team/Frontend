import React, { useContext } from 'react'
//跨组件传参
import { Auth } from '../../contexts/AuthContext'
//utils
import { useNavigate } from 'react-router-dom'
import { findRoute } from '../../routers/config'
//UI
import DocumentTitle from 'react-document-title'//动态Title
import Logo from '../../logo.svg'
import { Button, Carousel } from 'antd'
import './MainPage.css'

export default function Mainpage() {
  //当前窗口的高
  let windowHeight = document.documentElement.clientHeight || document.body.clientHeight
  // 获取跨组件传来的参数对象
  const farpropsAuth = useContext(Auth)
  const navigate = useNavigate()
  return (
    <DocumentTitle title="XOJ | Home">
      <div id="homepage" style={{ fontSize: '1.2rem' }}>
        <div>
          <Carousel autoplay fade autoplaySpeed={9000}>
            {/* <div>
              <div className='headphoto' style={{ backgroundImage: 'url(https://img-blog.csdnimg.cn/0a58650bb4dc4b0b8789a7341ecb530d.png?x-oss-process=image,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAc2FubXVzZW5fd3U=,size_20,color_FFFFFF,t_70,g_se,x_16)' }}>
              </div>
            </div> */}
            <div>
              <div className='headphoto' style={{ backgroundImage: 'url(https://img-blog.csdnimg.cn/93f66b0b503447549d11467a25fa3d77.png?x-oss-process=image,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAc2FubXVzZW5fd3U=,size_20,color_FFFFFF,t_70,g_se,x_16)' }}>
              </div>
            </div>
            {/* <div>
              <div className='headphoto' style={{ backgroundImage: 'url(https://img-blog.csdnimg.cn/68c6c9bebcf4482cb57ecccebb0ff259.png?x-oss-process=image,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAc2FubXVzZW5fd3U=,size_20,color_FFFFFF,t_70,g_se,x_16)' }}>
              </div>
            </div> */}
          </Carousel>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center',
        minHeight:windowHeight-460}}>
          {/* minHeight控制外层flex高度 */}
          <div style={{ width: '50%', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div>
              <div style={{ fontSize: '2rem', fontWeight: 'bolder' }}>XJTLU Online Judge System</div>
              <div style={{ fontSize: '1rem', color: 'gray' }}>make your code comfortable and joyful</div>
            </div>
            <div style={{ textAlign: 'center', marginTop: '50px' }}>
              <Button type='primary' className='bigbutton' onClick={() => { navigate(findRoute('questionList')) }}>Get Started</Button>
              <Button type='' className='bigbutton' onClick={() => { navigate(findRoute('aboutxoj')) }}>About</Button>
            </div>
          </div>

          <div style={{ width: '50%', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center',fontSize:'1.3rem' }}>
            <div>
            Some Describe. Lorem ipsum dolor sit amet,<br /> consectetur adipisicing elit,<br />sed do eiusmod tempor incididunt ut labore et doloremagna aliqua.<br />
            Ut enim ad minim veniam,<br /> quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.<br />
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.<br />
            Excepteur sint occaecat cupidatat non proident,<br /> sunt in culpa qui officia deserunt mollit anim id est laborum.<br />
            </div>
          </div>
        </div>

      </div>
    </DocumentTitle>
  )
}
