import React, { useEffect, useState, useContext } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
// UI
import { Form, Input, Button, message, InputNumber, PageHeader, Divider, Radio, Avatar } from 'antd';
import DocumentTitle from 'react-document-title';
import { showConfirm } from '../../components/confirm';
// utils
import qs from 'qs'
import { getUserInfo } from '../../services/userInfo';
import { findRoute } from '../../routers/config';
import { Auth } from '../../contexts/AuthContext';
import { insertManagerUser,modifyManagerUser,delManagerAccount } from '../../services/manager';

export default function Managepage() {
    // 跳转
    const navigate = useNavigate()
    // Form
    const [form] = Form.useForm();
    // 全局共享变量
    const farpropsAuth = useContext(Auth)
    // 获取url传来的id
    let location = useLocation()
    let params = qs.parse(location.search.slice(1))
    // 是否改密码
    const [showpassword, setshowpassword] = useState(false)
    // 页面加载时的默认userId
    let firstuserId='id' in params?params['id']:farpropsAuth.pUserid
    // 当前查看的用户id
    const [userid,setuserid]=useState(firstuserId)
    // 用户头像
    const [avatarurl,setavataurl]=useState("")
    // 当前状态,create,modify
    const [nowstate,setnowstate]=useState('modify')

    // 根据url param里的id变化来解决回撤后不会刷新信息的问题
    useEffect(()=>{
        loadinfo(firstuserId)
    },[firstuserId])

    // 加载id用户信息
    const loadinfo = (id) => {
        if (id === 'null' || id === null || id === '') {
            message.error("must have id")
            return
        }
        setavataurl("")
        getUserInfo({ id: id }).then((res) => {
            if (res.data.status === -1) {
                message.error(res.data.comment)
                form.resetFields()
                return
            } else {
                form.setFieldsValue({
                    'name': res.data.obj.name,
                    'id':res.data.obj.id,
                    'mail': res.data.obj.mail,
                    'score': res.data.obj.score,
                    'ranking': res.data.obj.ranking,
                    'authority': res.data.obj.authority,
                    'intro':res.data.obj.intro,
                })
                setavataurl(res.data.obj.profilePhoto)
            }
        }).catch((err) => {
            message.error("Something error")
        })
    }

    // 页面加载
    useEffect(() => {
        loadinfo(firstuserId)
    }, [])

    // 提交响应
    const onres=(res)=>{
        if(res.data.status===1){
            message.success("success")
        }else{
            message.error("error")
        }
    }
    // 失败
    const onerr=(err)=>{
        message.error("network error")
    }

    // 表单提交
    const onFinish=(values)=>{
        console.log(values)
        if(nowstate==='modify'){
            modifyManagerUser({
                'id':values.id,
                'name':values.name,
                'mail':values.mail,
                'score':values.score,
                'ranking':values.ranking,
                'authority':values.authority,
            }).then(onres).catch(onerr)
        }else if(nowstate==='create'){
            insertManagerUser({
                'name':values.name,
                'mail':values.mail,
                'score':values.score,
                'ranking':values.ranking,
                'authority':values.authority,
                'password':values.password
            }).then(onres).then(()=>{
                form.resetFields()
            }).catch(onerr)
        }

    }

    return (
        <DocumentTitle title="XOJ | Edit">
            <div className='componentbox'>
                <PageHeader
                    title={'Manage users'}
                    onBack={() => { navigate(-1) }}
                    style={{
                        padding: "10px 0px 30px 30px",
                    }} />
                Search id: 
                <InputNumber 
                min={0} 
                placeholder={'id' in params?params['id']:farpropsAuth.pUserid}
                onChange={(e) => { setuserid(e) }} />
                {/* 查询id */}
                <Button onClick={() => {
                    setnowstate('modify')
                    setshowpassword(false)
                    // url更改，不会引起重新渲染
                    navigate(findRoute('manageusers') + "?id=" + userid)
                    loadinfo(userid)
                }}>View</Button>
                <br />
                {/* 创建新用户 */}
                <Button onClick={() => {
                    setnowstate('create')
                    setavataurl("")
                    form.resetFields()
                }}>Add new user account</Button>
                <div>you are {nowstate}</div>
                <Divider />
                {/* 表单 */}
                <Form
                    name="basic"
                    labelCol={{
                        span: 4,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    autoComplete="off"
                    form={form}
                    onFinish={onFinish}
                >
                    <Form.Item 
                    label="Avarar"
                    >
                        <Avatar size={80} src={avatarurl}/>
                    </Form.Item>

                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input name!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    {nowstate==='modify'?
                    <Form.Item
                        label="ID"
                        name='id'
                        rules={[
                            {
                                required: true,
                                message: 'Please input id!',
                            },
                        ]}
                    >
                        <Input disabled={true}/>
                    </Form.Item>:null}
                    

                    <Form.Item
                        label="Email"
                        name="mail"
                        rules={[
                            {
                                required: true,
                                message: 'Please input email!',
                            },
                        ]}
                    >
                        <Input disabled={nowstate==='create'?false:true} />
                    </Form.Item>

                    <Form.Item
                        label="Introduction"
                        name="intro"
                    >
                        <Input disabled={true} />
                    </Form.Item>

                    <Form.Item
                    wrapperCol={{ offset: 4, span: 16 }}
                    >
                        <Button
                            disabled={nowstate==='create'?true:false}
                            onClick={() => { setshowpassword(!showpassword) }}>{showpassword||nowstate==='create' ? 'hidepassword' : 'changepassword'}
                        </Button>
                    </Form.Item>


                    {showpassword||nowstate==='create' ? <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input password!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item> : null}


                    <Form.Item
                        label="Score"
                        name="score"
                        rules={[
                            {
                                required: true,
                                message: 'Please input score!',
                            },
                        ]}
                    >
                        <InputNumber min={0} />
                    </Form.Item>

                    <Form.Item
                        label="Ranking"
                        name="ranking"
                        rules={[
                            {
                                required: true,
                                message: 'Please input ranking!',
                            },
                        ]}
                    >
                        <InputNumber min={0} />
                    </Form.Item>

                    <Form.Item
                        label="Authority"
                        name="authority"
                        rules={[
                            {
                                required: true,
                                message: 'Please input ranking!',
                            },
                        ]}
                    >
                        <Radio.Group>
                            <Radio.Button value={1}>user</Radio.Button>
                            <Radio.Button value={2}>super user</Radio.Button>
                            <Radio.Button value={3}>manager</Radio.Button>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>

                        {nowstate==='modify'?<Button 
                        type="danger" 
                        style={{marginLeft:'80px'}}
                        onClick={()=>{
                            showConfirm(()=>{
                                delManagerAccount({mail:form.getFieldValue('mail')}).then(onres).then(()=>{
                                    setnowstate('create')
                                    setavataurl("")
                                    form.resetFields()
                                }).catch(onerr)
                        })
                        }}
                        >
                            Delete
                        </Button>:null}
                        
                    </Form.Item>
                </Form>
            </div>
        </DocumentTitle>
    )
}
