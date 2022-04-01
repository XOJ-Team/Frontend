import React,{useContext, useState, useEffect} from 'react';
// UI
import {CheckOutlined} from '@ant-design/icons';
import {Table, Tag, Typography, Layout, Button, List} from 'antd';
// import './ListQ.css';

// utils
import { useNavigate } from 'react-router-dom';
import {findRoute} from '../../routers/config'
import { Auth } from '../../contexts/AuthContext';
import {selectQuestionByPage, selectQuestionNotHidedPaging} from '../../services/question';
import DocumentTitle from 'react-document-title'//动态Title



const { Sider, Content } = Layout;
const { Text, Title } = Typography;

export default function ListQ(){
  // 页面跳转
  let navigate=useNavigate()
  //定义局部状态
  const [data, setData] = useState([])
  // 总问题数
  const [sumOfquestions,setsumOfquestions]=useState(0)
  const farpropsAuth=useContext(Auth)

  // 封装then方法里的内容
  let succesResponse = (res) => {
    let infolist=[]
      for (let each of res.data.obj.list){
        // 拼接name以支持点击题目名跳转
        each.name=each.id+"#"+each.name
        each.key=each.id//解决Each element in list should have a key警告
        infolist.push(each)
      }
      setData(infolist)
      setsumOfquestions(res.data.obj.total)
  }


  // 生命周期-组件创建
  useEffect(() => {
    if(farpropsAuth['pAuthority']===3){
      selectQuestionByPage({
        pageNum:1,
        pageSize:10
      }).then(
        res => succesResponse(res)
    );
    }else if (farpropsAuth['pAuthority']===1 || farpropsAuth['pAuthority']===2) {
      selectQuestionNotHidedPaging({
        pageNum:1,
        pageSize:10
      }).then(res => succesResponse(res));
    }
    
  },[]);

  //  用户点击页数栏，重新获取题目条目
  const changePage = (page)=>{
    if(farpropsAuth['pAuthority']===3){
      selectQuestionByPage({
        pageNum:page,
        pageSize:10
      }).then(res => succesResponse(res));
    }else if (farpropsAuth['pAuthority']===1 || farpropsAuth['pAuthority']===2) {
      selectQuestionNotHidedPaging({
        pageNum:page,
        pageSize:10
      }).then(res => succesResponse(res));
    }
  }


  const columns = [
    {
      title:'Finish',
      key:'id',
      render: ()=>{
        return <CheckOutlined />
      }
    },
    {
      title: 'Question Title',
      dataIndex: 'name',
      key: 'id',
      render: (text) => {return (<a onClick={()=>{
        // console.log(text.split('.')[0])
        navigate(findRoute('questionOnlyOne')+'?id='+text.split('#')[0])
      }}>{text.split("#")[1]}</a>)},
    },
    {
      title: 'Level',
      key: 'id',
      dataIndex: 'levelDescription',
      render: text => {
            return (
              <Text>
                {text}
              </Text>
            )},
    },
    {
      title: 'Tags',
      key: 'id',
      dataIndex: 'tags',
      render: tags => (
        <>
          {tags.split("#").map((tag,index) => {
            return (
              <Tag key={index}>
                {tag}
              </Tag>
            );
          })}
        </>
      ),
    },
  ];
  // 鉴权以添加编辑标签
  if(farpropsAuth['pAuthority']===3){
    columns.push({
      title: 'Edit',
      dataIndex: 'id',
      key: 'id',
      render: (k) => {return (<a onClick={()=>{navigate(findRoute('questionEdit')+'?id='+k)}}>Edit</a>)},
    })
  }

  return (
    <DocumentTitle title="XOJ | Questions">
      <div>
      {/* 调试需要，默认有权限 */}
      {farpropsAuth['pAuthority']===3?(<Button
      onClick={()=>{
        navigate(findRoute('questionEdit'))
      }}
      >Add</Button>):null}

      <Table 
          columns={columns} 
          dataSource={data} 
          bordered 
          pagination={{
            position:["bottomCenter"],
            // 每页条数
            pageSize: 10,
            // 条目总数
            total:sumOfquestions,
            // 用户切换页数
            onChange:changePage
          }}
          />
      </div>
    </DocumentTitle>
  )
}