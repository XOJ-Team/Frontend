// 用户登录登出服务类
import {get, post} from '../utils/request'

/**
 * user login
 * return the response of server,you can add .then() to use callback function
 */
export function loginApi(user){
    return get("/api/login",user)
}

/**
 * send a verification code to email
 */
 export function sendCodeApi(user){
    return get("",user)
}

/**
 * user register
 * return the response of server,you can add .then() to use callback function
 */
 export function registerApi(user){
    return post("/api/register",user)
}

