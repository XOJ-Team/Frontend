import React, {useState,useEffect,PureComponent } from 'react'
import { Form, Button,message,Tooltip } from 'antd';
import { sendCodeApi } from '../../services/auth';
import { reg } from '../../utils/regexp';
/**
 * this is a button to send a email varification code, must be in a Form component
 * @param props.getemail 调用这个函数来得到外层函数的最新的email
 * @param props.offset(int),position
 * @param props.span(int),position
 */
export function SendcodeButton(props) {
    let offset=props.offset
    let span=props.span
    let style=props.style
    
    // 是否把按钮设置为已发送状态
    let [hasSendCode, sethasSendCode] = useState(false)
    // 设置按钮内倒计时
    let last60=10

    // 模拟组件卸载
    // useEffect(()=>{})

    
    // 验证码按钮点击事件
    const onCodeSend = (value) => {
        let email=props.getemail()
        // console.log("now email in button is ",email)
        if(email === null || email===undefined || email===""){
            message.error("please reinput your email or refresh the page!")
            return
        }
        // 如果邮箱有效
        if (reg('email').test(email)) {
            sethasSendCode(true)
            sendCodeApi({
                'mail': email
            }).then((res) => {
                if (res.data.status !== 1) {
                    // 失败
                    message.error("failed to send code")
                } else {
                    // 成功
                    message.success("a verification code has send to your email")
                }
            }).catch((err)=>{
                message.error("error in server")
            })
        }
    }


    return (
        <Form.Item
            style={style}
            wrapperCol={{
                offset: offset,
                span: span
            }}>
            {hasSendCode?(
                <Tooltip title="Check your junk mail box?">
                {"a code will send to email, you can "}<Button onClick={()=>sethasSendCode(false)}>resend</Button></Tooltip>
                ):(<Button
                type="primary"
                onClick={onCodeSend}>
                Send
            </Button>)}
            <div style={{clear:'both'}}></div>
        </Form.Item>
    )

}