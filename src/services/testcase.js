// testcase相关的服务类
//传递到这里的参数名应该与接口所需参数名一致
import {get, post, put, del} from '../utils/request'

/**
 * delete testcase
 * @param obj.id
 */
export function delTestcase(obj){
    return del('/testcase/',obj)
}

/**
 * get testcase
 * @param obj.questionId
 */
export function getTestcase(obj){
    return get('/testcase/',obj)
}

/**
 * create a new testcase
 * @param obj.questionId
 * @param obj.testcase
 * @param obj.result
 */
export function newTestcase(obj){
    return post('/testcase/',obj)
}

/**
 * @param obj.id
 * @param obj.testcase
 * @param obj.result
 */
export function changeTestcase(obj){
    return put('/testcase/',obj)
}