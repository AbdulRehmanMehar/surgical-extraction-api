import axios from 'axios'

export default {
    state: {
        token: localStorage.getItem('token') || null,
        user: null
    },
    mutations: {
        auth_success(state, token) {
            state.token = token
        },
        load_user(state, user) {
            state.user = user
        },
        logout(state) {
            state.user = null
            state.token = null
        },
    },
    actions: {
        login({commit}, data) {
            return new Promise((resolve, reject) => {
                axios({ url: window.serverAddress + '/api/login', data, method: 'POST' })
                .then(resp => {
                    const token = resp.data.token_type + ' ' + resp.data.access_token
                    const user = resp.data.user
                    console.log(resp)
                    localStorage.setItem('token', token)
                    axios.defaults.headers.common['Authorization'] = token
                    commit('auth_success', token)
                    commit('load_user', user)
                    resolve(resp)
                })
                .catch(error => {
                    commit('logout')
                    localStorage.removeItem('token')
                    delete axios.defaults.headers.common['Authorization']
                    reject(error)
                })
            })
        },
        register({ commit }, data) {
            return new Promise((resolve, reject) => {
                axios({ url: window.serverAddress + '/api/register', data, method: 'POST' })
                    .then(resp => {
                        const token = resp.data.token_type + ' ' + resp.data.access_token
                        const user = resp.data.user
                        localStorage.setItem('token', token)
                        axios.defaults.headers.common['Authorization'] = token
                        commit('auth_success', token)
                        commit('load_user', user)
                        resolve(resp)
                    })
                    .catch(error => {
                        commit('logout')
                        localStorage.removeItem('token')
                        delete axios.defaults.headers.common['Authorization']
                        reject(error)
                    })
            })
        },
        reset({commit}, data) {
            return new Promise((resolve, reject) => {
                axios({ url: window.serverAddress + '/api/reset-password', data, method: 'POST' })
                .then(resp => {
                    resolve(resp)
                }).catch(error => {
                    commit('logout')
                    localStorage.removeItem('token')
                    delete axios.defaults.headers.common['Authorization']
                    reject(error)
                })
            })
        },
        logout({ commit }) {
            return new Promise((resolve, reject) => {
                commit('logout')
                localStorage.removeItem('token')
                delete axios.defaults.headers.common['Authorization']
                resolve()
            })
        },
        loadUser({commit}) {
            return new Promise((resolve, reject) => {
                axios({ url: window.serverAddress + '/api/get-user', method: 'POST' })
                .then(resp => {
                    commit('load_user', resp.data.data)
                    resolve(resp)
                }).catch(error => {
                    commit('logout')
                    localStorage.removeItem('token')
                    delete axios.defaults.headers.common['Authorization']
                    reject(error)
                })
            });
        }
    },
    getters: {
        isLoggedIn: state => !!state.token,
        currentUser: state => state.user
    }
}
