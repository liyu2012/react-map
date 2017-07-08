import ACTIONS from '../constants/user'
const initialState = {}
export default function store(state = initialState, action) {
    switch (action.type) {
        case ACTIONS.UPDATE_USER:
            return action.user
        default:
            return state
    }
}