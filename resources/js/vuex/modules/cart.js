import axios from "axios"


let cart = window.localStorage.getItem('cart');


export default {
    state: {
        cart: cart ? JSON.parse(cart) : []
    },
    mutations: {
        initialiseCart(state) {
            if (localStorage.getItem('cart')) {
                // this.replaceState(
                //     Object.assign(state, JSON.parse(localStorage.getItem('cart')))
                // )
                state.cart = JSON.parse(localStorage.getItem('cart'))
            }
        },
        cart_success(state, cart) {
            let prev = state.cart.findIndex(x => x.product.id == cart.product.id)
            if (prev != -1) {
                state.cart[prev].quantity = cart.quantity
            } else {
                state.cart.push(cart)
            }
        },
        remove_cart(state, cart) {
            state.cart = state.cart.filter(x => x.product.id != cart.product.id)
        },
        delete_cart(state) {
            state.cart = []
            localStorage.removeItem('cart')
        },
        saveCart(state) {
            window.localStorage.setItem('cart', JSON.stringify(state.cart))
        }
    },
    actions: {
        add_to_cart({commit}, data) {
            commit('cart_success', data)
            commit('saveCart')
        },
        remove_from_cart({commit}, data) {
            commit('remove_cart', data)
            commit('saveCart')
        },
        delete_cart({commit}) {
            commit('delete_cart')
        }
    },
    getters: {
        cart: state => state.cart
    }
}
