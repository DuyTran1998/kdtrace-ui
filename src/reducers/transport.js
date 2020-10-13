import * as types from '../constants/ActionTypes';
const initialState = {
    pending: false,
    trucks: [],
    error: null
}

const transportReducer = (state = initialState, action) =>{
    switch(action.type){
        case types.FETCH_TRUCKS_PENDING:
            return {
                ...state,
                pending: true
            }
        case types.FETCH_TRUCKS_SUCCESS:
            return {
                ...state,
                pending: false,
                trucks: action.payload
            }
        case types.FETCH_TRUCKS_ERROR:
            return{
                ...state,
                pending: false,
                error: action.error
            }
        default:
            return state;
    }
}
export default transportReducer;

export const getTrucks = state => state.products;
export const getTrucksPending = state => state.pending;
export const getTrucksError = state => state.error;
