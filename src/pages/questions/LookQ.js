import React,{useState,useEffect} from 'react'
import ReactDOM from 'react-dom'
// utils
import MarkdownIt from 'markdown-it';
// import ReactMarkdown from 'react-markdown';
import { useLocation,useNavigate } from 'react-router-dom';
import qs from 'qs'
import {findRoute} from '../../routers/config'
import {selectQuestionId} from '../../services/question'
import { getTestcase } from '../../services/testcase';
// UI
import DocumentTitle from 'react-document-title'//动态Title
import './LookQ.css';
import { message,PageHeader,Button,Tag, Row, Col, Divider, List, Typography, Card } from 'antd';
import {EyeOutlined,EyeInvisibleOutlined} from '@ant-design/icons';

const mdParser = new MarkdownIt(/* Markdown-it options */);

export default function LookQ() {
  let navigate=useNavigate()

  const [questionInfo,setquestionInfo]=useState({name:'',levelDescription:'',tags:"",content:'',creatorName:''})
  const [testcases,settestcases]=useState([])

  const [showtags,setshowtags]=useState(false)
  // 困难标签的颜色
  // const whichcolor={'easy':'green','medium':'orange','hard':'red'}
  const whichcolor={'easy':'success','medium':'warning','hard':'danger'}


  // 获取url传来的题目id
  let location = useLocation()
  let params = qs.parse(location.search.slice(1))

  // 模拟组件挂载周期函数
  useEffect(()=>{
    if('id' in params){
      // 题目信息
      selectQuestionId(params['id']).then((e)=>{
        if(e.data.status===1){
          setquestionInfo(e.data.obj)
        }else{
          message.error('error id:'+params['id'])
        }
      })
      // testcase信息
      getTestcase({
        'questionId':params['id']
      }).then((res)=>{
        if(res.data.status===1){
          settestcases(res.data.obj)
        }
      })
    }else{
      message.warn("should have a id in url")
    }
  },[])

  return (
  <DocumentTitle title="XOJ | Question">
    <Row 
    className='main_context'
    gutter={26}
    >
      <Col className='question_descrip' span={16} offset={1}>
    <PageHeader
    title={params['id']+". "+questionInfo.name}
    onBack={()=>{navigate(-1)}}
    style={{
      padding:"10px 0px 30px 30px",
    }}
    >
    <div style={{padding:"0px 10px"}}>
    {/* <ReactMarkdown children={mdword} /> */}
    <Divider orientation="left">Question Description</Divider>
    <div 
    style={{
      borderRadius:'10px',
      padding:'0px 20px 0px 10px',
      overflow:'auto',
      // 超出长度自动换行
      tableLayout:'fixed',
      wordBreak:'break-all',
      wordWrap:'break-word'
    }}
    dangerouslySetInnerHTML={{__html:mdParser.render(questionInfo.content)}}></div>
    <div style={{
      textAlign:'center',
      padding:'10px',
      }}>
      <Button 
      type='primary'
      onClick={()=>{
        // navigate()
      }}
      >
        Start to write
      </Button>
    </div>
    <Divider orientation="left">Test Case Example</Divider>
    {testcases.map((e)=>{return <div style={{
      padding:'0px 30px',
      }}>
        <Card.Grid 
        style={{
          padding:'10px 20px', 
          width: '30%',
          height:'200px',
          overflow:'auto',
          tableLayout:'fixed',
          wordBreak:'break-all',
          wordWrap:'break-word',
          backgroundColor:'rgba(1,5,68,0.1)',
          borderRadius:'15px' }}>
      <p><b>Input:</b><br/>{e.testcase}<br/><b>Result:</b><br/>{e.result}</p>
      </Card.Grid></div>})}
    </div>
    <Divider />
    </PageHeader>
    </Col>
    <Col></Col>
    <Col className='question_info' span={5}>
    {/* <div>
      <div>Difficulty: <Tag color={whichcolor[questionHard]}>{questionHard}</Tag></div>
      <span style={{color:'gray'}}>Tags:</span>
      {tags.split("#").map((item,index)=>{
      return <Tag key={index}>{item}</Tag>
    })}
    </div> */}
    <List
    header={<b>Question Information</b>}
    itemLayout="horizontal"
    >
      <List.Item>Question ID: {params['id']}</List.Item>
      <List.Item>Created By: <a>{questionInfo.creatorName}</a></List.Item>
      <List.Item><div>Difficulty: <Typography.Text type={whichcolor[questionInfo.levelDescription]}>{questionInfo.levelDescription.toUpperCase()}</Typography.Text></div></List.Item>
      <List.Item>Time Limit: {questionInfo.timeLimit}</List.Item>
      <List.Item>Memory Limit: {questionInfo.memoryLimit}</List.Item>
      <List.Item>
        <div>
          Tags:
          <span style={{marginLeft:'5px'}}>
          {showtags?<EyeInvisibleOutlined onClick={()=>{setshowtags(false)}}/>:<EyeOutlined onClick={()=>{setshowtags(true)}}/>}
          </span>
          <br/>
          {/* 只隐藏文字不隐藏标签框 */}
          {/* {tags.split("#").map((item,index)=>{
          return (<Tag style={showtags?{margin:"5px 5px",color:'rgba(0,0,0,1)'}:{margin:"5px 5px",color:'rgba(0,0,0,0)'}} key={index}>{item}</Tag>)
          })} */}
          {/* 隐藏整个标签框，位置保留 */}
          <span style={showtags?{}:{visibility:'hidden'}}>
          {questionInfo.tags.split("#").map((item,index)=>{
          return (<Tag style={{margin:"5px 5px"}} key={index}>{item}</Tag>)
          })}
          </span>
        </div>
      </List.Item>
    </List>
    </Col>
    </Row>
    </DocumentTitle>
  )
}



