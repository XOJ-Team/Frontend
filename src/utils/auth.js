// 这里是半持久化存储，和组件state相关或根据账户信息变化的量的需要通过Context进行传递
// 需要导入localStorage以支持localStorage
import localStorage from "localStorage"

export function getToken(){
    return localStorage.getItem("token");
}

export function setToken(e){
    return localStorage.setItem("token",e);
}

export function isLogined(){
    // return true;
    return localStorage.getItem('token');
}

/**存储用户邮箱到硬盘
 * */ 
export function getUseremail(){
    return localStorage.getItem("useremail");
}

/**从硬盘中获取用户邮箱
 * */ 
export function setUseremail(e){
    return localStorage.setItem("useremail",e);
    // localStorage.username=e
    // localStorage['username']=e
}