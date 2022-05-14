import {get, post,put,del} from '../utils/request'

/**
 * delete a document by name
 * @param field(str)
 * @param id(str)
 * @param index(str)
 * @param obj
 */
export function delDocumentName(obj){
    return post("/es/delete", obj)
}

/**
 * insert a document
 * @param field(str)
 * @param id(str)
 * @param index(str)
 * @param obj
 */
 export function insertDocument(obj){
    return post("/es/insert", obj)
}

/**
 * show es head
 */
 export function insertDocument(){
    return get("/es/show")
}

/**
 * notice! this update is implemented by insert (will cover origin data
 * @param field(str)
 * @param id(str)
 * @param index(str)
 * @param obj
 */
 export function insertDocument(obj){
    return post("/es/update", obj)
}

/**
 * synchronize the mysql and elasticsearch
 */
export function refreshES(){
    return get("/es/synchronization")
}