import React,{useEffect,useState} from 'react';
import { message, Transfer,Input } from 'antd';
import { addQtocomp,removeQofcomp,showQofcomp } from '../../services/competition';
import { searchQuestion } from '../../services/question';


const {Search}=Input
/**
 * 问题选择穿梭框
 * @param props.compId 
 * @param props.reopen
 */
export default function QuestionLinkPop(props){

    // 已经在竞赛里的题目列表,含有[额外加个key=题目的id,questionName=题目的名字,id=Link的id,额外加个name=题目的名字使他们保持一致]
    const [incompq,setincompq]=useState([])
    // 搜索结果列表，含有[额外加个key=题目的id,name=题目的名字]
    const [searchq,setsearchq]=useState([])
    // dataSource数据源。数据源应当是搜索框检索+已经在竞赛里的列表
    // 指定在右边的数据的keys
    const [targetKeys,settargetKeys]=useState([])

    // 从服务器同步当前状态
    const getUpdateLinks=()=>{
        // 填充搜索框
        leftsearch("")
        // 同步竞赛links
        showQofcomp({'competitionId':props.compId}).then((res)=>{
            // 添加key=问题的id
            const result1=copyAttribute(res.data.obj,'key','questionId')
            // 添加name
            const result2=copyAttribute(result1.result,'name','questionName')
            // 加到数据源里
            setincompq(result2.result)
            // 已经在竞赛里，放右边
            settargetKeys(result1.keys)
        })
    }

    // 同步已经在竞赛里的题目列表
    useEffect(()=>{
        getUpdateLinks()
    },[])

    // 合并两个列表里的东西，key不重复
    const mergelist=(lista,listb)=>{
        let finallist=[]
        let ids=[]
        for(let each of lista){
            if(!ids.includes(each.key)){
                finallist.push(each)
                ids.push(each.key)
            }
        }
        for(let each of listb){
            if(!ids.includes(each.key)){
                finallist.push(each)
                ids.push(each.key)
            }
        }
        console.log("final list:",finallist)
        return finallist
    }

    /**
     * 给列表内json对象添加新属性，顺便返回这个list的所有被复制属性的不重复列表
     * @param inputlist 输入的列表
     * @param keyname 新的属性的名字
     * @param whichaskey 字符串，新属性所复制的老属性的名字，item.keyname=item[whichaskey]
     */
    const copyAttribute=(inputlist,keyname,whichaskey)=>{
        let resultlist=[]
        let keylist=[]
        for (let each of inputlist){
            each[keyname]=each[whichaskey]
            resultlist.push(each)
            keylist.push(each[whichaskey])
        }
        // console.log(resultlist)
        return {'result':resultlist,'keys':keylist}
    }

    //在对象列表里查找 item.valname=val,返回item
    const searchinlist=(list,valname,val)=>{
        for (let item of list){
            if(item[valname]===val){
                return item
            }
        }
        return -1
    }

    // 穿梭框内元素移动事件
    const handleChange=(newallselectedKey,toside,changedKey)=>{
        // 重新赋值在右边的keys
        settargetKeys(newallselectedKey)
        if(toside==="left"){
            removelinks(changedKey)
        }else if(toside==="right"){
            addlinks(changedKey)
        }
        console.log(newallselectedKey,toside,changedKey)
    }
    
    // 移除links网络事件
    const removelinks=(datalist)=>{
        for(let data of datalist){
            (function(data){
                const questionName=searchinlist(incompq,'key',data).name
                removeQofcomp({
                    'id':searchinlist(incompq,'key',data).id
                }).then((res)=>{
                    if(res.data.status===1){
                        message.success(`success remove Q: <${questionName}> from competition`)
                    }else{
                        message.error(res.data.comment)
                    }
                    getUpdateLinks()
                }).catch(()=>{
                    message.error("Server error")
                    getUpdateLinks()
                })
            })(data)
        }
    }
    // 添加links网络事件
    const addlinks=(datalist)=>{
        for(let data of datalist){
            // 使用闭包,以在for循环中发起多个涉及到了函数结果的异步请求
            (function(data){
                const questionName=searchinlist(searchq,'key',data).name
                addQtocomp({
                    'questionId':data,
                    'competitionId':props.compId,
                    'questionName':questionName
                }).then((res)=>{
                    if(res.data.status===1){
                        message.success(`success add Q: <${questionName}> to competition`)
                    }else{
                        message.error(res.data.comment)
                    }
                    getUpdateLinks()
                }).catch(()=>{
                    message.error("Server error")
                    getUpdateLinks()
                })
            })(data)
        }
    }

    // 搜索题目事件
    const leftsearch=(val)=>{
        searchQuestion({'text':val}).then((res)=>{
            const {result,keys}=copyAttribute(res.data.obj,'key','id')
            setsearchq(result)
        }).catch(()=>{
            message.error("Network error")
        })
    }

    // 处理搜索
    const handleSearch=(value)=>{
        leftsearch(value)
        console.log('search',value)
    }

    return (
        <div>
        <div style={{marginLeft:'88px'}}>
            <Search 
            placeholder='Seach here and add to right'
            onSearch={handleSearch}
            style={{width:'500px'}} />
        </div>
        <div>
        <Transfer
        oneWay={true}
        dataSource={mergelist(incompq,searchq)}
        showSelectAll={false}
        targetKeys={targetKeys}
        onChange={handleChange}
        render={(item) => {
                return item.key+'. '+item.name
        }}
        titles={['search','include']}
        operations={['add','']}
        style={{
            justifyContent:'center'
        }}
        listStyle={{
            width:500,
            height:500
        }}
        />
        </div>
        </div>
        
    )
}