import {get, post, put, del} from '../utils/request'

/**
 * delete account
 * @param obj.mail(str)
 */
export function delAccount(obj){
    return post("/user/delete", obj)
}

/**
 * get user' information by id
 * @param obj.id(str)
 */
export function getUserInfo(obj){
    return post("/user/info", obj)
}

/**
 * user modify itself
 * @param obj.id(Long)
 * @param obj.verificationNumber(str)
 * @param obj.name(str)
 * @param obj.mail(str)
 * @param obj.phoneNumber(str)
 * @param obj.password(str)
 * @param obj.score(str)
 * @param obj.ranking(str)
 * @param obj.authority(str)
 */
export function modifyUserInfo(obj){
    return post("/user/modify", obj)
}


export const uploadUserPhoto='http://localhost:8081/user/image'