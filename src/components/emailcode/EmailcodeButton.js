import React, {useState } from 'react'
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
    // 倒数60秒
    let last60 = 60
    // 是否把按钮设置为已发送状态
    let [hasSendCode, sethasSendCode] = useState(false)
    // 设置按钮下面的提示
    let [comment,setcomment]=useState("a code has send to email")
    // 验证码按钮点击事件
    const onCodeSend = (value) => {
        if (validemail) {
            sethasSendCode(true)
            countDown()
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
    // 倒计时方法
    const countDown = () => {
        if (last60 === 1) {//当为0的时候，button按钮可以再次被点击
            last60 = 60
            sethasSendCode(false)
            clearTimeout()
        } else {
            last60 = last60 - 1
            // console.log(last60)
            sethasSendCode(true)
            setTimeout(() => countDown(), 1000)//每一秒调用一次
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