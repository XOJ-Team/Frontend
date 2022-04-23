import React, { useEffect, useState } from 'react'
import DocumentTitle from 'react-document-title'//动态Title
import { useNavigate, useLocation } from 'react-router-dom';
import { findRoute } from '../../routers/config';
// utils
import { getranklist } from '../../services/rank'
import qs from 'qs';
// UI
import { Table, Tag, Typography, Layout, Button, List, message, Switch, Input, Pagination, Row, Col } from 'antd';

const { Title } = Typography

export default function SiteRank() {
  const pageSize = 10
  const navigate = useNavigate()
  // url参数
  let location = useLocation()
  let params = qs.parse(location.search.slice(1))

  // 当前页
  const [pagenow, setpagenow] = useState(1)
  // 总数，分页用
  const [total, settotal] = useState(0)
  // 当前页信息
  const [ranklist, setranklist] = useState([])

  // 函数，请求第page页的排名
  const getrankpage = (page) => {
    navigate(findRoute('siterank') + '?page=' + page)
    getranklist({
      pageNum: page,
      pageSize: pageSize,
    }).then((res) => {
      if (res.data.status === 1) {
        setranklist(res.data.obj.list)
        settotal(res.data.obj.total)
        setpagenow(res.data.obj.pageNum)
      }
    }).catch((err) => {
      message.error("network error")
    })
  }

  // 组件创建时触发
  useEffect(() => {
    getrankpage('page' in params ? params['page'] : 1)
  }, [])

  // 点击页数栏
  const changePage = (p) => {
    getrankpage(p)
  }

  return (
    <DocumentTitle title="XOJ | rank">
      <div className='componentbox' >
        <Title level={2}>Rank</Title>
        <Row style={{textAlign:'center'}}>
          <Col span={4}>Name</Col>
          <Col span={2}>Score</Col>
          <Col span={2}>Ranking</Col>
          <Col span={4}>SolvedNumber</Col>
          <Col span={12}>Intro</Col>
        </Row>
        {ranklist.map((each, index) => {
          return (
            <Row style={{textAlign:'center'}}>
              <Col span={4}>{each.name}</Col>
              <Col span={2}>{each.score}</Col>
              <Col span={2}>{each.ranking}</Col>
              <Col span={4}>{each.solvedNumber}</Col>
              <Col span={12}>{each.intro}</Col>
            </Row>
          )
        })}
        {/* 分页 */}
        <div style={{ textAlign: 'center' }}>
          <Pagination
            current={pagenow}
            showSizeChanger={false}
            pageSize={pageSize}
            total={total}
            style={{ margin: '20px 0' }}
            onChange={changePage} />
        </div>
      </div>
    </DocumentTitle>
  )
}
