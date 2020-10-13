import { fetchTrucksError, fetchTrucksPending, fetchTrucksSuccess } from '../actions/transportAction';
let token = localStorage.getItem('token');
console.log(token);
const fetchTrucks = () => {
    return dispatch => {
        if (token !== null) {
            dispatch(fetchTrucksPending);
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
                    dispatch(fetchTrucksSuccess(res.result));
                    return res.result;
                })
                .catch(error => {
                    dispatch(fetchTrucksError(error));
                })
        }

    }
}
export default fetchTrucks;
