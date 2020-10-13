import * as types from '../constants/ActionTypes';
let initalState = {
    username: '',
    role: ''
}
const reducer = (state = initalState, action) =>{
    switch(action.type){
        case types.SET_USER_CONTEXT:
            return{
                ...state,
                username: action.userContext.username,
                role: action.userContext.roleName
            }
        case types.DELETE_USER_CONTEXT:
                return{
                    ...state,
                    username: '',
                    role: '',
                }
        default:
            return state;
    }
}
export default reducer;