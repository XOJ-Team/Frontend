import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
// UI
import DocumentTitle from 'react-document-title'
import { PageHeader } from 'antd'
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
            <div class="componentbox">
                <PageHeader
                    title="Submission Record"
                    subTitle={info.questionName}
                    onBack={() => { navigate(-1) }}
                    style={{
                        padding: "10px 0px 30px 30px",
                    }}
                />
                <div>
                    codes:
                    {Base64toUtf8(info.codes)}
                </div>
                <div>
                    createTime:
                    {
                        info.createTime ?
                            info.createTime.substring(0, 19).replace("T", " ") : null
                    }
                </div>
                <div>
                    question name:
                    <a onClick={() => { navigate(findRoute('questionOnlyOne') + "?id=" + info.questionId) }}>{info.questionName}</a>
                </div>
                <div>
                    resultDescription:
                    {info.resultDescription}
                </div>
                <div>
                    time cost:
                    {info.timeCost + "MS"}
                </div>
                <div>
                    memory cost:
                    {info.memoryCost + "KB"}
                </div>
                <div>
                    language:
                    {info.lang}
                </div>
            </div>
        </DocumentTitle>

    )
}
