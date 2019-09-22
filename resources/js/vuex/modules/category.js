import axios from 'axios'

export default {
    state: {

    },
    mutations: {

    },
    actions: {
        get_all_categories({commit}) {
            return new Promise((resolve, reject) => {
                axios({ url: window.serverAddress + '/api/category', method: 'GET' })
                .then(resp => resolve(resp))
                .catch(error => reject(error))
            })
        },
        get_category_data({commit}, id) {
            return new Promise((resolve, reject) => {
                axios({ url: window.serverAddress + '/api/category/' + id, method: 'GET' })
                    .then(resp => {
                        resolve(resp)
                    }).catch(error => reject(error))
            })
        },
        add_new_category({commit}, data) {
            return new Promise((resolve, reject) => {
                axios({ url: window.serverAddress + '/api/category', data, method: 'POST' })
                .then(resp => resolve(resp))
                .catch(error => reject(error))
            })
        },
        edit_category({ commit }, data) {
            return new Promise((resolve, reject) => {
                axios({ url: window.serverAddress + '/api/category/' +data.category_id, data, method: 'PATCH' })
                    .then(resp => resolve(resp))
                    .catch(error => reject(error))
            })
        },
        delete_category({ commit }, id) {
            return new Promise((resolve, reject) => {
                axios({ url: window.serverAddress + '/api/category/' + id, method: 'DELETE' })
                    .then(resp => resolve(resp))
                    .catch(error => reject(error))
            })
        }
    },
    getters: {

    }
}
