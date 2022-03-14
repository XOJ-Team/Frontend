import React,{useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
// UI
import './Register.css'
import { Form, Input, Button, Checkbox } from 'antd';
// utils
import pattern from '../utils/regexp';
import {registerApi,sendCodeApi} from '../services/auth'
import {findRoute} from '../routers/config'
import { setUsername,getUsername } from '../utils/auth';


export default function Register() {
  const [hasSendCode,sethasSendCode]=useState(false);

  //初始化邮箱（作为sendCodeApi的input）
  const [email, setEmail] = useState("");

  const navigate=useNavigate();

  const onSendCode = () => {
    //console.log("Success:", values);
    sethasSendCode(true);
    sendCodeApi({"mail": email}).then((res) => {
      console.log(res)
      if(res.data.status === 1) {
        console.log("发送成功")
      }else{
        console.log("发送失败")
      }
    }) 
  }

  const onFinish = (values) => {
    console.log('Success:', values);
    registerApi({
      'mail':values.email,
      'name':values.username,
      'password':values.password,
      'verificationNumber':values.code,
      'phoneNumber':""
    }).then((e)=>{
      console.log(e.status);
      navigate(findRoute('userlogin'));
    })
  };

  const onFinishFailed = (errorInfo) => {
    // console.log('Failed:', errorInfo);
  };

  return (
    <div id="XOJ-components-form-normal-register">
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        className='register-form'
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your email!'
            },
            pattern('email')
          ]}
        >
          <Input 
            value={email}
            onChange={setEmail}
          />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16
          }}
        >
          <Button type="primary" disabled={hasSendCode} onClick={onSendCode}>
            Send
          </Button>
          {hasSendCode?<div>a code has send to email</div>:<div></div>}
        </Form.Item>

        <Form.Item
          label="Code"
          name="code"
          rules={[
            {
              required: true,
              message: 'Please input your verification code!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
