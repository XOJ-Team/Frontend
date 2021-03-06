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
 * user login (email+code)
 * @param obj.mail
 * @param obj.verificationNumber
 */
export function logincodeApi(obj){
    return post("/login/mail",obj)
}

/**
 * send a verification code to email
 * @param obj.mail
 */
 export function sendCodeApi(obj){
    return post("/verify",obj)
}

/**
 * user register
 * @param obj.mail
 * @param obj.verificationNumber
 * @param obj.name
 * @param obj.password
 */
 export function registerApi(obj){
    return post("/register/mail",obj)
}

/**
 * user login out
 */
export function logoutApi(){
    return post('/logout')
}

/**
 * user session id
 */
export function getnowsession(){
    return get('/connect/session')
}

/**
 * get user Authentiate
 */
export function getNoAuthentication(obj){
    return get('/noAuthentication', obj)
}

/**
 * post user Authentiate
 */
 export function postNoAuthentication(obj){
    return post('/noAuthentication', obj)
}

/**
 * send verification code
 * @param obj.from(str)
 * @param obj.mail(str)
 */
export function sendPassword(obj){
    return post("/send/password", obj)
}

/**
 * send verification code
 * @param obj.from(str)
 * @param obj.mail(str)
 */
 export function verify(obj){
    return post("/verify", obj)
}