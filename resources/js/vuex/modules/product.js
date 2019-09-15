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
        get_products({commit}, page, category_id=null) {
            return new Promise((resolve, reject) => {
                axios({ url: window.serverAddress + '/api/product?page='+ page, data: {category: category_id}, method: 'GET'})
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
        }
    }
}
