import { fetchCarsError, fetchCarsPending, fetchCarsSuccess } from '../actions/transportAction';
let token = localStorage.getItem('token');
console.log(token);
const fetchCars = () => {
    return dispatch => {
        if (token !== null) {
            dispatch(fetchCarsPending);
            fetch('http://localhost:8080/api/transport/getAll', {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            }).then(res => res.json())
                .then(res => {
                    if (res.error) {
                        throw (res.error);
                    }
                    console.log(res);
                    dispatch(fetchCarsSuccess(res.result));
                    return res.result;
                })
                .catch(error => {
                    dispatch(fetchCarsError(error));
                })
        }

    }
}
export default fetchCars;