import actions from '../constants/user'
const ACTIONS = {
    update: function(user) {

        return {
            type: 'update_user',
            user,
        }

    }

}
export default ACTIONS