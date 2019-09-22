import axios from 'axios'

export default {
    state: {
        products: null,
    },
    mutations: {

    },
    actions: {
        get_featured_products({commit}) {
            return new Promise((resolve, reject) => {
                axios({ url: window.serverAddress + '/api/featured-product', method: 'GET' })
                .then(resp => {
                    resolve(resp)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        get_products({commit}, data) {
            return new Promise((resolve, reject) => {
                axios({ url: window.serverAddress + '/api/product?page='+ data.page + (data.category ? '&category=' + data.category : '') + (data.search_query ? '&search=' + data.search_query : ''), method: 'GET'})
                .then(resp => resolve(resp))
                .catch(error => reject(error))
            })
        },
        get_product({ commit }, id) {
            return new Promise((resolve, reject) => {
                axios({ url: window.serverAddress + '/api/product/' + id, method: 'GET' })
                    .then(resp => resolve(resp))
                    .catch(error => reject(error))
            })
        },
        add_product({commit}, data) {
            return new Promise((resolve, reject) => {
                axios({ url: window.serverAddress + '/api/product', data, method: 'POST' })
                .then(resp => resolve(resp))
                .catch(error => reject(error))
            })
        },
        update_product({ commit }, data) {
            return new Promise((resolve, reject) => {
                axios({ url: window.serverAddress + '/api/product/' + data.product_id, data: data, method: 'PATCH' })
                    .then(resp => resolve(resp))
                    .catch(error => reject(error))
            })
        },
        delete_product({commit}, id) {
            console.log(id)
            return new Promise((resolve, reject) => {
                axios({ url: window.serverAddress + '/api/product/' + id, method: 'DELETE' })
                    .then(resp => resolve(resp))
                    .catch(error => reject(error))
            })
        },
        set_featured_product({commit}, data) {
            return new Promise((resolve, reject) => {
                axios({ url: window.serverAddress + '/api/featured-product', data, method: 'POST' })
                .then(resp => resolve(resp))
                .catch(error => reject(error))
            })
        },
        remove_featured_product({ commit }, data) {
            return new Promise((resolve, reject) => {
                axios({ url: window.serverAddress + '/api/featured-product/' + data.product, data, method: 'DELETE' })
                    .then(resp => resolve(resp))
                    .catch(error => reject(error))
            })
        }
    }
}
