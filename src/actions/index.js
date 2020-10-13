import * as types from '../constants/ActionTypes';

export const getUserContext = () => {
    return {
        type: types.GET_USER_CONTEXT
    }
}

export const setUserContext = (username, roleName) =>{
    return {
        type: types.SET_USER_CONTEXT,
        userContext: {
            username,
            roleName,
        }
    }
}

export const deleleUserContext = () =>{
    return {
        type: types.DELETE_USER_CONTEXT,
    }
}