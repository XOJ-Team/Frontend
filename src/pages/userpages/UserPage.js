import React, { useContext, useEffect, useState } from 'react';
// UI
import { Layout, Avatar, Divider, Typography, Row, Col, List, Card, Tooltip, Progress, message } from 'antd';
import { UserOutlined, TrophyOutlined, SmileOutlined, CheckCircleOutlined, CheckSquareOutlined } from '@ant-design/icons';
import './UserPage.css';
//utils
import { getUserInfo } from '../../services/userInfo';
import { showUserRecord } from '../../services/submitRecord';
import { useLocation } from 'react-router-dom';
import qs from 'qs'
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

  // 同步数据
  const compcreate=(inputUserid)=>{
    showUserRecord({
      userId:inputUserid
    }).then(
      res => {
        setuserInfo({...userInfo,
          questionlistData:[res.data.obj.map((e)=>{return e.questionName})],
        })
        // setQuestionListData([res.data.obj.map((e) => {return e.questionName})])
      }
    )
    getUserInfo({
      id: inputUserid
    }).then(
      res => {
        if (res.data.status===1){
          const resdata=res.data.obj
          setuserInfo({...userInfo,
            ranking:resdata.ranking,
            score:resdata.score,
            solvedProblems:resdata.solvedNumber,
            avatarUrl:resdata.profilePhoto,
            email:resdata.mail,
            userSelfDescribe:resdata.intro,
            easyNumber:resdata.easyNumber,
            mediumNumber:resdata.mediumNumber,
            hardNumber:resdata.hardNumber
          })
          // setEmail(res.data.obj.mail)
          // const oldQLND = [ ...questionLevelNumData ]
          // oldQLND[0].context = res.data.obj.easyNumber
          // oldQLND[1].context = res.data.obj.mediumNumber
          // oldQLND[2].context = res.data.obj.hardNumber
          // // console.log(oldQLND)
          // setQuestionLevelNumData(oldQLND)
          // setAvatarUrl(res.data.obj.profilePhoto)
          // setRanking(res.data.obj.ranking)
          // setScore(res.data.obj.score)
          // setuserSelfDescribe(res.data.obj.intro)
          // setSolvedProblems(res.data.obj.solvedNumber)
        }
      }
    )
  }


  useEffect(() => {
    if('id' in params){
      compcreate(params.id)
    }else{
      compcreate(farpropsAuth.pUserid)
    }
  }, []);


  const authoritylist={1:'user',2:'super user',3:'manager'}
  // 获取跨组件传来的信息
  const farpropsAuth = useContext(Auth)
  // 用户信息
  const [userInfo,setuserInfo]=useState({
    ranking:0,
    score:0,
    solvedProblems:0,
    avatarUrl:"",
    questionlistData:[],
    email:"",
    userSelfDescribe:"",
    easyNumber:0,
    mediumNumber:0,
    hardNumber:0
  })
  // const [ranking, setRanking] = useState(0);
  // const [score, setScore] = useState(0);
  // const [solvedProblems, setSolvedProblems] = useState(0);
  // const [avatarUrl, setAvatarUrl] = useState("");
  // const [questionlistData, setQuestionListData] = useState([]);
  // const [email, setEmail] = useState("");
  // const [userSelfDescribe, setuserSelfDescribe] = useState('');
  // const [questionLevelNumData, setQuestionLevelNumData] = useState([
  //   {
  //     title: 'EASY',
  //     context: easyNumber,
  //     color: 'green'
  //   },
  //   {
  //     title: 'MEDIUM',
  //     context: mediumNumber,
  //     color: '#ffc306'
  //   },
  //   {
  //     title: 'HARD',
  //     context: hardNumber,
  //     color: 'red'
  //   }
  // ]);


  return (
    <DocumentTitle title="XOJ | UserInfo">
      <div style={{margin:'20px 40px'}}>
        <Header className='headerAbove'></Header>
        <Row className='main_layour'>
          <Col flex={0.5} />
          <Col flex={1} >
            <div className='avatarItem'>
              <UploadProfilePicButton photourl={userInfo.avatarUrl} setphotourl={(data)=>{setuserInfo({...userInfo,avatarUrl:data})}}/>
              <Title level={3}>{farpropsAuth.pUsername}<br />
                <Text type="secondary" style={{ fontSize: 18 }}> XID: {farpropsAuth.pUserid} </Text><br />
                <Text type='secondary' style={{fontSize:18}}> Authority:{authoritylist[farpropsAuth.pAuthority]} </Text><br />
                <Text type="secondary" style={{ fontSize: 14 }}> Email Address: {userInfo.email}</Text>
              </Title>
              {/* <Paragraph
                editable={{
                  onChange: ,
                  maxLength: 50,
                  autoSize: { maxRows: 5, minRows: 3 },
                }}> */}
                {userInfo.userSelfDescribe}
              {/* </Paragraph> */}
            </div>
          </Col>
          <Divider type="vertical" style={{ height: '600px', }} />
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

            <Title level={3} align='center' ><CheckCircleOutlined style={{ color: '#99dc50' }} />&nbsp; Solved Problems<br /></Title>

            <Row>
              <Col>
                <Text>
                  Solved: {userInfo.solvedProblems}
                </Text>
              </Col>
              <Col flex={3} align='center'>
                <List
                  grid={{ gutter: 16, column: 4 }}
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
              dataSource={userInfo.questionlistData}
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
