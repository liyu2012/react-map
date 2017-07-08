import { combineReducers } from 'redux'
import point from './point'
import icon from './marker'
import user from './user'
export default combineReducers({
    point,
    icon,
    user
})