import React,{useState,useEffect} from 'react'
import ReactDOM from 'react-dom'
// utils
import MarkdownIt from 'markdown-it';
// import ReactMarkdown from 'react-markdown';
import { useLocation,useNavigate } from 'react-router-dom';
import qs from 'qs'
import {findRoute} from '../../routers/config'
import {selectQuestionId} from '../../services/question'
import { message,PageHeader,Button,Tag } from 'antd';
import { getTestcase } from '../../services/testcase';
import DocumentTitle from 'react-document-title'//动态Title

const mdParser = new MarkdownIt(/* Markdown-it options */);

export default function LookQ() {
  let navigate=useNavigate()
  const [mdword,setmdword] = useState("")
  const [questionTitle,setquestionTitle] = useState(null)
  const [questionHard,setquestionHard] = useState(null)
  const [tags,settags]=useState("")
  const [testcases,settestcases]=useState([])

  // 困难标签的颜色
  const whichcolor={'easy':'green','medium':'orange','hard':'red'}


  // 获取url传来的题目id
  let location = useLocation()
  let params = qs.parse(location.search.slice(1))

  // 模拟组件挂载周期函数
  useEffect(()=>{
    if('id' in params){
      // 题目信息
      selectQuestionId(params['id']).then((e)=>{
        if(e.data.status===1){
          setquestionTitle(e.data.obj.name)
          setquestionHard(e.data.obj.levelDescription)
          settags(e.data.obj.tags)
          setmdword(e.data.obj.content)
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
    <div>
    <PageHeader
    title={questionTitle}
    onBack={()=>{navigate(-1)}}
    />
    <div style={{padding:"0px 50px"}}>
    <Tag color={whichcolor[questionHard]}>{questionHard}</Tag>
    <div>
      <span style={{color:'gray'}}>Tags:</span>
      {tags.split("#").map((item,index)=>{
      return <Tag key={index}>{item}</Tag>
    })}
    </div>

    {/* <ReactMarkdown children={mdword} /> */}
    <div 
    style={{
      border:'1px solid black',
      borderRadius:'10px',
      padding:'0px 30px',
      overflow:'auto',
      // 超出长度自动换行
      tableLayout:'fixed',
      wordBreak:'break-all',
      wordWrap:'break-word'
    }}
    dangerouslySetInnerHTML={{__html:mdParser.render(mdword)}}></div>

    <div>testcase:</div>
    {testcases.map((e)=>{return <div>input: {e.testcase},result: {e.result}</div>})}

    <Button 
    type='primary'
    onClick={()=>{
      // navigate()
    }}
    >
      Start to write
    </Button>
    </div>

    </div>
    </DocumentTitle>
  )
}



