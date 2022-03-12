import React from 'react'
import { Layout, Menu, Breadcrumb } from 'antd';
import "./Index.css";
import { useNavigate } from 'react-router-dom';

const { Header, Content, Footer } = Layout;

function Index(props){
    let navigate=useNavigate()
    const menuItems=[{
        name:"Home",
        targeturl:"/"
    },{
        name:"Questions",
        targeturl:"/questions"
    },{
        name:"Login",
        targeturl:"/login"
    }]
    // console.log(props.history.location.pathname)
        return (
            <Layout className="layout">
                <Header>
                    <div className="logo" style={{float:"left",padding:"0px 20px"}}>
                        <img src='favicon.ico' />
                    </div>
                    <Menu 
                    theme="dark" 
                    mode="horizontal" 
                    defaultSelectedKeys={['1']}
                    selectedKeys={[]}
                    >
                        {()=>{console.log(props.history)}}
                        {menuItems.map((item, index) => {
                            return <Menu.Item key={item.targeturl} onClick={(e)=>{
                                navigate(e.key)
                            }}>{item.name}</Menu.Item>;
                        })}
                    </Menu>
                </Header>
                <Content style={{ padding: '50px 0px' }}>
                    {/* <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb> */}
                    <div className="site-layout-content">
                        {props.children}
                    </div>

                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
        )
    }


export default Index;