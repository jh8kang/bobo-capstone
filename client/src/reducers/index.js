import {combineReducers} from 'redux';
import addName from './formReducer';

export default combineReducers({
    nameState: addName,
})