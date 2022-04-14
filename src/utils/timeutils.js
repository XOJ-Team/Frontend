// 时间工具类，输入时间格式 yyyy-MM-dd HH:mm:ss，输出年月天时分秒
// 传入的月份从1开始
import moment from 'moment'

const format='YYYY-MM-DD HH:mm:ss'

/**
 * return now time in moment Object
 */
 export function nowTimemoment(){
    return moment()
}

/**
 * parse time String, return moment Object. {years,months,date,hours,minutes,seconds}
 * @param timestr in format yyyy-MM-dd HH:mm:ss
 * @return Object moment
 */
export function Timemoment(timestr){
    return moment(timestr,format)
}

/**
 * return now time in str in format yyyy-MM-dd HH:mm:ss
 */
export function nowTimeformat(){
    return moment().format(format)
}

/**
 * change moment object to str using format yyyy-MM-dd HH:mm:ss
 */
export function Timeformat(momenttime){
    return momenttime.format(format)
}

/**
 * judge timestr to nowtime
 * 
 * @param timestr yyyy-MM-dd HH:mm:ss
 * @return -1:timestr is passed,0:timestr==nowtime,1:timestr is in future
 */
export function judgeTime(timestr){
    const nowtime=moment()
    const targettime=moment(timestr,format)
    const difftime=moment(nowtime).diff(targettime)
    if(difftime>0){
        return -1
    }else if(difftime==0){
        return 0
    }else if(difftime<0){
        return 1
    }
}

/**
 * judge whether now is during the time period
 * 
 * @param startstr
 * @param endstr
 * @return -1:time period is passed,0:nowtime is during period,1:time period is in future
 */
export function duringTime(startstr,endstr){
    const start=judgeTime(startstr)
    const end=judgeTime(endstr)
    if(end<0){
        return -1
    }else if(start<=0&&end>=0){
        return 0
    }else{
        return 1
    }
}