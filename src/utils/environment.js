// 根据当前url，返回当前所处的环境
export default function whichcase(){
    let url=window.location.host
    if(url==='localhost:3000'){
        // 开发环境
        return 'dev'
    }else{
        // 默认生产环境
        return 'product'
    }
}