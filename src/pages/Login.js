import React,{useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { findRoute } from '../routers/config';
// UI
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import "./Login.css"
// utils
import {get,post} from '../utils/request'
import {setToken} from '../utils/auth'

export default function Login(){
  let navigate=useNavigate()
  const onFinish = (values) => {
    console.log('Received value of form: ', values);
    // 在这之后发起登录请求
  };

  return (
    <div id='XOJ-components-form-normal-login'>
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your Username!',
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <a className="login-form-forgot" href="">
          Forgot password
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
