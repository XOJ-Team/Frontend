import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
// UI
import './Register.less'
import { Form, Input, Button,message} from 'antd';
import { SendcodeButton } from '../../components/emailcode/EmailcodeButton';
import { MailOutlined, LockOutlined,NumberOutlined,SmileOutlined } from '@ant-design/icons';
// utils
import pattern from '../../utils/regexp';
import {registerApi} from '../../services/auth'
import {findRoute} from '../../routers/config'
import {Auth} from '../../contexts/AuthContext'
import DocumentTitle from 'react-document-title'//动态Title
// import { setUsername,getUsername } from '../utils/auth';


export default function Register() {
  // 表单对象
  const [form]=Form.useForm()
  const [emailenable,setemailenable]=useState(true)
  const navigate=useNavigate();


  const getemail=(e)=>{
    return form.getFieldValue('email')
  }

  const onFinish = (values) => {
    registerApi({
      'mail':values.email,
      'name':values.username,
      'password':values.password,
      'verificationNumber':values.code
    }).then((res)=>{
      if(res.data.status===-1){
        // 信息不对
        if(res.data.comment){
          message.error(res.data.comment)
        }else{
          message.error("error in register(can not using same mail twice)!")
        }

      }else{
        // 注册的话没返回id，这里要强制用户登录一下
        // farpropsAuth.setpUserinfo({...farpropsAuth.pUserinfo,
        //   pUsername:res.data.obj.name,
        //   pUserid:res.data.obj.id,
        //   pAuthority:res.data.obj.authority
        // })
        message.success('success register')
        navigate(findRoute('userlogin'));
      }
    }).catch((err)=>{
      message.error("server error")
    })
  };

  const onFinishFailed = (errorInfo) => {
    // console.log('Failed:', errorInfo);
  };

  return (
    <DocumentTitle title="XOJ | Register">
    <div id="XOJ-components-form-normal-register">
      <Form
        name="basic"
        labelCol={{
          span: 6,
        }}
        wrapperCol={{
          span: 18,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        className='register-form'
        form={form}
      >
      <div className='title'>Register</div>
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
        placeholder="Email"
        disabled={!emailenable}
        prefix={
          <MailOutlined className="site-form-item-icon" />
         } />
        </Form.Item>

        <SendcodeButton 
        getemail={getemail}
        style={{textAlign:'center'}}
        offset={0}
        span={24}
        afterClickSend={()=>{setemailenable(false)}}
        afterClickResend={()=>{setemailenable(true)}}
        />

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
          <Input 
          placeholder="Verifivation Code"
          prefix={<NumberOutlined />}/>
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
          <Input 
          placeholder="Username"
          prefix={<SmileOutlined />}/>
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
          <Input.Password 
          placeholder="Password"
          prefix={<LockOutlined />}/>
        </Form.Item>

        <Form.Item
          style={{textAlign:'center',marginBottom:'0'}}
          wrapperCol={{
            offset: 0,
            span: 24,
          }}
        >
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>

        <Form.Item style={{marginBottom:'0'}}>
          Have accounts? <a onClick={()=>navigate(findRoute('userlogin'))}>Log in here</a>
        </Form.Item>
      </Form>
    </div>
    </DocumentTitle>
  );
};
