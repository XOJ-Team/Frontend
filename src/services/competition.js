import {get, post, put, del} from '../utils/request'

/**
 * delete a competition 
 * @param obj.id 
 */
export function deletecomp(obj){
    return del('/competition',obj)
}

/**
 * create a competition
 * @param obj.name
 * @param obj.briefIntroduction
 * @param obj.startTime
 * @param obj.endTime
 */
export function createcomp(obj){
    return post('/competition/',obj)
}

/**
 * modify a competition
 * @param obj.id
 * @param obj.name
 * @param obj.briefIntroduction
 * @param obj.startTime
 * @param obj.endTime
 */
export function updatecomp(obj){
    return put('/competition/',obj)
}

/**
 * list competitions by page
 * @param obj.pageNum
 * @param obj.pageSize
 */
export function listcomp(obj){
    return get('/competition/competitions',obj)
}

/**
 * get one competition
 * @param compeitionId
 */
export function getcomp(compeitionId){
    return get('/competition/'+compeitionId)
}

/**
 * link a question to a competition
 * @param obj.questionId
 * @param obj.compeitionId
 * @param obj.score score of this question in this comp 
 */ 
export function addQtocomp(obj){
    return post('/question_competition/',obj)
}

/**
 * show all questions of one competition
 * @param obj.competitionId
 */
export function showQofcomp(obj){
    return get('/question_competition',obj)
}

/**
 * remove one question link to a competition
 * @param obj.id 
 */
// export function removeQofcomp(obj){
//     return del('/question_competition',obj)
// }