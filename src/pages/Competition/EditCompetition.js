import React, { useEffect, useState } from 'react'
import DocumentTitle from 'react-document-title'//动态Title
// 解析url参数
import { useLocation, useNavigate } from 'react-router-dom'
import qs from 'qs'
// UI
import { Form, Input, Button, DatePicker, Space, message, InputNumber,PageHeader } from 'antd';
// 服务类接口
import { createcomp, getcomp, deletecomp, updatecomp } from '../../services/competition';
// 路由寻找
import { findRoute } from '../../routers/config'
// 日期工具类
import { Timemoment, Timeformat, nowTimeformat } from '../../utils/timeutils'
// 窗口工具类
import { showConfirm } from '../../components/confirm';
// 弹出窗口
import Popup from '../../components/Popup'
// question link组件
import QuestionLinkPop from './QuestionLinkPop';

export default function EditCompetition() {

    //日期选择
    const { RangePicker } = DatePicker;
    // 获取url传来的题目id
    let location = useLocation()
    let params = qs.parse(location.search.slice(1))
    // 跳转
    const navigate = useNavigate()
    // question link 弹出窗口的显示与否
    const [qlinkvisible, setqlinkvisible] = useState(false)
    // 组件创建，下载竞赛信息
    useEffect(() => {
        if ('id' in params) {
            message.success("you are editing competition")
            getcomp(params['id']).then((res) => {
                const infoOfit = res.data.obj.competitionModel
                form.setFieldsValue({
                    name: infoOfit.name,
                    introduction: infoOfit.briefIntroduction,
                    time: [Timemoment(infoOfit.startTime), Timemoment(infoOfit.endTime)]
                })
            })
        }else{
            message.success("you are creating competition")
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
                'id': params['id'],
                'name': values.name,
                'briefIntroduction': values.introduction,
                'startTime': Timeformat(values.time[0]).substring(0,14)+"00:00",
                'endTime': Timeformat(values.time[1]).substring(0,14)+"00:00"
            }).then(successres).catch(failedres)
        } else {
            // create
            createcomp({
                'name': values.name,
                'briefIntroduction': values.introduction,
                'startTime': Timeformat(values.time[0]).substring(0,14)+"00:00",
                'endTime': Timeformat(values.time[1]).substring(0,14)+"00:00"
            }).then(successres).catch(failedres)
        }
    };
    // 封装提交竞赛的响应事件
    const successres = (res) => {
        // console.log(res)
        if (res.data.status === 1) {
            message.success("success submit")
            navigate(findRoute('competitionList'))
        } else {
            message.error(res.data.comment)
        }


    }
    // 封装响应失败事件
    const failedres = (err) => {
        console.log(err)
        message.error("server failed")
    }

    // 关闭再打开，达到刷新question link的效果
    const reopenLink = () => {
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
                <PageHeader
                    title={'Edit competition'}
                    onBack={() => { navigate(-1) }}
                    style={{
                        padding: "10px 0px 30px 30px",
                    }}
                />
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
                        time: [Timemoment(nowTimeformat().substring(0,14)+"00:00"), Timemoment(nowTimeformat().substring(0,14)+"00:00")]
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
                        <Input showCount maxLength={80}/>
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
                        <Input.TextArea showCount maxLength={200}/>
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
                            showTime={{ format: 'YYYY-MM-DD HH' }}
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
                            <Button onClick={() => {
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
                    width={'1300px'}
                    visible={qlinkvisible}
                    setvisible={setqlinkvisible}
                    title="question link"
                    content={<QuestionLinkPop
                        compId={'id' in params ? params['id'] : ""}
                        reopen={reopenLink}
                    />}
                ></Popup>
            </div>
        </DocumentTitle>
    )
}

