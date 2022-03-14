
export function getToken(){
    return localStorage.getItem("token");
}

export function setToken(e){
    return localStorage.setItem("token",e);
}

export function isLogined(){
    // return true;
    return localStorage.getItem('token');
}

export function getUsername(){
    return localStorage.getItem("username");
}

export function setUsername(e){
    return localStorage.setItem("username",e);
    // localStorage.username=e
    // localStorage['username']=e
}