import React, { useEffect, useState,useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { findRoute } from '../routers/config';
// UI
import { Form, Input, Button, Checkbox } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import "./Login.css"
// utils
import pattern, { reg } from '../utils/regexp';
import { loginApi, registerApi } from '../services/auth';
import { getUseremail, setUseremail } from '../utils/auth';
import { SendcodeButton } from '../components/emailcode/EmailcodeButton';
//context
import { Auth } from '../contexts/AuthContext';


export default function Login() {
  let navigate = useNavigate()

  //表单对象
  const [form] = Form.useForm()
  // false：邮箱加密码登录 true：邮箱加验证码登录
  let [useCode, setUseCode] = useState(false)
  // 服务器错误提示
  let [comment, setcomment] = useState("")
  // 邮箱
  let [email,setemail]=useState(getUseremail())
  // 获取跨组件传来的信息
  const farpropsAuth=useContext(Auth)

  // 表单提交成功响应后
  const successRes=(res)=>{
    if (res.data.status === -1) {
      // 失败
      setcomment(res.data.comment)
    } else {
      // 把用户名传给frame右上角的bar
      farpropsAuth.setpUsername(res.data.obj.name)
      navigate("mainpage")
    }
  }

  // 表单提交事件
  const onFinish = (values) => {
    //持久化存储email
    if(values.remember===true){
      setUseremail(values.email)
    }
    // 在这之后发起登录请求
    if (useCode) {
      // 邮箱加验证码
      registerApi({
        'mail': values.email,
        'verificationNumber': values.password
      }).then(
        // 表单成功提交
        (res)=>{successRes(res)}
      ).catch((err) => {
        console.log(err)
        setcomment("failed to connect server")
      })
    } else {
      //邮箱加密码
      loginApi({
        'mail': values.email,
        'password': values.password
      }).then(
        (res)=>{successRes(res)}
      ).catch((err) => {
        setcomment("failed to connect server")
      })
    }
  };

  const onValuesChange=(e)=>{
    if(e.email!==null){
      setemail(e.email)
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
          email:email
        }}
        onFinish={onFinish}
        onValuesChange={onValuesChange}
        form={form}
      >

        <div style={{ color: 'red' }}>
          {comment}
        </div>

        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: 'Can not be null!',
            },
            pattern('email')
          ]}
        >
          <Input
          prefix={<MailOutlined />}
          placeholder="Email"
           />
        </Form.Item>

        {(useCode) ? <SendcodeButton
          email={email}
          offset={0}
          span={16}
        /> : <div></div>}


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
            placeholder={useCode ? "Code" : "Password"}
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
            onClick={() => {
              setUseCode(!useCode)
              // 切换登录模式后清空密码框
              form.setFieldsValue({
                password: ''
              })
            }}
          >
            {useCode ? "use password" : "use code"}
          </a>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          Or <a
            /* 点击事件Navigate跳转到注册的路由 */
            onClick={() => {
              navigate(findRoute("userregister"))
            }}>register now!</a>
        </Form.Item>
      </Form>
    </div>
  );
};
