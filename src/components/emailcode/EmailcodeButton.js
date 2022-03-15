import React, {useState,useEffect,PureComponent } from 'react'
import { Form, Button } from 'antd';
import { sendCodeApi } from '../../services/auth';
import { reg } from '../../utils/regexp';
/**
 * this is a button to send a email varification code 
 * @props email(String) the email address
 * @props offset(int),span(int) the position
 */
export function SendcodeButton(props) {
    let email=props.email
    let offset=props.offset
    let span=props.span
    // 邮箱是否有效
    let validemail = reg('email').test(email)?true:false
    // 是否把按钮设置为已发送状态
    let [hasSendCode, sethasSendCode] = useState(false)
    // 设置按钮下面的提示
    let [comment,setcomment]=useState("a code has send to email")
    // 设置按钮内倒计时
    let last60=10


    // 模拟组件卸载
    // useEffect(()=>{})

    
    // 验证码按钮点击事件
    const onCodeSend = (value) => {
        console.log("now email is ",email)
        if (validemail) {
            sethasSendCode(true)
            sendCodeApi({
                'mail': email
            }).then((res) => {
                if (res.data.status !== 1) {
                    // 失败
                    setcomment("failed to send code")
                } else {
                    // 成功
                }
            }).catch((err)=>{
                setcomment("error in server")
            })
        }
    }


    return (
        <Form.Item
            wrapperCol={{
                offset: offset,
                span: span
            }}
        >
            <Button
                type="primary"
                disabled={hasSendCode}
                onClick={onCodeSend}>
                Send
            </Button>
            {hasSendCode ? <div>{comment}</div> : <div></div>}
        </Form.Item>
    )

}