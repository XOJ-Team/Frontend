import React, { useEffect, useState } from 'react'
import DocumentTitle from 'react-document-title'//动态Title
// 解析url参数
import { useLocation, useNavigate } from 'react-router-dom'
import qs from 'qs'
// UI
import { Form, Input, Button, DatePicker, Space, message } from 'antd';
// 服务类接口
import { createcomp, getcomp, deletecomp } from '../../services/competition';
// 路由寻找
import { findRoute } from '../../routers/config'
// 日期工具类
import { Timemoment, nowTimemoment, Timeformat, nowTimeformat } from '../../utils/timeutils'
// 窗口工具类
import { showConfirm } from '../../components/confirm';



export default function EditCompetition() {

    //日期选择
    const { RangePicker } = DatePicker;
    // 获取url传来的题目id
    let location = useLocation()
    let params = qs.parse(location.search.slice(1))
    // 跳转
    const navigate = useNavigate()

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
        console.log('Success:', {
            ...values, 'startTime': Timeformat(values.time[0]),
            'endTime': Timeformat(values.time[1])
        });
        if ('id' in params) {
            // edit
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
    // 封装响应事件
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
                        {'id' in params ? (<><Button>View question link</Button><Button
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
            </div>
        </DocumentTitle>
    )
}