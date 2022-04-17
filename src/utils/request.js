import axios from 'axios';
import qs from 'qs';
import whichcase from './environment';

const urlpool={
    // 本地后端
    'dev':'http://localhost:8081/',
    // 服务器后端
    'product':'https://api.xoj.codes/'
}

// 获取现在的请求地址
export const getnowBackendUrl=()=>{
    return urlpool[whichcase()]
}

const instance=axios.create({
    baseURL:getnowBackendUrl(),//根据不同的环境选择不同的url来请求
    timeout:60000,
    withCredentials:true // 允许携带cookie
})
// 添加请求拦截器
instance.interceptors.request.use(config=>{
	// config 请求配置
	
	// 请求成功拦截
    console.log("utils/request.js: 请求成功, 请求地址: "+config.url+"\n请求内容: ",config)
    return config
},err=>{
	// 请求错误拦截
    console.log("utils/request.js: 请求错误, 错误内容: ",err)
    return Promise.reject(err)
})  

// 添加响应拦截器
instance.interceptors.response.use(res=>{
	// res 响应结果
	// 响应成功拦截
    console.log("utils/request.js: 成功响应，响应内容",res)
    return res
},err=>{
	// 响应错误拦截
    console.log("utils/request.js: 响应错误,错误内容",err)
    return Promise.reject(err)
})

/**
 * get
 * @param {*} url    请求地址
 * @param {*} params 请求参数
 */
export function get(url,data={}){
    return instance.get(url,{params:data})
}

/**
 * post
 * @param {*} url    请求地址
 * @param {*} data   数据
 */
export function post(url,data={}){
    return instance.post(url,data)
}

/**
 * put
 * @param {*} url    请求地址
 * @param {*} data   数据
 */
export function put(url,data={}){
    return instance.put(url,data)
}

/**
 * delete
 * @param {*} url    请求地址
 */
export function del(url,data={}){
    return instance.delete(url,{params:data})
}