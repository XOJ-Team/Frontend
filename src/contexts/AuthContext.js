// TODO: using Redux
// React
import React, {createContext,useState} from 'react'

// 跨组件传参父组件

/**
 * 传递pUsername,pAuthority,pUserid
 * 
 * 使用方法：
 * let obj=useContext(Auth)
 * obj.pUsername
 */
export const Auth = createContext()

// 包装时接受children
export function AuthContext({children}){
    // 要传递的信息
    // 用户名,有值的话用户已登录
    const [pUsername,setpUsername]=useState(null)
    // 用户id
    const [pUserid,setpUserid]=useState(null)
    // 用户权限 1普通用户2能创建比赛3管理员
    const [pAuthority,setpAuthority]=useState(1)

    return (
    // 传进来的children作为子组件渲染
    // value里放传递的信息和回调
    <Auth.Provider value={{
        pUsername,setpUsername,
        pAuthority,setpAuthority,
        pUserid,setpUserid
        }}>
        {children}
    </Auth.Provider>
    )
}

