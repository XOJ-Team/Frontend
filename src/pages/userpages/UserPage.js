import React, { useContext, useEffect, useState } from 'react';
// UI
import { Layout, Table,Divider, Typography, Row, Col, List, Card, Button } from 'antd';
import { UserOutlined, TrophyOutlined, SmileOutlined, CheckCircleOutlined, CheckSquareOutlined } from '@ant-design/icons';
import './UserPage.css';
//utils
import { getUserInfo } from '../../services/userInfo';
import { showUserRecord } from '../../services/submitRecord';
import { useLocation, useNavigate } from 'react-router-dom';
import qs from 'qs'
import { findRoute } from '../../routers/config';
// component
import UploadProfilePicButton from '../../components/UploadProfilePicButton'
// 全局变量
import { Auth } from '../../contexts/AuthContext';
import DocumentTitle from 'react-document-title'//动态Title


const { Header } = Layout;
const { Title, Text, Paragraph } = Typography;



export default function UserPage() {
  // 获取url传来的题目id
  let location = useLocation()
  let params = qs.parse(location.search.slice(1))
  const paramsid = params['id']

  // 监听params里id值的变化，达到url参数更新时页面能够刷新的效果
  useEffect(() => {
    if ('id' in params) {
      compcreate(params.id)
    } else {
      compcreate(farpropsAuth.pUserid)
    }
  }, [paramsid])

  const navigate = useNavigate()

  const authoritylist = { 1: 'user', 2: 'super user', 3: 'manager' }
  // 获取跨组件传来的信息
  const farpropsAuth = useContext(Auth)
  // 用户信息
  const [userInfo, setuserInfo] = useState({
    name: "",
    id: 0,
    authority: 1,
    ranking: 0,
    score: 0,
    solvedProblems: 0,
    avatarUrl: "",
    email: "",
    userSelfDescribe: "",
    easyNumber: 0,
    mediumNumber: 0,
    hardNumber: 0
  })

  // 用户最近提交记录
  const [questionlistData, setQuestionlistData] = useState([])

  // 同步数据
  const compcreate = (inputUserid) => {
    showUserRecord({
      userId: inputUserid
    }).then(
      resa => {
        setQuestionlistData(resa.data.obj.map((each)=>{
          return {...each,questionName:each.questionId+"#"+each.questionName,resultDescription:each.id+"#"+each.resultDescription}
        }))
      }
    )
    getUserInfo({
      id: inputUserid
    }).then(
      res => {
        if (res.data.status === 1) {
          const resdata = res.data.obj
          setuserInfo({
            ...userInfo,
            name: resdata.name,
            id: resdata.id,
            authority: resdata.authority,
            ranking: resdata.ranking,
            score: resdata.score,
            solvedProblems: resdata.solvedNumber,
            avatarUrl: resdata.profilePhoto,
            email: resdata.mail,
            userSelfDescribe: resdata.intro,
            easyNumber: resdata.easyNumber,
            mediumNumber: resdata.mediumNumber,
            hardNumber: resdata.hardNumber
          })
        }
      }
    )
  }


  useEffect(() => {
    if ('id' in params) {
      compcreate(params.id)
    } else {
      compcreate(farpropsAuth.pUserid)
    }
  }, []);





  return (
    <DocumentTitle title="XOJ | UserInfo">
      <div style={{ margin: '20px 40px' }}>
        <Header className='headerAbove'></Header>
        <Row className='main_layour'>
          <Col flex={0.5} />
          <Col flex={1} style={{ minWidth: '300px' }}>
            <div className='avatarItem'>
              <UploadProfilePicButton
                photourl={userInfo.avatarUrl}
                setphotourl={(data) => { setuserInfo({ ...userInfo, avatarUrl: data }) }}
                enabled={params['id'] == farpropsAuth.pUserid}
              />
              <Title level={3}>{userInfo.name}<br />
                <Text type="secondary" style={{ fontSize: 14 }}> XID: {userInfo.id} </Text><br />
                <Text type='secondary' style={{ fontSize: 14 }}> Authority: {authoritylist[userInfo.authority].toUpperCase()} </Text><br />
                <Text type="secondary" style={{ fontSize: 14 }}> Email Address: {userInfo.email}</Text>
              </Title>
              <Paragraph>
                {userInfo.userSelfDescribe}
              </Paragraph>
              {/* 使用==号，一个是数字，一个是字符串 */}
              {params['id'] == farpropsAuth.pUserid ? <Button onClick={() => { navigate(findRoute('editUserInfo')) }}>Modify my info</Button> : null}
              {farpropsAuth.pAuthority === 3 ? <Button onClick={() => {
                navigate(findRoute('manageusers') + "?id=" + params['id'])
              }}>Manage users</Button> : null}

            </div>
          </Col>
          <Col flex={0.5} />
          <Divider type="vertical" style={{ height: '600px', }} />
          <Col flex={1} />
          <Col flex={4} className='main_content'>
            <Header className='main_header'>
              <Row justify="space-around">
                <div align='center'>
                  <Col flex={1} className='rank'>
                    <Title level={3} ><TrophyOutlined style={{ color: '#ffc306' }} />&nbsp; Rank<br />
                      <Text type="secondary" style={{ fontSize: 18 }}> {userInfo.ranking} </Text>
                    </Title>
                  </Col>
                </div>
                <Divider type="vertical" style={{ height: '75px' }} />
                <div align='center'>
                  <Col flex={1}><Title level={3} ><SmileOutlined style={{ color: '#ffc306' }} />&nbsp; Scores<br />
                    <Text type="secondary" style={{ fontSize: 18 }}>{userInfo.score}</Text>
                  </Title></Col>
                </div>
              </Row>
            </Header>
            <Divider />

            <Title level={3} align='center' ><CheckCircleOutlined style={{ color: '#99dc50' }} />&nbsp; Solved Problems: {userInfo.solvedProblems}<br /></Title>

            <Row >
              <Col flex={3} align='center'>
                <List
                  grid={{ gutter: 16, column: 3 }}
                  dataSource={[
                    {
                      title: 'EASY',
                      context: userInfo.easyNumber,
                      color: 'green'
                    },
                    {
                      title: 'MEDIUM',
                      context: userInfo.mediumNumber,
                      color: '#ffc306'
                    },
                    {
                      title: 'HARD',
                      context: userInfo.hardNumber,
                      color: 'red'
                    }
                  ]}
                  renderItem={item => (
                    <List.Item>
                      <Card
                        title={item.title}
                        headStyle={{ color: item.color }}
                        bodyStyle={{ fontSize: 18 }}
                        hoverable="true"
                      ><b>{item.context}</b></Card>
                    </List.Item>
                  )}
                />
              </Col>
            </Row>
            <Divider />

            {/* 最近的提交记录 */}
            <Table
              columns={[
                {
                  title:'question',
                  dataIndex:'questionName',
                  key:'id',
                  render:(e)=>(<a onClick={()=>{navigate(findRoute('questionOnlyOne')+"?id="+e.substring(0,e.indexOf('#')))}}>{e?e.substring(0,e.indexOf('#'))+". "+e.substring(e.indexOf("#")+1):null}</a>)
                },
                {
                  title:'result',
                  dataIndex:'resultDescription',
                  key:'id',
                  render:(e)=>(
                    params['id'] == farpropsAuth.pUserid?
                    (
                      <a onClick={()=>{
                        navigate(findRoute('submission')+"?id="+e.substring(0,e.indexOf('#')))
                        }}>
                        {e?e.substring(e.indexOf("#")+1):null}
                      </a>
                    ):(
                    <div>{e?e.substring(e.indexOf("#")+1):null}</div>
                    )
                    )
                },
                {
                  title: 'Time Cost',
                  dataIndex: 'timeCost',
                  key: 'id',
                  render: (e) => (<div>{e+" MS"}</div>)
                },
                {
                  title: 'Memory Cost',
                  dataIndex: 'memoryCost',
                  key: 'id',
                  render: (e) => (<div>{e+" KB"}</div>)
                },
                {
                  title:"language",
                  dataIndex:"lang",
                  key:'id',
                  render:(e)=>(<div>{e}</div>)
                },
                {
                  title: "Create Time",
                  dataIndex: 'createTime',
                  key: 'id',
                  render: (e) => (<div>{e && e.substring(0, 19).replace("T", " ")}</div>)
                }
              ]}
              dataSource={questionlistData}
              bordered
              pagination={false}
            />
          </Col>
          <Col flex={1} />
        </Row>
      </div>
    </DocumentTitle>
  )
}
