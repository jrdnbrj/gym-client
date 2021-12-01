import { combineReducers } from 'redux'

import authReducer from './authReducer'
import userReducer from './userReducer'


const reducers = combineReducers({
    auth: authReducer,
    user: userReducer
})

export default reducers
