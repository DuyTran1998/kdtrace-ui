import {createStore} from 'redux';

let initialState = {
  status: false
}

let myReducer = (state = initialState, action) =>{
  if(action.type === 'CHANGE_STATE'){
    state.status = !state.status;
    return state;
  }
  if(action.type === 'SORT'){
    let { by, value } = action.sort;
    let {status} = state;
    return {
      status: status,
      sort: {
        by: by,
        value: value,
      }
    }
  }
  return state; 
}
const store = createStore(myReducer);

console.log(store.getState());

let action = {
  type: 'CHANGE_STATE'
};
store.dispatch(action);

let sortAction = {
  type: 'SORT',
  sort: {
    by: 'name',
    value: -1,
  }
}
store.dispatch(sortAction);

console.log(store.getState());