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
        }
    }
}
