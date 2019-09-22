<template>
    <div id="home">
        <Slideshow v-if="featured_products && featured_products.length" :products="featured_products" />
        <div class="container">
            <div v-for="content in renderable" :key="content.category.id" style="margin: 50px auto;">
                <div class="container">
                    <div class="columns">
                        <div class="column is-10">
                            <h2 class="subtitle is-4">Products in @{{ content.category.name }}</h2>
                        </div>
                        <div class="column is-2">
                            <router-link v-if="content.products.length > 3" :to="{name: 'category', params: {id: content.category.id}}">See all</router-link>
                        </div>
                    </div>
                </div>
                <br>
                <div class="container">
                    <div class="columns is-multiline">
                        <div class="column is-4" v-for="product in content.products.slice(0, 3)" :key="product.id">
                            <Product :product="product" />
                        </div>
                    </div>
                </div>
                <br><hr><br>
            </div>
        </div>
    </div>
</template>

<script>
const Product = () => import('../components/Product')
const Slideshow = () => import('../components/Slideshow')
export default {
    name: 'home',
    components: {
        Product,
        Slideshow
    },
    data() {
        return {
            renderable: [],
            featured_products: null,
        }
    },
    created() {
        this.$root.setTitle('Home')
        this.$store.dispatch('get_featured_products')
        .then(resp => {
            this.featured_products = resp.data.data
            this.$store.dispatch('get_all_categories')
        .then(resp => {
            this.renderable = []
            resp.data.data.forEach(category => {
                if (this.renderable.length <= 3) {
                    this.$store.dispatch('get_products', {category: category.id})
                    .then(res => {
                        if (res.data.data && res.data.data.length) {
                            this.renderable.push({
                                category: category,
                                products: res.data.data
                            })
                        }
                    }).catch(error => console.log(error))
                }
            })
        })
        }).catch(error => error)


    },
    mounted() {

    }
}
</script>
