import * as ACTIONS from '../constants/marker'
const initialState = []
export default function store(state = initialState, action) {
    switch (action.type) {
        case ACTIONS.ADD_ICON:
            return action.icon
        default:

            return state
    }
}