import React,{useEffect,useState} from 'react'
// UI
import { PageHeader, Button, Card, List, Tabs, Timeline, Row, Col, Divider, Badge } from 'antd'
import CountDown from 'ant-design-pro/lib/CountDown'
import { duringTime } from '../../utils/timeutils';
import { CalendarOutlined } from '@ant-design/icons';

import DocumentTitle from 'react-document-title'//动态Title
import './ViewCompetition.css';
// 解析url参数
import { useLocation,useNavigate } from 'react-router-dom'
import {findRoute} from '../../routers/config'
import qs from 'qs'
// 服务方法
import {getcomp} from '../../services/competition'
import { message } from 'antd'

const { TabPane } = Tabs;

export default function ViewCompetition() {

  const navigate=useNavigate()

  // 获取url传来的题目id
  let location = useLocation()
  let params = qs.parse(location.search.slice(1))

  // competition的信息
  const [compinfo,setcompinfo]=useState({})
  // question links 的信息
  const [qlinkinfo,setqlinkinfo]=useState([])
  // 组件创建，下载竞赛信息
  useEffect(()=>{
    if('id' in params){
      getcomp(params['id']).then((res)=>{
        if(res.data.status===1){
          setcompinfo(res.data.obj.competitionModel)
          // console.log(res.data.obj.links)
          setqlinkinfo(res.data.obj.links)
        }else{
          message.error("error")
        }

      })
    }},[])

    // 竞赛的status的map
    const mapstatus={
      '-1':{'text':'Ended','color':'red'},
      '0':{'text':'During','color':'green'},
      '1':{'text':'Future','color':'orange'}
    }
    const compstatus=duringTime(compinfo['startTime'],compinfo['endTime'])

  return (
    <DocumentTitle title="XOJ | Competition">
        <div className='componentbox'>
          <Row>
            <Col span={18} className='competContext'>
              <PageHeader
                ghost={false}
                onBack={() => window.history.back()}
                title={compinfo['name']}
                subTitle={"Competition ID:"+params['id']}
                style={{
                  padding:"0px"
                }}
              >
                <div style={{
                  textAlign:"center",
                  fontSize:"16px",
                }}>
                  The contest will start in: <CountDown target={compinfo['startTime']} />
                </div>

                <Tabs defaultActiveKey="1">
                  <TabPane tab="Announcements" key="1">
                    <div style={{textAlign:"center", color:"rgba(0,0,0,0.5)"}}>The creator has not made any announcements yet.</div>
                  </TabPane>
                  <TabPane tab="Questions list" key="2">
                  {qlinkinfo.map((each)=>{
                    return <List key={each.id} itemLayout="horizontal" style={{padding:"0px 0px 0px 15px"}}>
                      <List.Item>
                        <List.Item.Meta
                          title={<a onClick={()=>{navigate(findRoute('questionOnlyOne')+'?id='+each.questionId)}}>{each.questionId}. {each.questionName}</a>
                        }
                          />
                      </List.Item>
                    </List>
                  })}
                  </TabPane>
                  <TabPane tab="Rank" disabled key="3">
                    Rank
                  </TabPane>
                </Tabs>
              </PageHeader>
            </Col>
            <Col span={5} push={1}>
              <Badge.Ribbon color={mapstatus[compstatus]['color']} text={mapstatus[compstatus]['text']}>
                <Card title={<><CalendarOutlined style={{color:'rgb(206, 87, 193)'}} /> Time Line</>} hoverable
                style={{
                  padding:'10px 20px',
                  tableLayout:'fixed',
                  wordBreak:'break-all',
                  wordWrap:'break-word',
                  borderRadius:'15px',
                  whiteSpace: 'pre-wrap' }} size="small">
                    <br />
                  <Timeline mode={'alternate'}>
                    <Timeline.Item label={compinfo['startTime']}>Start Time</Timeline.Item>
                    <Timeline.Item label={compinfo['endTime']}>End Time</Timeline.Item>
                  </Timeline>
                  <div 
                  style={{
                    textAlign:'center',
                    padding:'10px',
                  }}>
                    <Button type="primary" shape='round'>
                      Join
                    </Button>
                  </div>
                </Card>
              </Badge.Ribbon>
            </Col>
          </Row>
          
        </div>
    </DocumentTitle>
  )
}
