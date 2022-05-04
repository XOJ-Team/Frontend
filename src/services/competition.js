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
 * @param competitionId
 */
export function getcomp(competitionId){
    return get('/competition/'+competitionId)
}

/**
 * link a question to a competition
 * @param obj.questionId
 * @param obj.competitionId
 * @param obj.questionName
 * @param obj.score 先不填score of this question in this comp 
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
 * modify question in competition
 * @param obj.id question-link id
 * @param obj.score
 */
export function modifyQofcomp(obj){
    return put('/question_competition',obj)
}

/**
 * remove one question link to a competition
 * @param obj.id question-link id
 */
export function removeQofcomp(obj){
    return del('/question_competition',obj)
}

/**
 * user quit a competition
 * @param obj.competitionId(long)
 */
export function quitComp(obj){
    return del('/user_competition/', obj)
}

/**
 * user register a competition
 * @param obj.competitionId(long)
 */
 export function registerComp(obj){
    return post('/user_competition/', obj)
}

/**
 * get user ranking list in a competition
 * @param obj.pageNum
 * @param obj.pageSize
 */
export function getRankComp(obj){
    return get('/user_competition/user_list')
}