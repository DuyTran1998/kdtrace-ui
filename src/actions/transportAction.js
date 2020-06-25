import * as types from '../constants/ActionTypes';

export const fetchCarsPending = () => {
    return {
        type: types.FETCH_CARS_PENDING
    }
}

export const fetchCarsSuccess = (cars) =>{
    console.log(1);
    return {
        type: types.FETCH_CARS_SUCCESS,
        cars: cars
    }
}

export const fetchCarsError = () =>{
    return {
        type: types.FETCH_CARS_ERROR,
    }
}