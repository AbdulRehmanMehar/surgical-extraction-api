import axios from 'axios'

export default {
    state: {

    },
    mutations: {

    },
    actions: {
        get_category_data({commit}, id) {
            return new Promise((resolve, reject) => {
                axios({ url: window.serverAddress + '/api/category/' + id, method: 'GET' })
                    .then(resp => {
                        resolve(resp)
                    }).catch(error => reject(error))
            })
        }
    },
    getters: {

    }
}
