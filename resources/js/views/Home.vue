<template>
    <div id="home">
        <Slideshow v-if="featured_products && featured_products.length" :products="featured_products" />
        <div class="container" style="margin: 50px auto;">
            <div class="columns is-multiline">
                <div class="column is-4">
                    <Product />
                </div>
                <div class="column is-4">
                    <Product />
                </div>
                <div class="column is-4">
                    <Product />
                </div>
                <div class="column is-4">
                    <Product />
                </div>
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
            featured_products: null
        }
    },
    created() {
        this.$store.dispatch('get_featured_products')
        .then(resp => {
            this.featured_products = resp.data.data;
        }).catch(error => error)
    }

}
</script>
