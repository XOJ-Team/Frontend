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

/**存储用户邮箱
 *  
 * 
 * */ 
export function getUseremail(){
    return localStorage.getItem("useremail");
}

export function setUseremail(e){
    return localStorage.setItem("useremail",e);
    // localStorage.username=e
    // localStorage['username']=e
}