import React,{useEffect,useState} from 'react'
import DocumentTitle from 'react-document-title'//动态Title
// 解析url参数
import { useLocation } from 'react-router-dom'
import qs from 'qs'
// 服务方法
import {getcomp} from '../../services/competition'
import { message } from 'antd'

export default function ViewCompetition() {

  // 获取url传来的题目id
  let location = useLocation()
  let params = qs.parse(location.search.slice(1))

  // competition的信息
  const [compinfo,setcompinfo]=useState({})
  // 组件创建，下载竞赛信息
  useEffect(()=>{
    if('id' in params){
      getcomp(params['id']).then((res)=>{
        if(res.data.status===1){
          setcompinfo(res.data.obj)
        }else{
          message.error("error")
        }

      })
    }

  },[])

  return (
    <DocumentTitle title="XOJ | Competition">
        <div className='componentbox'>
          ViewCompetition {params['id']}
          {Object.keys(compinfo).map((each,index)=>{
            return <div>{each}:{compinfo[each]}</div>
          })}
        </div>
    </DocumentTitle>
  )
}
