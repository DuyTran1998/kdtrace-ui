import * as types from '../constants/ActionTypes';
const initialState = {
    pending: false,
    cars: [],
    error: null
}

const transportReducer = (state = initialState, action) =>{
    switch(action.type){
        case types.FETCH_CARS_PENDING:
            return {
                ...state,
                pending: true
            }
        case types.FETCH_CARS_SUCCESS:
            return {
                ...state,
                pending: false,
                cars: action.payload
            }
        case types.FETCH_CARS_ERROR:
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

export const getCars = state => state.products;
export const getCarsPending = state => state.pending;
export const getCarsError = state => state.error;