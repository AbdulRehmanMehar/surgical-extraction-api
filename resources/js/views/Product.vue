<template>
    <div class="container" style="margin: 100px auto" v-if="product">
        <div class="columns">
            <div class="column is-12">
                <div class="container">
                    <carousel :perPage="1" :autoplay="true" :loop="true" :paginationEnabled="false" v-if="product.images && product.images.length">

                            <slide  v-for="image in product.images" :key="image.id" class="image is-3by1" :style="{'background-image': 'url(data:image/png;base64,' + image.data + ')' }">
                                <a v-if="$root.isLoggedIn && $root.currentUser.role == 'admin'" @click.prevent="$root.deleteImage($event, image.id)" style="float: right; background-color: var(--app-text-hover-color); color: var(--app-text-accent-color); margin: 10px; z-index: 99">Remove this Image</a>
                                <!-- <img :src="'data:image/png;base64,' + image.data" > -->
                                <!-- class="image is-5by3" :style="{'background-image': 'url(data:image/png;base64,' + image.data + ')' }" -->
                            </slide>

                    </carousel>
                    <div v-else>
                        <div class="image is-3by1" :style="{'background-image': 'url(' + dummyImage + ')' }">
                        </div>
                    </div>
                </div>
                <br />
                <div class="container">
                    <div class="columns">
                        <div class="column is-9">
                            <h1 class="title is-2">{{ product.name }}
                                <small class="subtitle is-6" v-if="$root.isLoggedIn && $root.currentUser.role == 'admin'">
                                        <router-link :to="{name: 'manage-products', query: {id: product.id}}">Edit</router-link> &nbsp;
                                        <a @click.prevent="deleteProduct">Delete</a>
                                    </small>
                            </h1>
                            <h3 class="subtitle">@<router-link :to="{name: 'category', params: {id: product.category.id}}">{{ product.category.name }}</router-link></h3>
                        </div>
                        <div class="column is-3" style="text-align: right">
                            <br>
                            <a v-if="$root.cart.find(x => x.product.id == product.id)" @click.prevent="$root.removeFromCart($event, {product})" class="button is-danger is-rounded is-fullwidth">Remove From Cart</a>
                        <a v-else @click.prevent="$root.addToCart($event, product)" class="button is-success is-rounded is-fullwidth">Add to Cart</a>
                        </div>
                    </div>
                    <br>
                    <div class="columns">
                        <div class="column is-12">

                            <div class="content" v-html="product.description"></div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import { Slide, Carousel } from 'vue-carousel'
import dummy from '../assets/images/dummy.jpg'

export default {
    components: {
        Slide,
        Carousel
    },
    data() {
        return {
            product: null,
            dummyImage: dummy
        }
    },
    created() {
        this.$store.dispatch('get_product', this.$route.params.id)
        .then(resp => {
            this.product = resp.data.data
            this.$root.setTitle(this.product.name)
        }).catch(error => {

        })
    },
    methods: {
        deleteProduct: function(event) {
            if (this.$root.isLoggedIn && this.$root.currentUser.role == 'admin') {
                this.$store.dispatch('delete_product', this.product.id)
                .then(resp => {
                    this.$toastr('info', 'Success! Product was deleted.', 'Information')
                    this.$router.push({name: 'home'})
                }).catch(error => {
                    this.$toastr('error', 'Aah! Something went wrong.', 'Error')
                })
            }
        },
    }
}
</script>

<style scoped>
/* .VueCarousel {
    width: 100%;
    height: 40vh;
} */
.image {
    transition: all 500ms;
    background-size: cover;
    background-color: #ccc;
    background-repeat: no-repeat;
    background-position: center center;
}
.image-wrapper {
    width: 100%;
    height: 100%;
}
</style>
