import React from 'react'
import { Layout, Menu, Breadcrumb, Button } from 'antd';
import "./Index.css";
import { useNavigate } from 'react-router-dom';
// 路由寻找
import { findRoute } from '../../routers/config';

const { Header, Content, Footer } = Layout;

function Index(props) {
    let navigate = useNavigate()
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
                        style={{ position: 'absolute', right: '0px', padding:'0 30px'}}
                        onClick={(e)=>{
                            navigate(findRoute('userlogin'))
                        }}
                    >
                        <a>Login</a>
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
            <Footer style={{ textAlign: 'center'}}>XOJ ©2022 Created by CPT202 Group B-3</Footer>
        </Layout>
    )
}


export default Index;