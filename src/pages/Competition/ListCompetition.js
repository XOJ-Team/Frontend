import React, { useState } from 'react'
import DocumentTitle from 'react-document-title'//动态Title
import { Pagination, Button,Divider,Typography,message, List, Avatar } from 'antd';
import './ListCompetition.css'

const {Title,Paragraph}=Typography;

export default function ListCompetition() {
  const [totalitems, settotalitems] = useState(0)
  const [complist, setcomlist] = useState([{ title: 'Competition A' }, { title: 'Competition B' },{ title: 'Competition C' }])
  return (
    <DocumentTitle title='XOJ | Competitions'>
      <div className='componentbox' id='competitionlist'>
        <List
          itemLayout="horizontal"
          dataSource={complist}
          renderItem={item => (
            <List.Item
            actions={[<Button key='edit'>edit</Button>]}
            >
              <List.Item.Meta
                avatar={<Avatar size={40} src="https://joeschmoe.io/api/v1/random" />}
                title={<a id='123' onClick={(e)=>{console.log(e.target.id)}}>{item.title}</a>}
                description={(<div><Paragraph ellipsis={{rows:1}}>brief introduction</Paragraph><div>start at 12:00 2022/02/22</div></div>)}
              />
            </List.Item>
          )}
          />
        <Divider style={{margin:'0'}}/>
        <div style={{ textAlign: 'center' }}>
          <Pagination 
          defaultCurrent={1} 
          showSizeChanger={false} 
          pageSize={10} 
          total={totalitems} 
          style={{margin:'20px 0'}}
          onChange={() => { }} />
        </div>
      </div>
    </DocumentTitle>
  )
}
