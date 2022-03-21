import React,{useState,useEffect} from 'react'
import ReactDOM from 'react-dom'
// utils
import ReactMarkdown from 'react-markdown'
import { useLocation,useNavigate } from 'react-router-dom';
import qs from 'qs'
import {findRoute} from '../../routers/config'
import {selectQuestionId} from '../../services/question'
import { message,PageHeader,Button } from 'antd';


export default function LookQ() {
  let navigate=useNavigate()

  // 获取url传来的题目id
  let location = useLocation()
  let params = qs.parse(location.search.slice(1))
  if('id' in params){
    selectQuestionId(params['id']).then((e)=>{
      if(e.data.status===1){
        setquestionTitle(e.data.obj.name)
        setquestionHard(e.data.obj.levelDescription)
        setmdword(e.data.obj.content)
      }else{
        message.error('error id:'+params['id'])
      }
    })
  }else{
    message.warn("should have a id in url")
  }
  const [mdword,setmdword] = useState(null)
  const [questionTitle,setquestionTitle] = useState(null)
  const [questionHard,setquestionHard] = useState(null)

  return (<div>
    <PageHeader
    onBack={(e) => navigate(-1)}
    title={questionTitle}
    subTitle={questionHard}
    />
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



