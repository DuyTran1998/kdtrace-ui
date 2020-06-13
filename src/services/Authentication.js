const accessToken = 'token';
export  function isLoggedIn(){
    if(localStorage.getItem(accessToken) !== null){
        return true;
    }
    else{
        return false;
    }
}

export function deleteAccessToken(){
    return localStorage.removeItem(accessToken);
}
