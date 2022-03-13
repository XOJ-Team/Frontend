import axios from 'axios';
import qs from 'qs';
import { getToken } from './auth';


const instance=axios.create({
    baseURL:"https://autumnfish.cn",
    timeout:2000
})

// 添加请求拦截器
instance.interceptors.request.use(config=>{
	// config 请求配置
	if(false){
        // 符合某些前缀时，使用token
        config.headers['Authorization']='Bearer '+getToken();
    }
	// 发送网络请求时，在界面显示一个请求的同步动画
	// 某些请求（比如登录（token））必须携带一些特殊的信息
	
	// 请求成功拦截
    console.log("utils/request.js: 请求拦截器, 请求url"+config.url)
    return config
},err=>{
	// 请求失败拦截
    return Promise.reject(err)
})  

// 添加响应拦截器
instance.interceptors.response.use(res=>{
	// res 响应结果
	// 响应成功拦截
    console.log("utils/request.js: 响应拦截器")
    return res
},err=>{
	// 响应拦失败拦截
    return Promise.reject(err)
})

/**
 * get
 * @param {*} url    请求地址
 * @param {*} params 请求参数
 */
export function get(url,params){
    return instance.get(url,params)
}

/**
 * post
 * @param {*} url    请求地址
 * @param {*} data   数据
 */
export function post(url,data){
    // 对数据进行一次序列化
    return instance.post(url,qs.stringify(data))
}

/**
 * put
 * @param {*} url    请求地址
 * @param {*} data   数据
 */
export function put(url,data){
    return instance.put(url,data)
}

/**
 * delete
 * @param {*} url    请求地址
 */
export function del(url){
    return instance.delete(url)
}