import {get, post,put,del} from '../utils/request'

/**
 * modify the comment of a record
 * @param obj.comments
 * @param obj.id
 */
export function modifyRecordComment(obj){
    return put("/submit_records/", obj)
}

/**
 * show the records of one question
 * @param obj.questionId
 */
 export function showQuestionRecord(obj){
    return get("/submit_records/question_records", obj)
}

/**
 * show the records of a user
 * @param obj.userId
 */
export function showUserRecord(obj){
    return get("/submit_records/user_records", obj)
}

/**
 * create submit record
 * @param obj.codes
 * @param obj.lang
 * @param obj.memoryCost
 * @param obj.questionId
 * @param obj.questionName
 * @param obj.result
 * @param obj.timeCost
 */
export function createSubmitRecord(obj){
    return post('/submit_records/', obj)
}

/**
 * oneRecord
 * @param obj.recordId
 */
export function oneRecord(recordId){
    return get('/submit_records/' + recordId)
}