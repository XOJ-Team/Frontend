import {get, post,put,del} from '../utils/request'


/**
 * @param obj.pageNum
 * @param obj.pageSize
 */
export function getranklist(obj){
    return get('/user/rankinglist',obj)
}