<template>
    <div class="container" style="margin: 100px auto;">
        <div class="columns">
            <div class="column is-12">

                <carousel :perPage="1" :autoplay="true" :loop="true" :paginationEnabled="false" v-if="images && images.length">

                        <slide  v-for="image in images" :key="image.id" class="image is-3by1" :style="{'background-image': 'url(data:image/png;base64,' + image.data + ')' }">
                            <a v-if="$root.isLoggedIn && $root.currentUser.role == 'admin'" @click.prevent="$root.deleteImage($event, image.id)" style="float: right; background-color: var(--app-text-hover-color); color: var(--app-text-accent-color); margin: 10px; z-index: 99">Remove this Image</a>
                            <!-- <img :src="'data:image/png;base64,' + image.data" > -->
                            <!-- class="image is-5by3" :style="{'background-image': 'url(data:image/png;base64,' + image.data + ')' }" -->
                        </slide>

                </carousel>
                <!-- <div v-else>
                    <div class="image is-3by1" :style="{'background-image': 'url(/images/dummy.jpg)' }">
                    </div>
                </div> -->
                <br><br>
                <div class="has-text-centered">
                    <h1 class="title is-3">@{{ name }}
                        <small class="subtitle is-6" v-if="$root.isLoggedIn && $root.currentUser.role == 'admin'">
                            <router-link :to="{name: 'manage-categories', query: {id: id}}">Edit</router-link> &nbsp;
                            <a @click.prevent="deleteCategory">Delete</a>
                        </small>
                    </h1>
                    <h3 class="subtitle">
                        Products: <span class="tag">{{ (products && products.length) || 0 }}</span>
                        Subcategories <span class="tag">{{ (subcategories && subcategories.length) || 0 }}</span>
                    </h3>
                </div>
                <br><br>
                <div class="tile is-ancestor" style="width: calc(100% - 20px); margin: 0 auto">
                    <div class="tile is-veritcal is-3">
                        <div class="content">
                            <h4 class="subtitle is-5">Filter Products</h4>
                            <div class="field has-addons">
                                <div class="control">
                                    <input class="input" v-model="product_info" type="text" placeholder="Find a Product">
                                </div>
                                <div class="control">
                                    <!-- <a router class="button is-light">
                                    Search
                                    </a> -->
                                    <!-- <router-link v-if="$route.params.page" :to="{name: 'category', params: {id: id}, query: {search: encodeURI(product_info), page: $route.params.page}}" class="button is-light" :class="{'disabled': !product_info}">Search</router-link> -->
                                    <router-link :to="{name: 'category', params: {id: id}, query: {search: encodeURI(product_info)}}" class="button is-light" :class="{'disabled': !product_info}">Search</router-link>
                                </div>
                            </div>
                            <hr />
                            <div v-if="subcategories && subcategories.length">
                                <h4 class="subtitle is-5">Categories in {{ name }}</h4>
                                <div class="tags">
                                    <span class="tag" v-for="category in subcategories" :key="category.id">
                                        @<router-link :to="{name: 'category', params: {id: category.id}}">{{ category.name }}</router-link>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="tile is-9">
                        <div class="container">
                            <div class="columns">
                                <div class="column is-12">
                                    <div class="container">
                                        <h4 v-if="$route.query.search" class="subtitle is-4">Showing results for: {{ decodeURI($route.query.search) }}
                                            <small class="subtitle is-6">
                                                <router-link :to="{name: 'category', params: {id}}">Clear</router-link>
                                            </small>
                                        </h4>
                                        <div class="columns is-multiline" v-if="products && products.length">
                                            <div class="column is-4" v-for="product in products" :key="product.id">
                                                <Product :product="product" />
                                            </div>
                                        </div>
                                        <div class="has-text-centered" v-else>
                                            <h5 class="title is-4">Sorry No Products were found!</h5>
                                            <p class="subtitle is-5">Try Navigating to other resources</p>
                                        </div>
                                    </div>
                                    <div v-if="products && products.length">
                                        <nav class="pagination is-rounded" role="navigation" style="margin-top: 100px" v-if="products && paginator">
                                            <router-link class="pagination-previous" :to="{name: 'category', params: {id: id}, query: {page: paginator.current_page - 1}}" :class="{'disabled': paginator.current_page <= 1}">Previous</router-link>
                                            <router-link class="pagination-next" :to="{name: 'category', params: {id: id}, query: {page: paginator.current_page + 1}}" :class="{'disabled': paginator.current_page >= paginator.last_page}">Next page</router-link>
                                            <ul class="pagination-list">
                                                <li v-for="number in paginator.last_page" :key="number">
                                                    <router-link :to="{name: 'category', params: { id: id }, query: {page: number}}" class="pagination-link" :class="{'disabled': number == paginator.current_page}">
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
            </div>
        </div>
    </div>
</template>

<script>
import dummy from '../assets/images/dummy.jpg'
const Product = () => import('../components/Product')

export default {
    components: {
        Product
    },
    data() {
        return {
            id: null,
            name: null,
            images: null,
            products: null,
            subcategories: null,
            paginator: null,
            dummyImage: dummy,
            product_info: null
        }
    },
    created() {
        this.loadData()
        if (this.$route.query.search) {
            this.product_info = decodeURI(this.$route.query.search)
        } else this.product_info = null
    },
    beforeRouteUpdate(to, from, next) {
        if (to.query.search) {
            this.product_info = decodeURI(to.query.search)
        } else this.product_info = null
        this.loadData(to.params.id, to.query.page, to.query.search)
        next()
    },
    methods: {
        loadData: function (category_id = 0, page_number = 0, search_query = null) {
            this.$store.dispatch('get_category_data', category_id || this.$route.params.id)
                    .then(resp => {
                        this.id = resp.data.data.id
                        this.name = resp.data.data.name
                        this.images = resp.data.data.images
                        this.subcategories = resp.data.data.subcategories
                        this.$root.setTitle('@' + this.name)
                        let productData = {
                            page: page_number || this.$route.query.page || 1,
                            category: category_id || this.id,
                            search_query: search_query || this.$route.query.search
                        }
                        this.$store.dispatch('get_products', productData)
                        .then(res => {
                            this.products = res.data.data
                            this.paginator = res.data.meta
                        }).catch(error => console.log(error))
                    }).catch(error => console.log(error))
        },
        deleteCategory: function() {
            if (this.$root.isLoggedIn && this.$root.currentUser.role == 'admin') {
                if (this.products.length == 0 && this.subcategories.length == 0) {
                    this.$store.dispatch('delete_category', this.id)
                        .then(resp => {
                            this.$toastr('info', 'Success! Category was deleted.', 'Information')
                            this.$router.push({name: 'home'})
                        }).catch(error => this.$toastr('error', 'Aah! Category wasn\'t deleted.', 'Error'))
                } else {
                    this.$toastr('info', 'Category contains subcategories or products and cannot be deleted.', 'Information')
                }
            }
        }
    }
}
</script>

<style scoped>
.VueCarousel {
    width: 100%;
    height: 40vh;
}
</style>
