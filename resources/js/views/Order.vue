<template>
    <div class="container" style="margin: 100px auto;">
        <div class="card">
            <div class="card-header">
                <p class="card-header-title">
                    {{ $route.params.id ? ($route.query.user ? 'User Information' : 'Order Data') : 'Orders' }}
                </p>
            </div>
            <div class="card-content">
                <div class="content">
                    <!-- <br> -->
                    <div class="table-container" style="overflow-x: auto">
                        <table class="table" v-if="!$route.params.id">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Status</th>
                                    <th>Description</th>
                                    <th>Date</th>
                                    <th colspan="2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(order, idx) in orders" :key="idx">
                                    <td>{{ ++idx }}</td>
                                    <td>{{ order.status }}</td>
                                    <td>{{ order.details }}</td>
                                    <td>{{ order.date }}</td>
                                    <td>
                                        <router-link class="button is-primary" :to="{name: 'order-data', params: {id: order.id}}">View Data</router-link>
                                    </td>
                                    <td>
                                        <a class="button is-danger" @click.prevent="cancelOrder($event, order)" :class="{'disabled': order.status == 'canceled'}">
                                                    {{ order.status == 'canceled' ? 'Order is canceled.' : (order.status == 'delivered' ? 'Order is delivered' : 'Cancel Order') }}
                                        </a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table class="table" v-if="$route.params.id && order && !$route.query.user">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Product Name</th>
                                    <th>Product Category</th>
                                    <th>Product Quantity</th>
                                    <th>User Information</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(cart, idx) in JSON.parse(order.cart)" :key="idx">
                                    <td>{{ ++idx }}</td>
                                    <td>
                                        <router-link :to="{name: 'product', params: {id: cart.product.id}}">
                                            {{ cart.product.name }}
                                        </router-link>
                                    </td>
                                    <td>
                                        <router-link :to="{name: 'category', params: {id: cart.product.category.id}}">
                                            {{ cart.product.category.name }}
                                        </router-link>
                                    </td>
                                    <td>{{ cart.quantity }}</td>
                                    <td><router-link :to="{ name: 'order-data', query:{user: order.user.id} }">View User Data</router-link></td>
                                </tr>
                            </tbody>
                        </table>
                        <table class="table" v-if="$route.query.user && $route.params.id && order">
                            <thead>
                                <tr>
                                    <th colspan="3">Personal Information</th>
                                </tr>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{{ order.user.name }}</td>
                                    <td><a :href="'mailto:'+order.user.email">{{ order.user.email }}</a></td>
                                    <td><a :href="'tel:'+order.user.phone">{{ order.user.phone }}</a></td>
                                </tr>

                            </tbody>
                            <thead>
                                <tr>
                                    <th colspan="3">Address Information</th>
                                </tr>
                                <tr>
                                    <th>Country</th>
                                    <th>State / Province</th>
                                    <th>Address</th>
                                </tr>
                            </thead>
                            <tbody>

                                <tr v-for="address in order.address" :key="address.id">
                                    <td>{{ address.country }}</td>
                                    <td>{{ address.state }}</td>
                                    <td>{{ address.address }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="card-footer">
                <div class="content">
                    <nav class="pagination is-rounded" role="navigation" style="margin: 10px auto;" v-if="!$route.params.id && paginator">
                        <router-link class="pagination-previous" :to="{name: 'order', query: {page: paginator.current_page - 1}}" :class="{'disabled': paginator.current_page <= 1}">Previous</router-link>
                        <router-link class="pagination-next" :to="{name: 'order', query: {page: paginator.current_page + 1}}" :class="{'disabled': paginator.current_page >= paginator.last_page}">Next page</router-link>
                        <ul class="pagination-list" style="list-style: none; margin-top: -3px">
                            <li v-for="number in paginator.last_page" :key="number">
                                <router-link :to="{name: 'order', query: {page: number}}" class="pagination-link" :class="{'disabled': number == paginator.current_page}">
                                    {{ number }}
                                </router-link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
const QuantityUpdateModule = () => import('../components/QuantityUpdateModule')

export default {
    data() {
        return {
            orders: null,
            order: null,
            paginator: null
        }
    },
    created() {
        this.loadData(this.$route.query.page)
    },
    beforeRouteUpdate(to, from, next) {
        if (to.params.id) {
            this.getOrderData(to.params.id)
        } else {
            this.loadData(to.query.page)
        }
        next()
    },
    methods: {
        loadData(page) {
            if (!this.$route.params.id) {
                this.getOrdersList(page)
            } else {
                this.getOrderData(this.$route.params.id)
            }
        },
        getOrdersList(page) {
            this.$store.dispatch('get_orders', { page: page || 1 })
                .then(res => {
                    this.orders = res.data.data
                    this.paginator = res.data.meta
                }).catch(error => console.log(error))
        },
        getOrderData(id) {
            this.$store.dispatch('get_order', id)
                .then(res => {
                    this.order = res.data.data
                }).catch(error => console.log(error))
        },
        cancelOrder($event, order) {
            let data = {
                id: order.id,
                status: 'canceled',
                details: 'Order was canceled by ' + order.user.name
            }
            this.$store.dispatch('update_order', data)
            .then(resp => {
                this.$toastr('info', 'Success! Order was canceled.', 'Information')
                this.loadData()
            }).catch(error => {
                this.$toastr('error', 'Aah! Something went wrong.', 'Error')
            })
        }
    },
    components: {
        QuantityUpdateModule
    }
}
</script>
