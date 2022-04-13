import React,{useEffect,useState} from 'react'
import DocumentTitle from 'react-document-title'//动态Title
// 解析url参数
import { useLocation } from 'react-router-dom'
import qs from 'qs'
// 服务方法


export default function ViewCompetition() {

  // 获取url传来的题目id
  let location = useLocation()
  let params = qs.parse(location.search.slice(1))

  // 组件创建，下载竞赛信息
  useEffect(()=>{},[])

  return (
    <DocumentTitle title="XOJ | Competition">
        <div className='componentbox'>
          ViewCompetition {params['id']}
        </div>
    </DocumentTitle>
  )
}
