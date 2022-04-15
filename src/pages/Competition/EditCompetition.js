import React, { useEffect, useState } from 'react'
import DocumentTitle from 'react-document-title'//动态Title
// 解析url参数
import { useLocation, useNavigate } from 'react-router-dom'
import qs from 'qs'
// UI
import { Form, Input, Button, DatePicker, Space, message, InputNumber } from 'antd';
// 服务类接口
import { createcomp, getcomp, deletecomp,addQtocomp,showQofcomp, updatecomp } from '../../services/competition';
// 路由寻找
import { findRoute } from '../../routers/config'
// 日期工具类
import { Timemoment, nowTimemoment, Timeformat, nowTimeformat } from '../../utils/timeutils'
// 窗口工具类
import { showConfirm } from '../../components/confirm';
// 
import Popup from '../../components/Popup'


export default function EditCompetition() {

    //日期选择
    const { RangePicker } = DatePicker;
    // 获取url传来的题目id
    let location = useLocation()
    let params = qs.parse(location.search.slice(1))
    // 跳转
    const navigate = useNavigate()
    // question link 弹出窗口的显示与否
    const [qlinkvisible,setqlinkvisible]=useState(false)
    // 组件创建，下载竞赛信息
    useEffect(() => {
        if ('id' in params) {
            console.log("you are editing id=", params['id'])
            getcomp(params['id']).then((res) => {
                form.setFieldsValue({
                    name: res.data.obj.name,
                    introduction: res.data.obj.briefIntroduction,
                    time: [Timemoment(res.data.obj.startTime), Timemoment(res.data.obj.endTime)]
                })
            })
        }
    }, [])

    // Form
    const [form] = Form.useForm();

    // 表单提交
    const onFinish = (values) => {
        // console.log('Success:', {
        //     ...values, 'startTime': Timeformat(values.time[0]),
        //     'endTime': Timeformat(values.time[1])
        // });
        if ('id' in params) {
            updatecomp({
                'id':params['id'],
                'name': values.name,
                'briefIntroduction': values.introduction,
                'startTime': Timeformat(values.time[0]),
                'endTime': Timeformat(values.time[1])
            }).then(successres).catch(failedres)
        } else {
            // create
            createcomp({
                'name': values.name,
                'briefIntroduction': values.introduction,
                'startTime': Timeformat(values.time[0]),
                'endTime': Timeformat(values.time[1])
            }).then(successres).catch(failedres)
        }
    };
    // 封装提交竞赛的响应事件
    const successres = (res) => {
        // console.log(res)
        if (res.data.status === 1) {
            message.success("success submit")
            navigate(findRoute('competitionList'))
        }


    }
    // 封装响应失败事件
    const failedres = (err) => {
        console.log(err)
        message.error("server failed")
    }

    // 关闭再打开，达到刷新question link的效果
    const reopenLink=()=>{
        setqlinkvisible(false)
        setqlinkvisible(true)
    }

    const deleteThisComp = () => {
        deletecomp({ 'id': params['id'] }).then(() => {
            message.warn("a competition has been deleted")
            navigate(findRoute('competitionList'))
        }).catch(failedres)
    }

    // 日期选择 完成
    function onChange(value, dateString) {
        // console.log('Formatted Selected Time: ', dateString);
    }

    return (
        <DocumentTitle title="XOJ | EditCompetition">
            <div className='componentbox'>
                <Form
                    name="basic"
                    labelCol={{
                        span: 4,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    onFinish={onFinish}
                    autoComplete="off"
                    form={form}
                    initialValues={{
                        time: [nowTimemoment(), nowTimemoment()]
                    }}
                >
                    <Form.Item
                        label="name"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input name of competition!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="introduction"
                        name="introduction"
                        rules={[
                            {
                                required: true,
                                message: 'Please input introduction!',
                            },
                        ]}
                    >
                        <Input.TextArea />
                    </Form.Item>

                    <Form.Item
                        label="time period"
                        name="time"
                        wrapperCol={{
                            offset: 0,
                            span: 12,
                        }}
                        rules={[
                            {
                                required: true,
                                message: 'Please select start time and end time!',
                            },
                        ]}
                    >
                        <RangePicker
                            showTime={{ format: 'YYYY-MM-DD HH:mm:ss' }}
                            format="YYYY-MM-DD HH:mm:ss"
                            onChange={onChange}
                        />
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 4,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 4,
                            span: 16,
                        }}
                    >
                        {'id' in params ? (<>
                        <Button onClick={()=>{
                            setqlinkvisible(true)
                        }}>View question link</Button>
                        <Button
                            type='primary'
                            danger
                            style={{ marginLeft: "50px" }}
                            onClick={() => {
                                showConfirm(deleteThisComp)
                            }}
                        >
                            Delete
                        </Button></>) : (null)}
                    </Form.Item>
                </Form>

                <Popup 
                width={'100%'}
                visible={qlinkvisible} 
                setvisible={setqlinkvisible}
                title="question link"
                content={<QuestionLinkPop 
                    compId={'id' in params?params['id']:""} 
                    reopen={reopenLink}
                    />}
                ></Popup>
            </div>
        </DocumentTitle>
    )
}

