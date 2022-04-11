import React, { useContext, useEffect, useState } from 'react';
import { Layout, Avatar, Divider, Typography, Row, Col, List, Card, Tooltip, Progress } from 'antd';
import { UserOutlined, TrophyOutlined, SmileOutlined, CheckCircleOutlined, CheckSquareOutlined } from '@ant-design/icons';
import './UserPage.css';
//utils
// 全局变量
import { Auth } from '../../contexts/AuthContext';
import DocumentTitle from 'react-document-title'//动态Title
import { getUserInfo } from '../../services/userInfo';

const { Header } = Layout;
const { Title, Text, Paragraph } = Typography;



export default function UserPage() {
  useEffect(() => {
    getUserInfo({
      id: farpropsAuth.pUserid
    }).then(
      res => {
        if (res.data.status===1){
          setEmail(res.data.obj.mail)
          const oldQLND = [ ...questionLevelNumData ]
          oldQLND[0].context = res.data.obj.easyNumber
          oldQLND[1].context = res.data.obj.mediumNumber
          oldQLND[2].context = res.data.obj.hardNumber
          console.log(oldQLND)
          setQuestionLevelNumData(oldQLND)
          setAvatarUrl(res.data.obj.profilePhoto)
          setRanking(res.data.obj.ranking)
          setScore(res.data.obj.score)
        }
      }
    )
  }, []);



  const [userSelfDescribe, setuserSelfDescribe] = useState(
    'This is an self introduction editing by yourself.'
  );
  // 获取跨组件传来的信息
  const farpropsAuth = useContext(Auth)
  const [ranking, setRanking] = useState(0);
  const [score, setScore] = useState(0);

  const [email, setEmail] = useState("000000000@yeah.net");
  const [questionLevelNumData, setQuestionLevelNumData] = useState([
    {
      title: 'EASY',
      context: 0,
      color: 'green'
    },
    {
      title: 'MEDIUM',
      context: 0,
      color: '#ffc306'
    },
    {
      title: 'HARD',
      context: 0,
      color: 'red'
    }
  ]);

  const [avatarUrl, setAvatarUrl] = useState("https://pic.imgdb.cn/item/624ec937239250f7c511aa66.jpg");

  const [questionlistData, setQuestionListData] = useState([
    '1. questionID',
    '556.qustionID',
    '123.questionID',
    '156.questionID',
    '5.questionID',
  ]);
  return (
    <DocumentTitle title="XOJ|UserInfo">
      <div style={{margin:'20px 40px'}}>
        <Header className='headerAbove'></Header>
        <Row className='main_layour'>
          <Col flex={0.5} />
          <Col flex={1}>
            <div className='avatarItem'>
              <Avatar className='user_avatar' src = {avatarUrl} size={128}/>
              <Title level={3}>Welcome to XOJ, {farpropsAuth.pUsername}.<br />
                <Text type="secondary" style={{ fontSize: 18 }}> XID: {farpropsAuth.pUserid} </Text><br />
                <Text type="secondary" style={{ fontSize: 14 }}> Email Address: {email}</Text>
              </Title>
              <Paragraph
                editable={{
                  onChange: setuserSelfDescribe,
                  maxLength: 50,
                  autoSize: { maxRows: 5, minRows: 3 },
                }}>
                {userSelfDescribe}
              </Paragraph>
            </div>
          </Col>
          <Divider type="vertical" style={{ height: '600px', }} />
          <Col flex={4} className='main_content'>
            <Header className='main_header'>
              <Row justify="space-around">
                <div align='center'>
                  <Col flex={1} className='rank'>
                    <Title level={3} ><TrophyOutlined style={{ color: '#ffc306' }} />&nbsp; Rank<br />
                      <Text type="secondary" style={{ fontSize: 18 }}> {ranking} </Text>
                    </Title>
                  </Col>
                </div>
                <Divider type="vertical" style={{ height: '75px' }} />
                <div align='center'>
                  <Col flex={1}><Title level={3} ><SmileOutlined style={{ color: '#ffc306' }} />&nbsp; Scores<br />
                    <Text type="secondary" style={{ fontSize: 18 }}>{score}</Text>
                  </Title></Col>
                </div>
              </Row>
            </Header>
            <Divider />

            <Title level={3} align='center' ><CheckCircleOutlined style={{ color: '#99dc50' }} />&nbsp; Solved Problems<br /></Title>

            <Row>
              <Col flex={1} align='center'>
                <Tooltip title="24 solved / 26 to do">
                  <Progress percent={((10 + 10 + 4) / (10 + 10 + 4 + 26)) * 100} type="circle" strokeColor={{
                    '0%': '#99dc50',
                    '100%': '#9aee3e',
                  }}
                    format={percent => `${percent} Solved`}
                  />
                </Tooltip>
              </Col>
              <Col flex={3} align='center'>
                <List
                  grid={{ gutter: 16, column: 4 }}
                  dataSource={questionLevelNumData}
                  renderItem={item => (
                    <List.Item>
                      <Card title={item.title} headStyle={{ color: item.color }}>{item.context}</Card>
                    </List.Item>
                  )}
                />
              </Col>
            </Row>
            <Divider />
            <List
              header={<div><CheckSquareOutlined />&nbsp;<b>Recent AC</b></div>}
              bordered
              dataSource={questionlistData}
              style={{marginBottom:'24px'}}
              renderItem={item => <List.Item>{item}</List.Item>}
            />
          </Col>
          <Col flex={1} />
        </Row>
      </div>
    </DocumentTitle>
  )
}
