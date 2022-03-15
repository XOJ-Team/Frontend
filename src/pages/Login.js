import React,{useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { findRoute } from '../routers/config';
// UI
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import "./Login.css"
// utils
import pattern,{reg} from '../utils/regexp';
import { loginApi,registerApi} from '../services/auth';
import { getUsername,setUsername } from '../utils/auth';
import { SendcodeButton } from '../components/emailcode/Emailcode';

export default function Login(){
  let navigate=useNavigate()

  // 邮箱是否合法
  let [email,setemail]=useState("")
  let [validemail,setvalidemail]=useState(false)

  // false：邮箱加密码登录 true：邮箱加验证码登录
  let [forgot,setforgot]=useState(false)
  // 服务器错误提示
  let [comment,setcomment]=useState("")

  // 表单提交事件
  const onFinish = (values) => {
    console.log('Received value of form: ', values);
    // 在这之后发起登录请求
    if(forgot){
      // 邮箱加验证码
      registerApi({
        'mail':values.username,
        'verificationNumber':values.password
      }).then((res)=>{
        console.log(res)
        if(res.data.status===-1){
          // 失败
          setcomment(res.data.comment)
        }else{
          // 成功
          setUsername(email)
        }
      }).catch((err)=>{
        console.log(err)
        setcomment("failed, check your inputs")
      })
    }else{
      //邮箱加密码
      loginApi({
        'mail':values.username,
        'password':values.password
      }).then((res)=>{
        console.log(res)
        if(res.data.status===-1){
          // 失败
          setcomment(res.data.comment)
        }else{
          //成功
          setUsername(email)
        }
      }).catch((err)=>{
        setcomment("failed, check your inputs")
        console.log(err)
      })
    }
  };


  return (
    <div 
    id='XOJ-components-form-normal-login'
    >
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >

      <div style={{color:'red'}}>
        {comment}
      </div>

      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: 'Can not be null!',
          },
          pattern('email')
        ]}
      >
        <Input 
        prefix={
        <UserOutlined className="site-form-item-icon" />}
        placeholder="Email"
        onChange={(e)=>{setemail(e.target.value)}}
        />
      </Form.Item>

      {(forgot)?<SendcodeButton 
      email={email}
      offset={0}
      span={16}
      />:<div></div>}
      

      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Can not be null!',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder={forgot?"code":"Password"}
        />
      </Form.Item>
      <Form.Item>
        <Form.Item 
        name="remember" 
        valuePropName="checked" 
        noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <a 
        className="login-form-forgot" 
        onClick={()=>{
          setforgot(true)
        }}
        >
          {forgot?"":"Forgot password"}
        </a>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
        Or <a 
        /* 点击事件Navigate跳转到注册的路由 */
        onClick={()=>{
          navigate(findRoute("userregister"))
        }}>register now!</a>
      </Form.Item>
    </Form>
    </div>
  );
};
