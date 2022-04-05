import React, { useState, useContext } from 'react'
import { Layout, Menu, Dropdown, Breadcrumb, Button } from 'antd';
import { UserOutlined, ExportOutlined } from '@ant-design/icons';
import "./Index.css";
import { useNavigate,useLocation } from 'react-router-dom';
// 路由寻找
import { findRoute } from '../../routers/config';
// 全局变量
import { Auth } from '../../contexts/AuthContext';

const { Header, Content, Footer } = Layout;
const { SubMenu } = Menu;
function Index(props) {

    // 获取当前url
    let location=useLocation()
    let navigate = useNavigate()
    // 获取跨组件传来的信息
    const farpropsAuth = useContext(Auth)
    //当前聚焦菜单元素
    const [current,setcurrent]=useState(location.pathname)
    const handleClick=(e)=>{
        setcurrent(e.key)
    }
    const menuItems = [{
        name: "Home",
        targeturl: findRoute('mainpage')
    }, {
        name: "Questions",
        targeturl: findRoute('questionList')
    }, {
        name: "Competitions",
        targeturl: findRoute('competitionList')
    }, {
        name: "New records",
        targeturl: "2"
    }, {
        name: "Rank",
        targeturl: "3"
    }, {
        name: "About",
        targeturl: findRoute('aboutxoj')
    }]

    //登录后右上角的下拉菜单
    const DropdownMenu = function(){
        return (
            <SubMenu 
            style={{position:'absolute',right:'0'}} 
            key="SubMenu" 
            icon={<UserOutlined />} 
            title={farpropsAuth.pUsername}>
                <Menu.Item key="profile" icon={<UserOutlined />}>
                    <a onClick={(e) => { navigate(findRoute('userpage')) }}>Profile</a>
                </Menu.Item>
                <Menu.Item key="logout" icon={<ExportOutlined />} style={{backgroundColor:'#FF6347'}}>
                    <a onClick={(e) => { }}>Logout</a>
                </Menu.Item>
            </SubMenu>
        )
    }

    return (
        <Layout className="layout">
            <Header>
                <div className="logo" style={{ position: 'absolute', padding: "0px 20px" }}>
                    <img src='/favicon.ico' />
                </div>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['1']}
                    selectedKeys={[current]}
                    style={{ paddingLeft: '130px' }}
                    onClick={handleClick}
                    selectable={false}
                >
                    {menuItems.map((item, index) => {
                        return <Menu.Item
                            key={item.targeturl}
                            onClick={(e) => {
                                navigate(e.key)
                            }}>{item.name}</Menu.Item>;
                    })}
                    {farpropsAuth.pUsername === null ? (
                    <Menu.Item
                        key='userlogin'
                        style={{ position: 'absolute', width:'150px',textAlign:'center',right: '0px', paddingRight: '20px' }}
                    >
                        <a onClick={(e) => {
                            navigate(findRoute('userlogin'))
                        }}>Login/Register</a>
                    </Menu.Item>
                    ) : (
                        <DropdownMenu/>
                    )}
                </Menu>
            </Header>
            <Content style={{ padding: '0px 0px' }}>
                {/* <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb> */}
                <div className="site-layout-content" style={{ minHeight: '735px' }}>
                    {props.children}
                </div>

            </Content>
            <Footer style={{ textAlign: 'center' }}>
                <a onClick={() => {
                    window.open("https://dev.azure.com/XOJ-Team/CPT202%20Team%20B-3")
                }}>
                    powered by @XOJ
                </a>
                <br />
                XOJ ©2022 Created by CPT202 Group B-3</Footer>
        </Layout>
    )
}


export default Index;