import ACTIONS from '../constants/point'
const initialState = []
export default function userinfo(state = initialState, action) {
    switch (action.type) {
        case ACTIONS.ADD:
            return action.point
        case ACTIONS.DELETE:
            return action.point
        default:
            return state
    }
}