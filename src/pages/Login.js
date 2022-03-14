import React,{useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { findRoute } from '../routers/config';
// UI
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import "./Login.css"
// utils
import pattern,{reg} from '../utils/regexp';
import { loginApi,registerApi,sendCodeApi } from '../services/auth';
import { getUsername,setUsername } from '../utils/auth';

export default function Login(){
  let navigate=useNavigate()
  // 倒数60秒
  let last60=60
  // 邮箱是否合法
  let [email,setemail]=useState("")
  let [validemail,setvalidemail]=useState(false)
  // 是否点击过发送验证码按钮
  let [hasSendCode,sethasSendCode]=useState(false)
  // false：邮箱加密码登录 true：邮箱加验证码登录
  let [forgot,setforgot]=useState(false)
  // 服务器错误提示
  let [comment,setcomment]=useState("")
  // 验证码按钮点击事件
  const onCodeSend=(value)=>{
    if(validemail){
      sethasSendCode(true)
      countDown()
      sendCodeApi({
        'mail':email
      }).then((res)=>{
        if(res.data.status!==1){
          // 失败
          setcomment("服务器错误")
        }else{
          // 成功
        }
      })
    }
  }
  // 倒计时方法
  const countDown=()=>{
    if (last60 === 1) {//当为0的时候，liked设置为true，button按钮显示内容为 获取验证码
        last60=60
        sethasSendCode(false)
    } else {
        last60=last60-1
        // console.log(last60)
        sethasSendCode(true)
        setTimeout(() => countDown(), 1000)//每一秒调用一次
    }
}
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

  //表单元素变化回调
  const onChange=(values)=>{
    // values只包含被改变的元素
    // 只有当email有效时才显示按钮
    if(values.username!==null){
      setemail(values.username)
    }
    if(reg('email').test(email)){
      setvalidemail(true)
    }else{
      setvalidemail(false)
    }
  }

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
      onValuesChange={onChange}
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
        autoComplete='off' />
      </Form.Item>

      {(forgot)?(<Form.Item
          wrapperCol={{
            offset: 0,
            span: 16
          }}
        >
          <Button 
          type="primary" 
          disabled={hasSendCode} 
          onClick={onCodeSend}>
            Send
          </Button>
          {hasSendCode?<div>a code has send to email</div>:<div></div>}
        </Form.Item>):<div></div>}
      

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
