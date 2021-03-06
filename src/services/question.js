// 题目相关的服务类
//传递到这里的参数名应该与接口所需参数名一致

import {get, post,put,del} from '../utils/request'

/**
 * create a question
 * @param obj.name
 * @param obj.content
 * @param obj.tags
 * @param obj.isHide
 * @param obj.questionLevel
 */
export function createQuestion(obj){
    return post("/question/", obj)
}

/**
 * modify a question's content, name or hide status
 * @param obj.id 
 * @param obj.name
 * @param obj.content
 * @param obj.isHide
 * @param obj.tags
 * @param obj.questionLevel
 */
export function modifyQuestion(obj){
    return put("/question/", obj)
}

/**
 * select one question according to its id
 * @param questionId(int)
 */
export function selectQuestionId(questionId){
    return get("/question/" + questionId)
}

/**
 * select all questions with paging
 * @param obj.pageNum(int)
 * @param obj.pageSize(int)
 */
export function selectQuestionByPage(obj){
    return get("/question/all_questions", obj)
}

/**
 * select questions on page
 * @param obj.ids(list)
 * @param obj.pageNum(int)
 * @param obj.pageSize(int)
 */
export function selectQuestionList(obj){
    return get("/question/question_list", obj)
}


/**
 * delete one question according to its id
 * @param obj.id(Long)
 */
export function delQuestion(obj){
    return del("/question/", obj)
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

/**
 * simply search question (id/name)
 * @param obj.text
 */
export function searchQuestion(obj){
    return get('/question/search',obj)
}

/**
 * details search questions
 * @param obj.text
 * @param obj.from
 * @param obj.size
 */
export function essearchQuestion(obj){
    return post('/question/search/es/limit',obj)
}

/**
 * 上传图片作为题目插图(only manager)
 * @param obj.smfile formData picfile
 */
export function uploadPicinQ(obj){
    return post('/upload',obj)
}