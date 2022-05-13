import React,{useState,useContext, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
// UI
import { Form, Input, Button,message,PageHeader} from 'antd';
import { MailOutlined, LockOutlined,NumberOutlined,SmileOutlined } from '@ant-design/icons';
// utils
import pattern from '../../utils/regexp';
import { getUserInfo, modifyUserInfo, modifyUserIntro} from '../../services/userInfo';
import {findRoute} from '../../routers/config'
import {Auth} from '../../contexts/AuthContext'
import DocumentTitle from 'react-document-title'//动态Title


export default function Modify() {
  // 全局共享
  let farpropsAuth=useContext(Auth)
  // 表单对象
  const [form]=Form.useForm()

  const navigate=useNavigate();

  const [changePassword,setchangePassword]=useState(false)

  // 表单提交
  const onFinish = (values) => {
    modifyUserIntro({
      'text':values.introduction
    }).then((res)=>{
        if(res.data.status === -1){
            // 信息不对
            message.error(res.data.comment)
        }else if(res.data.status===1){
          message.success("success update introduction")
        }
    }).catch((err)=>{
        message.error("error")
    })
    
    modifyUserInfo({
      'mail':values.email,
      'name':values.username,
      'password':values.password,
    }).then((res)=>{
      if(res.data.status === -1){
        // 信息不对
        message.error(res.data.comment)
      }else{
        // 同步用户信息
        farpropsAuth.setpUserinfo({...farpropsAuth.pUserinfo,
          pUsername:res.data.obj.name
        })
        message.success("success uppdate account/password")
        navigate(findRoute('userpage')+"?id="+farpropsAuth.pUserid);
      }
    }).catch((err)=>{
      message.error("error")
    })
  };

  // 组件创建周期执行
  useEffect(() => {
    getUserInfo({id:farpropsAuth.pUserid}).then((res)=>{
        if(res.data.status === -1){
            navigate(findRoute('homepage'))
        }else{
            form.setFieldsValue({
            "username":res.data.obj.name,
            "email":res.data.obj.mail,
            'password':null,
            "introduction":res.data.obj.intro
            })
        }
        
    }).catch((err)=>{
        message.error("server error")
    })
  }, [])


  const onFinishFailed = (errorInfo) => {
    // console.log('Failed:', errorInfo);
  };

  return (
    <DocumentTitle title="XOJ | Modify Information">
    <div id="XOJ-components-form-modify-information" className='componentbox'>
    <PageHeader
    title="Edit my infomation"
    onBack={()=>{navigate(-1)}}
    style={{
      padding:"10px 0px 30px 30px",
    }}
    />
      <Form
        name="basic"
        labelCol={{
          span: 0,
        }}
        wrapperCol={{
          span: 24,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        className='modify-form'
        form={form}
      >
      <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your new email!'
            },
            pattern('email')
          ]}
        >
        <Input 
        placeholder="Email"
        disabled={true}
        prefix={
          <MailOutlined className="site-form-item-icon" />
         } />
        </Form.Item>

        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your new username!',
            },
          ]}
        >
          <Input 
          placeholder="Username"
          prefix={<SmileOutlined />}/>
        </Form.Item>

        <Button 
        style={{marginBottom:'20px'}}
        onClick={()=>{setchangePassword(!changePassword)}}>
          {changePassword?'hide password':'change password'}
        </Button>

        {changePassword?
        <Form.Item
          name="password"
          rules={[
            {
              required: false,
              message: 'Please input your new password!',
            },
          ]}
        >
          <Input
          placeholder="Password"
          prefix={<LockOutlined />}/>
        </Form.Item>:null}
        

        <Form.Item
          name="introduction"
          rules={[
            {
              required: true,
              message: 'Please input your new introduction!',
            },
          ]}
        >
          <Input
          placeholder="Introduction"
          prefix={<NumberOutlined />}/>
        </Form.Item>

        <Form.Item
          style={{textAlign:'center',marginBottom:'0'}}
          wrapperCol={{
            offset: 0,
            span: 24,
          }}
        >
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>

      </Form>
    </div>
    </DocumentTitle>
  );
};
