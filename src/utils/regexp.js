//正则校验的正则表达式，这里注意正则表达式中的‘\’要使用‘\\’转义
const patterns = {
    "name":"^[a-zA-Z_][0-9a-zA-Z_]{0,}$",
    "tel":"^1[2-9]\\d{0,}$",
    "email":"^\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$",
    "pwd":"^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)]|[\\(\\)])+$)([^(0-9a-zA-Z)]|[\\(\\)]|[a-z]|[A-Z]|[0-9]){8,}$"
}
 
//对应正则表达式的提示信息
const patternMsg = {
    "name":"请以字母、下划线开头并包括数字、字母、下划线组成",
    "tel":"not a valid phone number",
    "email":"not a valid email address",
    "pwd":"password should contain number and letter"
}
 
//根据使用的正则返回对应的正则和信息对象
export default function pattern(name,para='g'){
    return {
        pattern:new RegExp(patterns[name],para),
        message:patternMsg[name]
    }
} 

/**
 * return a regular class of a type , then you can use .test to check
 * 
 * for example,reg('tel')=/^1[2-9]\\d{0,}$/,
 */
export const reg=(name)=>{
    return new RegExp(patterns[name],'g')
}