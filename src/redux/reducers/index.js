import {combineReducers} from 'redux'
import UserReducer from './user'
import CartReducers from './cartreducers'


export default combineReducers({
    user : UserReducer,
    add : CartReducers
})