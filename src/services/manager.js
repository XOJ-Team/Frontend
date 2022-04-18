import {get, post, put, del} from '../utils/request'

/**
 * delete account
 * @param obj.mail(str)
 */
 export function delManagerAccount(obj){
    return post("/manager/delete", obj)
}

/**
 * insert user
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
export function insertManagerUser(obj){
    return post("/manager/insert", obj)
}

/**
 * manager modify user information
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
 export function modifyManagerUser(obj){
    return post("/manager/modify", obj)
}

