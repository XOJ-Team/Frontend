import React, { useState, useContext, useEffect } from 'react'
import DocumentTitle from 'react-document-title'//动态Title
// UI
import { Pagination, Button, Divider, Typography, message, List, Avatar,Badge } from 'antd';
import './ListCompetition.css'
// utils
import { useNavigate,useLocation } from 'react-router-dom';
import { findRoute } from '../../routers/config';
import { Auth } from '../../contexts/AuthContext';
import { listcomp } from '../../services/competition';
import { duringTime } from '../../utils/timeutils';
import qs from 'qs';


const { Title, Paragraph } = Typography;

// 竞赛的status的map
const mapstatus={
  '-1':{'text':'Ended','status':'error'},
  '0':{'text':'During','status':'success'},
  '1':{'text':'Future','status':'warning'}
}

export default function ListCompetition() {
  // 获取url传来的分页
  const location = useLocation()
  const params = qs.parse(location.search.slice(1))
  // 分页里面的current,请求时用params['page']并跳转url+参数,返回时setpagenow更新
  const [pagenow,setpagenow]=useState(1)
  // 跳转
  const navigate = useNavigate()
  // 全局变量
  const farpropsAuth = useContext(Auth)
  // 竞赛库里竞赛数量
  const [totalitems, settotalitems] = useState(0)
  // 当前竞赛页里的竞赛信息
  const [complist, setcomplist] = useState([])
  // 一页放多少条信息
  const pageSize=10

  // 发起请求获取第page页的竞赛信息
  const pageComp=(page)=>{
    navigate(findRoute('competitionList')+"?page="+page)
    listcomp({
      'pageNum':'page' in params?params['page']:1,
      'pageSize':pageSize
    }).then((res)=>{
      if(res.data.status===1){
        settotalitems(res.data.obj.total)
        setcomplist(res.data.obj.list)
        setpagenow(res.data.obj.pageNum)
      }else{
        message.error('error')
      }
    }).catch((err)=>{
      message.error("network error")
    })
  }

  useEffect(()=>{
    pageComp('id' in params?params['id']:1)
  },[])

  return (
    <DocumentTitle title='XOJ | Competitions'>
      <div className='componentbox' id='competitionlist'>
        <Title level={2}>Competition</Title>
        {farpropsAuth.pAuthority === 3 ? <Button onClick={() => { navigate(findRoute('editcompetition')) }}>Add</Button> : null}
        <List
          itemLayout="horizontal"
          dataSource={complist}
          renderItem={item => (
            <List.Item
              actions={(()=>{
                let result=[]
                const compstatus=duringTime(item.startTime,item.endTime)
                if(farpropsAuth.pAuthority===3){
                  result.push(<Button key='edit' onClick={()=>{navigate(findRoute('editcompetition')+"?id="+item.id)}}>edit</Button>)
                }
                result.push(<Badge style={{width:'100px'}} status={mapstatus[compstatus]['status']} text={mapstatus[compstatus]['text']}/>)
                return result
                })()}
            >
              <List.Item.Meta
                avatar={<Avatar 
                  style={{width:'50px',height:'51px'}}
                  shape="square" 
                  src="https://s2.loli.net/2022/04/18/amMWX8hCVkFpHyz.png" />}
                title={<a id='123' onClick={() => { navigate(findRoute('onecompetition') + '?id=' + item.id) }}>{item.name}</a>}
                description={(<div><Paragraph ellipsis={{ rows: 1 }}>{item.briefIntroduction}</Paragraph><div>{item.startTime}-{item.endTime}</div></div>)}
              />
            </List.Item>
          )}
        />
        <Divider style={{ margin: '0' }} />
        <div style={{ textAlign: 'center' }}>
          <Pagination
            defaultCurrent={1}
            showSizeChanger={false}
            pageSize={pageSize}
            total={totalitems}
            style={{ margin: '20px 0' }}
            onChange={(e) => {pageComp(e)}} />
        </div>
      </div>
    </DocumentTitle>
  )
}
