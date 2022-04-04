import React, { useState,useContext } from 'react'
import { Layout, Menu, Dropdown, Breadcrumb, Button } from 'antd';
import { UserOutlined, ExportOutlined } from '@ant-design/icons';
import "./Index.css";
import { useNavigate } from 'react-router-dom';
// 路由寻找
import { findRoute } from '../../routers/config';
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
    },{
        name:"Competitions",
        targeturl:findRoute('competitionList')
    },{
        name:"New records",
        targeturl:"2"
    },{
        name:"Rank",
        targeturl:"3"
    },{
        name:"About",
        targeturl:findRoute('aboutxoj')
    }]
    // console.log(props.history.location.pathname)

    const dropdownMenu = (
        <Menu>
            <Menu.Item icon={<UserOutlined />}>
                <a onClick={(e)=>{ navigate(findRoute('userpage'))}}>Profile</a>
            </Menu.Item>
            <Menu.Item icon={<ExportOutlined />}>
                <a onClick={(e) => {}}>Logout</a>
            </Menu.Item>
        </Menu>
    )

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
                        }}>Login/Register</a>):(
                            <Dropdown overlay={dropdownMenu} placement='bottomRight'>
                            <a onClick={e => e.preventDefault()}>
                            {farpropsAuth.pUsername}
                            </a></Dropdown>)}
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
                    window.open("https://dev.azure.com/XOJ-Team/CPT202%20Team%20B-3")
                }}>
                    power by @XOJ
                </a>
                <br />
                XOJ ©2022 Created by CPT202 Group B-3</Footer>
        </Layout>
    )
}


export default Index;