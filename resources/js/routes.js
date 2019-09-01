const Home = () => import('./views/Home')
const Login = () => import('./views/auth/Login')
const Register =  () => import('./views/auth/Register')
const ResetPassword = () => import('./views/auth/Reset')

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/register',
        name: 'register',
        component: Register
    },
    {
        path: '/reset-password',
        name: 'reset-password',
        component: ResetPassword
    },
]

export default routes