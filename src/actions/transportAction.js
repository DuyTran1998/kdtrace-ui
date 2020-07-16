import * as types from '../constants/ActionTypes';

export const fetchTrucksPending = () => {
    return {
        type: types.FETCH_TRUCKS_PENDING
    }
}

export const fetchTrucksSuccess = (trucks) =>{
    console.log(1);
    return {
        type: types.FETCH_TRUCKS_SUCCESS,
        trucks: trucks
    }
}

export const fetchTrucksError = () =>{
    return {
        type: types.FETCH_TRUCKS_ERROR,
    }
}
