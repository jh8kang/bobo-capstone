import {ADD_NAME, ADD_NOTE} from '../actions/types';

let initialState = {

}

export default (state = initialState, action) => {
    switch(action.type) {
        case ADD_NAME:
            return {...state, enteredData: action.payload.enteredData};
        case ADD_NOTE:
            return {...state, enteredNote: action.payload.enteredNote};

            default:
                return state
    }
}