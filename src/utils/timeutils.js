// 时间工具类，输入时间格式 yyyy-MM-dd HH:mm:ss，输出年月天时分秒
// 传入的月份从1开始
import moment from 'moment'

const format='YYYY-MM-DD HH:mm:ss'

/**
 * parse time String, return {years,months,date,hours,minutes,seconds}
 * @param timestr yyyy-MM-dd HH:mm:ss
 * @return years,months,date,hours,minutes,seconds
 */
export function parseTime(timestr){
    const targettime=moment(timestr,format)
    return targettime.toObject()
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
 * @return true if startstr<=nowtime<=endstr
 */
export function duringTime(startstr,endstr){
    return judgeTime(startstr)<=0 && judgeTime(endstr)>=0
}