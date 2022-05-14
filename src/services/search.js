import {get, post,put,del} from '../utils/request'

/**
 * synchronize the mysql and elasticsearch
 */
export function refreshES(){
    return get("/es/synchronization")
}