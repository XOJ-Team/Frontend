import React, { useState, useContext,useEffect } from 'react'
import { Layout, Menu, Dropdown, Breadcrumb, Button, message } from 'antd';
import { UserOutlined, ExportOutlined,HomeFilled,ReconciliationFilled,DashboardFilled,SignalFilled,QuestionCircleFilled } from '@ant-design/icons';
import "./Index.css";
import { useNavigate,useLocation } from 'react-router-dom';
// utils
import { logoutApi } from '../../services/auth';
// 路由寻找
import { findRoute } from '../../routers/config';
// 全局变量
import { Auth } from '../../contexts/AuthContext';
// 使用国际化语言包
import { FormattedMessage } from "react-intl";

const { Header, Content, Footer } = Layout;
const { SubMenu } = Menu;
function Index(props) {
    //当前窗口的高
    let windowHeight = document.documentElement.clientHeight || document.body.clientHeight

    // 获取当前url
    let location=useLocation()
    let navigate = useNavigate()
    // 获取跨组件传来的信息
    const farpropsAuth = useContext(Auth)
    //当前聚焦菜单元素
    const [current,setcurrent]=useState(location.pathname)
    useEffect(()=>{setcurrent(location.pathname)},[location.pathname])

    const menuItems = [{
        name: "topHome",
        targeturl: findRoute('mainpage'),
        icon:<HomeFilled />
    }, {
        name: "topQuestions",
        targeturl: findRoute('questionList'),
        icon:<ReconciliationFilled />
    }, {
        name: "topCompetitions",
        targeturl: findRoute('competitionList'),
        icon:<DashboardFilled />
    }, {
        name: "topRank",
        targeturl: findRoute('siterank'),
        icon:<SignalFilled />
    }, {
        name: "topAbout",
        targeturl: findRoute('aboutxoj'),
        icon:<QuestionCircleFilled />
    }]

    //用户登出
    const userLogout = () => {
        logoutApi({}).then(
            (res) =>{
                if (res.data.status === -1) {
                    message.error(res.data.comment)
                }else if(res.data.status === 1) {
                    // 重置用户名
                    farpropsAuth.setpUsername(null)
                    // 重置权限
                    farpropsAuth.setpAuthority(1)
                    // 重置用户id
                    farpropsAuth.setpUserid(null)
                    navigate(findRoute('mainpage'))
                }
            }
        )
    };

    //登录后右上角的下拉菜单
    const DropdownMenu = function(){
        return (
            <SubMenu 
            style={{position:'absolute',right:'0'}} 
            key="SubMenu" 
            icon={<UserOutlined />} 
            title={farpropsAuth.pUsername}>
                <Menu.Item key="profile" icon={<UserOutlined />}>
                    <a onClick={() => { navigate(findRoute('userpage')) }}>Profile</a>
                </Menu.Item>
                <Menu.Item key="logout" icon={<ExportOutlined />} style={{backgroundColor:'#FF6347'}}>
                    <a onClick={() => {userLogout()}}>Logout</a>
                </Menu.Item>
            </SubMenu>
        )
    }

    return (
        <Layout className="layout">
            <Header style={{padding:'0'}}>
                <div className="logo" style={{ position: 'absolute', padding: "0px 30px" }}>
                    <img src='/favicon.ico' />
                </div>
                <Menu
                    mode="horizontal"
                    theme='dark'
                    defaultSelectedKeys={[current]}
                    selectedKeys={[current]}
                    style={{ paddingLeft: '130px',backgroundColor:farpropsAuth.XJTLUNAVY }}
                >
                    {menuItems.map((item, index) => {
                        return <Menu.Item
                            key={item.targeturl}
                            onClick={(e) => {
                                navigate(e.key)
                            }}>{item.icon} <FormattedMessage id={item.name} /></Menu.Item>;
                    })}
                    {farpropsAuth.pUsername === null ? (
                    <Menu.Item
                        key='userlogin'
                        style={{ position: 'absolute', width:'150px',textAlign:'center',right: '0px', paddingRight: '20px' }}
                    >
                        <a onClick={(e) => {
                            navigate(findRoute('userlogin'))
                        }}>Login / Register</a>
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
                <div className="site-layout-content"
                 style={{minHeight:windowHeight-130,overflow:'hidden'}}
                 >
                    {props.children}
                </div>

            </Content>
            <Footer style={{ textAlign: 'center',backgroundColor:farpropsAuth.XJTLUNAVY,color:'rgb(217, 217, 217)'}}>
                <a onClick={() => {
                    window.open("https://dev.azure.com/XOJ-Team/CPT202%20Team%20B-3")
                }}>
                    powered by @XOJ
                </a>
                <br />
                XOJ ©2022 Created by CPT202 Group B-3
            </Footer>
        </Layout>
    )
}


export default Index;