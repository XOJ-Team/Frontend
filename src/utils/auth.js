export function getToken(){
    return localStorage.getItem("token");
}

export function setToken(e){
    localStorage.setItem("token",e);
}

export function isLogined(){
    // return true;
    return localStorage.getItem('token');
}