const Auth = () => import('./Auth')
const Admin = () => import('./Admin')
const Cart = () => import('./views/Cart')
const Home = () => import('./views/Home')
const Order = () => import('./views/Order')
const Terms = () => import('./views/Terms')
const Product = () => import('./views/Product')
const Login = () => import('./views/auth/Login')
const Category = () => import('./views/Category')
const NotFound = () => import('./views/NotFound')
const Handler = () => import('./views/auth/Handler')
const Logout =  () => import('./views/auth/Logout')
const Register = () => import('./views/auth/Register')
const ResetPassword = () => import('./views/auth/Reset')
const Dashboard = () => import('./views/protected/Dashboard')
const ViewProfile = () => import('./views/protected/ViewProfile')
const EditProfile = () => import('./views/protected/EditProfile')
const ManageOrders = () => import('./views/protected/admin/ManageOrders')
const ManageProducts = () => import('./views/protected/admin/ManageProducts')
const ManageCategories = () => import('./views/protected/admin/ManageCategories')

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
        path: '/cart',
        name: 'cart',
        component: Cart,
        meta: {
            title: 'Cart'
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
            },
            {
                path: 'view-profile',
                name: 'view-profile',
                component: ViewProfile
            },
            {
                path: 'edit-profile',
                name: 'edit-profile',
                component: EditProfile
            },
            {
                path: 'orders',
                name: 'order',
                component: Order,
                children: [
                    {
                        path: ':id',
                        name: 'order-data',
                        component: Order
                    }
                ]
            },
            {
                path: 'admin',
                name: 'admin',
                component: Admin,
                children: [
                    {
                        path: 'products',
                        name: 'manage-products',
                        component: ManageProducts
                    },
                    {
                        path: 'categories',
                        name: 'manage-categories',
                        component: ManageCategories
                    },
                    {
                        path: 'orders',
                        name: 'manage-orders',
                        component: ManageOrders
                    }
                ]
            }
        ]
    },
    {
        path: '/reset/password/:id',
        name: 'reset-password-handler',
        component: Handler
    },
    {
        path: '/verify/email/:id',
        name: 'verify-email-handler',
        component: Handler
    },
    {
        path: '/cancel/reset/password/:id',
        name: 'reset-password-cancel',
        component: Handler
    },
    {
        path: '/cancel/verify/email/:id',
        name: 'verify-email-cancel',
        component: Handler
    },
    {
        path: '*',
        name: '404',
        component: NotFound
    }
]

export default routes
