<template>
    <div class="container" style="margin: 100px auto">
        <div class="columns">
            <div class="column is-12">
                <div class="card" v-if="$route.query.edit">
                    <div class="card-header">
                        <p class="card-header-title">Update Order</p>
                    </div>
                    <div class="card-content">
                        <div class="content">
                             <form @submit.prevent="function() {}">

                                <div class="field">
                                    <label class="label">Category</label>
                                    <div class="control is-fullwidth">
                                        <div class="select is-fullwidth">
                                        <select v-model="status">
                                            <option value="placed">Placed</option>
                                            <option value="processing">Processing</option>
                                            <option value="shipped">Shipped</option>
                                            <option value="delivered">Delivered</option>
                                            <option value="canceled">Canceled</option>
                                        </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="field">
                                    <label class="label">Details</label>
                                    <div class="control">
                                        <textarea class="textarea" v-model="details" type="text" placeholder="Processing your order" required> </textarea>
                                    </div>
                                </div>
                                <div class="field has-text-danger" v-if="form_errors && form_errors.length">
                                    <p class="help" v-for="(error, key) in form_errors" :key="key">{{error}}</p>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div class="card-footer">
                        <div class="card-footer-item">
                            <button type="submit" class="button is-fullwidth" @click.prevent="submitForm">Save</button>
                        </div>
                    </div>
                </div>

                <br><br>
                <div class="card" v-if="!$route.query.edit && orders">
                    <div class="card-header">
                        <h1 class="card-header-title">
                            Manage Orders
                        </h1>
                    </div>
                    <div class="card-content">
                        <div class="content">
                            <div class="table-container" style="overflow-x: auto">
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Status</th>
                                            <th>Description</th>
                                            <th>Date</th>
                                            <th colspan="3">Actions</th>
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
                                                <router-link v-if="$route.query.page" class="button is-info" :to="{name: 'manage-orders', query: {page: $route.query.page, edit: order.id}}">Edit Order</router-link>
                                                <router-link v-else class="button is-info" :to="{name: 'manage-orders', query: {edit: order.id}}">Edit Order</router-link>
                                            </td>
                                            <td>
                                                <a class="button is-danger" @click.prevent="cancelOrder($event, order)" :class="{'disabled': order.status == 'canceled' || order.status == 'delivered'}">
                                                    {{ order.status == 'canceled' ? 'Order is canceled.' : (order.status == 'delivered' ? 'Order is delivered' : 'Cancel Order') }}
                                                </a>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="card-footer">
                        <div class="content">
                            <nav class="pagination is-rounded" role="navigation" style="margin: 10px auto;" v-if="!$route.params.id && paginator">
                                <router-link class="pagination-previous" :to="{name: 'manage-orders', query: {page: paginator.current_page - 1}}" :class="{'disabled': paginator.current_page <= 1}">Previous</router-link>
                                <router-link class="pagination-next" :to="{name: 'manage-orders', query: {page: paginator.current_page + 1}}" :class="{'disabled': paginator.current_page >= paginator.last_page}">Next page</router-link>
                                <ul class="pagination-list" style="list-style: none; margin-top: -3px">
                                    <li v-for="number in paginator.last_page" :key="number">
                                        <router-link :to="{name: 'manage-orders', query: {page: number}}" class="pagination-link" :class="{'disabled': number == paginator.current_page}">
                                            {{ number }}
                                        </router-link>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            id: null,
            orders: null,
            status: null,
            details: null,
            paginator: null,
            form_errors: null,
        }
    },
    created() {
        if (this.$route.query.edit) {
            this.getOrderData(this.$route.query.edit)
        } else {
            this.loadData(this.$route.query.page)
        }
    },
    beforeRouteUpdate(to, from, next) {
        if (to.query.edit) {
            this.getOrderData(to.query.edit)
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
            this.$store.dispatch('get_orders', { page: page || 1, all: true })
                .then(res => {
                    this.orders = res.data.data
                    this.paginator = res.data.meta
                }).catch(error => console.log(error))
        },
        getOrderData(id) {
            this.$store.dispatch('get_order', id)
                .then(res => {
                    this.id = res.data.data.id
                    this.status = res.data.data.status
                    this.details = res.data.data.details
                }).catch(error => console.log(error))
        },
        cancelOrder($event, order) {
            let data = {
                id: order.id,
                status: 'canceled',
                details: 'Order was canceled by Admin'
            }
            this.$store.dispatch('update_order', data)
            .then(resp => {
                this.$toastr('info', 'Success! Order was canceled.', 'Information')
                this.loadData()
            }).catch(error => {
                this.$toastr('error', 'Aah! Something went wrong.', 'Error')
            })
        },
        submitForm() {
            let data = {
                id: this.id,
                status: this.status,
                details: this.details
            }
            this.$store.dispatch('update_order', data)
            .then(resp => {
                this.$toastr('info', 'Success! Order was updated.', 'Information')
                this.$router.push({ name: 'manage-orders', query: { page: this.$route.query.page || 1 } })
            }).catch(error => {
                this.form_errors = []
                if (error.response.data.errors) {
                    for (let key in error.response.data.errors) {
                        if (key && key.length) this.form_errors.push(error.response.data.errors[key][0])
                    }
                }
            })
        }
    }
}
</script>
