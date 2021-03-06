import React,{useContext, useState, useEffect} from 'react';
// UI
import {CheckOutlined} from '@ant-design/icons';
import {Table, Tag, Typography, Layout, Button, List, message,Switch,Input,Pagination} from 'antd';
// import './ListQ.css';

// utils
import { useLocation,useNavigate } from 'react-router-dom';
import {findRoute} from '../../routers/config'
import { Auth } from '../../contexts/AuthContext';
import {selectQuestionByPage, selectQuestionNotHidedPaging,essearchQuestion} from '../../services/question';
import DocumentTitle from 'react-document-title'//动态Title
import { refreshES } from '../../services/search';
import qs from 'qs'


const { Sider, Content } = Layout;
const { Text, Title } = Typography;
const {Search} =Input;

export default function ListQ(){
  // 获取url传来的分页
  const location = useLocation()
  const params = qs.parse(location.search.slice(1))
  // 分页里面的current,useEffect用params['page']请求并跳url+参数,切换页面用方法入参请求并跳url+参数,返回时setpagenow更新
  const [pagenow,setpagenow]=useState('page' in params?params['page']:1)
  // 页面跳转
  const navigate=useNavigate()
  // 题目的信息
  const [data, setData] = useState([])
  // 总问题数
  const [sumOfquestions,setsumOfquestions]=useState(0)
  // 是否显示tags
  const [showtag,setshowtag]=useState(false)
  // 全局传参
  const farpropsAuth=useContext(Auth)
  // 用户已经AC的题目列表
  const [listFinished,setlistFinished]=useState([])

  // 困难标签的颜色
  const whichcolor={'easy':'green','medium':'orange','hard':'red'}


  // 封装题目信息获取then方法里的内容
  let succesResponse = (res) => {
    let infolist=[]
      for (let each of res.data.obj.questionsPage.list){
        // 拼接name以支持点击题目名跳转
        each.name=each.id+"#"+each.name
        each.key=each.id//解决Each element in list should have a key警告
        infolist.push(each)
      }
      setData(infolist)
      setpagenow(res.data.obj.questionsPage.pageNum)
      setsumOfquestions(res.data.obj.questionsPage.total)
      if(res.data.obj.questionIds){setlistFinished(res.data.obj.questionIds)}
  }

  //封装error响应
  const failedResponse=(res)=>{
    message.error("Network error")
  }

  // 向服务器请求page页的问题
  const pageQuestion=(page)=>{
    // 路径参数，改参数不触发重新渲染
    navigate(findRoute('questionList')+"?page="+page)
    if(farpropsAuth['pAuthority']===3){
      selectQuestionByPage({
        pageNum:page,
        pageSize:10
      }).then(succesResponse).catch(failedResponse);
    }else if (farpropsAuth['pAuthority']===1 || farpropsAuth['pAuthority']===2) {
      selectQuestionNotHidedPaging({
        pageNum:page,
        pageSize:10
      }).then(succesResponse).catch(failedResponse);
    }
  }

  // 向服务器请求第page页的搜索查询结果
  const pageSearchQuestion=(page,text)=>{
    // 路径参数，改参数不触发重新渲染
    navigate(findRoute('questionList')+"?page="+page+"&search="+text)
    // 处理搜索返回值
    essearchQuestion({
      'value':text,
      'from':10*(page-1),
      'size':10
    }).then((res)=>{
      if(res.data.status!==1){
        message.error("server error")
        return 
      }
      if(! res.data.obj.res){
        message.warn("no result!")
        return
      }
      let infolist=[]
      for (let each of res.data.obj.res){
        // 拼接name以支持点击题目名跳转
        each.name=each.id+"#"+each.name
        each.key=each.id//解决Each element in list should have a key警告
        infolist.push(each)
      }
      setData(infolist)
      setpagenow(page)
      setsumOfquestions(res.data.obj.total)
    }).catch(()=>{
      message.error("Something error")
    })
  }

  // 生命周期-组件创建
  useEffect(() => {
    if('search' in params){
      // 有search关键词就search
      pageSearchQuestion('page' in params?params['page']:1,params['search'])
    }else{
      pageQuestion('page' in params?params['page']:1)
    }
  },[]);

  // 搜索框筛选题目
  // id,name,levelDescription,total,rate,tags
  const searchQ=(text)=>{
    if(text===''){
      pageQuestion(1)
    }else{
      // message.success("you will search: "+text)
      pageSearchQuestion(1,text)
    }
    
  }

  const changeSearch=(e)=>{
    if(e.target.value===''){
      pageQuestion(1)
    }
  }

  //  用户点击页数栏，重新获取题目条目
  const changePage = (page)=>{
    if('search' in params){
      // 有search关键词就search
      pageSearchQuestion(page,params['search'])
    }else{
      pageQuestion(page)
    }
  }


  const columns = [
    {
      title:'Finish',
      dataIndex:'id',
      key:'id',
      width:10,
      render: (idd)=>{
        if(listFinished.includes(idd)){
          return <CheckOutlined style={{color:'green'}} />
        }else{
          return <div></div>
        }
      }
    },
    {
      title: 'Question Title',
      dataIndex: 'name',
      key: 'id',
      render: (text) => {return (<a onClick={()=>{
        // console.log(text.split('.')[0])
        navigate(findRoute('questionOnlyOne')+'?id='+text.split('#')[0])
      }}>{text.replace("#",". ")}</a>)},
    },
    {
      title: 'Level',
      key: 'id',
      dataIndex: 'levelDescription',
      width:150,
      render: text => {
            return (
              <Tag color={whichcolor[text]}>
                {text}
              </Tag>
            )},
    },
    {
      title:'Total',
      key:'id',
      dataIndex:'total',
      width:150,
      render: data=>{
        return <div>{data}</div>
      }
    },
    {
      title:'AC rate',
      key:'id',
      dataIndex:'rate',
      width:150,
      render: data=>{
        return <div>{data}</div>
      }
    },
    {
      title:(
      <div>
      Tags : 
      <Switch 
      id='tagswitch'
      style={{marginLeft:'10px'}}
      checkedChildren={<div>Tags</div>}
      unCheckedChildren={<div>Tags</div>}
      checked={showtag}
      onClick={()=>{setshowtag(!showtag)}} />
      </div>),
      key: 'id',
      dataIndex: 'tags',
      width:300,
      render: tags => (
        <>
        {showtag?
        <>
        {tags.split("#").map((tag,index) => {
            return (
              <Tag key={index}>
                {tag}
              </Tag>
            );
          })}
        </>
        :
        <div style={{color:'gray'}}>-</div>
        }
        </>
      ),
    }
  ];
  // 鉴权以添加编辑标签
  if(farpropsAuth['pAuthority']===3){
    columns.push({
      title: 'Edit',
      dataIndex: 'id',
      key: 'id',
      width:100,
      render: (k) => {return (<a onClick={()=>{navigate(findRoute('questionEdit')+'?id='+k)}}>Edit</a>)},
    })
  }

  return (
    <DocumentTitle title="XOJ | Questions">
      <div className='componentbox'>
      <Title level={2}>Questions</Title>
      <div id='optionsbox' style={{position:'relative',height:'35px',lineHeight:'35px',margin:'10px 0px'}}>
        {/* 添加问题按钮 */}
        {farpropsAuth['pAuthority']===3?(
          <>
        <Button
        onClick={()=>{
          navigate(findRoute('questionEdit'))
        }}
        >
          Add
        </Button>

        <Button
        onClick={()=>{
          refreshES().then((res)=>{
            if(res.data.status==1){
              message.success("success update ES")
            }
          })
        }}
        >
          Update ES
        </Button>
        </>
        ):null}

        <div style={{position:'absolute',right:'0',top:'0'}}>
          <Search 
          onSearch={searchQ}
          onChange={changeSearch}
          style={{display:'inline-block',
          width:'300px'}}
          defaultValue={params['search']}
          placeholder="search keywords"
          />
          
        </div>
      </div>
      {/* 问题列表 */}
      <Table 
          columns={columns} 
          dataSource={data} 
          bordered 
          pagination={false}
      />
      {/* 分页 */}
      <div style={{ textAlign: 'center' }}>
          <Pagination
            current={pagenow}
            showSizeChanger={false}
            pageSize={10}
            total={sumOfquestions}
            style={{ margin: '20px 0' }}
            onChange={changePage} />
      </div>

      </div>
    </DocumentTitle>
  )
}