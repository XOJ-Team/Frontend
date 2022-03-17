// 用户登录登出服务类
//传递到这里的参数名应该与接口所需参数名一致
import {get, post} from '../utils/request'

/**
 * user login (email+password)
 * @param obj.mail
 * @param obj.password
 */
export function loginApi(obj){
    return post("/login/normal",obj)
}

/**
 * send a verification code to email
 * @param obj.mail
 */
 export function sendCodeApi(obj){
    return post("/verify",obj)
}

/**
 * user register and login (email+code)
 * @param obj.mail
 * @param obj.verificationNumber
 * @param obj.name
 * @param obj.password
 */
 export function registerApi(obj){
    return post("/login/mail",obj)
}

/**
 * user login out
 */
export function logoutApi(){
    return post('/logout')
}

