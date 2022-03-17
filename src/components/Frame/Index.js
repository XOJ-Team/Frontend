import React, { useState,useContext } from 'react'
import { Layout, Menu, Breadcrumb, Button } from 'antd';
import "./Index.css";
import { useNavigate } from 'react-router-dom';
// 路由寻找
import { findRoute } from '../../routers/config';
// About me弹窗
import About from '../../pages/About';
// 全局变量
import { Auth } from '../../contexts/AuthContext';

const { Header, Content, Footer } = Layout;

function Index(props) {

    // aboutme的显示与否
    let [aboutme,setaboutme]=useState(false)

    let navigate = useNavigate()
    // 获取跨组件传来的信息
    const farpropsAuth=useContext(Auth)

    const menuItems = [{
        name: "Main",
        targeturl: findRoute('mainpage')
    }, {
        name: "Questions",
        targeturl: findRoute('questionList')
    }]
    // console.log(props.history.location.pathname)
    return (
        <Layout className="layout">
            <Header>
                <div className="logo" style={{ position:'absolute', padding: "0px 20px" }}>
                    <img src='/favicon.ico' />
                </div>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['1']}
                    selectedKeys={[]}
                    style={{ paddingLeft: '130px' }}
                >
                    {() => { console.log(props.history) }}
                    {menuItems.map((item, index) => {
                        return <Menu.Item
                            key={item.targeturl}
                            onClick={(e) => {
                                navigate(e.key)
                            }}>{item.name}</Menu.Item>;
                    })}
                    <Menu.Item
                        key='userlogin'
                        style={{ position: 'absolute', right: '0px', paddingRight:'20px'}}
                    >
                        {farpropsAuth.pUsername===null?(<a onClick={(e)=>{
                            navigate(findRoute('userlogin'))
                        }}>Login/Register</a>):(<a>{farpropsAuth.pUsername}</a>)}
                    </Menu.Item>
                </Menu>


            </Header>
            <Content style={{ padding: '50px 0px'}}>
                {/* <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb> */}
                <div className="site-layout-content" style={{minHeight: '735px'}}>
                    {props.children}
                </div>

            </Content>
            <Footer style={{ textAlign: 'center' }}>
                <a onClick={() => {
                    setaboutme(true)
                }}>
                    @About us
                </a>
                <br />
                XOJ ©2022 Created by CPT202 Group B-3</Footer>
            <About visible={aboutme} setvisible={(e)=>setaboutme(e)}/>
        </Layout>
    )
}


export default Index;