// React
import React, {createContext,useEffect,useState} from 'react'
import {getUserInfoMy} from '../services/userInfo'
// 跨组件传参父组件

/**
 * 传递pUserinfo,包含->pUsername,pAuthority,pUserid
 * 
 * 使用方法：
 * 
 * const farpropsAuth=useContext(Auth)
 * 
 * farpropsAuth.pUsername得到用户名
 * 
 * farpropsAuth.pUserinfo得到用户信息对象
 * 
 * farpropsAuth.setpUserinfo({...farpropsAuth.pUserinfo,})设置整个信息对象，需要解构对象
 */
export const Auth = createContext()

// 包装时接受children
export function AuthContext({children}){
    // 要传递的信息
    // pUsername用户名,有值的话用户已登录
    // pUserid用户id
    // pAuthority用户权限 1普通用户2能创建比赛3管理员

    // pUserinfo,对象,存储了用户信息
    const [pUserinfo,setpUserinfo]=useState({
        pUsername:null,
        pUserid:null,
        pAuthority:1
    })

    // 色调
    const XJTLUNAVY="#010544"
    const XJTLUPURPLE="#CE57C1"

    /** 
     * 刷新全局变量中 当前用户的信息
     * */ 
    const pgetNewestMyInfo=()=>{
        getUserInfoMy().then((res)=>{
            const myinfo=res.data.obj
            // console.log("尝试获取当前会话用户的信息",res.data.obj)
            if(myinfo){
                setpUserinfo({...pUserinfo,
                    pUsername:myinfo.name,
                    pUserid:myinfo.id,
                    pAuthority:myinfo.authority
                })
            }
        })
    }

    // console.log("rerender AuthContext",pUserinfo)
    useEffect(()=>{
        // 发起网络请求当前Session的用户信息
        // console.log("create AuthContext",pUserinfo)
        pgetNewestMyInfo()
    },[])

    return (
    // 传进来的children作为子组件渲染
    // value里放传递的信息和回调
    <Auth.Provider value={{
        pUsername:pUserinfo.pUsername,
        pAuthority:pUserinfo.pAuthority,
        pUserid:pUserinfo.pUserid,
        pUserinfo,
        setpUserinfo,
        pgetNewestMyInfo,
        XJTLUNAVY,XJTLUPURPLE
        }}>
        {children}
    </Auth.Provider>
    )
}

