const actions = {
    addPoint: function(data) {
        return {
            type: 'addPoint',
            point: data
        }
    },
    addIcon: function(data) {
        return {
            type: 'addIcon',
            icon: data
        }
    },
}
export default actions