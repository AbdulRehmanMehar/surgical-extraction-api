import './bootstrap'
import Vue from 'vue'
import App from './App.vue'
import routes from './routes'
import VueRouter from 'vue-router'
import NProgress from 'vue-nprogress'

Vue.use(VueRouter)
Vue.use(NProgress)

const router = new VueRouter({
    mode: 'history',
    routes: routes
})

const nprogress = new NProgress({ parent: '.nprogress-container' })

const app = new Vue({
    data: {
        navbar: true,
        footer: true
    },
    router,
    nprogress,
    mounted() {
        let url = '/' + window.location.href.split('/').pop()
        hidenSeek(url)
    },
    render: h => h(App)
})

const hidenSeek = (url) => {
    if (url == '/login' || url == '/register' || url == '/reset-password') app.navbar = false
    else app.navbar = true
    if (url == '/login' || url == '/register' || url == '/reset-password') app.footer = false
    else app.footer = true
}

router.beforeEach((to, from, next) => {
    hidenSeek(to.path)
    next()
})

app.$mount('#vue-application')