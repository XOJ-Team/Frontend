// 用户登录登出服务类
//传递到这里的参数名应该与接口所需参数名一致
import {get, post} from '../utils/request'

/**
 * user login (email+password)
 * you can add .then() to use callback function
 */
export function loginApi(user){
    return post("/login/normal",user)
}

/**
 * send a verification code to email
 */
 export function sendCodeApi(user){
    return post("/verify",user)
}

/**
 * user register, login (email+code)
 * you can add .then() to use callback function
 */
 export function registerApi(user){
    return post("/login/mail",user)
}

