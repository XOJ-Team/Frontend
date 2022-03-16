import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
// UI
import './Register.css'
import { Form, Input, Button} from 'antd';
import { SendcodeButton } from '../components/emailcode/EmailcodeButton';
import { MailOutlined, LockOutlined,NumberOutlined,SmileOutlined } from '@ant-design/icons';
// utils
import pattern from '../utils/regexp';
import {registerApi} from '../services/auth'
import {findRoute} from '../routers/config'
// import { setUsername,getUsername } from '../utils/auth';


export default function Register() {


  //初始化邮箱（作为sendCodeApi的input）
  // 使用表单对象获取邮箱
  // const [email, setEmail] = useState("");

    // 表单对象
    const [form]=Form.useForm()
    let [email,setemail]=useState("")

  const navigate=useNavigate();

  const onValuesChange=(e)=>{
    if(e.email!==null){
      setemail(e.email)
    }
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
      // navigate(findRoute('mainpage'));
      console.log(e)
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
        onValuesChange={onValuesChange}
        className='register-form'
        form={form}
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
        <Input prefix={
          <MailOutlined className="site-form-item-icon" />
         } />
        </Form.Item>

        <SendcodeButton 
        email={email}
        offset={8}
        span={16}
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
          prefix={<LockOutlined />}/>
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
