// 题目相关的服务类
//传递到这里的参数名应该与接口所需参数名一致
import {get, post,put,del} from '../utils/request'

/**
 * create a question
 * @param obj.name
 * @param obj.content
 * @param obj.hide
 */
export function createQuestion(obj){
    return post("/question/post", obj)
}

/**
 * modify a question's content, name or hide status
 * @param obj.id 
 * @param obj.name
 * @param obj.content
 * @param obj.hide
 */
export function modifyQuestion(obj){
    return put("/question/put", obj)
}

/**
 * select one question according to its id
 * @param obj.id(Long)
 * @param questionId(int)
 */
export function selectQuestionId(obj, questionId){
    return get("/question/" + questionId, obj)
}

/**
 * select all questions with paging
 * @param obj.pageNum(int)
 * @param obj.pageSize(int)
 */
export function selctQuestionByPage(obj){
    return get("/question/all_questions", obj)
}

/**
 * delete one question according to its id
 * @param obj.id(Long)
 */
export function delQustion(obj){
    return del("/question/delete", obj)
}

/**
 * select all questions that are not hided with paging
 * @param obj.pageNum(int)
 * @param obj.pageSize(int)
 */
export function selectQuestionNotHidedPaging(obj){
    return get("/question/all_show_questions", obj)
}

/**
 * show a question using id
 * @param obj.id(Long)
 */
export function showQuestionId(obj){
    return put("/question/show", obj)
}

/**
 * hide a question using id
 * @param obj.id(Long)
 */
 export function hideQuestionId(obj){
    return put("/question/hide", obj)
}
