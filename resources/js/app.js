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
import '@deveodk/vue-toastr/dist/@deveodk/vue-toastr.css'

Vue.use(Vuex)
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
        name: 'Airfort',
        navbar: true,
        footer: true,
        loading: false,
    }, computed: {
        isLoggedIn: function () { return this.$store.getters.isLoggedIn },
        currentUser: function () { return this.$store.getters.currentUser },
    },
    router,
    store,
    created() {
        this.$store.dispatch('loadUser')
        .catch(() => {
            // do nothing....
        })
    },
    mounted() {
        let url = '/' + window.location.href.split('/').pop()
        hidenSeek(url)
    },
    methods: {
        logout: function() {
            this.$store.dispatch('logout')
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
