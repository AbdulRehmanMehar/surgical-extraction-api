const Auth = () => import('./Auth')
const Home = () => import('./views/Home')
const Terms = () => import('./views/Terms')
const Product = () => import('./views/Product')
const Login = () => import('./views/auth/Login')
const Category = () => import('./views/Category')
const Logout =  () => import('./views/auth/Logout')
const Register = () => import('./views/auth/Register')
const ResetPassword = () => import('./views/auth/Reset')
const Dashboard = () => import('./views/protected/Dashboard')

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
        meta: {
            title: 'Home'
        }
    },
    {
        path: '/terms-and-conditions',
        name: 'terms-and-conditions',
        component: Terms,
        meta: {
            title: 'Terms and Conditions'
        }
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: {
            title: 'Login'
        }
    },
    {
        path: '/register',
        name: 'register',
        component: Register,
        meta: {
            title: 'Register'
        }
    },
    {
        path: '/reset-password',
        name: 'reset-password',
        component: ResetPassword,
        meta: {
            title: 'Reset Password'
        }
    },
    {
        path: '/logout',
        name: 'logout',
        component: Logout,
    },
    {
        path: '/category/:id',
        name: 'category',
        component: Category,
        meta: {
            title: 'Products in Category'
        }
    },
    {
        path: '/product/:id',
        name: 'product',
        component: Product,
        meta: {
            title: 'Product'
        }
    },
    {
        path: '/authenticated',
        name: 'authenticated',
        component: Auth,
        children: [
            {
                path: 'dashboard',
                name: 'dashboard',
                component: Dashboard
            }
        ]
    }
]

export default routes
