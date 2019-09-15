<template>
    <div class="container" style="margin: 100px auto" v-if="product">
        <div class="columns">
            <div class="column is-12">
                <carousel :perPage="1" :autoplay="true" :loop="true" :paginationEnabled="false">
                    <div class="image-wrapper" v-if="product.images && product.images.length">
                        <slide  v-for="image in product.images" :key="image.id" class="image is-5by3" :style="{'background-image': 'url(data:image/png;base64,' + image.image + ')' }">
                        </slide>
                    </div>
                    <div class="image-wrapper" v-else>
                        <slide class="image is-5by3" :style="{'background-image': 'url(' + dummyImage + ')' }">
                        </slide>
                    </div>
                </carousel>
                <br />
                <h1 class="title is-2">{{ product.name }}</h1>
                <h3 class="subtitle">@<router-link :to="{name: 'category', params: {id: product.category.id}}">{{ product.category.name }}</router-link></h3>
                <p>{{ product.description }}</p>
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
    }
}
</script>

<style scoped>
.VueCarousel {
    width: 100%;
    height: 40vh;
}
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
