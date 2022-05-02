import React,{useState,useEffect} from 'react';
import { Table, Pagination } from 'antd';

/**
使用样例
<PageList 
    // antd的Table组件
    columns={[
        {
            title:'Question Name',
            dataIndex:'name',
            key:'name',
            render:(e)=>{return <div>e</div>}
        }
    ]}
    // axios service 请求函数
    request={selectQuestionNotHidedPaging}
    // 页数在请求参数中的名字
    requestPageName='pageNum'
    // 请求参数的名字及其默认值
    requestParams={{'pageNum':1,'pageSize':10}}
    // 回调函数，接受网络响应结果，返回格式化后的json对象。把当前页的列表映射到datalist，把item总数映射到total
    response={(res)=>{
        return {
            datalist:res.data.obj.questionsPage.list,
            total:res.data.obj.questionsPage.total
        }
    }}
/>

*/




/**
 * List with pagination，带有简化分页条的以表格形式展示的组件，封装了整个请求数据到显示表格的流程
 * @param props.columns (必)List, antd Table组件的columns属性，控制每列数据渲染，每个元素包含title,dataIndex,key,render
 * @param props.request (必)Promise,请求的service函数,如selectQuestionByPage
 * @param props.requestPageName (必)String,请求参数中页的属性名字，如'pageNum'
 * @param props.requestParams (必)json,请求参数及其默认值，如{'pageSize':10,'pageNum':1}
 * @param props.response (必)function,响应后的拦截器,函数要接受网络相应结果，然后 把总结果数映射到结果的total变量，把当前页结果列表映射到datalist变量。返回内容如{total:20,datalist:[{},{},{}]}
 */
export default function PageList(props) {
    // 值初始化
    let {columns,request,requestPageName,requestParams,response}=props
    if(!request){request=(e)=>{return new Promise((resolve,reject)=>{resolve("no request service")})}}
    if(!requestPageName){requestPageName='pageName'}
    if(!requestParams){requestParams={};requestParams[requestPageName]='1'}
    if(!response){response=(e)=>{return e}}
    // console.log({'columns':columns,'request':request,'requestPageName':requestPageName,'requestParams':requestParams,'response':response})
    // 变量
    const [data,setdata]=useState([])
    const [sumofdata,setsumofdata]=useState(10)
    const [pagenow,setpagenow]=useState(requestParams[requestPageName])

    // 模拟组件创建
    useEffect(()=>{
        getpage(pagenow)
    },[])

    // 点击页数栏
    const changePage=(page)=>{
        getpage(page)
    }

    // 显示第page页
    const getpage=(page)=>{
        requestParams[requestPageName]=page
        request(requestParams).then(response).then((finaldata)=>{
            console.log(finaldata)
            if(finaldata.datalist){
                setdata(finaldata.datalist)
            }
            setpagenow(page)
            if(finaldata.total){
                setsumofdata(finaldata.total)
            }else{
                setsumofdata(10*page+1)
            }
        }).catch((err)=>{return err})
    }

    return (
        <div>
            {/* 表格 */}
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
                    total={sumofdata}
                    style={{ margin: '20px 0' }}
                    onChange={changePage} />
            </div>
        </div>
    )
}
