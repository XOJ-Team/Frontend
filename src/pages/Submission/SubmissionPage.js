import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
// UI
import DocumentTitle from 'react-document-title'
import { PageHeader, Descriptions, Divider,Card } from 'antd'
import MarkdownBox from '../../components/Markdown/MarkdownBox'
// utils
import { findRoute } from '../../routers/config'
import { Auth } from '../../contexts/AuthContext'
import qs from 'qs'
import { Base64toUtf8 } from '../../utils/base64'
import { oneRecord } from '../../services/submitRecord'


export default function SubmissionPage() {

    const [info, setinfo] = useState({})
    // 获取url传来的题目id
    let location = useLocation()
    let params = qs.parse(location.search.slice(1))
    const paramsid = params['id']
    let navigate = useNavigate()

    useEffect(() => {
        getSubInfo(paramsid)
    }, [])

    // 获取subid提交记录的信息，记录在info变量里
    const getSubInfo = (subid) => {
        oneRecord({ "recordId": subid }).then((res) => {
            if (res.data.status == 1) {
                setinfo(res.data.obj)
            }
        })
    }

    return (
        <DocumentTitle title="XOJ | Submissions">
            <div class="componentbox" id="subbox" style={{width:"70%", marginLeft:"15%"}}>
                <PageHeader
                    title="Submission Record"
                    subTitle={<a onClick={() => { navigate(findRoute('questionOnlyOne') + "?id=" + info.questionId) }}>{info.questionName}</a>}
                    onBack={() => { navigate(-1) }}
                    style={{
                        padding: "0px 0px 0px 5px",
                    }}
                >
                    <Descriptions size="small" column={3} style={{padding: "0px 0px 10px 15px",}}>
                    <Descriptions.Item label="Time Cost">{info.timeCost + " MS"}</Descriptions.Item>
                    <Descriptions.Item label="Create Time">
                    {
                        info.createTime ?
                            info.createTime.substring(0, 19).replace("T", " ") : null
                    }
                    </Descriptions.Item>
                    <Descriptions.Item label="State">{info.resultDescription}</Descriptions.Item>
                    <Descriptions.Item label="Memory Cost">{info.memoryCost + " KB"}</Descriptions.Item>
                    </Descriptions>
                </PageHeader>
                <Card title={<>Language: {info.lang}<br /></>} bordered={false}>
                {/* 用Markdown实现代码高亮 */}
                <MarkdownBox 
                content={"```"+`${info.lang}\n`+Base64toUtf8(info.codes)+"\n```"}
                style={{padding:'0'}}
                />
                </Card>
            </div>
        </DocumentTitle>
    )
}
