import React, {useContext} from 'react';
import { Layout, Avatar, Divider, Typography, Row, Col, List } from 'antd';
import { UserOutlined, TrophyOutlined, SmileOutlined } from '@ant-design/icons';
import './UserPage.css';
// 全局变量
import { Auth } from '../../contexts/AuthContext';

const { Header } = Layout;
const { Title, Text } = Typography;
 


export default function UserPage() {

  // 获取跨组件传来的信息
  const farpropsAuth=useContext(Auth)

    const email = "000000000@yeah.net"
    const listData = [
        '1',
        '1',
        '1',
        '1',
        '1',
        '1',
    ]
  return (
  <div>
      <Row className='main_layour'>
      <Col flex={1} />
          <Col flex={1}>
              <div className='avatarItem'>
              <Avatar className='user_avatar' size={128} icon={<UserOutlined />} />
              <Title level={3}>WelCome to XOJ, {farpropsAuth.pUsername}.<br/>
                    <Text type="secondary" style={{fontSize:18}}> XID: 00000 </Text>
                    </Title>
              </div>
          </Col>
          <Divider type="vertical" style={{height: '600px',}}/>
          <Col flex={4} className='main_content'>
              <Header className='main_header'>
              <Row justify="space-around">
                <div align='center'>
                <Col flex={1} className='rank'>
                    <Title level={3}><TrophyOutlined />Rank<br/>
                    <Text type="secondary" style={{fontSize:18}}> 22 </Text>
                    </Title>
                    </Col>
                </div>
                <Divider type="vertical" style={{height: '75px'}}/>
                <div align='center'>
                <Col flex={1}><Title level={3}><SmileOutlined />Scores<br/>
                <Text type="secondary" style={{fontSize:18}}>666</Text>
                </Title></Col>
                </div>
              </Row>
              </Header>
              <Divider />
              <Title level={3} style={{padding:'15px',}}>Personal Infomation
                {/* <Text style={{fontSize:14}}>Email Address:<br />
                        Phone Number:
                </Text> */}
                <table style={{fontSize:16, padding:"10px"}}>
                <tr>
                <td>Email Address:</td>
                <td>200</td>
                </tr>
                <tr>
                <td>Phone Number:</td>
                <td>666</td>
                </tr>
                </table>
              </Title>
              <Divider />
              <List
                size="small"
                header={<div><b>Recent AC</b></div>}
                // footer={<div>Footer</div>}
                bordered
                dataSource={listData}
                renderItem={item => <List.Item>{item}</List.Item>}
                />
          </Col>
          <Col flex={1} />
        </Row>
  </div>
  )
}
