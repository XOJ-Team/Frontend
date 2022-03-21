import React,{useState,useEffect} from 'react'
import ReactDOM from 'react-dom'
// utils
import ReactMarkdown from 'react-markdown'
import { useLocation,useNavigate } from 'react-router-dom';
import qs from 'qs'
import {findRoute} from '../../routers/config'
import {selectQuestionId} from '../../services/question'
import { message,PageHeader,Button,Tag } from 'antd';


export default function LookQ() {
  let navigate=useNavigate()
  const [mdword,setmdword] = useState(null)
  const [questionTitle,setquestionTitle] = useState(null)
  const [questionHard,setquestionHard] = useState(null)
  const [tags,settags]=useState("")


  // 获取url传来的题目id
  let location = useLocation()
  let params = qs.parse(location.search.slice(1))

  // 模拟组件挂载周期函数
  useEffect(()=>{
    if('id' in params){
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
    }else{
      message.warn("should have a id in url")
    }
  },[])
  

  return (
  <div>
    <PageHeader
    title={questionTitle}
    subTitle={questionHard}
    onBack={()=>{navigate(-1)}}
    />

    <div>
      Tags:
      {tags.split("#").map((item,index)=>{
      return <Tag key={index}>{item}</Tag>
    })}
    </div>

    <ReactMarkdown children={mdword} />

    <Button 
    type='primary'
    onClick={()=>{
      // navigate()
    }}
    >
      Start to write
    </Button>
    </div>
  )
}



