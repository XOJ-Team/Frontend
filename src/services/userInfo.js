import {get, post, put, del,getnowBackendUrl} from '../utils/request'

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
    return post("/user/info?id="+obj.id,{})
}

/**
 * user modify itself
 * @param obj.verificationNumber(str)
 * @param obj.name(str)
 * @param obj.mail(str)
 * @param obj.phoneNumber(str)
 * @param obj.password(str)
 */
export function modifyUserInfo(obj){
    return post("/user/modify", obj)
}


export const uploadUserPhotourl=getnowBackendUrl()+'user/image'

/**
 * user upload Avator
 * @param obj.smfile(binary)
 */
export function uploadUserPhotoApi(obj){
    return post("/user/image",obj)
}

/**
 * get now session's user infomation
 */
 export function getUserInfoMy(){
    return get("/user/my")
}


/**
 * modify users' self introduction
 * @param obj.text
 */
export function modifyUserIntro(obj){
    return post("/user/intro", obj)
}