function QuestionLinkPop(propsq){

    console.log(propsq.sss===undefined)
    // question link
    const [qlinklist,setqlinklist]=useState([])
    // 当前状态,[创建new/删除del/修改mod,question的id,分数]
    const [newordel,setnewordel]=useState({'state':'new','qid':1,'score':1,'qname':""})

    const sentencemap={
        'new':'you are linking new question to competition',
        'del':'you are delete linking',
        'mod':'you are modify question score'
    }


    // 同步question Link
    useEffect(()=>{
        showQofcomp({'competitionId':propsq.compId}).then((res)=>{
            setqlinklist(res.data.obj)
        })
    },[])

    // 提交事件
    const submitquestionlink=()=>{
        if(newordel['state']==="new"){
            addQtocomp({'questionId':newordel['qid'],'competitionId':propsq.compId,'score':newordel['score']}).then((res)=>{
                message.success("new question link to competition")
                propsq.reopen()
            })
        }else if(newordel['state']==="del"){
            console.log("del quesiton link")
        }else if(newordel['state']==='mod'){
            console.log("modify")
        }
        
    }

    return (
        <div>
            <div>
                <a onClick={()=>{
                    setnewordel({...newordel,'state':'new','qid':null,'qname':"",'score':null})
                }}>create</a>
                {qlinklist.map((each,index)=>{return (
                <div key={index}>
                    {each.name}
                    <a onClick={()=>{
                        setnewordel({...newordel,'state':'mod','qid':each.id,'qname':each.name})
                        }}> edit </a>
                    <a onClick={()=>{
                        setnewordel({...newordel,'state':'del','qid':each.id,'qname':each.name})
                        message.warn("click submit to delete")
                        }}> delete </a>
                </div>
                )})}
            </div>
            <br />
            {/* 输入框区域 */}
            question name:{newordel['qname']}
            <br />
            question id:<InputNumber 
            min={1}
            disabled={newordel['state']==='del'||newordel['state']==='mod'}
            value={newordel['qid']} 
            onChange={(e)=>{
                setnewordel({...newordel,'qid':e})
            }} 
            placeholder='question id' />
            <br />

            score:<InputNumber 
            min={1}
            disabled={newordel['state']==='del'}
            value={newordel['score']} 
            onChange={(e)=>{setnewordel({...newordel,'score':e})}} 
            placeholder='score of this question' />
            <br />
            {sentencemap[newordel['state']]}
            <br />
            <Button type={newordel['state']==='del'?'danger':''} onClick={submitquestionlink}>Submit</Button>
        </div>
        
    )
}