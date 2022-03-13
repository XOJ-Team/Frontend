// 用户登录登出服务类
import {post} from '../utils/request'

/**
 * user login
 * return the response of server,you can add .then() to use callback function
 */
export function loginApi(user){
    return get("/api/login",user)
}

/**
 * user register
 * return the response of server,you can add .then() to use callback function
 */
 export function registerApi(user){
    return post("/api/register",user)
}