// 这里是半持久化存储，存储用户的登录状态以让刷新后也能维持登录
// 和组件state相关或根据账户信息变化的量的需要通过Context进行传递
// sessionStorage会话存储：保留在客户端，刷新不会消失，关闭窗口会消失
// localStorage本地存储：保留在客户端，只有手动删除才会消失
import localStorage from "localStorage"

const diedseconds=1800
//===========方便用户填登录框=============

/**从localStorage中获取用户邮箱
 * */ 
export function getUseremail(){
    return localStorage.getItem("useremail");
}

/**存储用户邮箱到localStorage
 * */ 
export function setUseremail(e){
    localStorage.setItem("useremail",e);
}

/**从localStorage中删除用户邮箱
 */
export function delUseremail(){
    localStorage.removeItem('useremail')
}

//=========使登录状态刷新后也能维持===========
// userauth
// Sessionusername:用户名,Sessionuserid:用户id,Sessionuserauthority:用户权限,Sessionlastupdatetime:


// export function getSessionusername(){
//     if(){
//         return JSON.parse(sessionStorage.getItem("userauth")).Sessionusername
//     }else{
//         return null
//     }
// }

