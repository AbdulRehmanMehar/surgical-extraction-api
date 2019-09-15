<template>
    <div class="container" style="margin: 100px auto;">
        <div class="columns">
            <div class="column is-12">

                <carousel :perPage="1" :autoplay="true" :loop="true" :paginationEnabled="false" style="margin: 0 auto" v-if="images && images.length">
                    <slide v-for="image in images" :key="image.id" class="image is-5by3" :style="{'background-image': 'url(data:image/png;base64,' + image.image + ')' }">
                    </slide>
                </carousel>
                <br><br>
                <div class="has-text-centered">
                    <h1 class="title is-3">@{{ name }}</h1>
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
                                    <input class="input" type="text" placeholder="Find a Product">
                                </div>
                                <div class="control">
                                    <a class="button is-light">
                                    Search
                                    </a>
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

                                    <nav class="pagination is-rounded" role="navigation" style="margin-top: 100px" v-if="products && paginator">
                                        <router-link class="pagination-previous" :to="{name: 'category', params: {id: id}, query: {page: paginator.current_page - 1}}" :class="{'disabled': paginator.current_page <= 1}">Previous</router-link>
                                        <router-link class="pagination-next" :to="{name: 'category', params: {id: id}, query: {page: paginator.current_page + 1}}" :class="{'disabled': paginator.current_page >= paginator.total}">Next page</router-link>
                                        <ul class="pagination-list">
                                            <li v-for="number in paginator.total" :key="number">
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
</template>

<script>
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
        }
    },
    created() {
        this.loadData()
    },
    beforeRouteUpdate(to, from, next) {
        this.loadData(to.params.id, to.query.page)
        next()
    },
    methods: {
        loadData: function (category_id = 0, page_number = 0) {
            this.$store.dispatch('get_category_data', category_id || this.$route.params.id)
                    .then(resp => {
                        this.id = resp.data.data.id
                        this.name = resp.data.data.name
                        this.images = resp.data.data.images
                        this.subcategories = resp.data.data.subcategories
                        this.$root.setTitle('@' + this.name)
                        this.$store.dispatch('get_products', page_number || this.$route.query.page, category_id || this.id)
                        .then(res => {
                            this.products = res.data.data
                            this.paginator = res.data.meta
                        }).catch(error => console.log(error))
                    }).catch(error => console.log(error))
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
