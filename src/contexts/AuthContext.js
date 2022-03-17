// TODO: using Redux
// React
import React, {createContext,useState} from 'react'

// 跨组件传参父组件

/**
 * 传递pUsername,setpUsername()
 */
export const Auth = createContext()

// 包装时接受children
export function AuthContext({children}){
    // 要传递的信息
    const [pUsername,setpUsername]=useState(null)

    return (
    // 传进来的children作为子组件渲染
    // value里放传递的信息和回调
    <Auth.Provider value={{pUsername,setpUsername}}>
        {children}
    </Auth.Provider>
    )
}

