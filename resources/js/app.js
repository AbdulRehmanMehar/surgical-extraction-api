import './bootstrap'
import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import App from './App.vue'
import routes from './routes'
import VueRouter from 'vue-router'
import vuexStore from './vuex/index'
import VueCarousel from 'vue-carousel'
import VueToastr from '@deveodk/vue-toastr'
import CKEditor from '@ckeditor/ckeditor5-vue'
import '@deveodk/vue-toastr/dist/@deveodk/vue-toastr.css'

Vue.use(Vuex)
Vue.use(CKEditor)
Vue.use(VueRouter)
Vue.use(VueToastr)
Vue.use(VueCarousel)
Vue.prototype.$http = Axios
window.serverAddress = window.location.origin

const token = localStorage.getItem('token')
if (token) {
    Vue.prototype.$http.defaults.headers.common['Authorization'] = token
}

const store = new Vuex.Store(vuexStore)

const router = new VueRouter({
    mode: 'history',
    routes: routes
})

const app = new Vue({
    data: {
        name: 'Surgical Extraction',
        navbar: true,
        footer: true,
        loading: false,
    }, computed: {
        cart: function() { return this.$store.getters.cart},
        isLoggedIn: function () { return this.$store.getters.isLoggedIn },
        currentUser: function () { return this.$store.getters.currentUser },
    },
    router,
    store,
    created() {
        this.$http.interceptors.response.use(undefined, function (err) {
            return new Promise(function (resolve, reject) {
                if (err.status === 400 && err.config && !err.config.__isRetryRequest) {
                    this.$store.dispatch(logout)
                }
                throw err;
            });
        });
        if (this.isLoggedIn) this.$store.dispatch('loadUser')
    },
    mounted() {
        let url = '/' + window.location.href.split('/').pop()
        hidenSeek(url)
    },
    methods: {
        logout: function() {
            this.$store.dispatch('logout')
        },
        setTitle: function(data) {
            document.title = data + ' - ' + this.name
        },
        deleteImage: function($event, id) {
            if (this.currentUser.role == 'admin') {
                this.$store.dispatch('deleteImage', id)
                .then(resp => {
                    this.$toastr('info', 'Success! Image was deleted.', 'Information')

                    $event.target.parentElement.style.display = 'none'
                })
                .catch(error => this.$toastr('danger', 'Aaah! Image couldn\'t be removed.', 'Error'))
            }
        },
        addToCart: function($event, product, quantity = 10) {
            this.$store.dispatch('add_to_cart', { product, quantity })
            this.$toastr('info', 'Success!', 'Information')
        },
        deleteCart: function() {
            this.$store.dispatch('delete_cart')
            this.$toastr('info', 'Success!', 'Information')
        },
        placeOrder: function() {
            if (this.isLoggedIn) {
                this.$store.dispatch('place_order')
                .then(resp => {
                    this.$store.dispatch('loadUser')
                    this.$toastr('info', 'Success! Order just got placed.', 'Information')
                    this.$router.push({name: 'orders', params: {id: res.data.id}})
                }).catch(error => {
                    if (error.response.data.error)
                    this.$toastr('error', 'Aah! Something went wrong.', 'Error')
                })
            } else {
                this.$toastr('error', 'You must login to place order.', 'Error')
            }
        },
        removeFromCart: function ($event, cart) {
            this.$store.dispatch('remove_from_cart', cart)
            this.$toastr('info', 'Success!', 'Information')
        }
    },
    render: h => h(App)
})

const hidenSeek = (url) => {
    if (url == '/login' || url == '/register' || url == '/reset-password' || url == '/terms-and-conditions') app.navbar = false
    else app.navbar = true
    if (url == '/login' || url == '/register' || url == '/reset-password' || url == '/terms-and-conditions') app.footer = false
    else app.footer = true
}

const updateTitle = (info) => {
    const nearestWithTitle = info.slice().reverse().find(r => r.meta && r.meta.title)
    if (nearestWithTitle) document.title = nearestWithTitle.meta.title + ' - ' + app.name
    else document.title = app.name
}

router.beforeEach((to, from, next) => {
    hidenSeek(to.path)
    updateTitle(to.matched)
    app.loading = true
    next()
})

router.afterEach((to, from) => {
    app.loading = false
})

router.onError(error => {
    if (/loading chunk \d* failed./i.test(error.message)) {
        window.location.reload()
    }
})

Axios.interceptors.request.use(config => {
    app.loading = true
    return config
})

Axios.interceptors.response.use(response => {
    app.loading = false
    return response
}, error => {
    app.loading = false
    return Promise.reject(error)
})

app.$mount('#vue-application')
